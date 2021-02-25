import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Tags, User, UserDocument, UserStarred } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { getAccessToken, getUserData, registerAnonymous } from './utils/login';
import { getStarredRepos, IGetStarredRepos, filterAndSort } from './utils/search';
import { randomBytes, timingSafeEqual } from 'crypto';
import { AxiosResponse } from 'axios';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  validateUser(user: UserDocument, sessionId: string): boolean {
    if (user && sessionId) {
      sessionId = sessionId.split(" ")[1];
      if (user.sessionId == sessionId) {
        return true;
      }
    }
    return false;
  }

  isPrivate(user: UserDocument): boolean {
    if (user) {
      return user.isPrivate;
    }
    throw new Error('User not found');
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async login(code: string): Promise<any> {
    const sessionId: string = randomBytes(16).toString('base64');

    const accessToken = await getAccessToken(code)
      .then((res: AxiosResponse<any>): string => res.data['access_token'])
      .catch((err: Error) => { throw new Error('Failed to retrieve access token') });

    if (!accessToken) throw new Error('Failed to retrieve access token');

    const userData = await getUserData(accessToken.toString())
      .then((res: AxiosResponse<any>): any => { return { id: res.data.id, name: res.data.login } })
      .catch((err: Error) => { throw new Error('Failed to retrive user data') });

    if (!userData) throw new Error('Failed to retrive user data');

    const user = await this.userModel.findOne({ _id: userData.id }).exec();

    if (user) {
      user.updateOne({ $set: { sessionId: sessionId } }).exec();

      return { name: user.name, sessionId: sessionId, isPrivate: user.isPrivate };
    } else {

      const createUserDto = new CreateUserDto(userData.id, userData.name, sessionId, accessToken.toString());
      const createdUser = await this.create(createUserDto);

      if (createdUser) {
        this.findStarred(createdUser.name, '', createdUser.sessionId);
        return { name: createdUser.name, sessionId, isPrivate: createdUser.isPrivate };
      }

    }
    return null;
  }

  async findStarred(name: string, filter: string, sessionId: string): Promise<UserStarred[]> {
    let user = await this.userModel.findOne({ name: name });
    if (!user) {
      const newUserData = await registerAnonymous(name);
      await this.create(new CreateUserDto(newUserData._id, newUserData.name, randomBytes(16).toString('base64'), ''));
      user = await this.userModel.findOne({ name: name });
    }

    const updateRepos: IGetStarredRepos = await getStarredRepos(name, user.etag);

    const gitUpdate = updateRepos.repos;

    if (gitUpdate !== undefined) {
      await user.updateOne({
        $addToSet: {
          repos: { $each: gitUpdate },  // This is good as long as they don't have a tag field
        },
        $set: { etag: updateRepos.etag }
      }).exec();
    }

    let gitStarred: UserStarred[] = (await this.userModel.findOne({ _id: user._id }, 'repos')).repos;

    const isValidated = this.validateUser(user, sessionId);

    if (isValidated || !this.isPrivate(user)) {
      if (filter) {
        gitStarred = filterAndSort(gitStarred, filter);
      }
    } else {
      gitStarred = gitStarred.map(repo => {
        return {
          ...repo,
          tags: [{ variant: '', text: '' }] as [Tags]
        }
      });
    }
    return gitStarred;
  }

  async addTag(name: string, key: string, tag: string, sessionId: string): Promise<any> {
    const user = await this.userModel.findOne({ name: name }).exec();
    if (!this.validateUser(user, sessionId)) {
      throw new Error('You are not authorized to add');
    }

    const repoIdx = user.repos.findIndex(repo => `${repo.owner}/${repo.rid}` === key);

    if (repoIdx === -1) {
      throw new Error('Trying to add tag to inexistent repository');
    }

    if (user.repos[repoIdx].tags !== undefined) {
      user.repos[repoIdx].tags.push({ variant: '', text: tag } as Tags)
    } else {
      user.repos[repoIdx].tags = [{ variant: '', text: tag }];
    }

    user.markModified("repos");
    return await user.save();
  }

  async editTag(name: string, key: string, oldTag: string, newTag: string, sessionId: string): Promise<any> {
    const user = await this.userModel.findOne({ name: name }).exec();
    if (!this.validateUser(user, sessionId)) {
      throw new Error('You are not authorized to edit');
    }

    const repoIdx = user.repos.findIndex(repo => `${repo.owner}/${repo.rid}` === key);

    if (repoIdx === -1) {
      throw new Error('Trying to edit tag to inexistent repository');
    }

    const tagIdx = user.repos[repoIdx].tags.findIndex(f => f.text === oldTag);

    if (tagIdx === -1) {
      throw new Error('Trying to edit inexistent tag');
    }
    
    user.repos[repoIdx].tags[tagIdx].text = newTag;

    user.markModified("repos");
    return await user.save();
  }

  async deleteTag(name: string, key: string, oldTag: string, sessionId: string): Promise<any> {
    const user = await this.userModel.findOne({ name: name }).exec();
    if (!this.validateUser(user, sessionId)) {
      throw new Error('You are not authorized to delete');
    }

    const repoIdx = user.repos.findIndex(repo => `${repo.owner}/${repo.rid}` === key);

    if (repoIdx === -1) {
      throw new Error('Trying to delete tag to inexistent repository');
    }

    user.repos[repoIdx].tags = user.repos[repoIdx].tags.filter(tag => tag.text !== oldTag) as [Tags];

    user.markModified("repos");
    return await user.save();
  }

  async getPrivacy(sessionId: string): Promise<boolean> {
    console.log(sessionId)
    const user = await this.userModel.findOne({ sessionId: sessionId.split(' ')[1] }, 'isPrivate').exec();
    return this.isPrivate(user);
  }

  async switchPrivacy(sessionId: string): Promise<boolean> {
    const user = await this.userModel.findOne({ sessionId: sessionId.split(' ')[1] }).exec();

    if (this.validateUser(user, sessionId)) {
      const isPrivate = !user.isPrivate;
      const update = await user.updateOne({ $set: { isPrivate } }).exec();

      if (update) {
        return isPrivate;
      }
    }

    throw new Error('You are not authorized');
  }
}

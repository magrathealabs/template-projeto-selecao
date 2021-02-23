import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument, UserStarred } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { getAccessToken, getUserData } from './utils/login';
import { getStarredRepos, IGetStarredRepos, filterAndSort } from './utils/search';
import { randomBytes } from 'crypto';
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
    const user = await this.userModel.findOne({ name: name });
    const updateRepos: IGetStarredRepos = await getStarredRepos(name, user.etag);

    let gitStarred = updateRepos.repos;

    if (gitStarred !== undefined) {
      user.updateOne({
        $set: {
          repos: gitStarred,
          etag: updateRepos.etag
        }
      }).exec();
      user.save();
    } else {
      gitStarred = user.repos;
    }

    const isValidated = this.validateUser(user, sessionId);

    if (isValidated || !this.isPrivate(user)) {
      const userDetails = JSON.parse(user.details);
      let hasUpdated = false;

      for (let repo of gitStarred) {

        const repoKey = repo.owner + '/' + repo.id;
        if (!(repoKey in userDetails)) {
          userDetails[repoKey] = [{ variant: '', text: '' }];
          hasUpdated = true;
        }
        repo.tags = userDetails[repoKey];
      }

      if (filter) {
        gitStarred = filterAndSort(gitStarred, filter);
      }

      if (hasUpdated) {
        user.updateOne({ $set: { details: JSON.stringify(userDetails) } }).exec();
      }
    }

    return gitStarred;
  }

  async addTag(name: string, key: string, tag: string, sessionId: string): Promise<any> {
    const user = await this.userModel.findOne({ name: name }).exec();
    if (!this.validateUser(user, sessionId)) {
      throw new Error('You are not authorized to update');
    }

    const userDetails = JSON.parse(user.details);
    if (!(key in userDetails)) {
      userDetails[key] = [{ variant: '', text: tag }];
    } else {
      if (userDetails[key].find(f => f.text === tag)) {
        throw new Error('Can\'t add ' + tag);
      }
      userDetails[key].push({ variant: '', text: tag });
    }

    return user.updateOne({ $set: { details: JSON.stringify(userDetails) } }).exec()
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

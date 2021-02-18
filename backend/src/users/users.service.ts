import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { getAccessToken, getUserData } from './utils/login';
import { getStarredRepos, userStarred } from './utils/search';
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

  isPublic(user: UserDocument): boolean {
    if (user) {
      return !user.isPrivate;
    }
    return false;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async login(code: string): Promise<any> {
    const sessionId: string = randomBytes(16).toString('base64');

    const accessToken = await getAccessToken(code)
      .then((res: AxiosResponse<any>): string => res.data['access_token'])
      .catch((err: Error): boolean => { console.log('Failed to retrieve user token', err.message); return false; });

    if (!accessToken) return null;

    const userData = await getUserData(accessToken.toString())
      .then((res: AxiosResponse<any>): any => { return { id: res.data.id, name: res.data.login } })
      .catch((err: Error): any => { console.log('Failed to retrieve user data', err.message); return null });

    if (userData == null) return null;

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

  async findStarred(name: string, filter: string, sessionId: string): Promise<userStarred[]> {
    const user = await this.userModel.findOne({ name: name }).select('details sessionId name');
    let gitStarred = await getStarredRepos(name);
    const isValidated = this.validateUser(user, sessionId);

    if (isValidated || this.isPublic(user)) {
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
        gitStarred = gitStarred
          .filter(repo =>
            repo.tags.filter(tag =>
              tag?.text?.startsWith(filter)
            ).length
          )
          .sort((r1, r2) => {
            const tag1 = r1.tags.find(t => t?.text.startsWith(filter))?.text || "";
            const tag2 = r2.tags.find(t => t?.text.startsWith(filter))?.text || "";
            return tag1.length - tag2.length;
          });
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
    const user = await this.userModel.findOne({ sessionId: sessionId.split(' ')[1] }, 'isPrivate').exec();
    console.log('user', user);
    if (user) {
      console.log('returning', user.isPrivate);
      return user.isPrivate;
    }
    throw new Error('User not found');
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

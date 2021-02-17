import { Injectable } from '@nestjs/common';
import { Model, Schema } from 'mongoose';
import { MongoError } from 'mongodb';
import { User, UserDocument } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { getAccessToken, getUserData } from './utils/login';
import { getStarredRepos } from './utils/search';
import { randomBytes } from 'crypto';
import { AxiosResponse } from 'axios';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async login(code: string) {
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
      user.update({ $set: { sessionId: sessionId } }).exec();
      user.save();
      return { sessionId: sessionId };
    } else {
      const createUserDto = new CreateUserDto(userData.id, userData.name, sessionId, accessToken.toString());
      const createdUser = await this.create(createUserDto);

      if (createdUser) {
        this.findStarred(createUserDto.name);
        return { sessionId };
      }
    }
    return null;
  }

  async findStarred(name: string) {
    const user = await this.userModel.findOne({ name: name }).select('details name _token');
    const gitStarred = await getStarredRepos(user._token, user.name);
    const userDetails = JSON.parse(user.details);

    if (user) {
      let hasUpdated = false;
      for (let repo of gitStarred) {
        const repoKey = repo.owner + '/' + repo.id;
        if (!(repoKey in userDetails)) {
          userDetails[repoKey] = [''];
          hasUpdated = true;
          console.log(userDetails[repoKey]);
        }
        repo.tags = userDetails[repoKey];
      }
      if (hasUpdated) {
        console.log(userDetails);
        user.updateOne({$set: {details: JSON.stringify(userDetails)}}).exec().then(_ => console.log(_));
      }
    } 

    return gitStarred;
  }
}

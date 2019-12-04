import { User, UserInput, UserOutput } from '../types/user';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
import fs from 'fs';
import path from 'path';

const jsonwebtoken = require('jsonwebtoken');

class UserModel {
  config: any;

  constructor(config: any) {
    this.config = config;
  }

  async getAll(): Promise<[User]> {
    const usersFilePath = path.join(__dirname, '../../..', 'assets/users.json');
    const usersFile = JSON.parse(fs.readFileSync(usersFilePath).toString());

    return usersFile;
  }

  async add(input: UserInput): Promise<UserOutput> {
    if (!input.username || !input.password) throw new UserInputError('Please fill required details');

    const usersFilePath = path.join(__dirname, '../../..', 'assets/users.json');
    const usersFile = JSON.parse(fs.readFileSync(usersFilePath).toString());

    const token = jsonwebtoken.sign({
      username: input.username
    }, this.config.secret, { expiresIn: '1y' });

    const user = {
      token: token,
      user: {
        id: 1,
        name: input.username,
        username: input.username,
      }
    };

    usersFile.users.push(user);

    fs.writeFileSync(usersFilePath, JSON.stringify(usersFile));

    return user;
  }

  async login(input: UserInput): Promise<UserOutput> {
    if (!input.username || !input.password) throw new UserInputError('Please fill required details');

    const usersFilePath = path.join(__dirname, '../../..', 'assets/users.json');
    const usersFile = JSON.parse(fs.readFileSync(usersFilePath).toString());

    const loggedUsersFilePath = path.join(__dirname, '../../..', 'assets/logged_users.json');
    const loggedUsersFile = JSON.parse(fs.readFileSync(loggedUsersFilePath).toString());

    const isAnUser = usersFile.users.filter((u: any) => u.user.username === input.username);

    if (!isAnUser.length) throw new AuthenticationError('The user does not exist in the DB');

    const token = jsonwebtoken.sign({
      username: input.username
    }, this.config.secret, { expiresIn: '1y' });

    const user = {
      token,
      user: {
        id: 1,
        name: input.username,
        username: input.username,
      }
    };

    loggedUsersFile.users.push(user);

    fs.writeFileSync(loggedUsersFilePath, JSON.stringify(loggedUsersFile));

    return user;
  }
}

export default UserModel;
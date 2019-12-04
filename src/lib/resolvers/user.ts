import { UserInput } from '../types/user';

import UserModel from '../models/user';

export = (config: any) => {
  const User = new UserModel(config);

  return {
    userResolvers: {
      Query: {
        users: async (_: void, { filter = {} }) => await User.getAll(),
      },
      Mutation: {
        createUser: async (_: void, input: UserInput) => await User.add(input),
        login: async (_: void, input: UserInput) => await User.login(input),
      },
    },
  };
};
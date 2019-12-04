import { merge } from 'lodash';

export = (config: any) => {
  const { userResolvers } = require('./user')(config);
  const { movieResolvers } = require('./movie')(config);

  return merge(
    userResolvers,
    movieResolvers,
  );
};
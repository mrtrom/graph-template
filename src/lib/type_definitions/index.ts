const { rootTypeDefs } = require('./root');
const { directivesTypeDefs } = require('./directives');
const { userTypeDefs } = require('./user');
const { movieTypeDefs } = require('./movie');

export = [
  rootTypeDefs,
  directivesTypeDefs,
  userTypeDefs,
  movieTypeDefs,
];
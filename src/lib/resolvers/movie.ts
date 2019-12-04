import MovieModel from '../models/movie';

export = (config: any) => {
  const Movie = new MovieModel(config);

  return {
    movieResolvers: {
      Query: {
        movies: async (_: void, { filter = {} }, context: any) => await Movie.getAll(),
      },
    },
  };
};
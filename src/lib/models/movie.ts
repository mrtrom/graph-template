import fs from 'fs';
import path from 'path';
import { Movie } from '../types/movie';

function getRandomArbitrary(min: number, max: number) {
  return Math.round( (Math.random() * (max - min) + min) * 10 ) / 10;
}

class MovieModel {
  config: any;

  constructor(config: any) {
    this.config = config;
  }

  async getAll(): Promise<[Movie]> {
    const actors = JSON.parse(fs.readFileSync(path.join(__dirname, '../../..', 'assets/actors.json')).toString());
    const directors = JSON.parse(fs.readFileSync(path.join(__dirname, '../../..', 'assets/directors.json')).toString());
    const movies = JSON.parse(fs.readFileSync(path.join(__dirname, '../../..', 'assets/movies.json')).toString());

    movies.forEach((movie: any) => {
      let actorsInfo: any = [];
      let directorsInfo: any = [];

      movie.actors.forEach((actor: any) => {
        const actorInfo = Object.assign({}, actors.filter((a: any) => a.id === actor)[0]);

        actorInfo.directors.forEach((director: any) => {
          const directorInfo = Object.assign({}, directors.filter((a: any) => a.id === director)[0]);
          directorsInfo.push(directorInfo);
        });

        actorInfo.directors = directorsInfo;
        actorsInfo.push(actorInfo);
        directorsInfo = [];
      });

      movie.actors = actorsInfo;
      movie._rating = getRandomArbitrary(5, 9);
      actorsInfo = [];
    });

    return movies;
  }
}

export default MovieModel;
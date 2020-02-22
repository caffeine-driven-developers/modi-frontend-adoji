import http from './http';

export const getMovieLists = () => http.get('/movie-list');

type PostMovieListParams = {
  title: string;
  movieIdList: string[];
};
export const postMovieList = (p: PostMovieListParams) => {
  console.log('postMovieList', p);
  return http.post('/movie-list', p);
};

type PutMovieListParams = {
  movieListId: number;
  title?: string;
  movieIdList: string[];
};
export const putMovieList = (p: PutMovieListParams) => http.put('/movie-list', p);

type DeleteMovieListParams = {
  movieListId: number;
};
export const deleteMovieList = (p: DeleteMovieListParams) => http.delete(`/movie-list/${p.movieListId}`);

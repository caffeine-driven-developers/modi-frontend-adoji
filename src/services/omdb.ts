import axios from 'axios';

export const searchByTitle = (title: string) => {
  return axios.get(`http://localhost:3001/search?s=${title}`);
};

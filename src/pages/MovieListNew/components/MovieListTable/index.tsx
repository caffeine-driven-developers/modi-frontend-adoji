import React from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { currentMovieListSelector } from 'stores/selectors/movieList';
import { SearchedMovie } from 'services/omdb';

type MovieListTableOwnProps = {
  currentMovieList: SearchedMovie[];
};
type MovieListTableProps = MovieListTableOwnProps;
const MovieListTable: React.FC<MovieListTableProps> = props => {
  return (
    <Wrapper>
      {props.currentMovieList.length > 0 && (
        <ul>
          {props.currentMovieList.map(x => (
            <li key={x.imdbID}>
              {x.Title} ({x.Year})
            </li>
          ))}
        </ul>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const enhance = compose<React.FC<MovieListTableOwnProps>>();
export default enhance(MovieListTable);

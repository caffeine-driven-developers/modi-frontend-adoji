import React from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import { SearchedMovie } from 'services/omdb';

type SelectedMovieListOwnProps = {
  currentMovieList: SearchedMovie[];
};
type SelectedMovieListProps = SelectedMovieListOwnProps;
const SelectedMovieList: React.FC<SelectedMovieListProps> = props => {
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

const enhance = compose<React.FC<SelectedMovieListOwnProps>>();
export default enhance(SelectedMovieList);

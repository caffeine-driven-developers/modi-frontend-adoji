import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import MovieListTable from '../MovieListTable';
import { Button, TextField } from 'react95';
import { compose } from 'redux';
import { SearchedMovie } from 'services/omdb';
import { connect } from 'react-redux';
import { currentMovieListSelector } from 'stores/selectors/movieList';
import { movieListActions } from 'stores/reducers/movieList';

type MovieListFormStateProps = {
  currentMovieList: SearchedMovie[];
};
type MovieListFormDispatchProps = {
  updateCurrentMovieList: typeof movieListActions.updateCurrentMovieList;
};
type MovieListFormOwnProps = {
  setIsSearchWindowVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
type MovieListFormProps = MovieListFormStateProps & MovieListFormDispatchProps & MovieListFormOwnProps & {};

const MovieListForm: React.FC<MovieListFormProps> = props => {
  const { currentMovieList, setIsSearchWindowVisible, updateCurrentMovieList } = props;
  const [title, setTitle] = useState('');
  const handleClick = useCallback((type: string) => {
    switch (type) {
      case 'submit': {
        // const input = document.getElementById('movie_list_form_input') as HTMLInputElement;
        // input.value = '';
        // setIsSearchWindowVisible(false);
        // updateCurrentMovieList([]);
        break;
      }
      default: {
        console.error(`not defined type ${type}`);
      }
    }
  }, []);
  return (
    <Wrapper>
      <h3 className="form-label">Title</h3>
      <TextField
        id="movie_list_form_input"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
      />
      <MovieListTable currentMovieList={currentMovieList} />
      {currentMovieList.length > 0 && (
        <Button fullWidth={true} onClick={() => handleClick('submit')}>
          Submit
        </Button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  h3.form-label {
    &:nth-child(1) {
      margin-top: 0;
    }
    margin-left: 3px;
    margin-bottom: 4px;
  }
`;

const enhance = compose<React.FC<MovieListFormOwnProps>>(
  connect<MovieListFormStateProps, MovieListFormDispatchProps, MovieListFormOwnProps, any>(
    state => ({
      currentMovieList: currentMovieListSelector(state),
    }),
    {
      updateCurrentMovieList: movieListActions.updateCurrentMovieList,
    },
  ),
);
export default enhance(MovieListForm);

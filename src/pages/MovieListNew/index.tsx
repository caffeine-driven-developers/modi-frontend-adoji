import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Icon } from '@react95/core';
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import { withUserAuth } from 'hocs/withAuth';
import { compose } from 'redux';
import MovieListTable from './components/MovieListTable';
import MovieSearchForm from './components/MovieSearchForm';

const CreateMovieList: React.FC = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>modi95 - Create Movie List</title>
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>
              <span style={{ verticalAlign: 'text-top' }}>Create new movie list</span>
              &nbsp;
              <Icon name="file_pen" />
              {/* {JSON.stringify(isLoggedInNaively)} */}
            </h1>
          </div>
        </div>
        <div className="row">
          <Window>
            <WindowHeader>movie_list.exe</WindowHeader>
            <WindowContent>
              <MovieListTable />
              <MovieSearchForm />
            </WindowContent>
          </Window>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 3em;
  height: 100vh;
  background-color: rgb(85, 170, 170);

  i {
    display: inline-block;
  }
`;
const enhance = compose<React.FC>(withUserAuth);
export default enhance(CreateMovieList);

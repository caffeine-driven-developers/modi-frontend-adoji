import React, { useCallback } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Icon } from '@react95/core';
import { Button } from 'react95';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

type MovieListsDispatchProps = {
  push: typeof push;
};
type MovieListsOwnProps = {};
type MovieListsProps = MovieListsOwnProps & MovieListsDispatchProps;
const MovieLists: React.FC<MovieListsProps> = props => {
  const { push } = props;
  const handleClick = useCallback(
    (menu: string) => {
      switch (menu) {
        case 'add': {
          push('/test-auth-page');
          console.log('add');
          break;
        }
        default: {
          console.error(`not defined menu ${menu}`);
        }
      }
    },
    [0], // NOTE: to supress refresh
  );
  return (
    <Wrapper>
      <Helmet>
        <title>modi95 - Movie Lists</title>
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>
              <span style={{ verticalAlign: 'text-top' }}>Movie Lists</span>
              &nbsp;
              <Icon name="files" />
              {/* {JSON.stringify(isLoggedInNaively)} */}
            </h1>
          </div>
          <div className="col">
            <Button onClick={() => handleClick('add')}>
              Add new move list
            </Button>
          </div>
        </div>
        <div className="row">moive lists here</div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 3em;
  border: 1px solid black;
  height: 100vh;
  background-color: rgb(85, 170, 170);

  i {
    display: inline-block;
  }
`;

const enhance = compose<React.FC<MovieListsOwnProps>>(
  connect<{}, MovieListsDispatchProps, {}, any>(undefined, { push }),
);

export default enhance(MovieLists);

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Icon } from '@react95/core';
import LoginWindow from './components/LoginWindow';
import { checkUserLoginNaively } from 'utils';

const Home: React.FC = props => {
  const isLoggedInNaively = checkUserLoginNaively();

  return (
    <Wrapper>
      <Helmet>
        <title>modi95</title>
      </Helmet>

      <div className="container">
        <h1>
          <span style={{ verticalAlign: 'text-top' }}>Movie Diary 95</span>
          &nbsp;
          <Icon name="notepad" />
          {/* {JSON.stringify(isLoggedInNaively)} */}
        </h1>
        <p className="intro">
          <span>Press "</span>
          <Icon name="logo" width={22} height={22} />
          <span> Start" on the bottom left.</span>
        </p>
        {!isLoggedInNaively && (
          <div className="row justify-content-center">
            <div className="col-4">
              <LoginWindow />
            </div>
          </div>
        )}
      </div>
      <div className="copyright">
        developed by <a href="https://github.com/adoji92">adoji92</a>
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

  .copyright {
    position: fixed;
    bottom: 52px;
    right: 6px;
    /* background-color: red; */
  }
`;

export default Home;

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Icon } from '@react95/core';
import LoginWindow from './components/LoginWindow';
import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';

const Home: React.FC = props => {
  const [user, isLoading, error] = useAuthState(firebase.auth());
  const isLoggedIn = !!user;
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
        </h1>
        {error && <span>{JSON.stringify(error)}</span>}
        {/* {isLoading && <p className="intro">loading...</p>} */}
        {!isLoading && isLoggedIn && (
          <p className="intro">
            <span>Press "</span>
            <Icon name="logo" width={22} height={22} />
            <span> Start" on the bottom left.</span>
          </p>
        )}
        {!isLoading && !isLoggedIn && (
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

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Icon } from '@react95/core';

const Home: React.FC = props => {
  return (
    <Wrapper>
      <Helmet>
        <title>modi95</title>
      </Helmet>

      <h1>Movie Diary 95</h1>
      <p className="intro">
        <span>Press "</span>
        <Icon name="logo" width={22} height={22} />
        <span> Start" on the bottom left.</span>
      </p>
      <div className="copyright">
        developed by <a href="https://github.com/adoji92">adoji92</a>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-left: 4em;
  padding-top: 3em;
  border: 1px solid black;
  height: 100vh;
  background-color: rgb(85, 170, 170);

  p.intro span {
    vertical-align: super;
  }

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

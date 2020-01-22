import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Button } from 'react95';

const Wrapper = styled.div`
  padding: 4em;
  border: 1px solid black;
  background-color: rgb(85, 170, 170);
`;

const Home: React.FC = props => {
  return (
    <Wrapper className="container">
      <Helmet>
        <title>modi95</title>
      </Helmet>
      This is home template!
      <Button>dd</Button>
    </Wrapper>
  );
};

export default Home;

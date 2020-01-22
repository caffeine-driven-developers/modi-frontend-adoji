import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Button } from 'react95';

type WrapperProps = {
  inputColor?: string;
};
const Wrapper = styled.div<WrapperProps>`
  padding: 4em;
  border: 1px solid black;
  background-color: rgb(85, 170, 170);
`;

const Home: React.FC = props => {
  return (
    <Wrapper inputColor="blue">
      <Helmet>
        <title>olaf template</title>
      </Helmet>
      This is home template!
      <Button>dd</Button>
    </Wrapper>
  );
};

export default Home;

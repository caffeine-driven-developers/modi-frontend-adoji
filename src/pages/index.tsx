import React from 'react';
import Helmet from 'react-helmet';

const Home: React.FC = props => {
  return (
    <>
      <Helmet>
        <title>olaf template</title>
      </Helmet>
      This is home template!
    </>
  );
};

export default Home;

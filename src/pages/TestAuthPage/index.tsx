import React from 'react';
import { compose } from 'redux';
import { withUserAuth } from 'hocs/withAuth';

const TestAuthPage: React.FC = () => {
  return <>This is Test Auth Page template!</>;
};

const enhance = compose<React.FC>(withUserAuth);

export default enhance(TestAuthPage);

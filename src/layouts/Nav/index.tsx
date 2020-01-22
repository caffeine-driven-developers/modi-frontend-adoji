import React from 'react';
import { AppBar, Toolbar } from 'react95';
import Menu from './Menu';

const Nav: React.FC = () => {
  return (
    <AppBar>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Menu />
      </Toolbar>
    </AppBar>
  );
};

export default Nav;

import React from 'react';
import { AppBar, Toolbar } from 'react95';
import Menu from './Menu';

type NavProps = {
  style?: React.CSSProperties;
};

const Nav: React.FC<NavProps> = () => {
  return (
    <AppBar style={{ position: 'fixed', bottom: 0, top: 'auto', zIndex: 1000 }}>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Menu />
      </Toolbar>
    </AppBar>
  );
};

export default Nav;

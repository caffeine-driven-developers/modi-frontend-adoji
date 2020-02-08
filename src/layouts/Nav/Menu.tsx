import React, { useState } from 'react';
import { List, ListItem, Divider, Button, Avatar } from 'react95';
import { Icon } from '@react95/core';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';

type MenuDispatchProps = {
  push: typeof push;
};
type MenuProps = MenuDispatchProps;

const Menu: React.FC<MenuProps> = props => {
  const { push } = props;
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(firebase.auth());
  const isLoggedIn = !!user;

  function handleClick() {
    setOpen(!open);
  }

  function handleClose() {
    setOpen(false);
  }

  async function handleMenu(menu: string) {
    switch (menu) {
      case 'search': {
        push('/search');
        break;
      }
      case 'movie_lists': {
        push('/movie-lists');
        break;
      }
      case 'login': {
        push('/');
        break;
      }
      case 'logout': {
        push('/');
        await firebase.auth().signOut();
        location.reload();
        break;
      }
      default: {
        console.error(`${menu} is not defined`);
      }
    }
  }

  return (
    <Wrapper>
      {open && (
        <List horizontalAlign="left" verticalAlign="top" open={open} onClick={handleClose}>
          <ListItem disabled={true}>
            <Icon className="menu-icon" name="user" height={23} width={23} />
            <span className="menu-text">Profile</span>
          </ListItem>
          <ListItem onClick={() => handleMenu('search')}>
            <Icon className="menu-icon" name="explore" height={23} width={23} />
            <span className="menu-text">Search</span>
          </ListItem>
          <ListItem onClick={() => handleMenu('movie_lists')}>
            <Icon className="menu-icon" name="files" height={23} width={23} />
            <span className="menu-text">Moive Lists</span>
          </ListItem>
          {/* <ListItem onClick={() => handleMenu('login')}>
            <Icon className="menu-icon" name="dial" height={23} width={23} />
            Login
          </ListItem> */}

          <Divider />
          {isLoggedIn ? (
            <ListItem className="last-li" onClick={() => handleMenu('logout')}>
              <Avatar square={true} src={user?.photoURL} style={{ display: 'inline-block' }} />
              {/* <Icon className="menu-icon" name="power_off" height={23} width={23} /> */}
              <span className="menu-text">Logout</span>
            </ListItem>
          ) : (
            <ListItem className="last-li" onClick={() => handleMenu('login')}>
              <Icon className="menu-icon" name="power_on" height={23} width={23} />
              <span className="menu-text">Login</span>
            </ListItem>
          )}
        </List>
      )}

      <Button
        onClick={handleClick}
        style={{
          fontWeight: 'bold',
        }}
      >
        <Icon
          name="logo"
          style={{
            marginRight: '4px',
          }}
        />
        Start
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: inline-block;

  ul {
    top: -17.2px;
    left: -0.6px;
  }
  .menu-icon {
    display: inline-block;
    margin-top: 11px;
    margin-right: 9px;
  }

  .menu-text {
    margin-left: 0.4rem;
    vertical-align: super;
  }

  .last-li {
    padding-top: 4px;
  }
`;

const enhance = compose<React.FC>(
  connect<{}, MenuDispatchProps, {}, any>(undefined, {
    push,
  }),
);

export default enhance(Menu);

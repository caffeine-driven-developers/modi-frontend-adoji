import React from 'react';
import { List, ListItem, Divider, Button } from 'react95';
import { Icon } from '@react95/core';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import firebase from 'firebase/app';

type MenuDispatchProps = {
  push: typeof push;
};
type MenuProps = MenuDispatchProps;

const Menu: React.FC<MenuProps> = props => {
  const { push } = props;
  const [open, setOpen] = React.useState(false);
  const isLoggedIn = !!firebase.auth().currentUser;

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
        <List
          horizontalAlign="left"
          verticalAlign="top"
          open={open}
          onClick={handleClose}
        >
          <ListItem disabled={true}>
            <Icon className="menu-icon" name="user" height={23} width={23} />
            Profile
          </ListItem>
          <ListItem onClick={() => handleMenu('search')}>
            <Icon className="menu-icon" name="explore" height={23} width={23} />
            Search
          </ListItem>
          <ListItem onClick={() => handleMenu('movie_lists')}>
            <Icon className="menu-icon" name="files" height={23} width={23} />
            Movie Lists
          </ListItem>
          {/* <ListItem onClick={() => handleMenu('login')}>
            <Icon className="menu-icon" name="dial" height={23} width={23} />
            Login
          </ListItem> */}

          <Divider />
          {isLoggedIn ? (
            <ListItem onClick={() => handleMenu('logout')}>
              <Icon
                className="menu-icon"
                name="power_off"
                height={23}
                width={23}
              />
              Logout
            </ListItem>
          ) : (
            <ListItem onClick={() => handleMenu('login')}>
              <Icon
                className="menu-icon"
                name="power_on"
                height={23}
                width={23}
              />
              Login
            </ListItem>
          )}
        </List>
      )}

      <Button onClick={handleClick} style={{ fontWeight: 'bold' }}>
        <Icon name="logo" style={{ marginRight: '4px' }} />
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

  #google_logout_btn_wrapper {
    display: none;
  }
`;

const enhance = compose<React.FC>(
  connect<{}, MenuDispatchProps, {}, any>(undefined, {
    push,
  }),
);

export default enhance(Menu);

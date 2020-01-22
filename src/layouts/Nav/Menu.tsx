import React from 'react';
import { List, ListItem, Divider, Button } from 'react95';
import { Icon } from '@react95/core';

const Menu: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {open && (
        <List
          horizontalAlign="left"
          verticalAlign="top"
          open={open}
          onClick={handleClose}
        >
          <ListItem>
            <Icon
              className="dd"
              style={{
                display: 'inline-block',
                marginTop: 11,
              }}
              name="explore"
              height={23}
              width={23}
            />{' '}
            Hello
          </ListItem>
          <ListItem>📁 My account</ListItem>
          <Divider />
          <ListItem disabled>🔙 Logout</ListItem>
        </List>
      )}

      <Button onClick={handleClick} style={{ fontWeight: 'bold' }}>
        <Icon name="logo" style={{ marginRight: '4px' }} />
        Start
      </Button>
    </div>
  );
};

export default Menu;

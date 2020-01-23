import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@react95/core';
import { TextField, Button } from 'react95';

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  const onChangeSearchText: React.ChangeEventHandler<HTMLInputElement> = e =>
    setSearchText(e.target.value);

  const handleClick = React.useCallback(async () => {
    console.log('ddd', searchText);
  }, [searchText]);

  return (
    <Wrapper className="container">
      <div className="row">
        <div className="col">
          <h1>
            <span style={{ verticalAlign: 'text-top' }}>Search</span>
            &nbsp;
            <Icon name="explore" />
          </h1>
        </div>
        <div className="col right">
          <div className="float-right">
            <TextField
              className="text-field"
              shadow={false}
              onChange={onChangeSearchText}
            ></TextField>
            &nbsp;
            <Button onClick={handleClick}>
              <span style={{ fontWeight: 'bold' }}>Search</span>
            </Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .col.right {
    display: flex;
    justify-content: center;
    flex-direction: column;

    .float-right {
      display: flex;
      justify-content: flex-end;

      .text-field {
        display: inline-block;
        top: 1.6px;
      }
    }
  }

  i {
    display: inline-block;
  }
`;

export default Search;

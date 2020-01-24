import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@react95/core';
import { TextField, Button } from 'react95';
import { searchByTitle } from 'services/omdb';

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState<any>({});

  const onChangeSearchText: React.ChangeEventHandler<HTMLInputElement> = e =>
    setSearchText(e.target.value);

  const handleClick = React.useCallback(
    async e => {
      e.preventDefault();
      // TODO: decide whether searchText is title or id
      const res = await searchByTitle(searchText);
      setSearchResult(res.data);
    },
    [searchText],
  );

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
            <form action="#" onSubmit={handleClick}>
              <TextField
                className="text-field"
                shadow={false}
                onChange={onChangeSearchText}
              />
            </form>
            &nbsp;
            <Button onClick={handleClick}>
              <span style={{ fontWeight: 'bold' }}>Search</span>
            </Button>
          </div>
        </div>
      </div>
      <pre>{JSON.stringify(searchResult, null, 2)}</pre>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-bottom: 200px;
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

import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@react95/core';
import {
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableHeadCell,
  TableBody,
  TableDataCell,
  Window,
  WindowHeader,
  WindowContent,
} from 'react95';
import { searchByTitle } from 'services/omdb';
import __ from 'lodash';

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState<any>({});
  const [error, setError] = useState<string>();

  const onChangeSearchText: React.ChangeEventHandler<HTMLInputElement> = e =>
    setSearchText(e.target.value);

  const handleClick = React.useCallback(
    async e => {
      e.preventDefault();
      // TODO: decide whether searchText is title or id
      const res = await searchByTitle(searchText);
      console.log(res.data);
      if (res.data.Response === 'False') {
        setSearchResult({});
        setError(res.data.Error);
      } else {
        setSearchResult(res.data);
        setError(undefined);
      }
    },
    [searchText],
  );

  const isInitialState = React.useMemo(() => {
    return __.isEqual({}, searchResult);
  }, searchResult);

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
      {error && <div>Error: {error}</div>}
      <div className="row">
        {!isInitialState && !error && (
          <Window>
            <WindowHeader>
              search.exe - Top {searchResult.Search.length} result
              {searchResult.Search.length > 1 &&
                `s out of ${searchResult.totalResults}`}
            </WindowHeader>
            <WindowContent>
              <Table>
                <TableHead>
                  <TableRow head={true}>
                    <TableHeadCell>Poster</TableHeadCell>
                    <TableHeadCell>Title</TableHeadCell>
                    <TableHeadCell>Year</TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResult.Search.map((x: any) => (
                    <TableRow key={x.imdbID}>
                      <TableDataCell>
                        <img className="img-fluid" src={x.Poster} />
                      </TableDataCell>
                      <TableDataCell>{x.Title}</TableDataCell>
                      <TableDataCell>{x.Year}</TableDataCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </WindowContent>
          </Window>
        )}
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

  /* css for table scroll START */
  table {
    width: 418px;
  }
  tbody,
  thead tr {
    display: block;
  }

  tbody td:nth-child(1),
  thead th:nth-child(1) {
    width: 130px;
  }

  tbody td:nth-child(2),
  thead th:nth-child(2) {
    width: 180px;
    text-align: center;
  }

  tbody td:nth-child(3),
  thead th:nth-child(3) {
    width: 40px;
  }

  tbody {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  /* css for table scroll END */

  i {
    display: inline-block;
  }
`;

export default Search;

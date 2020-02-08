import React, { useCallback, useState, useMemo } from 'react';
import styled from 'styled-components';
import { TextField, Table, TableHead, TableRow, TableHeadCell, TableBody, TableDataCell } from 'react95';
import { searchByTitle } from 'services/omdb';
import { isEqual } from 'lodash';

const MovieSearchForm: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState<any>({});
  const [error, setError] = useState<string>();
  const isInitialState = useMemo(() => {
    return isEqual({}, searchResult);
  }, searchResult); // eslint-disable-line

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => setSearchText(e.target.value);
  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();

      const res = await searchByTitle(searchText);
      console.log('data', res.data);

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
  const handleClick = useCallback(
    (x: any) => {
      console.log('x', x);
    },
    [searchResult],
  );
  return (
    <Wrapper>
      {!isInitialState && (
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
              <TableRow key={x.imdbID} onClick={() => handleClick(x)}>
                <TableDataCell>
                  <img className="img-fluid" src={x.Poster} />
                </TableDataCell>
                <TableDataCell>{x.Title}</TableDataCell>
                <TableDataCell>{x.Year}</TableDataCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <form action="#" onSubmit={handleSubmit}>
        <TextField onChange={handleChange} />
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
`;

export default MovieSearchForm;

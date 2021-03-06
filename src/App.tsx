import 'App.css';
import 'bootstrap4.grid.css';
import { ConnectedRouter } from 'connected-react-router';
import Nav from 'layouts/Nav';
import Home from 'pages/Home';
import Mobile from 'pages/Mobile';
import NoMatch from 'pages/NoMatch';
import React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router';
import { history } from 'stores';
import Search from 'pages/Search';
import TestAuthPage from 'pages/TestAuthPage';
import MovieLists from 'pages/MovieLists';
import MovieListNew from 'pages/MovieListNew';

const App: React.FC = () => {
  return (
    <ConnectedRouter history={history}>
      <BrowserView>
        {/* tslint:disable jsx-no-lambda */}
        <Switch>
          <Route exact={true} path="/" render={() => <Home />} />
          <Route path="/search" render={() => <Search />} />
          <Route path="/movie-lists/new" render={() => <MovieListNew />} />
          <Route path="/movie-lists" render={() => <MovieLists />} />
          <Route path="/test-auth-page" render={() => <TestAuthPage />} />
          <Route render={() => <NoMatch />} />
        </Switch>
        <Nav />
      </BrowserView>
      <MobileView>
        <Route path="/" render={() => <Mobile />} />
      </MobileView>
    </ConnectedRouter>
  );
};

// eslint-disable-next-line
const isProd = location.origin.includes('TODO: replace your url here');

export default isProd ? App : hot(App);

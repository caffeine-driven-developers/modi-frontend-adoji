import 'App.css';
import { ConnectedRouter } from 'connected-react-router';
import Nav from 'layouts/Nav';
import Home from 'pages';
import Mobile from 'pages/Mobile';
import NoMatch from 'pages/NoMatch';
import React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router';
import { history } from 'stores';

const App: React.FC = () => {
  return (
    <ConnectedRouter history={history}>
      <BrowserView>
        <Nav />
        {/* tslint:disable jsx-no-lambda */}
        <Switch>
          <Route exact={true} path="/" render={() => <Home />} />
          <Route render={() => <NoMatch />} />
        </Switch>
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

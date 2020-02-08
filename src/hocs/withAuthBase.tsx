import React from 'react';
import { isNil } from 'lodash';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import firebase from 'firebase/app';

export enum AuthenticationRole {
  User = 'user',
  Admin = 'admin',
}

type WithAuthorizationDispatchProps = {
  push: typeof push;
};
type WithAuthorizationProps = WithAuthorizationDispatchProps;

type WithAuthorizationState = {
  authUser: firebase.User | null;
  isLoading: boolean;
};

const withAuthBase = (requiredRole: AuthenticationRole) => (
  Component: React.ComponentType,
): React.ComponentType => {
  // TODO: handle requiredRole === admin
  class WithAuthorization extends React.Component<WithAuthorizationProps, WithAuthorizationState> {
    private timeoutId: number | null;
    private unsubscribe: firebase.Unsubscribe;

    constructor(props: any) {
      super(props);
      this.state = {
        authUser: firebase.auth().currentUser,
        isLoading: true,
      };
    }

    async componentDidMount() {
      this.unsubscribe = firebase.auth().onAuthStateChanged(async authUser => {
        this.setState({ authUser, isLoading: false });
        if (isNil(authUser)) {
          setTimeout(() => {
            this.props.push('/');
          }, 1500);
        }
      });
    }

    componentWillUnmount() {
      if (this.timeoutId) {
        window.clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
      this.unsubscribe();
    }

    render() {
      if (this.state.isLoading) {
        return <span>loading...</span>;
      }
      if (isNil(this.state.authUser)) {
        return <span>please log in</span>;
      }
      return <Component {...this.props} />;
    }
  }

  return compose<React.ComponentType>(
    withRouter,
    connect<{}, WithAuthorizationDispatchProps, {}, any>(undefined, { push }),
  )(WithAuthorization);
};

export default withAuthBase;

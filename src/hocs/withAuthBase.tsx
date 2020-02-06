import React from 'react';
import { isNil } from 'lodash';
import { GoogleLoginResponse } from 'react-google-login';
import { compose, Dispatch } from 'redux';
import { withRouter } from 'react-router';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { getGoogleLoginResponseFromLocalStorage, validateUser } from '../utils';

export enum AuthenticationRole {
  User = 'user',
  Admin = 'admin',
}

enum AccessTokenValidation {
  Fetching = 'fetching',
  Invalid = 'invalid',
  Valid = 'valid',
}

type WithAuthorizationProps = {
  dispatch: Dispatch;
};

type WithAuthorizationState = {
  glr: GoogleLoginResponse | null;
  isAccessTokenValid: AccessTokenValidation;
};

const withAuthBase = (requiredRole: AuthenticationRole) => (
  Component: React.ComponentType,
): React.ComponentType => {
  class WithAuthorization extends React.Component<
    WithAuthorizationProps,
    WithAuthorizationState
  > {
    private timeoutId: number | null;
    constructor(props: any) {
      super(props);
      this.state = {
        glr: getGoogleLoginResponseFromLocalStorage(),
        isAccessTokenValid: AccessTokenValidation.Fetching,
      };
    }

    async componentDidMount() {
      const { hasAuth, fallbackUrl } = await validateUser(requiredRole);
      if (!hasAuth) {
        this.timeoutId = window.setTimeout(() => {
          this.props.dispatch(push(fallbackUrl!));
        }, 1500);
        this.setState({
          isAccessTokenValid: AccessTokenValidation.Invalid,
        });
      } else {
        this.setState({
          isAccessTokenValid: AccessTokenValidation.Valid,
        });
      }
    }

    componentWillUnmount() {
      if (this.timeoutId) {
        window.clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    }

    render() {
      if (isNil(this.state.glr)) {
        return <span>not logged in</span>;
      }
      if (this.state.isAccessTokenValid === AccessTokenValidation.Fetching) {
        return <span>loading...</span>;
      }
      if (this.state.isAccessTokenValid === AccessTokenValidation.Invalid) {
        return <span>please log in again</span>;
      }
      return <Component {...this.props} />;
    }
  }

  return compose<React.ComponentType>(withRouter, connect())(WithAuthorization);
};

export default withAuthBase;

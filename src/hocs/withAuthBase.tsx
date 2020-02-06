import React from 'react';
import { isNil } from 'lodash';
import { GoogleLoginResponse } from 'react-google-login';
import axios from 'axios';
import { compose, Dispatch } from 'redux';
import { withRouter } from 'react-router';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

export enum AuthenticationRole {
  User = 'user',
  Admin = 'admin',
}

type WithAuthorizationProps = {
  dispatch: Dispatch;
};

type WithAuthorizationState = {
  glr: GoogleLoginResponse | null;
  isAccessTokenValid: boolean;
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
        glr: this.getGoogleLoginResponseFromLocalStorage(),
        isAccessTokenValid: false,
      };
    }

    async componentDidMount() {
      const { hasAuth, fallbackUrl } = await this.validateUser(requiredRole);
      if (!hasAuth) {
        this.timeoutId = window.setTimeout(() => {
          this.props.dispatch(push(fallbackUrl!));
        }, 1500);
      } else {
        this.setState({
          isAccessTokenValid: true,
        });
      }
    }

    componentWillUnmount() {
      if (this.timeoutId) {
        window.clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    }

    private getGoogleLoginResponseFromLocalStorage(): GoogleLoginResponse | null {
      const glr = window.localStorage.getItem('glr');
      if (isNil(glr)) {
        return null;
      }
      return JSON.parse(glr) as GoogleLoginResponse;
    }

    private async validateAccessToken(
      glr: GoogleLoginResponse,
    ): Promise<boolean> {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${glr.accessToken}`,
      );
      const isValidToken = isNil(res.data.error_description);
      return isValidToken;
    }

    private async validateUser(
      requiredRole: AuthenticationRole,
    ): Promise<{ hasAuth: boolean; fallbackUrl?: string }> {
      const glr = this.getGoogleLoginResponseFromLocalStorage();
      if (isNil(glr)) {
        return {
          hasAuth: false,
          fallbackUrl: '/login?redirected',
        };
      }
      const isTokenValid = await this.validateAccessToken(glr);
      if (!isTokenValid) {
        return {
          hasAuth: false,
          fallbackUrl: '/login?redirected',
        };
      }
      if (requiredRole === AuthenticationRole.Admin) {
        // TODO: check database
      }
      return {
        hasAuth: true,
      };
    }

    render() {
      if (isNil(this.state.glr)) {
        return <span>not logged in</span>;
      }
      if (!this.state.isAccessTokenValid) {
        return <span>please log in again</span>;
      }
      return <Component {...this.props} />;
    }
  }

  return compose<React.ComponentType>(withRouter, connect())(WithAuthorization);
};

export default withAuthBase;

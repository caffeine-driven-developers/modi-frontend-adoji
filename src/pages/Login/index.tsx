import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Icon } from '@react95/core';
import {
  Window,
  WindowHeader,
  WindowContent,
  // TextField,
  // DatePicker,
  Button,
} from 'react95';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

type LoginProps = {
  dispatch: Dispatch;
};
const Login: React.FC<LoginProps> = props => {
  const onSuccess = useCallback((res: any) => {
    const response = res as GoogleLoginResponse;
    window.localStorage.setItem('glr', JSON.stringify(response));
    props.dispatch(push('/'));
  }, []);

  return (
    <Wrapper className="container">
      <div className="row">
        <div className="col-12">
          <h1>
            <span style={{ verticalAlign: 'text-top' }}>Login</span>
            &nbsp;
            <Icon name="memory" />
          </h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-6">
          <Window style={{ width: '100%' }}>
            <WindowHeader>login.exe</WindowHeader>
            <WindowContent style={{ justifyContent: 'center' }}>
              I support the google login only.
              <br />
              <br />
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID!}
                onSuccess={onSuccess}
                onFailure={onSuccess}
                cookiePolicy={'single_host_origin'}
                render={props => (
                  <Button
                    style={{ fontWeight: '700' }}
                    {...props}
                    fullWidth={true}
                  >
                    🔑 Login with google
                  </Button>
                )}
              />
            </WindowContent>
          </Window>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-bottom: 200px;

  i {
    display: inline-block;
  }

  h3.form-label {
    margin-left: 3px;
    margin-bottom: 4px;

    button {
      margin-left: 8px;
      font-weight: 500;
    }
  }

  div.label-info {
    margin-left: 4px;
    margin-top: 4px;
  }

  .nickname input {
    text-transform: lowercase;
  }

  span.birthday {
    margin-left: 4px;
    font-size: 18px;
  }

  button.submit {
    margin-top: 20px;
    font-weight: 700;
  }
`;

const enhance = compose<React.FC>(connect());
export default enhance(Login);

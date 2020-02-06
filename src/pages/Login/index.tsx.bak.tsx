import React, { useState, ChangeEvent, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Icon } from '@react95/core';
import {
  Window,
  WindowHeader,
  WindowContent,
  TextField,
  DatePicker,
  Button,
} from 'react95';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [nickname, setNickname] = useState('');
  const [isBirthdayPickerVisible, setIsBirthdayPickerVisible] = useState(false);
  const [birthday, setBirthday] = useState<Date>(new Date('1992-05-06'));

  const onFinish = useCallback((res: any) => {
    const response = res as GoogleLoginResponse;
    console.log('res', response);
  }, []);

  const isValid = useMemo(() => {
    if (
      !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        email,
      )
    ) {
      return false;
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      return false;
    }
    if (password !== password2) {
      return false;
    }

    return true;
  }, [email, password, password2, nickname, birthday]);
  const handleSubmit = useCallback(() => {
    console.log('1234');
  }, [email, password, password2, nickname, birthday]);
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
            <WindowContent>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID!}
                onSuccess={onFinish}
                onFailure={onFinish}
                cookiePolicy={'single_host_origin'}
              />
              {JSON.stringify(process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID)}
              <h3 className="form-label" style={{ marginTop: 0 }}>
                E-mail
              </h3>
              <TextField
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              <h3 className="form-label">Password</h3>
              <TextField
                type="password"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
              <div className="label-info">
                The string must contain at least 1 numeric character
              </div>
              <h3 className="form-label">Password Confirm</h3>
              <TextField
                type="password"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword2(e.target.value)
                }
              />
              <h3 className="form-label">Nickname</h3>
              <TextField
                className="nickname"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNickname(e.target.value.toLowerCase())
                }
              />
              <h3 className="form-label">
                Birthday{' '}
                <Button onClick={() => setIsBirthdayPickerVisible(true)}>
                  Select
                </Button>
              </h3>
              {isBirthdayPickerVisible && (
                <div>
                  <DatePicker
                    onAccept={(date: Date) => {
                      setBirthday(date);
                      setIsBirthdayPickerVisible(false);
                    }}
                    date={birthday}
                  />
                </div>
              )}
              {birthday && (
                <span className="birthday">
                  {birthday.toLocaleDateString()}
                </span>
              )}
              <Button
                className="submit"
                fullWidth={true}
                disabled={!isValid}
                onClick={handleSubmit}
              >
                Register
              </Button>
            </WindowContent>
          </Window>
          email: {email}
          <br />
          password: {password}
          <br />
          password2: {password2}
          <br />
          nickname: {nickname}
          <br />
          birthday: {birthday.toLocaleDateString()}
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
export default Login;

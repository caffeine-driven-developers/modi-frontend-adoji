import React, { useCallback } from 'react';
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import firebase from 'firebase/app';

type LoginProps = {
  dispatch: Dispatch;
};
const LoginWindow: React.FC<LoginProps> = props => {
  // const onSuccess = useCallback((res: any) => {
  //   const response = res as GoogleLoginResponse;
  //   window.localStorage.setItem('glr', JSON.stringify(response));
  //   props.dispatch(push('/'));
  // }, []);

  const handleClick = useCallback(async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  }, [0]);

  return (
    <Window style={{ width: '100%' }}>
      <WindowHeader>login.exe</WindowHeader>
      <WindowContent style={{ justifyContent: 'center' }}>
        I support the google login only.
        <br />
        <br />
        <Button
          style={{ fontWeight: '700' }}
          {...props}
          fullWidth={true}
          onClick={handleClick}
        >
          🔑 Login with google
        </Button>
      </WindowContent>
    </Window>
  );
};

// const Wrapper = styled.div`
//   h3.form-label {
//     margin-left: 3px;
//     margin-bottom: 4px;

//     button {
//       margin-left: 8px;
//       font-weight: 500;
//     }
//   }

//   div.label-info {
//     margin-left: 4px;
//     margin-top: 4px;
//   }

//   .nickname input {
//     text-transform: lowercase;
//   }

//   span.birthday {
//     margin-left: 4px;
//     font-size: 18px;
//   }

//   button.submit {
//     margin-top: 20px;
//     font-weight: 700;
//   }
// `;

const enhance = compose<React.FC>(connect());
export default enhance(LoginWindow);

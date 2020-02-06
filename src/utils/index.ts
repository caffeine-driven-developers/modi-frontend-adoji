import { AuthenticationRole } from 'hocs/withAuthBase';
import { isNil } from 'lodash';
import { GoogleLoginResponse } from 'react-google-login';
import axios from 'axios';

export function getGoogleLoginResponseFromLocalStorage(): GoogleLoginResponse | null {
  const glr = window.localStorage.getItem('glr');
  if (isNil(glr)) {
    return null;
  }
  return JSON.parse(glr) as GoogleLoginResponse;
}

export async function validateAccessToken(
  glr: GoogleLoginResponse,
): Promise<boolean> {
  let hasError = false;
  try {
    // NOTE: access token이 만료되었으면 400 error라서 catch에서 잡힘
    await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${glr.accessToken}`,
    );
  } catch (error) {
    hasError = true;
  }

  return !hasError;
}

export async function isLoggedIn(): Promise<boolean> {
  const glr = getGoogleLoginResponseFromLocalStorage();
  if (isNil(glr)) {
    return false;
  }
  const isTokenValid = await validateAccessToken(glr);
  return isTokenValid;
}

export async function validateUser(
  requiredRole: AuthenticationRole,
): Promise<{ hasAuth: boolean; fallbackUrl?: string }> {
  const glr = getGoogleLoginResponseFromLocalStorage();
  if (isNil(glr)) {
    return {
      hasAuth: false,
      fallbackUrl: '/login?redirected',
    };
  }

  const isTokenValid = await validateAccessToken(glr);
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

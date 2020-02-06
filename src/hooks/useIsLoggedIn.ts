import { getGoogleLoginResponseFromLocalStorage, checkUserLogin } from 'utils';
import { useEffect, useState } from 'react';

const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await checkUserLogin();
      setIsLoggedIn(res);
    })();
  }, [getGoogleLoginResponseFromLocalStorage()]);

  return {
    isLoggedIn,
  };
};

export default useIsLoggedIn;

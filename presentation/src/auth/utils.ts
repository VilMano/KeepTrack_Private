import axios from 'axios';
// ----------------------------------------------------------------------

function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

function decodeJWT(token: string) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
// ----------------------------------------------------------------------

export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp: number) => {
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert('Token expired');

    sessionStorage.removeItem('accessToken');

    window.location.href = process.env.REACT_APP_AUTH + "/user/authenticate";
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    // if (window.sessionStorage.getItem('accessToken')) {
    //   window.sessionStorage.removeItem('accessToken');
    // }

    window.sessionStorage.setItem('accessToken', accessToken);

    const { exp } = jwtDecode(accessToken);
    tokenExpired(exp);
  } else {
    window.sessionStorage.removeItem('accessToken');
    window.sessionStorage.removeItem('login');
  }
};

export const getSession = (token: string) => {
  if (token) {
    const decodedJWT = decodeJWT(token!);

    return decodedJWT;
  }
};

export const setLocalStorage = (name: string, value: string) => {
  if (name && value) {
    if (window.sessionStorage.getItem(name)) {
      window.sessionStorage.removeItem(name);
    }

    window.sessionStorage.setItem(name, value);
  }
}

export const getUserInfo = () => {
  if(typeof window.sessionStorage.getItem('login') !== 'undefined'){
    return JSON.parse(window.sessionStorage.getItem('login')!);
  }

  return null;
}
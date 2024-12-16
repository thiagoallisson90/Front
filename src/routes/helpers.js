const keys = ["name", "refreshToken", "token", "email"];

export const registerData = ({ name, refreshToken, token, email }) => {
  localStorage.setItem(keys[0], name);
  localStorage.setItem(keys[1], refreshToken);
  localStorage.setItem(keys[2], token);
  localStorage.setItem(keys[3], email);
};

export const registerTokens = ({ token, refreshToken }) => {
  localStorage.setItem(keys[1], refreshToken);
  localStorage.setItem(keys[2], token);
};

export const isAuthenticated = () => {
  return localStorage.getItem(keys[0]) !== null;
};

export const closeAuth = () => {
  keys.forEach((key) => {
    localStorage.removeItem(key);
  });
};

export const getName = () => {
  return localStorage.getItem(keys[0]) || "";
};

export const getToken = () => {
  return localStorage.getItem(keys[2]) || "";
};

export const getRefreshToken = () => {
  return localStorage.getItem(keys[1]) || "";
};

export const getEmail = () => {
  return localStorage.getItem(keys[3]) || "";
};

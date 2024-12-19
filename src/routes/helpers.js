//const keys = ["name", "refreshToken", "token", "email"];
const keys = ["name", "token", "email"];

export const registerData = ({ name, token, email }) => {
  localStorage.setItem(keys[0], name);
  //localStorage.setItem(keys[1], refreshToken);
  localStorage.setItem(keys[1], token);
  localStorage.setItem(keys[2], email);
};

export const registerTokens = ({ token }) => {
  localStorage.setItem(keys[1], token);
};

export const isAuthenticated = () => {
  return localStorage.getItem(keys[1]) !== null;
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
  return localStorage.getItem(keys[1]) || "";
};

export const getEmail = () => {
  return localStorage.getItem(keys[2]) || "";
};

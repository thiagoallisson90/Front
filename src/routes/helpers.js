const keys = ["authToken", "username", "usertype"];

export const isAuthenticated = () => {
  return localStorage.getItem(keys[0]) !== null;
};

export const closeAuth = () => {
  keys.forEach((key) => {
    localStorage.removeItem(key);
  });
};

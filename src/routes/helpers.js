const key = "authToken";

export const isAuthenticated = () => {
  return localStorage.getItem(key) !== null;
};

export const closeAuth = () => {
  localStorage.removeItem(key);
};

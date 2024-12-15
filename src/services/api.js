const baseUrl =
  import.meta.env.VITE_REACT_ENV == "development"
    ? import.meta.env.VITE_API_URL_DEV
    : import.meta.env.VITE_API_URL_PROD;

const auth = async (dataForm) => {
  return await fetch(`${baseUrl}/api/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForm),
  });
};

const login = async (dataForm) => {
  const response = await fetch(`${baseUrl}/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForm),
  });

  return await response.json();
};

const simulation = async (dataForm) => {
  return await fetch(`${baseUrl}/api/simulation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForm),
  });
};

const logout = async (token) => {
  return await fetch(`${baseUrl}/api/user/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token),
  });
};

export { auth, login, logout, simulation };

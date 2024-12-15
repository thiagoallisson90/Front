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
  return await fetch(`${baseUrl}/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForm),
  });
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

export { auth, login, simulation };

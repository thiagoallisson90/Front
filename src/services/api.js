import axios from "axios";

const baseUrl =
  import.meta.env.VITE_REACT_ENV == "development"
    ? import.meta.env.VITE_API_URL_DEV
    : import.meta.env.VITE_API_URL_PROD;

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

/*const auth = async (dataForm) => {
  return await fetch(`${baseUrl}/api/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForm),
  });
};*/
const auth = async (dataForm) => {
  try {
    const response = await api.post("/api/user/signup", dataForm);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message || error.response };
  }
};

/*const login = async (dataForm) => {
  const response = await fetch(`${baseUrl}/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForm),
  });

  return await response.json();
};*/
const login = async (dataForm) => {
  const { email, password } = dataForm;
  try {
    const response = await api.post("/api/user/login", { email, password });
    return response.data;
  } catch (error) {
    return { ok: false, message: "E-mail or password incorrect!" };
  }
};

/*const logout = async (token) => {
  return await fetch(`${baseUrl}/api/user/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    crossorigin: true,
    mode: "cors",
    body: JSON.stringify(token),
  });
};*/
const logout = async (token, email) => {
  try {
    await api.post(
      "/api/user/logout",
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //console.log("Resposta:", response.data);
  } catch (error) {
    console.error("Erro na requisição:", error.response || error.message);
  }
};

const createSim = async (dataForm) => {
  const response = await fetch(`${baseUrl}/api/simulation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForm),
  });

  return await response.json();
};

const getSims = async (email, token) => {
  const response = await fetch(`${baseUrl}/api/simulation/user/${email}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return await response.json();
};

const refreshToken = async (refresh_token) => {
  const response = await fetch(`${baseUrl}/api/user/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refresh_token}`,
    },
    /*withCredentials: true,
    crossorigin: true,*/
    mode: "no-cors",
  }).catch((error) => {
    console.log(error);
  });

  return await response.json();
};

export { auth, login, logout, createSim, getSims, refreshToken };

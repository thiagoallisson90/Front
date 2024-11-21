const baseUrl = "http://localhost:3124";

const auth = async (dataForm) => {
  return await fetch(`${baseUrl}/api/v1/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForm),
  });
};

const login = async (dataForm) => {
  return await fetch(`${baseUrl}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForm),
  });
};

export { auth, login };

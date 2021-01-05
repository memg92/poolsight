export const authenticate = async () => {
  const response = await fetch("/api/users/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const login = async (email, password) => {
  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return await response.json();
};

export const logout = async () => {
  const response = await fetch("/api/users/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const signUp = async (username, email, role, password) => {
  const response = await fetch("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      role,
      password,
    }),
  });
  return await response.json();
};

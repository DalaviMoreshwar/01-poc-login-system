import api from "./api";

export const login = async (crendentials) => {
  try {
    const response = await api.post("/login", crendentials);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = async () => {
  await api.post("/logout");
};

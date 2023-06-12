export const isLoggedUser = () => {
  const storage = window.localStorage.getItem("isLoggedIn");
  return JSON.parse(storage);
};

// ./auth.ts

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const logout = (): void => {
  localStorage.removeItem("token");
  window.location.reload();
};

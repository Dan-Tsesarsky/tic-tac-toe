export const tokenKey = "token";
export function getToken() {
  return localStorage.getItem(tokenKey);
}
export function setToken(value) {
  return localStorage.setItem(tokenKey, value);
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getToken,
  setToken,
};

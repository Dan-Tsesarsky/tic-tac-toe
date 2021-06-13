import http from "./httpService";

export function editGame(formData, gameid) {
  return http.put(`http://localhost:8181/api/games/edit/${gameid}`, formData);
}
export function addGame(formData) {
  if (!formData) return;
  return http.post(`http://localhost:8181/api/games/`, formData);
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  editGame,
  addGame,
};

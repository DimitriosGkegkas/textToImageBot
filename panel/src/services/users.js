import request from "../utils/request";

export function getAllUsers(range, search) {
  const options = {
    method: "GET",
  };
  const path = "users";

  const params =
    "?range=" + JSON.stringify(range) + (search ? "&search=" + search : "");
  return request(path + params, options, true);
}

export function deleteM(id) {
  const options = {
    method: "POST",
  };
  const path = "users/delete";
  const params = "?id=" + id;
  return request(path + params, options, true);
}

export function deleteInfo(id) {
  const options = {
    method: "POST",
  };
  const path = "users/deleteInfo";
  const params = "?id=" + id;
  return request(path + params, options, true);
}

export function toggleAdmin(id) {
  const options = {
    method: "POST",
  };
  const path = "users/toggleAdmin";
  const params = "?id=" + id;
  return request(path + params, options, true);
}

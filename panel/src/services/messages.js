import request from "../utils/request";

export function getAllUsers(range) {
  const options = {
    method: "GET",
  };
  const path = "messages";
  const params = "?range=" + JSON.stringify(range);
  return request(path + params, options, true);
}

export function deleteM(id) {
  const options = {
    method: "POST",
  };
  const path = "messages/delete";
  const params = "?id=" + id;
  return request(path + params, options, true);
}

export function deleteInfo(id) {
  const options = {
    method: "POST",
  };
  const path = "messages/delete";
  const params = "?id=" + id;
  return request(path + params, options, true);
}

import request from "../utils/request";

export function authenticate(username, password) {
  const data = JSON.stringify({
    username,
    password,
  });
  console.log(data);
  const options = {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  return request("authenticate", options);
}

import request from "../utils/request";

export function load() {
  const options = {
    method: "GET",
  };
  const path = `broadcast/tags`;
  return request(path, options, true);
}

export function create(card) {
  const options = {
    method: "POST",
    body: JSON.stringify(card),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const path = `messages/create`;
  return request(path, options, true);
}

export function test(id, users) {
  const options = {
    method: "POST",
    body: JSON.stringify({ users }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const path = `broadcast/${id}/test`;
  return request(path, options, true);
}

export function send(id, filter) {
  const options = {
    method: "GET",
  };
  const path = `broadcast/${id}/send?filter=${JSON.stringify(filter)}`;
  return request(path, options, true);
}

export function estimate(filter) {
  const options = {
    method: "GET",
  };
  const path = `users/estimate?filter=${JSON.stringify(filter)}`;
  return request(path, options, true);
}

export function testUsers(filter) {
  const options = {
    method: "GET",
  };
  const path = `users/admin`;
  return request(path, options, true);
}

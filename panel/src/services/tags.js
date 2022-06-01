import request from "../utils/request";

export function addTag(id, tag) {
  const options = {
    method: "POST",
  };
  const path = "tags";
  const params = "?key=" + tag.value + "&id=" + id;
  return request(path + params, options, true);
}

export function removeTagRequest(id, tag) {
  const options = {
    method: "POST",
  };
  const path = "tags/remove";
  const params = "?key=" + tag + "&id=" + id;
  return request(path + params, options, true);
}

export function getTags() {
  const options = {
    method: "GET",
  };
  const path = "tags";
  return request(path, options, true);
}

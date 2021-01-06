export const fetchdata = async (url, { method, body, headers, ...rest }) => {
  const _method = method || "GET";
  const _body = JSON.stringify(body) || null;
  const _headers = headers || {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  let response;
  try {
    response = await fetch(url, {
      method: _method,
      body: _body,
      headers: _headers,
      ...rest,
    });
  } catch (e) {
    throw e;
  }
  return response.json();
};

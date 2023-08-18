import fetch from "node-fetch";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export const queryPost = async ({ url, data, token }) => {
  const result = await fetch(url, {
    method: "POST",
    agent,
    headers: token,
    body: JSON.stringify(data),
  });

  const content = await result.json();
  return content;
};

export const queryDelete = async ({ url, token }) => {
  const result = await fetch(url, {
    method: "DELETE",
    agent,
    headers: token,
  });
  const content = await result.json();
  return content;
};

export const queryGet = async ({ url, token }) => {
  const result = await fetch(url, {
    method: "GET",
    agent,
    headers: token,
  });
  const content = await result.json();
  return content;
};

export const queryPut = async ({ url, data, token }) => {
  const result = await fetch(url, {
    method: "PUT",
    agent,
    headers: token,
    body: JSON.stringify(data),
  });
  const content = await result.json();
  return content;
};

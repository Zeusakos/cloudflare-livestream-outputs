import assert from "assert";
import https from "https";
import fetch from "node-fetch";
import { queryGet, queryDelete, queryPost } from "./queryprovider.js";
const agent = new https.Agent({
  rejectUnauthorized: false,
});

const url = "https://example.com/api";
const token = { Authorization: "Bearer token" };
const data = { name: "John Doe", email: "johndoe@example.com" };

describe("queryprovider functions", () => {
  it("should send a POST request and return JSON for queryPost", async () => {
    const response = await queryPost({ url, data, token });
    assert.deepStrictEqual(response, { success: true });
  });

  it("should send a DELETE request and return JSON for queryDelete", async () => {
    const response = await queryDelete({ url, token });
    assert.deepStrictEqual(response, { success: true });
  });

  it("should send a GET request and return JSON for queryGet", async () => {
    const response = await queryGet({ url, token });
    assert.deepStrictEqual(response, { success: true });
  });
});

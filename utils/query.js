import { queryDelete, queryGet, queryPost, queryPut } from "./queryprovider.js";
import dotenv from "dotenv";
dotenv.config();
const urlCF = {
  createChannel: `https://api.cloudflare.com/client/v4/accounts/${process.env.CFACCOUNTID}/stream/live_inputs`,
  deleteChannel: `https://api.cloudflare.com/client/v4/accounts/${process.env.CFACCOUNTID}/stream/live_inputs`,
  createOutput: `https://api.cloudflare.com/client/v4/accounts/${process.env.CFACCOUNTID}/stream/live_inputs`,
  listOutput: `https://api.cloudflare.com/client/v4/accounts/${process.env.CFACCOUNTID}/stream/live_inputs`,
  deleteOutput: `https://api.cloudflare.com/client/v4/accounts/${process.env.CFACCOUNTID}/stream/live_inputs`,
  updateOutput: `https://api.cloudflare.com/client/v4/accounts/${process.env.CFACCOUNTID}/stream/live_inputs`,
};
const token = {
  Authorization: process.env.CFTOKEN,
};

export const createChannel = async (postdata) => {
  const data = await queryPost({
    url: urlCF.createChannel,
    data: postdata,
    token,
  });

  return data;
};

export const createOutput = async (postData, cloudFlareStreamInputID) => {
  const data = await queryPost({
    url: `${urlCF.createOutput}/${cloudFlareStreamInputID}/outputs`,
    data: postData,
    token,
  });
  return data;
};

export const deleteChannel = async (cloudFlareStreamInputID) => {
  const data = await queryDelete({
    url: `${urlCF.deleteChannel}/${cloudFlareStreamInputID}`,
    token,
  });

  return data;
};

export const listOutput = async (cloudFlareStreamInputID) => {
  const data = await queryGet({
    url: `${urlCF.listOutput}/${cloudFlareStreamInputID}/outputs`,
    token,
  });
  return data;
};

export const deleteOutput = async (cloudFlareStreamInputID, outputid) => {
  const data = await queryDelete({
    url: `${urlCF.deleteOutput}/${cloudFlareStreamInputID}/outputs/${outputid}`,
    token,
  });
  return data;
};

export const updateOutput = async (
  putData,
  cloudFlareStreamInputID,
  outputid
) => {
  const data = await queryPut({
    url: `${urlCF.updateOutput}/${cloudFlareStreamInputID}/outputs/${outputid}`,
    data: putData,
    token,
  });
  return data;
};

export const forwardPost = async (posturi, data) => {
  const content = await queryPost({ url: posturi, data });
  return content;
};
export const forwardDelete = async (posturi, data) => {
  const content = await queryPost({ url: posturi, data });
  return content;
};

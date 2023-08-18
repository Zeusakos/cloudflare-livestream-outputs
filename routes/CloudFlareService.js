import express from "express";
import https from "https";
import {
  createChannel,
  forwardPost,
  deleteChannel,
  forwardDelete,
  createOutput,
  listOutput,
  deleteOutput,
  updateOutput,
} from "../utils/query.js";

const router = express.Router();
const agent = new https.Agent({
  rejectUnauthorized: false,
});

router.post("/createLiveInput", async (req, res, err) => {
  const postData = {
    name: req.body.name,
    recording: { mode: "automatic", timeoutSeconds: 60 },
  };
  const data = await createChannel(postData);
  var ID = postData.name;
  var cloudFlareStreamInputID = data.result.uid;
  var ExternalServerRTMP = data.result.rtmps.url;
  var ExternalServerStreamName = data.result.rtmps.streamKey;
  var ExternalStreamingURL = `https://cloudflarestream.com/${cloudFlareStreamInputID}/manifest/video.m3u8?clientBandwidthHint=10`;

  var DataReloaded = {
    ID: ID,
    cloudFlareStreamInputID: cloudFlareStreamInputID,
    ExternalServerRTMP: ExternalServerRTMP,
    ExternalServerStreamName: ExternalServerStreamName,
    ExternalStreamingURL: ExternalStreamingURL,
  };

  res.send(DataReloaded);
  console.log(DataReloaded);
});

router.post("/deleteLiveInput", async (req, res, err) => {
  const posturi = req.body.posturi;
  const ID = req.body.ID;
  console.log(ID);
  console.log(posturi);
  const cloudFlareStreamInputID = req.body.cloudFlareStreamInputID;
  console.log(cloudFlareStreamInputID);
  const data = await deleteChannel(cloudFlareStreamInputID);
  console.log(data);

  const deleteThis = {
    ID: ID,
    cloudFlareStreamInputID: cloudFlareStreamInputID,
  };

  res.send(deleteThis);
  console.log(deleteThis);
});

router.post("/createOutput", async (req, res, err) => {
  const postUrl = req.body.postUrl;
  const streamKey = req.body.streamKey;
  const cloudFlareStreamInputID = req.body.cloudFlareStreamInputID;
  const postData = {
    url: postUrl,
    streamKey: streamKey,
  };
  const data = await createOutput(postData, cloudFlareStreamInputID);
  res.send(data);
  console.log(data);
});

router.get("/listOutput/:id", async (req, res, err) => {
  const cloudFlareStreamInputID = req.params.id;
  const data = await listOutput(cloudFlareStreamInputID);
  res.send(data.result);
});

router.post("/deleteOutput", async (req, res, err) => {
  const cloudFlareStreamInputID = req.body.cloudFlareStreamInputID;
  const outputid = req.body.OutputId;
  const data = await deleteOutput(cloudFlareStreamInputID, outputid);
  console.log(data);
  res.send(data);
});

router.put("/updateOutput", async (req, res, err) => {
  const enabled = req.body.enabled;
  const cloudFlareStreamInputID = req.body.cloudFlareStreamInputID;
  const outputid = req.body.OutputId;
  const putData = {
    enabled: enabled,
  };
  const data = await updateOutput(putData, cloudFlareStreamInputID, outputid);
  console.log(data);
  res.send(data);
});

export default router;

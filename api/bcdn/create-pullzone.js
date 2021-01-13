import Status from 'http-status-codes';
import verifyToken from "../auth/firebase.js";
import {
  createPullzone
} from "./lib/bcdn.js";
import fetch from "node-fetch";

export default async (req, res) => {

  if (!process.env.BCDN_KEY) {
    return res.status(Status.BAD_REQUEST).send('Environment variable not set');
  } else if (req.method !== 'POST') {
    return res.status(Status.BAD_REQUEST).send('Only POST method is allowed');
  } else {

    const token = req.headers.authorization;

    verifyToken(token).then(function(userid) {

      createPullzone(userid).then(function(result) {
        if (result.ok) {
          res.json({
            ok: true,
            msg: result.msg,
            url: result.url
          })
        } else {
          res.json({
            ok: false,
            msg: result.msg
          })
        }
      });

    }).catch(function(error) {
      console.error(error);
      res.json({
        ok: false,
        msg: 'Invalid token'
      })
    });
  }
}
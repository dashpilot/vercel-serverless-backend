import Status from 'http-status-codes';
import verifyToken from "../auth/firebase.js";
import {
  purgeCache
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

      purgeCache(userid).then(function(result) {

        res.json({
          ok: true,
          msg: "Purged cache"
        })

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
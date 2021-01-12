import verifyToken from "./lib/firebase.js";
import {
  purgeCache
} from "./lib/bcdn.js";
import fetch from "node-fetch";

export default async (req, res) => {

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
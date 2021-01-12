import verifyToken from "./lib/firebase.js";
import {
  createPullzone
} from "./lib/bcdn.js";
import fetch from "node-fetch";

export default async (req, res) => {

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
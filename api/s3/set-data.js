import Status from 'http-status-codes';
import verifyToken from "../auth/firebase.js";
import {
  setData
} from "./lib/s3.js";

export default async (req, res) => {

  if (!process.env.S3_SECRET) {
    return res.status(Status.BAD_REQUEST).send('Environment variable not set');
  } else if (req.method !== 'POST') {
    return res.status(Status.BAD_REQUEST).send('Only POST method is allowed');
  } else {

    const token = req.headers.authorization;
    const path = req.body.path;
    const type = req.body.type;
    const content = req.body.content;

    verifyToken(token).then(function(userid) {

      setData(userid + '/' + path, type, content).then(function(result) {
        res.json({
          ok: true,
          msg: result.msg
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
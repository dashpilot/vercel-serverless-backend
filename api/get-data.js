import verifyToken from "./lib/firebase.js";
import {
  getData
} from "./lib/s3.js";

export default async (req, res) => {

  const token = req.headers.authorization;
  const path = req.body.path;
  const type = req.body.type;
  const content = req.body.content;

  verifyToken(token).then(function(userid) {

    getData(userid + '/' + path).then(function(result) {
      res.json({
        ok: true,
        msg: result.msg,
        userid: userid
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
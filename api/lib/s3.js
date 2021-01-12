const fetch = require("node-fetch");
const AWS = require("aws-sdk");

// Configure client for use with S3
const endpoint = new AWS.Endpoint(process.env.S3_ENDPOINT);
const s3 = new AWS.S3({
  endpoint: endpoint,
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
});

const setData = async function(path, type, content) {

  var response = {};

  // check data types
  if (type == "json" && !isJson(JSON.stringify(content))) {
    response.ok = false;
    response.msg = "Invalid json object";
  } else if (type == "img" && !isImg(content)) {
    response.ok = false;
    response.msg = "Invalid image";
  } else {

    var params = {
      Bucket: process.env.S3_BUCKET,
      Key: path,
      ContentType: "application/json",
      ACL: "public-read",
    };

    if (type == "json") {
      params.Body = JSON.stringify(content)
      params.ContentType = "application/json"
    } else if (type == "html") {
      params.Body = content
      params.ContentType = "text/html"
    } else if (type == "image") {
      let base64 = content;
      let base64data = new Buffer.from(
        base64.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      let imgtype = base64.split(";")[0].split("/")[1];
      const filename =
        "/img/" +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        "." +
        imgtype;
      params.Body = base64data
      params.ContentType = `image/${imgtype}`
      params.ContentEncoding = "base64"
      params.Key = filename
    }

    console.log(params);

    try { // You should always catch your errors when using async/await
      const s3Response = await s3.putObject(params).promise();
      response.ok = true;
      response.msg = "Saved to S3";
      response.filename = "https://" + process.env.S3_BUCKET + "." + process.env.S3_ENDPOINT + "/" + params.Key
    } catch (e) {
      console.log(e);
      response.ok = false;
      response.msg = "Error while saving";
    }

  }

  return response;

}

const getData = async function(path) {

  var response = {};

  var params = {
    Bucket: process.env.S3_BUCKET,
    Key: path
  };

  try {
    const s3Response = await s3.getObject(params).promise();
    response.ok = true;
    response.msg = s3Response.Body.toString('utf-8')

  } catch (e) {
    console.log(e);
    response.ok = false;
    response.msg = e;
  }

  return response

}

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function isImg(str) {
  try {
    window.atob(str);
  } catch (e) {
    return false;
  }
  return true;
}

export {
  setData,
  getData
};
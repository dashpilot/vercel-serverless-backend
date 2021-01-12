const fetch = require("node-fetch");

const createPullzone = async function(userid) {

  var params = {
    "Name": "bb-" + userid,
    "Type": 0,
    "OriginUrl": "https://local-dev.website-eu-central-1.linodeobjects.com/" + userid + "/"
  }

  let resp = await fetch("https://bunnycdn.com/api/pullzone", {
    headers: {
      AccessKey: process.env.BCDN_KEY,
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(params)
  });
  let status = await resp.json();

  if ('Message' in status) {
    let msg = {
      ok: false,
      msg: status.Message
    }
    return msg;
  } else {
    let msg = {
      ok: true,
      msg: status.Message,
      url: 'https://bb-' + userid + '.b-cdn.net'
    }
    return msg;
  }

}


const purgeCache = async function(userid) {

  const url = encodeURIComponent(`https://bb-${userid}.b-cdn.net`)
  let resp = await fetch(`https://bunnycdn.com/api/purge?url=${url}`, {
    headers: {
      AccessKey: process.env.BCDN_KEY,
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: "",
  });
  let status = await resp.text();

  let msg = {
    ok: true,
    msg: "Purged cache"
  }
  return msg;

}

export {
  createPullzone,
  purgeCache
}
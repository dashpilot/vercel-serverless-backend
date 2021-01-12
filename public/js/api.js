function setData() {

  let content = {};
  content.title = "Hello World";
  content.body = "This is some test content";

  let opts = {};
  opts.path = "test.json";
  opts.type = "json";
  opts.content = content;
  call_api('set-data', opts).then(function(res) {
    if (res.ok) {
      console.log(res.msg);
    } else {
      console.log('An error occured' + res);
    }
  });
}

function getData() {
  let opts = {};
  opts.path = "test.json";
  call_api('get-data', opts).then(function(res) {
    if (res.ok) {
      console.log(res.msg);
    } else {
      console.log('An error occured: ' + res);
    }
  });
}


function createPullZone() {
  let opts = {};
  call_api('create-pullzone', opts).then(function(res) {
    if (res.ok) {
      console.log(res.msg);
      console.log(res.url);
    } else {
      console.log('An error occured: ' + res);
    }
  });
}

function purgeCache() {
  let opts = {};
  call_api('purge-cache', opts).then(function(res) {
    if (res.ok) {
      console.log(res.msg);
    } else {
      console.log('An error occured: ' + res);
    }
  });
}

async function call_api(route, mydata) {

  try {
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    var settings = {
      method: 'post',
      body: JSON.stringify(mydata),
      headers: {
        'Authorization': idToken,
        'Content-Type': 'application/json'
      }
    };
    try {
      const fetchResponse = await fetch('/api/' + route, settings);
      const result = await fetchResponse.json();
      return result;
    } catch (e) {
      return e;
    }

  } catch (e) {
    console.log("Not signed in");
    return "User is not signed in.";
  }

}
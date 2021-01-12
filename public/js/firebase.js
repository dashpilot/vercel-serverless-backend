var firebaseConfig = {
  apiKey: "AIzaSyDS4TxNhPNXEGdVFLzGhVAo4yriJ5Ws3ww",
  authDomain: "dashpilot-c0247.firebaseapp.com",
  projectId: "dashpilot-c0247"
};
firebase.initializeApp(firebaseConfig);

var provider = new firebase.auth.GoogleAuthProvider();

function login() {

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;

      // The signed-in user info.
      var user = result.user;
      console.log('Signed in');

      document.querySelector('#logIn').style.display = 'none';
      document.querySelector('#loggedIn').style.display = 'block';

    }).catch((error) => {
      console.log(error);
    });

}

function logout() {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log('Signed out');
    document.querySelector('#logIn').style.display = 'block';
    document.querySelector('#loggedIn').style.display = 'none';
  }).catch((error) => {
    console.log(error);
  });
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    //console.log(user);
    user.getIdToken().then(function(idToken) {
      //console.log(idToken); // It shows the Firebase token now
      console.log('Signed in');
      document.querySelector('#logIn').style.display = 'none';
      document.querySelector('#loggedIn').style.display = 'block';
    });

  } else {
    console.log('User not signed in');
  }
});
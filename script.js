/* Firebase Connectivity */


   const firebaseConfig = {
    apiKey: "AIzaSyDpU2yGsv4Mk-a4S5UGm9VY7jRGV5R62z8",
    authDomain: "emergiboat-6859e.firebaseapp.com",
    databaseURL: "https://emergiboat-6859e-default-rtdb.firebaseio.com",
    projectId: "emergiboat-6859e",
    storageBucket: "emergiboat-6859e.appspot.com",
    messagingSenderId: "1053267410345",
    appId: "1:1053267410345:web:730e95158f5632691a18b8"
  };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const databse = firebase.database();



const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct");
const signupEmailIn = document.getElementById("email-signup");
const usernameIn = document.getElementById("username-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");
const forgetBtn = document.querySelector(".forget-btn");

// const returnBtn = document.getElementById("return-btn");

var email,
  password,
  signupEmail,
  signupPassword,
  confirmSignUpPassword,
  username,
  userId;

createacctbtn.addEventListener("click", function () {
  /* Sign-up Form Validation */
  var isVerified = true;
  signupEmail = signupEmailIn.value;

  signupPassword = signupPasswordIn.value;
  confirmSignUpPassword = confirmSignUpPasswordIn.value;
  if (signupPassword != confirmSignUpPassword) {
    window.alert("Password fields do not match. Try again.");
    isVerified = false;
  }

  username = usernameIn.value;
  if (
    signupEmail == null ||
    signupPassword == null ||
    confirmSignUpPassword == null
  ) {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }

  if (isVerified) {
    auth
      .createUserWithEmailAndPassword(signupEmail, signupPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log("Success! Account created.");
        sessionStorage.setItem("userId", auth.currentUser.uid);
        // console.log(auth.currentUser.uid);
        databse
          .ref("/Users/" + auth.currentUser.uid)
          .set({
            Basic_info: {
              email_id: signupEmail,
              user_name: username,
            },
          })
          .then((res) => {
            console.log("Data added to database.");
            location.replace("./dashboard.html");
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage);
        window.alert("Error occurred. ErrorCode ", errorCode);
      });
  }
});

submitButton.addEventListener("click", function () {
  email = emailInput.value;
  password = passwordInput.value;
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      sessionStorage.setItem("userId", auth.currentUser.uid);
      console.log("Success! Welcome back!");
      // window.alert("Success! Welcome back!");
      location.replace("./dashboard.html");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      window.alert("Error occurred. ErrorCode ", errorCode);
    });
});

// reseting password
forgetBtn.addEventListener("click", function () {
  email = emailInput.value;
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      window.alert("Password reset email sent, check your inbox. ");
    })
    .catch((error) => {
      window.alert(error);
    });
});

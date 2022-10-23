import "./styles.css";

let uname = document.querySelector("#uname");

let pwd = document.querySelector("#pwd");

let loginBtn = document.querySelector("#login");

loginBtn.addEventListener("click", function () {

  let lsUName = JSON.parse(localStorage.getItem("user"))?.uname;

  let lsPwd = JSON.parse(localStorage.getItem("user"))?.pwd;

  let msg = document.querySelector("#msg");

  console.log(lsUName === uname.value, lsUName, lsPwd, uname.value);

  if (lsUName === uname.value && lsPwd === pwd.value) {

    window.location.assign("resume-page.html");
  } else {
    msg.style.color = "red";

    msg.innerHTML = "Invalid user name and password";
  }
  
});

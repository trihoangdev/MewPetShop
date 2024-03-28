//Tham chiếu đến các thẻ
const registerLink = document.getElementById("register-link");
const loginLink = document.getElementById("login-link");
const showHidePasswordLogin = document.getElementById("show-hide-pass-login");
const showHidePasswordRegister = document.getElementById(
  "show-hide-pass-register"
);
const showHidePasswordRegisterAgain = document.getElementById(
  "show-hide-pass-register-again"
);
const passwordFieldLogin = document.querySelector(
  '.login-form .input-box input[type="password"]'
);
const passwordFieldRegister = document.querySelector(
  '.register-form .input-box input[type="password"]'
);
const passwordFieldAgainRegister = document.getElementById(
  "input-password-again"
);

registerLink.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".login-form").style.transform = "rotateY(180deg)";
  document.querySelector(".register-form").style.transform = "rotateY(0deg)";
  //Điều chỉnh wrapper
  let wrapperElement = document.querySelector(".wrapper");
  if (wrapperElement) {
    wrapperElement.style.height = "550px";
  } else {
    console.log('Phần tử với class "wrapper" không tồn tại trong tài liệu.');
  }
  //Điều chỉnh title
  document.title = "Đăng ký";
});

loginLink.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".login-form").style.transform = "rotateY(0deg)";
  document.querySelector(".register-form").style.transform = "rotateY(180deg)";
  //Điều chỉnh wrapper
  let wrapperElement = document.querySelector(".wrapper");
  if (wrapperElement) {
    wrapperElement.style.height = "500px";
  } else {
    console.log('Phần tử với class "wrapper" không tồn tại trong tài liệu.');
  }
  //Điều chỉnh title
  document.title = "Đăng nhập";
});

//tạo sự kiện cho show/hide password
showHidePasswordLogin.addEventListener("click", function () {
  // thay đổi thẻ và ẩn/hiện text
  if (showHidePasswordLogin.classList.contains("fa-lock")) {
    //Hiện text
    passwordFieldLogin.type = "text";
    showHidePasswordLogin.classList.remove("fa-lock");
    showHidePasswordLogin.classList.add("fa-unlock");
  } else {
    //ẩn text
    passwordFieldLogin.type = "password";
    showHidePasswordLogin.classList.remove("fa-unlock");
    showHidePasswordLogin.classList.add("fa-lock");
  }
});

showHidePasswordRegister.addEventListener("click", function () {
  // thay đổi thẻ và ẩn/hiện text
  if (showHidePasswordRegister.classList.contains("fa-lock")) {
    // hiện text
    passwordFieldRegister.type = "text";
    showHidePasswordRegister.classList.remove("fa-lock");
    showHidePasswordRegister.classList.add("fa-unlock");
  } else {
    // ẩn text
    passwordFieldRegister.type = "password";
    showHidePasswordRegister.classList.remove("fa-unlock");
    showHidePasswordRegister.classList.add("fa-lock");
  }
});
showHidePasswordRegisterAgain.addEventListener("click", function () {
  // thay đổi thẻ và ẩn/ hiện text
  if (showHidePasswordRegisterAgain.classList.contains("fa-lock")) {
    //hiện text
    passwordFieldAgainRegister.type = "text";
    showHidePasswordRegisterAgain.classList.remove("fa-lock");
    showHidePasswordRegisterAgain.classList.add("fa-unlock");
  } else {
    //Ẩn text
    passwordFieldAgainRegister.type = "password";
    showHidePasswordRegisterAgain.classList.remove("fa-unlock");
    showHidePasswordRegisterAgain.classList.add("fa-lock");
  }
});

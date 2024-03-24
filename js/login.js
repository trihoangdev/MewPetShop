const registerLink = document.getElementById("register-link");
const loginLink = document.getElementById("login-link");

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

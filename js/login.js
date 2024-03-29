//Lấy danh sách các tài khoản hiện có trong Local Storage
var accounts = JSON.parse(localStorage.getItem("accounts"));
if (accounts == null) {
  accounts = [];
}

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
const accountFieldRegister = document.getElementById("account-field-register");
const accountFieldLogin = document.getElementById("account-field-login");
const errorAccLogin = document.getElementById("error-acc-login");
const errorPassLogin = document.getElementById("error-pass-login");
const errorAccRegister = document.getElementById("error-acc-register");
const errorPassRegister = document.getElementById("error-pass-register");
const errorPassAgainRegister = document.getElementById(
  "error-pass-again-register"
);
const btnRegister = document.getElementById("btn-register");
const btnLogin = document.getElementById("btn-login");

//Sự kiện kích hoạt lật thẻ
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
// End sự kiện kích hoạt lật thẻ

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
//End tạo sự kiện cho show/hide password

//Gán sự kiện check sau khi nhập đk tài khoản
accountFieldRegister.addEventListener("change", function () {
  var acc = accountFieldRegister.value;
  var accountExists = false;
  for (var i = 0; i < accounts.length; i++) {
    if (accounts[i].username == acc) {
      accountExists = true;
      break; // Kết thúc vòng lặp khi tìm thấy tài khoản
    }
  }
  if (accountExists) {
    errorAccRegister.innerHTML = "Tên tài khoản đã tồn tại";
    errorAccRegister.parentNode.style.marginBottom = "40px";
  } else {
    console.log("Tên tài khoản chưa tồn tại");
    errorAccRegister.innerHTML = ""; // Xóa thông báo lỗi nếu tài khoản hợp lệ
    errorAccRegister.parentNode.style.marginBottom = "0px";
  }
});

//Gán sự kiện check sau khi mật khẩu đã được nhập có đúng định dạng ko
passwordFieldRegister.addEventListener("change", function () {
  checkPassword(errorPassRegister, passwordFieldRegister);
  checkPasswordMatches(passwordFieldRegister, passwordFieldAgainRegister);
});
passwordFieldAgainRegister.addEventListener("change", function () {
  checkPassword(errorPassAgainRegister, passwordFieldAgainRegister);
  checkPasswordMatches(passwordFieldRegister, passwordFieldAgainRegister);
});
passwordFieldLogin.addEventListener("change", function () {
  checkPassword(errorPassLogin, passwordFieldLogin);
});

//Kiểm tra định dạng của password
function checkPassword(error, field) {
  var pass = field.value;
  if (!isPasswordCorrect(pass)) {
    error.innerHTML =
      "Mật khẩu phải có ít nhất 8 ký tự, 1 chữ cái, 1 chữ số, một ký tự đặc biệt";
    error.parentNode.style.marginBottom = "60px";
  } else {
    error.innerHTML = "";
    error.parentNode.style.marginBottom = "30px";
  }
}
//Kiểm tra mật khẩu đúng định dạng
function isPasswordCorrect(pass) {
  var regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?@ "]).{8,}$/;
  return regex.test(pass);
}

//Mật khẩu có trùng khớp ko
function checkPasswordMatches(pass, passAgain) {
  var passStr = "";
  var passAgainStr = "";

  // Kiểm tra nếu pass và passAgain là các input elements
  if (pass.tagName.toLowerCase() === "input") passStr = pass.value;
  else passStr = pass.textContent;

  if (passAgain.tagName.toLowerCase() === "input")
    passAgainStr = passAgain.value;
  else passAgainStr = passAgain.textContent;

  console.log(passStr);
  console.log(passAgainStr);
  if (passStr != passAgainStr) {
    errorPassAgainRegister.innerHTML = "Mật khẩu không trùng khớp";
    errorPassAgainRegister.parentNode.style.marginBottom = "40px";
  } else {
    errorPassAgainRegister.innerHTML = "";
    errorPassAgainRegister.parentNode.style.marginBottom = "30px";
  }
}

//Sự kiện đăng ký tài khoản
btnRegister.addEventListener("click", function () {
  var passStr = "";
  if (passwordFieldRegister.tagName.toLowerCase() === "input")
    passStr = passwordFieldRegister.value;
  else passStr = passwordFieldRegister.textContent;
  //tạo ra đói tượng mới để thêm vào mảng
  var newAcc = {
    username: `${accountFieldRegister.value}`,
    pass: `${passStr}`,
  };
  accounts.push(newAcc);
  //Ghi vào LocalStorage
  localStorage.setItem("accounts", JSON.stringify(accounts));
  alert("Đăng ký thành công! Vui lòng đăng nhập để mua hàng!");
});

//Sự kiện đăng nhập tài khoản
btnLogin.addEventListener("click", function () {
  var username = accountFieldLogin.value;
  var password = "";
  var success = false;
  if (passwordFieldLogin.tagName.toLowerCase() === "input")
    password = passwordFieldLogin.value;
  else password = passwordFieldLogin.textContent;
  accounts.forEach((element) => {
    if (element.username == username && element.pass == password) {
      success = true;
      return;
    }
  });
  if (success) {
    alert("Đăng nhập thành công!");
    window.location.href = "../index.html";
  } else alert("Tài khoản hoặc mật khẩu không chính xác!");
});

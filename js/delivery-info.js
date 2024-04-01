import cityData from "../data/country.json" with { type: "json" };

//Lấy tham chiếu đến các thẻ
var citySelect = document.getElementById("city");
var quantityInCart = document.getElementById("quantity-in-cart");
var phoneNumber = document.getElementById("phoneNumber");
var errorPhone = document.getElementById("error-phone");
var email = document.getElementById("email");
var errorEmail = document.getElementById("error-email");
var submitBtn = document.getElementById("submit");
var fullName = document.getElementById("fullName");
var deliveryMethod = "delivery-method"; // Tên của nhóm radio button
var deliveryWay = "delivery-way"; // Tên của nhóm radio button
var paymentMethod = "payment-method"; // Tên của nhóm radio button
//Load DOM
document.addEventListener("DOMContentLoaded", function () {
  onLoad();
  document.getElementById("city").addEventListener("change", changeDistrict);
  document.getElementById("district").addEventListener("change", changeWard);
  loadQuantityInCart();
});

//Các sự kiện
//Biến dùng kiểm tra all thông tin hợp lệ
var checkAll = true;
//Sự kiện kiểm tra định dạng SĐT
phoneNumber.addEventListener("change", function () {
  var phoneTxt = phoneNumber.value;
  if (/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})/.test(phoneTxt) == false) {
    //sai định dạng
    checkAll = false;
    //Gán error
    errorPhone.innerHTML = "SĐT không đúng định dạng!";
  } else {
    phoneNumber.style.backgroundColor = "white";
    errorPhone.innerHTML = "";
    checkAll - true;
  }
});
//Sự kiện kiểm tra định dạng Email
email.addEventListener("change", function () {
  var emailTxt = email.value;
  var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (regex.test(emailTxt) == false) {
    //sai định dạng
    checkAll = false;
    //Gán error
    errorEmail.innerHTML = "Email không đúng định dạng!";
  } else {
    phoneNumber.style.backgroundColor = "white";
    errorEmail.innerHTML = "";
    checkAll - true;
  }
});
//Sự kiện xác nhận thanh toán
submitBtn.addEventListener("click", function () {
  checkAllInfoFilled();
  if (!checkAll) {
    alert("Thông tin cần được nhập đầy đủ và đúng định dạng");
  }
  //Lưu giá tiền ship vào LocalStorage
  var shipPrice = saveShipPrice();
  localStorage.setItem("shipPrice" , shipPrice);
  alert("Cập nhật thông tin thành công!");
});

//Lấy giá tiền ship
function saveShipPrice() {
  var shipPrice = 0;
  var deliveryMethods = document.getElementsByName(deliveryMethod);
  for (var i = 0; i < deliveryMethods.length; i++) {
    if (deliveryMethods[i].checked) {
      // Tìm đến phần tử block2-price từ phần tử radio button được chọn
      var block2Price = deliveryMethods[i]
        .closest(".block2-inner")
        .querySelector(".block2-price");

      if (block2Price) {
        shipPrice = unformatPrice(block2Price.innerHTML);
      }
      break; // Thoát khỏi vòng lặp sau khi đã tìm thấy giá tiền
    }
  }
  return shipPrice;
}
//Kiểm tra tất cả thông tin có còn rỗng không
function checkAllInfoFilled() {
  // Kiểm tra xem tất cả các điều kiện đã được đáp ứng hay không
  if (
    email.value != "" &&
    fullName.value != "" &&
    phoneNumber.value != "" &&
    isAnyRadioButtonChecked(deliveryWay)
  ) {
    //Nếu giao hàng tại nhà thì check xem nếu trong phương thức giao hàng chưa check thì trả về false
    //Và kiểm tra xem các ô select đã được chọn chưa
    if (document.getElementsByName(deliveryWay)[0].checked) {
      var selects = document.querySelectorAll("select"); // Lấy tất cả các thẻ select trong trang
      for (var i = 0; i < selects.length; i++) {
        if (selects[0].selectedIndex == 0) {
          console.log(selects[i].selectedIndex );
          console.log(selects[i]);
          checkAll = false; // Nếu có bất kỳ ô select nào chưa được chọn, trả về false
          return; // Ngay sau khi tìm thấy ô select chưa được chọn, thoát khỏi hàm
        }
      }
      // Nếu không có ô select nào chưa được chọn, đặt checkAll là true
      checkAll = true; 
    } else {
      // Nếu không phải giao hàng tại nhà, không cần kiểm tra ô select, đặt checkAll là true
      checkAll = true;
    }
    
    // Kiểm tra xem phương thức giao hàng đã được chọn hay không
    if (isAnyRadioButtonChecked(deliveryMethod)) {
      checkAll = true;
    } else {
      checkAll = false;
    }
  } else {
    // Một trong các điều kiện không được đáp ứng, đặt checkAll thành false
    checkAll = false;
  }
}

function isAnyRadioButtonChecked(radioGroupName) {
  var radioButtons = document.getElementsByName(radioGroupName);
  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      return true; // Nếu có một radio button nào đó được chọn, trả về true
    }
  }
  return false; // Nếu không có radio button nào được chọn, trả về false
}
function readAllCity() {
  var cities = []; // Khởi tạo mảng để lưu trữ tên thành phố

  // Sử dụng vòng lặp để lấy tên thành phố từ mỗi thành phố trong cityData
  cityData.forEach(function (city) {
    cities.push(city.Name);
  });

  return cities; // Trả về mảng chứa tất cả các tên thành phố
}
function readAllDistrict(cityName) {
  var districts = []; // Khởi tạo mảng để lưu trữ tên quận

  // Tìm thành phố theo tên
  var city = cityData.find(function (city) {
    return city.Name === cityName;
  });

  // Nếu thành phố tồn tại
  if (city) {
    // Lặp qua các quận của thành phố và thêm vào mảng districts
    city.Districts.forEach(function (district) {
      districts.push(district.Name);
    });
  }

  return districts; // Trả về mảng chứa tất cả các tên quận của thành phố
}
function readAllWards(cityName, districtName) {
  var wards = []; // Khởi tạo mảng để lưu trữ tên các phường

  // Tìm thành phố theo tên
  var city = cityData.find(function (city) {
    return city.Name === cityName;
  });

  // Nếu thành phố tồn tại
  if (city) {
    // Tìm quận theo tên trong thành phố
    var district = city.Districts.find(function (district) {
      return district.Name === districtName;
    });

    // Nếu quận tồn tại
    if (district) {
      // Lặp qua các phường của quận và thêm vào mảng wards
      district.Wards.forEach(function (ward) {
        wards.push(ward.Name);
      });
    }
  }
  return wards; // Trả về mảng chứa tất cả các tên phường của quận
}
function onLoad() {
  var cities = readAllCity(); // Đọc tất cả các thành phố
  cities.forEach(function (cityName) {
    var option = document.createElement("option"); // Tạo một option mới
    option.text = cityName; // Đặt giá trị văn bản của option là tên thành phố
    option.value = cityName; // Đặt giá trị của option là tên thành phố
    citySelect.appendChild(option); // Thêm option vào phần tử select
  });
}
function changeDistrict() {
  var cityName = document.getElementById("city").value; // Lấy tên thành phố được chọn

  var districts = readAllDistrict(cityName); // Lấy danh sách các quận của thành phố đã chọn

  // Tạo các option cho phần tử select của quận
  var districtSelect = document.getElementById("district");
  districtSelect.innerHTML = "---Chọn quận/huyện---"; // Xóa các option cũ

  districts.forEach(function (districtName) {
    var option = document.createElement("option"); // Tạo một option mới
    option.text = districtName; // Đặt giá trị văn bản của option là tên quận
    option.value = districtName; // Đặt giá trị của option là tên quận
    districtSelect.appendChild(option); // Thêm option vào phần tử select của quận
  });
  changeWard();
}
function changeWard() {
  var cityName = document.getElementById("city").value; // Lấy tên thành phố được chọn
  var districtName = document.getElementById("district").value; //Lấy tên quận được chọn

  var wards = readAllWards(cityName, districtName);

  // Tạo các option cho phần tử select của phường
  var wardSelect = document.getElementById("ward");
  wardSelect.innerHTML = "---Chọn phường/xã---"; //Xoá các option cũ

  wards.forEach(function (wardName) {
    var option = document.createElement("option"); // Tạo một option mới
    option.text = wardName; // Đặt giá trị văn bản của option là tên phường
    option.value = wardName; // Đặt giá trị của option là tên phường
    wardSelect.appendChild(option); // Thêm option vào phần tử select của phường
  });
}
function loadQuantityInCart() {
  var currentQuantity = 0;

  // Lấy giá trị từ localStorage
  var productInCart = JSON.parse(localStorage.getItem("productInCart"));

  // Kiểm tra nếu quantityInCart không tồn tại hoặc là null, thiết lập giá trị mặc định là 0 và lưu vào localStorage
  if (!productInCart) {
    currentQuantity = 0;
  } else {
    var length = productInCart.length;
    currentQuantity = length;
  }

  //truyền thông tin từ local storage vào các thẻ
  quantityInCart.innerHTML = currentQuantity;
}
function formatPrice(price) {
  // Chuyển số thành chuỗi và thêm dấu chấm phẩy sau mỗi 3 chữ số từ cuối lên
  let formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // Thêm ký tự 'đ' vào cuối chuỗi
  formattedPrice += "đ";
  return formattedPrice;
}
function unformatPrice(formattedPrice) {
  // Xóa ký tự 'đ' cuối chuỗi
  let priceWithoutSymbol = formattedPrice.replace(/đ/g, "");
  // Xóa tất cả các dấu chấm phẩy trong chuỗi
  let priceWithoutCommas = priceWithoutSymbol.replace(/\./g, "");
  // Chuyển chuỗi thành số
  let unformattedPrice = parseFloat(priceWithoutCommas);
  return unformattedPrice;
}

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
//Load DOM
document.addEventListener("DOMContentLoaded", function () {
  preloadData();
  loadProductInCart();
});
function preloadData() {
  fetch("../data/country.json")
    .then((response) => response.json())
    .then((cityData) => {
      // Sử dụng dữ liệu ở đây
      console.log(cityData); // Kiểm tra xem dữ liệu đã được tải thành công chưa
      //Lưu dữ liệu vào LocalStorage
      localStorage.setItem("cityData", JSON.stringify(cityData));
      onLoad();
      document
        .getElementById("city")
        .addEventListener("change", changeDistrict);
      document
        .getElementById("district")
        .addEventListener("change", changeWard);
      loadQuantityInCart();
    })
    .catch((error) => {
      console.error("Error loading JSON file:", error);
    });
}
//Các sự kiện
//Biến dùng kiểm tra all thông tin hợp lệ
var checkAll = true;
//Sự kiện kiểm tra định dạng SĐT
phoneNumber.addEventListener("change", function () {
  var phoneTxt = phoneNumber.value;
  if (
    /^(03|05|07|08|09|01[2|6|8|9])[0-9]{8}$/.test(phoneTxt) !== true ||
    phoneTxt.length !== 10
  ) {
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
    return;
  }
  //Lưu thông tin người dùng vào LocalStorage
  var fullName = document.getElementById("fullName").value;
  var email = document.getElementById("email").value;
  var phoneNumber = document.getElementById("phoneNumber").value;
  var address = getAddress();
  var shipPrice = saveShipPrice();
  var paymentMethod = getPaymentMethod();
  var deliveryInfo = {
    fullName: fullName,
    email: email,
    phoneNumber: phoneNumber,
    address: address,
    shipPrice: shipPrice,
    paymentMethod: paymentMethod,
  };
  localStorage.setItem("deliveryInfo", JSON.stringify(deliveryInfo));
  alert("Cập nhật thông tin thành công!");
  //Chuyển đến trang xem bill
  window.location.href = "../html/bill-info.html";
});

//Lấy phương thức thanh toán
function getPaymentMethod() {
  var radioButtons = document.getElementsByName("payment-method");
  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      // Lấy nhãn của radio button tương ứng
      var label = document.querySelector(
        'label[for="' + radioButtons[i].id + '"]'
      );
      if (label) {
        return label.innerText; // Trả về văn bản trong nhãn
      }
    }
  }
  return "";
}
//Lấy địa chỉ
function getAddress() {
  if (document.getElementsByName(deliveryWay)[0].checked) {
    var address = document.getElementById("address").value;
    address +=
      ", " +
      document.getElementById("city").options[
        document.getElementById("city").selectedIndex
      ].value +
      ", ";
    address +=
      document.getElementById("district").options[
        document.getElementById("district").selectedIndex
      ].value + ", ";
    address +=
      document.getElementById("ward").options[
        document.getElementById("district").selectedIndex
      ].value;
    return address;
  } else return "";
}

//Lấy giá tiền ship
function saveShipPrice() {
  var shipPrice = 0;
  var deliveryMethods = document.getElementsByName(deliveryMethod); // Đổi tên deliveryMethod thành "deliveryMethod"
  // Lấy ra chỉ số của item được click
  var selectedIndex = -1;
  for (var i = 0; i < deliveryMethods.length; i++) {
    if (deliveryMethods[i].checked) {
      selectedIndex = i;
      break;
    }
  }
  // Xác định giá vận chuyển dựa trên chỉ số của item được click
  switch (selectedIndex) {
    case 0:
      shipPrice = 20000;
      break;
    case 1:
      shipPrice = 31000;
      break;
    case 2:
      shipPrice = 40000;
      break;
    default:
      shipPrice = 0; // Nếu không click vào item nào thì giá vận chuyển là 0
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
    //Nếu giao hàng tại nhà thì không cần kiểm tra phương thức giao hàng
    if (document.getElementsByName(deliveryWay)[0].checked) {
      var selects = document.querySelectorAll("select"); // Lấy tất cả các thẻ select trong trang
      for (var i = 0; i < selects.length; i++) {
        if (selects[0].selectedIndex == 0) {
          checkAll = false; // Nếu có bất kỳ ô select nào chưa được chọn, trả về false
          return; // Ngay sau khi tìm thấy ô select chưa được chọn, thoát khỏi hàm
        }
      }
    }

    // Kiểm tra xem phương thức giao hàng đã được chọn hay không
    if (
      !document.getElementsByName(deliveryWay)[0].checked ||
      isAnyRadioButtonChecked(deliveryMethod)
    ) {
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
  var cityData = JSON.parse(localStorage.getItem("cityData"));
  var cities = []; // Khởi tạo mảng để lưu trữ tên thành phố

  // Sử dụng vòng lặp để lấy tên thành phố từ mỗi thành phố trong cityData
  cityData.forEach(function (city) {
    cities.push(city.Name);
  });

  return cities; // Trả về mảng chứa tất cả các tên thành phố
}
function readAllDistrict(cityName) {
  var cityData = JSON.parse(localStorage.getItem("cityData"));
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
  var cityData = JSON.parse(localStorage.getItem("cityData"));
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
  // Chuyển số thành chuỗi với định dạng tiền tệ
  let formattedPrice = Number(price).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formattedPrice;
}
function unformatPrice(formattedPrice) {
  // Loại bỏ ký tự '₫' cuối chuỗi
  let priceWithoutSymbol = formattedPrice.replace("₫", "");
  // Loại bỏ tất cả các dấu chấm và dấu phẩy trong chuỗi
  let priceWithoutCommas = priceWithoutSymbol.replace(/[,.]/g, "");
  // Chuyển chuỗi thành một số
  let unformattedPrice = parseFloat(priceWithoutCommas);
  return unformattedPrice;
}

//Phương trình load các sản phẩm trong giỏ hàng lên
function loadProductInCart() {
  //Lấy dữ liệu từ LocalStorage
  let productInCart = JSON.parse(localStorage.getItem("productInCart"));

  var html = "";
  for (var i = 0; i < productInCart.length; i++) {
    html += `<div class="item">
    <img src="../${productInCart[i].src}" alt="" />
    <div class="content">
      <h2 class="title">${productInCart[i].title}</h2>
      <p class="price">Giá: ${formatPrice(productInCart[i].price)}</p>
      <div class="quantity-box">
        <p class="quantity"> SL: <span id="quantity">${
          productInCart[i].quantity
        }</span></p>
        <p class="price">Thành tiền: <span id="totalPrice">${formatPrice(
          productInCart[i].price * productInCart[i].quantity
        )}</span></p>
      </div>
    </div>
  </div>
  <hr />`;
  }
  //Hiển thị thông tin
  document.getElementById("cart-product-list").innerHTML = html;
}

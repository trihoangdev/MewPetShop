import cityData from "../data/country.json" with { type: "json" };

var citySelect = document.getElementById("city");

//Load DOM
document.addEventListener("DOMContentLoaded", function () {
  onLoad();
  document.getElementById("city").addEventListener("change", changeDistrict);
  document.getElementById("district").addEventListener("change", changeWard);
  loadQuantityInCart();
});

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
  var quantityInCart = JSON.parse(localStorage.getItem("productInCart").length);
  console.log(productInCart);
  document.getElementById("quantity-in-cart").innerHTML = quantityInCart;
}

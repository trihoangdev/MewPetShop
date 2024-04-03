//Lưu local storage
import productListData from "../data/product-list.json" with { type: "json" };
localStorage.setItem('productList', JSON.stringify(productListData));
document.addEventListener("DOMContentLoaded", function () {
  onLoad();
  loadQuantityInCart();
  //lấy tham chiếu đến các thẻ để đẩy data
  var products = document.querySelectorAll(".product-item");
  openProductDetail(products);
});
//Lấy mã trang đang có trong localStorage
var idPage = JSON.parse(localStorage.getItem("idPageProduct"));
function getCategory() {
  return idPage;
}
//Lấy dữ liệu từ local storage
var productObj = JSON.parse(localStorage.getItem("productList"));

function onLoad() {
  var productHTML = "";
  //Ghi dữ liệu từ localStorage vào các biến
  for (var i = 0; i < productObj.length; i++) {
    if (productObj[i].category == getCategory()) {
      productHTML += `<div class="product-item" id="product-item${i}">
      <img src="../${productObj[i].src}" alt="Sản phẩm" />
      <p class="product-item-tittle">${productObj[i].title}</p>
      <p class="product-item-price">${formatPrice(productObj[i].price)}</p>
    </div>`;
    }
  }
  document.getElementById("product-list").innerHTML = productHTML;
  //Set tiêu đề trang
  switch (idPage) {
    case "dog-food": {
      document.querySelector("h1").innerHTML = "Hạt cho chó";
      break;
    }
    case "dog-snack": {
      document.querySelector("h1").innerHTML = "Snack, xương gặm cho chó";
      break;
    }
    case "cat-food": {
      document.querySelector("h1").innerHTML = "Hạt cho mèo";
      break;
    }
    case "cat-pate": {
      document.querySelector("h1").innerHTML = "Pate cho mèo";
      break;
    }
    case "balo": {
      document.querySelector("h1").innerHTML = "Balo vận chuyển";
      break;
    }
    case "pet-bed": {
      document.querySelector("h1").innerHTML = "Ổ đệm, giường";
      break;
    }
  }
}
function formatPrice(price) {
  // Chuyển số thành chuỗi và thêm dấu chấm phẩy sau mỗi 3 chữ số từ cuối lên
  let formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // Thêm ký tự 'đ' vào cuối chuỗi
  formattedPrice += "đ";
  return formattedPrice;
}
var quantityInCart = 0;
function loadQuantityInCart() {
  // Lấy giá trị từ localStorage
  var productInCart = JSON.parse(localStorage.getItem("productInCart"));
  // Kiểm tra nếu quantityInCart không tồn tại hoặc là null, thiết lập giá trị mặc định là 0 và lưu vào localStorage
  if (!productInCart) {
    quantityInCart = 0;
  } else {
    var length = productInCart.length;
    quantityInCart = length;
  }
  document.getElementById("quantity-in-cart").innerHTML = quantityInCart;
}
function openProductDetail(products) {
  //set sự kiện chuyển trang cho các thẻ div
  products.forEach((item) => {
    item.addEventListener("click", function () {
      //Lưu thông tin vào local storage để truy xuất
      //lấy title và thẻ div đang được dùng
      var divId = item.getAttribute("id");
      console.log(divId);
      var id = divId.match(/\d+$/)[0]; //Lấy id của thẻ đang dùng
      console.log(id);
      //Tìm kiếm
      for (var i = 0; i < products.length; i++) {
        if (productObj[i].id == id) {
          localStorage.setItem("currentProduct", JSON.stringify(productObj[i]));
          break;
        }
      }

      //Chuyển trang
      window.location.href = "../html/product-detail.html";
    });
  });
}

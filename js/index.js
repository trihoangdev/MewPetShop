//Lưu local storage
// import productData from "../data/product.json" with { type: "json" };
//localStorage.setItem('products', JSON.stringify(productData));

document.addEventListener("DOMContentLoaded", function () {
  onLoad();
  loadQuantityInCart();
  saveTitleProduct();
});
//Lấy dữ liệu từ local storage
var productObj = JSON.parse(localStorage.getItem("products"));

//lấy tham chiếu đến các thẻ để đẩy data
var products = document.querySelectorAll(".product-item");

function onLoad() {
  //Ghi dữ liệu từ localStorage vào các biến
  for (var i = 0; i < products.length; i++) {
    products[i].querySelector(".product-item-tittle").innerHTML =
      productObj[i].title;
    products[i].querySelector("img").src = "./" + productObj[i].src;
    products[i].querySelector(".product-item-price").innerHTML = formatPrice(
      productObj[i].price
    );
  }
}

function formatPrice(price) {
  // Chuyển số thành chuỗi và thêm dấu chấm phẩy sau mỗi 3 chữ số từ cuối lên
  let formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // Thêm ký tự 'đ' vào cuối chuỗi
  formattedPrice += "đ";
  return formattedPrice;
}

//set sự kiện chuyển trang cho các thẻ div
products.forEach((item) => {
  item.addEventListener("click", function () {
    //Lưu thông tin vào local storage để truy xuất
    //lấy title và thẻ div đang được dùng
    var divId = item.getAttribute("id");
    var titleElement = item.querySelector(".product-item-tittle").textContent;
    //Tìm kiếm
    var type = divId.split("-"); //lấy kiểu
    switch (type[1]) {
      case "sale": {
        //tìm trong productSalesObj
        for (var i = 0; i < productObj.length; i++)
          if (productObj[i].title == titleElement) {
            localStorage.setItem(
              "currentProduct",
              JSON.stringify(productObj[i])
            );
            break;
          }
        break;
      }
      case "new": {
        //tìm trong productNewsObj
        for (var i = 0; i < productObj.length; i++)
          if (productObj[i].title == titleElement) {
            localStorage.setItem(
              "currentProduct",
              JSON.stringify(productObj[i])
            );
            break;
          }
        break;
      }
      case "restock": {
        //tìm trong productRestocksObj
        for (var i = 0; i < productObj.length; i++)
          if (productObj[i].title == titleElement) {
            localStorage.setItem(
              "currentProduct",
              JSON.stringify(productObj[i])
            );
            break;
          }
        break;
      }
    }

    //Chuyển trang
    window.location.href = "../html/product-detail.html";
  });
});

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
var linkToProduct = document.querySelectorAll(
  ".section1 .section1-product ul li a"
);
console.log(linkToProduct);
function saveTitleProduct() {
  for (var i = 0; i < linkToProduct.length; i++) {
    linkToProduct[i].addEventListener("click", function () {
      // Lưu id của mỗi thẻ vào localStorage
      var id = this.id; // Sử dụng "this" để truy cập vào thẻ đang được click
      console.log(id);
      localStorage.setItem("idPageProduct", JSON.stringify(id));
    });
  }
}

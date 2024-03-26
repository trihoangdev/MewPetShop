// Lưu local Storage
import productData from "../data/product.json" with { type: "json" };
localStorage.setItem('productSale', JSON.stringify(productData[0]));
localStorage.setItem('productNew', JSON.stringify(productData[1]));
localStorage.setItem('productRestock', JSON.stringify(productData[2]));

document.addEventListener("DOMContentLoaded", function () {
  onLoad();
  loadQuantityInCart();
});

//Lấy dữ liệu từ Local Storage
var productSalesObj = JSON.parse(localStorage.getItem("productSale"));
var productNewsObj = JSON.parse(localStorage.getItem("productNew"));
var productRestocksObj = JSON.parse(localStorage.getItem("productRestock"));
var quantityInCart = JSON.parse(localStorage.getItem("quantityInCart"));
function onLoad() {
  //Lấy tham chiếu đến các div
  //Sản phẩm Flash sale
  var productSale1 = document.getElementById("product-sale-1");
  var productSale2 = document.getElementById("product-sale-2");
  var productSale3 = document.getElementById("product-sale-3");
  var productSale4 = document.getElementById("product-sale-4");
  //Sản phẩm New
  var productNew1 = document.getElementById("product-new-1");
  var productNew2 = document.getElementById("product-new-2");
  var productNew3 = document.getElementById("product-new-3");
  var productNew4 = document.getElementById("product-new-4");
  //Sản phẩm Restock
  var productRestock1 = document.getElementById("product-restock-1");
  var productRestock2 = document.getElementById("product-restock-2");
  var productRestock3 = document.getElementById("product-restock-3");
  var productRestock4 = document.getElementById("product-restock-4");

  //tạo mảng các sản phẩm
  var products = [
    productSale1,
    productSale2,
    productSale3,
    productSale4,
    productNew1,
    productNew2,
    productNew3,
    productNew4,
    productRestock1,
    productRestock2,
    productRestock3,
    productRestock4,
  ];

  //Ghi dữ liệu từ LocalStorage vào các biến
  //Sản phẩm FlashSale
  var productSales1 = document.getElementById("product-sale-1");
  // Truy cập các phần tử con bên trong phần tử cha
  productSales1.querySelector(".product-item-tittle").innerHTML =
    productSalesObj.items[0].title;
  productSales1.querySelector("img").src = "./" + productSalesObj.items[0].src;
  productSales1.querySelector(".product-item-price").innerHTML = formatPrice(
    productSalesObj.items[0].price
  );
  var productSales2 = document.getElementById("product-sale-2");
  // Truy cập các phần tử con bên trong phần tử cha
  productSales2.querySelector(".product-item-tittle").innerHTML =
    productSalesObj.items[1].title;
  productSales2.querySelector("img").src = "./" + productSalesObj.items[1].src;
  productSales2.querySelector(".product-item-price").innerHTML = formatPrice(
    productSalesObj.items[1].price
  );
  var productSales3 = document.getElementById("product-sale-3");
  // Truy cập các phần tử con bên trong phần tử cha
  productSales3.querySelector(".product-item-tittle").innerHTML =
    productSalesObj.items[2].title;
  productSales3.querySelector("img").src = "./" + productSalesObj.items[2].src;
  productSales3.querySelector(".product-item-price").innerHTML = formatPrice(
    productSalesObj.items[2].price
  );
  var productSales4 = document.getElementById("product-sale-4");
  // Truy cập các phần tử con bên trong phần tử cha
  productSales4.querySelector(".product-item-tittle").innerHTML =
    productSalesObj.items[3].title;
  productSales4.querySelector("img").src = "./" + productSalesObj.items[3].src;
  productSales4.querySelector(".product-item-price").innerHTML = formatPrice(
    productSalesObj.items[3].price
  );

  //Sản phẩm New
  var productNew1 = document.getElementById("product-new-1");
  // Truy cập các phần tử con bên trong phần tử cha
  productNew1.querySelector(".product-item-tittle").innerHTML =
    productNewsObj.items[0].title;
  productNew1.querySelector("img").src = "./" + productNewsObj.items[0].src;
  productNew1.querySelector(".product-item-price").innerHTML = formatPrice(
    productNewsObj.items[0].price
  );
  var productNew2 = document.getElementById("product-new-2");
  // Truy cập các phần tử con bên trong phần tử cha
  productNew2.querySelector(".product-item-tittle").innerHTML =
    productNewsObj.items[1].title;
  productNew2.querySelector("img").src = "./" + productNewsObj.items[1].src;
  productNew2.querySelector(".product-item-price").innerHTML = formatPrice(
    productNewsObj.items[1].price
  );
  var productNew3 = document.getElementById("product-new-3");
  // Truy cập các phần tử con bên trong phần tử cha
  productNew3.querySelector(".product-item-tittle").innerHTML =
    productNewsObj.items[2].title;
  productNew3.querySelector("img").src = "./" + productNewsObj.items[2].src;
  productNew3.querySelector(".product-item-price").innerHTML = formatPrice(
    productNewsObj.items[2].price
  );
  var productNew4 = document.getElementById("product-new-4");
  // Truy cập các phần tử con bên trong phần tử cha
  productNew4.querySelector(".product-item-tittle").innerHTML =
    productNewsObj.items[3].title;
  productNew4.querySelector("img").src = "./" + productNewsObj.items[3].src;
  productNew4.querySelector(".product-item-price").innerHTML = formatPrice(
    productNewsObj.items[3].price
  );

  //Sản phẩm Restock
  var productRestock1 = document.getElementById("product-restock-1");
  // Truy cập các phần tử con bên trong phần tử cha
  productRestock1.querySelector(".product-item-tittle").innerHTML =
    productRestocksObj.items[0].title;
  productRestock1.querySelector("img").src =
    "./" + productRestocksObj.items[0].src;
  productRestock1.querySelector(".product-item-price").innerHTML = formatPrice(
    productRestocksObj.items[0].price
  );
  var productRestock2 = document.getElementById("product-restock-2");
  // Truy cập các phần tử con bên trong phần tử cha
  productRestock2.querySelector(".product-item-tittle").innerHTML =
    productRestocksObj.items[1].title;
  productRestock2.querySelector("img").src =
    "./" + productRestocksObj.items[1].src;
  productRestock2.querySelector(".product-item-price").innerHTML = formatPrice(
    productRestocksObj.items[1].price
  );
  var productRestock3 = document.getElementById("product-restock-3");
  // Truy cập các phần tử con bên trong phần tử cha
  productRestock3.querySelector(".product-item-tittle").innerHTML =
    productRestocksObj.items[2].title;
  productRestock3.querySelector("img").src =
    "./" + productRestocksObj.items[2].src;
  productRestock3.querySelector(".product-item-price").innerHTML = formatPrice(
    productRestocksObj.items[2].price
  );
  var productRestock4 = document.getElementById("product-restock-4");
  // Truy cập các phần tử con bên trong phần tử cha
  productRestock4.querySelector(".product-item-tittle").innerHTML =
    productRestocksObj.items[3].title;
  productRestock4.querySelector("img").src =
    "./" + productRestocksObj.items[3].src;
  productRestock4.querySelector(".product-item-price").innerHTML = formatPrice(
    productRestocksObj.items[3].price
  );
}

function formatPrice(price) {
  // Chuyển số thành chuỗi và thêm dấu chấm phẩy sau mỗi 3 chữ số từ cuối lên
  let formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // Thêm ký tự 'đ' vào cuối chuỗi
  formattedPrice += "đ";
  return formattedPrice;
}

//Set sự kiện chuyển trang cho các div
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
        for (var i = 0; i < productSalesObj.items.length; i++)
          if (productSalesObj.items[i].title == titleElement) {
            localStorage.setItem(
              "currentProduct",
              JSON.stringify(productSalesObj.items[i])
            );
            break;
          }
        break;
      }
      case "new": {
        //tìm trong productNewsObj
        for (var i = 0; i < productNewsObj.items.length; i++)
          if (productNewsObj.items[i].title == titleElement) {
            localStorage.setItem(
              "currentProduct",
              JSON.stringify(productNewsObj.items[i])
            );
            break;
          }
        break;
      }
      case "restock": {
        //tìm trong productRestocksObj
        for (var i = 0; i < productRestocksObj.items.length; i++)
          if (productRestocksObj.items[i].title == titleElement) {
            localStorage.setItem(
              "currentProduct",
              JSON.stringify(productRestocksObj.items[i])
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
function loadQuantityInCart() {
  var quantityInCart = JSON.parse(localStorage.getItem("quantityInCart"));
  document.getElementById("quantity-in-cart").innerHTML = quantityInCart;
}

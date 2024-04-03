//Tham chiếu đến các thẻ div để truyền thông tin
var quantityInCart = document.getElementById("quantity-in-cart");
var totalPrice = document.getElementById("total-price");
var discountPrice = document.getElementById("discount-price");
var shippingPrice = document.getElementById("shipping-price");
var paymentPrice = document.getElementById("payment-price");
var fullName = document.getElementById("fullName");
var phoneNumber = document.getElementById("phoneNumber");
var email = document.getElementById("email");
var address = document.getElementById("address");
var paymentMethod = document.getElementById("paymentMethod");
var btnBack = document.querySelector("button");
// Lấy thông tin của sản phẩm từ localStorage
const productInCart = JSON.parse(localStorage.getItem("productInCart"));
document.addEventListener("DOMContentLoaded", function () {
  showProductsInCart();
  showQuantityInCart();
  showPaymentNotDiscount();
  showDiscountPrice();
  showShippingPrice();
  calculatePaymentPrice();
  showDeliveryInfo();
});
function showQuantityInCart() {
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
function showProductsInCart() {
  var productHTML = ""; // Khởi tạo biến productHTML trước khi sử dụng
  for (var i = 0; i < productInCart.length; i++) {
    productHTML += `<div class="item">
    <img src="../${productInCart[i].src}" alt="" />
    <div class="content">
      <h2 class="title">${productInCart[i].title}</h2>
      <p class="price">Giá: ${formatPrice(productInCart[i].price)}</p>
      <div class="quantity-box">
      <p>Số lượng: <span>${productInCart[i].quantity}</span></p>
      </div>
    </div>
  </div>
  <hr />`;
  }
  document.getElementById("cart-product-list").innerHTML = productHTML;
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
function calculatePaymentPrice() {
  var totalPrice = unformatPrice(
    document.getElementById("total-price").innerHTML
  );
  var totalDiscount = unformatPrice(
    document.getElementById("discount-price").innerHTML
  );
  var shipPrice = unformatPrice(
    document.getElementById("shipping-price").innerHTML
  );
  var payment = totalPrice + totalDiscount + shipPrice;
  document.getElementById("payment-price").innerHTML = formatPrice(payment);
}
function showPaymentNotDiscount() {
  var totalPriceLS = localStorage.getItem("paymentNotDiscount");
  totalPrice.textContent = totalPriceLS;
}
function showDiscountPrice() {
  var totalDiscountLS = localStorage.getItem("discountPrice");
  discountPrice.textContent = totalDiscountLS;
}
function showShippingPrice() {
  var deliveryInfo = JSON.parse(localStorage.getItem("deliveryInfo"));
  shippingPrice.textContent = formatPrice(deliveryInfo.shipPrice);
}
function showDeliveryInfo() {
  var deliveryInfo = JSON.parse(localStorage.getItem("deliveryInfo"));
  fullName.textContent = deliveryInfo.fullName;
  phoneNumber.textContent = deliveryInfo.phoneNumber;
  email.textContent = deliveryInfo.email;
  address.textContent = deliveryInfo.address;
  paymentMethod.textContent = deliveryInfo.paymentMethod;
}
btnBack.addEventListener("click", function () {
  removeProductInCart();

  //Trở về trang chủ
  window.location.href = "../index.html";
});
function removeProductInCart() {
  localStorage.removeItem("productInCart");
}

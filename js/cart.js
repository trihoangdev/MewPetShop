//Tham chiếu đến các thẻ div để truyền thông tin
var quantityInCart = document.getElementById("quantity-in-cart");
var discount1 = document.getElementById("discount1");
var discount2 = document.getElementById("discount2");
var btnPayment = document.getElementById("btn-payment");
// Lấy thông tin của sản phẩm từ localStorage
const productInCart = JSON.parse(localStorage.getItem("productInCart"));
document.addEventListener("DOMContentLoaded", function () {
  showQuantityInCart();
  showProductsInCart();
  autoChangeTotalPrice();
  calculatePaymentPrice();
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
  document.getElementById("quantity-in-cart-body").innerHTML = currentQuantity;
}
function showProductsInCart() {
  var productHTML = ""; // Khởi tạo biến productHTML trước khi sử dụng
  for (var i = 0; i < productInCart.length; i++) {
    productHTML += `<div class="item">
  <img src="../${productInCart[i].src}" alt="" />
  <div class="content">
    <h2 class="title">${productInCart[i].title}</h2>
    <p class="price">${formatPrice(productInCart[i].price)}</p>
    <div class="quantity-box">
      <i class="fa-solid fa-chevron-down" id="btn-down" onclick = 'down(${i},productInCart[${i}])'></i>
      <input
        type="text"
        name="quantity"
        id = "quantity${i}"
        value="${productInCart[i].quantity}"
        readonly
      />
      <i class="fa-solid fa-chevron-up" id="btn-up" onclick ='up(${i},productInCart[${i}])' ></i>
    </div>
  </div>
</div>
<hr />`;
  }
  document.getElementById("cart-product-list").innerHTML = productHTML;
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
//Thiết lập sk cho nút tăng
function up(i, product) {
  // Lấy id của input quantity
  var id = "quantity" + i;
  // Tham chiếu đến ô quantity của nó
  var quantity = document.getElementById(id);
  // Lấy giá trị hiện tại của quantity và tăng lên 1
  var quantityInt = parseInt(quantity.value);
  quantity.value = ++quantityInt;
  quantity.style.backgroundColor = "white";
  updateQuantityToLocalStorage(quantityInt, product);
  calculateDiscountHandler();
  calculatePaymentPrice();
}
//Thiết lập sk cho nút giảm
function down(i, product) {
  // Lấy id của input quantity
  var id = "quantity" + i;
  // Tham chiếu đến ô quantity của nó
  var quantity = document.getElementById(id);
  // Lấy giá trị hiện tại của quantity và giảm đi 1
  var quantityInt = parseInt(quantity.value);
  if (quantityInt > 1) quantity.value = --quantityInt;
  else {
    quantity.style.backgroundColor = "#E26F70";
  }
  updateQuantityToLocalStorage(quantityInt, product);
  autoChangeTotalPrice();
  calculateDiscountHandler();
  calculatePaymentPrice();
}
function updateQuantityToLocalStorage(newQuantity, product) {
  product.quantity = newQuantity;
  productInCart.forEach((element) => {
    if (element.id == product.id) {
      element.quantity = product.quantity;
    }
  });
  localStorage.setItem("productInCart", JSON.stringify(productInCart));
  autoChangeTotalPrice();
}
function calculateTotalPrice() {
  var sum = 0;
  productInCart.forEach((element) => {
    sum += element.price * element.quantity;
  });
  return sum;
}
function autoChangeTotalPrice() {
  var sum = calculateTotalPrice();
  document.getElementById("total-price").innerHTML = formatPrice(sum);
}
var activeDiscount1 = false;
var activeDiscount2 = false;
discount1.addEventListener("click", function () {
  if (!activeDiscount1 && !activeDiscount2) {
    activeDiscount1 = true;
    discount1.style.backgroundColor = "var(--color-one)";
  } else if (activeDiscount2) {
    activeDiscount1 = true;
    activeDiscount2 = false;
    discount2.style.backgroundColor = "white";
    discount1.style.backgroundColor = "var(--color-one)";
  } else {
    activeDiscount1 = false;
    discount1.style.backgroundColor = "white";
  }
  calculateDiscountHandler();
  calculatePaymentPrice();
});
discount2.addEventListener("click", function () {
  if (!activeDiscount2 && !activeDiscount1) {
    activeDiscount2 = true;
    discount2.style.backgroundColor = "var(--color-one)";
  } else if (activeDiscount1) {
    activeDiscount2 = true;
    activeDiscount1 = false;
    discount1.style.backgroundColor = "white";
    discount2.style.backgroundColor = "var(--color-one)";
  } else {
    activeDiscount2 = false;
    discount2.style.backgroundColor = "white";
  }
  calculateDiscountHandler();
  calculatePaymentPrice();
});
function calculateDiscountHandler() {
  var discounttxt = document.getElementById("discount-price");
  var totalPricetxt = unformatPrice(
    document.getElementById("total-price").textContent
  );
  //sự kiện giảm giá cho discount1
  if (activeDiscount1) {
    if (totalPricetxt > 1000000)
      discounttxt.innerHTML = "-" + formatPrice(totalPricetxt * 0.15);
    return;
  }
  //sự kiện giảm giá cho discount2
  if (activeDiscount2) {
    var totalDiscount = 0;
    for (var i = 0; i < productInCart.length; i++) {
      var calculatePrice = productInCart[i].price * productInCart[i].quantity;
      totalDiscount += calculatePrice * 0.05;
    }
    discounttxt.innerHTML = "-" + formatPrice(totalDiscount);
    return;
  }
}
function calculatePaymentPrice() {
  var totalPrice = unformatPrice(
    document.getElementById("total-price").textContent
  );
  var totalDiscount = unformatPrice(
    document.getElementById("discount-price").textContent
  );
  var payment = totalPrice + totalDiscount;
  document.getElementById("payment-price").innerHTML = formatPrice(payment);
}
btnPayment.addEventListener("click", function () {
  window.location.href = "../html/delivery-info.html";
});

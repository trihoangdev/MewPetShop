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
      <p class="price">Giá: ${formatPrice(productInCart[i].price)}</p>
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
      <p class="price" id="item-price${i}">Thành tiền: ${formatPrice(
      productInCart[i].price * productInCart[i].quantity
    )}</p>
    </div>
    <img src="../image/x.svg" alt="" class="delete-item" onclick='removeItem(${
      productInCart[i].id
    })'/>

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
  updateItemPrice(i, product);
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
  updateItemPrice(i, product);
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
  discounttxt.innerHTML = "-0đ";
  var totalPricetxt = unformatPrice(
    document.getElementById("total-price").textContent
  );
  //sự kiện giảm giá cho discount1
  if (activeDiscount1) {
    if (totalPricetxt > 1000000) {
      console.log(totalPricetxt * 0.15);
      discounttxt.innerHTML = "-" + formatPrice(totalPricetxt * 0.15);
    }
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
  console.log(totalPrice);
  var totalDiscount = unformatPrice(
    document.getElementById("discount-price").textContent
  );
  var payment = totalPrice + totalDiscount;
  document.getElementById("payment-price").innerHTML = formatPrice(payment);
}
btnPayment.addEventListener("click", function () {
  if (document.getElementById("payment-price").textContent == "0đ") {
    alert("Chưa có sản phẩm trong giỏ hàng. Vui lòng chọn thêm sản phẩm");
    return;
  }
  //Lưu giá tiền chưa giảm
  var paymentNotDiscount = document.getElementById("total-price").textContent;
  localStorage.setItem("paymentNotDiscount", paymentNotDiscount);
  //Lưu giá tiền
  var paymentPrice = document.getElementById("payment-price").textContent;
  localStorage.setItem("paymentPrice", unformatPrice(paymentPrice));
  //Lưu giảm giá
  var discountPrice = document.getElementById("discount-price").textContent;
  localStorage.setItem("discountPrice", discountPrice);
  //Chuyển trang
  window.location.href = "../html/delivery-info.html";
});
function removeItem(idToRemove) {
  console.log(idToRemove);
  // Lấy mảng từ localStorage
  var productInCart = JSON.parse(localStorage.getItem("productInCart"));
  // Tìm và xoá phần tử có id = idToRemove
  var updatedProductInCart = productInCart.filter(function (product) {
    return product.id != idToRemove;
  });
  console.log(updatedProductInCart);
  // Cập nhật lại mảng trong localStorage
  localStorage.setItem("productInCart", JSON.stringify(updatedProductInCart));
  window.location.reload();
  // Load lại sản phẩm trong giỏ hàng
  showProductsInCart();
  //Load lại số sản phẩm ở giỏ hàng
  showQuantityInCart();
  //Load lại giá
  autoChangeTotalPrice();
  calculateTotalPrice();
  calculateDiscountHandler();
  calculatePaymentPrice();
}
function updateItemPrice(i, product) {
  // Lấy id của itemPrice
  var id = "item-price" + i;
  var itemPrice = formatPrice(product.price * product.quantity);
  document.getElementById(id).innerHTML = "Thành tiền: " + itemPrice;
}

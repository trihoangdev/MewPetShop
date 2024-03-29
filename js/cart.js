//Tham chiếu đến các thẻ div để truyền thông tin
var quantityInCart = document.getElementById("quantity-in-cart");
// Lấy thông tin của sản phẩm từ localStorage
const productInCart = JSON.parse(localStorage.getItem("productInCart"));
document.addEventListener("DOMContentLoaded", function () {
  showQuantityInCart();
  showProductsInCart();
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
}
function updateQuantityToLocalStorage(newQuantity, product) {
  product.quantity = newQuantity;
  productInCart.forEach((element) => {
    if (element.id == product.id) {
      element.quantity = product.quantity;
    }
  });
  localStorage.setItem("productInCart", JSON.stringify(productInCart));
}

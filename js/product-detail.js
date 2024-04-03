//Tham chiếu đến các thẻ div để truyền thông tin
var productTitle = document.getElementById("product-title");
var img = document.getElementById("image-src");
var price = document.getElementById("price");
var quantityInCart = document.getElementById("quantity-in-cart");
var description = document.getElementById("description");
// Lấy thông tin của sản phẩm từ localStorage
const currentProduct = JSON.parse(localStorage.getItem("currentProduct"));
document.addEventListener("DOMContentLoaded", function () {
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
  productTitle.innerHTML = currentProduct.title;
  img.src = "../" + currentProduct.src;
  price.innerHTML = formatPrice(currentProduct.price);
  quantityInCart.innerHTML = currentQuantity;
  description.innerHTML = currentProduct.description;
});

function formatPrice(price) {
  // Chuyển số thành chuỗi với định dạng tiền tệ
  let formattedPrice = Number(price).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formattedPrice;
}

//Lấy thẻ div chưa quantity, nút tăng, giảm
var quantity = document.getElementById("quantity");
var btnUp = document.getElementById("btn-up");
var btnDown = document.getElementById("btn-down");

//Thiết lập sk cho nút tăng
btnUp.addEventListener("click", function () {
  //Lấy giá trị hiện tại của quantity và tăng lên 1
  var quantityInt = parseInt(quantity.value);
  quantity.value = ++quantityInt;
  quantity.style.backgroundColor = "white";
});

//Thiết lập sk cho nút giảm
btnDown.addEventListener("click", function () {
  //Lấy giá trị hiện tại của quantity và giảm đi 1
  var quantityInt = parseInt(quantity.value);
  if (quantityInt > 1) quantity.value = --quantityInt;
  else {
    quantity.style.backgroundColor = "#E26F70";
    showMessage("Số lượng phải lớn hơn 1");
  }
});

//Tham chiếu đến nút thêm vào giỏ hàng
var btnAddToCart = document.querySelector("button");
btnAddToCart.addEventListener("click", function () {
  //Ghi đối tượng hiện tại vào localStorage
  // Lấy dữ liệu từ localStorage (nếu đã tồn tại)
  var data = localStorage.getItem("productInCart");
  // Khởi tạo một mảng mới hoặc mảng rỗng nếu chưa có dữ liệu trong localStorage
  var dataArray = data ? JSON.parse(data) : [];
  // Đối tượng mới cần thêm vào mảng
  var newProduct = {
    id: `${currentProduct.id}`,
    title: `${currentProduct.title}`,
    src: `${currentProduct.src}`,
    price: `${currentProduct.price}`,
    quantity: `${document.getElementById("quantity").value}`,
  };
  // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
  var existingProductIndex = dataArray.findIndex(
    (item) => item.id === newProduct.id
  );

  if (existingProductIndex !== -1) {
    // Nếu sản phẩm đã tồn tại trong giỏ hàng, cộng dồn quantity
    dataArray[existingProductIndex].quantity =
      parseInt(dataArray[existingProductIndex].quantity) +
      parseInt(newProduct.quantity);
    //Gán giá trị cho quantityInCart
    var totalQuantity = parseInt(
      document.getElementById("quantity-in-cart").textContent
    );
  } else {
    // Ngược lại, thêm sản phẩm mới vào mảng
    dataArray.push(newProduct);
    //Nếu id đã tồn tại thì không cộng dồn, ngược lại tăng 1
    var totalQuantity = parseInt(
      document.getElementById("quantity-in-cart").textContent
    );
    totalQuantity++;
  }
  // Chuyển đổi mảng thành chuỗi JSON
  var newData = JSON.stringify(dataArray);
  // Lưu chuỗi JSON vào localStorage
  localStorage.setItem("productInCart", newData);

  //Điều chỉnh số lượng của quantity-in-cart
  document.getElementById("quantity-in-cart").innerHTML = totalQuantity;
});

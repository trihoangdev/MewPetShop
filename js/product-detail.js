//Tham chiếu đến các thẻ div để truyền thông tin
var productTitle = document.getElementById("product-title");
var img = document.getElementById("image-src");
var price = document.getElementById("price");
document.addEventListener("DOMContentLoaded", function () {
  // Lấy thông tin của sản phẩm từ localStorage
  const currentProduct = JSON.parse(localStorage.getItem("currentProduct"));
  //truyền thông tin từ local storage vào các thẻ
  productTitle.innerHTML = currentProduct.title;
  img.src = "../" + currentProduct.src;
  price.innerHTML = formatPrice(currentProduct.price);
});
function formatPrice(price) {
  // Chuyển số thành chuỗi và thêm dấu chấm phẩy sau mỗi 3 chữ số từ cuối lên
  let formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // Thêm ký tự 'đ' vào cuối chuỗi
  formattedPrice += "đ";
  return formattedPrice;
}

//Sự kiện tìm kiếm sản phẩm
var findBtn = document.querySelector(
  ".header .header-top .header-section-one i "
);
var productInput = document.getElementById("find");
findBtn.addEventListener("click", function () {
  var productTitle = productInput.value; //Lấy nội dung của thẻ input
  //Lấy danh sách sản phẩm có chứa từ trong nội dung của productTitle
  var productsFiltered = [];
  //Lấy danh sách sản phẩm từ localStorage
  var products = JSON.parse(localStorage.getItem("products"));

  // Duyệt qua mảng products
  products.forEach(function (item) {
    if (item.title.toLowerCase().includes(productTitle.toLowerCase())) {
      productsFiltered.push(item);
    }
  });

  //Lưu số lượng sản phẩm đã được filter vào localStorage và chuyển sang trang products
  localStorage.setItem("idPageProduct", JSON.stringify("productFilter"));
  localStorage.setItem("idPageProductTitle", JSON.stringify(productTitle));
  localStorage.setItem("productsFiltered", JSON.stringify(productsFiltered));
  window.location.href = "../html/product.html";
});

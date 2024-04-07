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
  var products1 = JSON.parse(localStorage.getItem("productList"));
  var products2 = JSON.parse(localStorage.getItem("product-list"));

  // Duyệt qua mảng products1
  products1.forEach(function (item) {
    if (item.title.includes(productTitle)) {
      productsFiltered.push(item);
    }
  });

  // Duyệt qua mảng products2
  products2.forEach(function (item) {
    if (item.title.includes(productTitle)) {
      productsFiltered.push(item);
    }
  });

  //Lưu số lượng sản phẩm đã được filter vào localStorage và chuyển sang trang products
  localStorage.setItem("idPageProduct", JSON.stringify("productFilter"));
  localStorage.setItem("idPageProductTitle", JSON.stringify(productTitle));
  localStorage.setItem("productsFiltered", JSON.stringify(productsFiltered));
  window.location.href = "../html/product.html";
});

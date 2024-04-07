// Tiếp tục với các hành động sau khi lưu dữ liệu vào localStorage
document.addEventListener("DOMContentLoaded", function () {
  preloadData();
});
function preloadData() {
  //Lưu local storage
  // Lưu dữ liệu từ tệp JSON vào localStorage
  fetch("../data/product-list.json")
    .then((response) => response.json())
    .then((productListData) => {
      localStorage.setItem("productList", JSON.stringify(productListData));
      onLoad();
      loadQuantityInCart();
      var products = document.querySelectorAll(".product-item");
      openProductDetail(products);
    })
    .catch((error) => {
      console.error("Error loading JSON file:", error);
    });
}
//Lấy mã trang đang có trong localStorage
var idPage = JSON.parse(localStorage.getItem("idPageProduct"));
function getCategory() {
  return idPage;
}

function onLoad() {
  //Lấy dữ liệu từ local storage
  //Filter hoặc lấy sản phẩm có tên gì đó
  var productObj = "";
  var productHTML = "";
  if (JSON.parse(localStorage.getItem("idPageProduct")) == "productFilter") {
    productObj = JSON.parse(localStorage.getItem("productsFiltered"));
    console.log(productObj);
    //Ghi dữ liệu từ localStorage vào các biến
    console.log(productHTML);
    for (var i = 0; i < productObj.length; i++) {
      productHTML += `<div class="product-item" id="product-item${
        productObj[i].id
      }">
      <img src="../${productObj[i].src}" alt="Sản phẩm" />
      <p class="product-item-tittle">${productObj[i].title}</p>
      <p class="product-item-price">${formatPrice(productObj[i].price)}</p>
    </div>`;
    }
  } else {
    productObj = JSON.parse(localStorage.getItem("productList"));
    //Ghi dữ liệu từ localStorage vào các biến
    for (var i = 0; i < productObj.length; i++) {
      if (productObj[i].category == getCategory()) {
        productHTML += `<div class="product-item" id="product-item${
          productObj[i].id
        }">
      <img src="../${productObj[i].src}" alt="Sản phẩm" />
      <p class="product-item-tittle">${productObj[i].title}</p>
      <p class="product-item-price">${formatPrice(productObj[i].price)}</p>
    </div>`;
      }
    }
  }

  document.getElementById("product-list").innerHTML = productHTML;
  //Set tiêu đề trang
  switch (idPage) {
    case "dog-food": {
      document.querySelector("h1").innerHTML = "Hạt cho chó";
      break;
    }
    case "dog-snack": {
      document.querySelector("h1").innerHTML = "Snack, xương gặm cho chó";
      break;
    }
    case "cat-food": {
      document.querySelector("h1").innerHTML = "Hạt cho mèo";
      break;
    }
    case "cat-pate": {
      document.querySelector("h1").innerHTML = "Pate cho mèo";
      break;
    }
    case "balo": {
      document.querySelector("h1").innerHTML = "Balo vận chuyển";
      break;
    }
    case "pet-bed": {
      document.querySelector("h1").innerHTML = "Ổ đệm, giường";
      break;
    }
    case "productFilter": {
      document.querySelector("h1").innerHTML =
        'Sản phẩm có chứa "' +
        JSON.parse(localStorage.getItem("idPageProductTitle")) +
        '"';
      break;
    }
  }
}
function formatPrice(price) {
  // Chuyển số thành chuỗi và thêm dấu chấm phẩy sau mỗi 3 chữ số từ cuối lên
  let formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // Thêm ký tự 'đ' vào cuối chuỗi
  formattedPrice += "đ";
  return formattedPrice;
}
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
function openProductDetail(products) {
  //Lấy dữ liệu từ local storage
  //Filter hoặc lấy sản phẩm có tên gì đó
  var productObj = "";
  if (JSON.parse(localStorage.getItem("idPageProduct")) == "productFilter") {
    productObj = JSON.parse(localStorage.getItem("productsFiltered"));
  } else {
    productObj = JSON.parse(localStorage.getItem("productList"));
  }
  //set sự kiện chuyển trang cho các thẻ div
  products.forEach((item) => {
    item.addEventListener("click", function () {
      //Lưu thông tin vào local storage để truy xuất
      //lấy title và thẻ div đang được dùng
      var divId = item.getAttribute("id");
      console.log(divId);
      var id = divId.match(/\d+$/)[0]; //Lấy id của thẻ đang dùng
      console.log(id);
      //Tìm kiếm
      for (var i = 0; i < productObj.length; i++) {
        if (productObj[i].id == id) {
          console.log(productObj[i].id);
          localStorage.setItem("currentProduct", JSON.stringify(productObj[i]));
          break;
        }
      }

      //Chuyển trang
      window.location.href = "../html/product-detail.html";
    });
  });
}

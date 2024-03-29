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
  //   updateQuantityToLocalStorage(quantityInt, product);
}





  const checkboxes    = document.querySelectorAll(".cart-checkbox");
  const checkAll      = document.getElementById("check-all");
  const totalPriceEl  = document.getElementById("total-price");
  const totalProductEl= document.getElementById("total-product");
  const btnOrder      = document.getElementById("btn-order");
  const selectedInput = document.getElementById("selected-items-input");
  const tongTienInput = document.getElementById("tong-tien-input");

    function updateCart() {

    let total = 0;
    let count = 0;

    const selectedItems = [];

    checkboxes.forEach(item => {

      if(item.checked){

        const id = item.dataset.id;
        const price = Number(item.dataset.price);
        const qty = Number(item.dataset.qty);

        total += price * qty;
        count++;

        selectedItems.push({
          id,
          qty
        });
      }

    });

    totalProduct.innerText = count;
    totalPrice.innerText = total.toLocaleString("vi-VN") + " đ";

    selectedInput.value = JSON.stringify(selectedItems);

    tongTienInput.value = total;

    btnOrder.disabled = count === 0;
  }

  checkboxes.forEach(item => {
    item.addEventListener("change", updateCart);
  });

  checkAll.addEventListener("change", function(){

    checkboxes.forEach(item => {
      item.checked = checkAll.checked;
    });

    updateCart();
  });

  /* -------- Tính tổng -------- */
  function tinhTongTien() {
    let tongTien = 0, tongSP = 0;
    const selectedItems = [];

    checkboxes.forEach(cb => {
      if (cb.checked) {
        tongTien += Number(cb.dataset.price) * Number(cb.dataset.qty);
        tongSP++;
        selectedItems.push({
   idDongHo: cb.dataset.id,
   soLuongMua: cb.dataset.qty
});
      }
    });
    totalProductEl.innerText = tongSP;
    totalPriceEl.innerText   = tongTien.toLocaleString("vi-VN") + " đ";
    btnOrder.disabled        = tongSP === 0;
  selectedInput.value = JSON.stringify(selectedItems);
    tongTienInput.value      = tongTien;
    checkAll.checked         = tongSP === checkboxes.length && checkboxes.length > 0;
    checkAll.indeterminate   = tongSP > 0 && tongSP < checkboxes.length;
  }

  checkboxes.forEach(cb => cb.addEventListener("change", tinhTongTien));

  checkAll.addEventListener("change", function () {
    checkboxes.forEach(cb => (cb.checked = this.checked));
    tinhTongTien();
  });

  /* -------- Qty buttons -------- */
  document.querySelectorAll(".cart-item").forEach(item => {
    const minus = item.querySelector(".btn-qty-minus");
    const plus  = item.querySelector(".btn-qty-plus");
    const input = item.querySelector(".qty-input");
    const cb    = item.querySelector(".cart-checkbox");

minus.addEventListener("click", () => {

    let v = parseInt(input.value);

    if(v > 1){
        v--;
        input.value = v;
        cb.dataset.qty = v;
        tinhTongTien();
    }
});
plus.addEventListener("click", () => {
    let v = parseInt(input.value);
    let max = parseInt(input.max);
    if(v < max){
        v++;
        input.value = v;
        cb.dataset.qty = v;
        tinhTongTien();
    }
});
  });
  /* -------- Confirm Dialog -------- */
  const overlay      = document.getElementById("confirm-overlay");
  const confirmOk    = document.getElementById("confirm-ok");
  const confirmCancel= document.getElementById("confirm-cancel");
  let pendingForm    = null;

  function showConfirm(form) {
    pendingForm = form;
    overlay.style.display = "flex";
  }

  function hideConfirm() {
    overlay.style.display = "none";
    pendingForm = null;
  }

  /* Chặn submit của form xóa, hỏi xác nhận trước */
  document.querySelectorAll(".form-delete").forEach(form => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      showConfirm(this);
    });
  });

  confirmOk.addEventListener("click", () => {
    if (pendingForm) pendingForm.submit();
    hideConfirm();
  });

  confirmCancel.addEventListener("click", hideConfirm);

  /* Click ra ngoài box để hủy */
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) hideConfirm();
  });

  /* ESC để hủy */
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") hideConfirm();
  });


const loginBtn = document.querySelector(".header-login-btn");
const formLogin = document.querySelector("#formLogin");
const formRegister = document.querySelector("#formRegister");
const closeLogin = document.querySelector(".form-login-close");
const closeRegister = document.querySelector(".form-register-close");
const openRegister = document.querySelector(".open-register");
const openLogin = document.querySelector(".login-btn");
// HÀM MỞ FORM
function openForm(form){
  form.classList.add("active");
}
// HÀM ĐÓNG FORM
function closeForm(form){
  form.classList.remove("active");
}
// MỞ LOGIN
loginBtn.addEventListener("click", function(e){
  e.preventDefault();
  openForm(formLogin);
});
// ĐÓNG LOGIN
closeLogin.addEventListener("click", function(){
  closeForm(formLogin);
});
// ĐÓNG REGISTER
closeRegister.addEventListener("click", function(){
  closeForm(formRegister);
});
// CLICK NGOÀI FORM
[formLogin, formRegister].forEach(function(form){
  form.addEventListener("click", function(e){
    if(e.target === form){
      closeForm(form);
    }
  });
});
// LOGIN -> REGISTER
openRegister.addEventListener("click", function(e){
  e.preventDefault();
  closeForm(formLogin);
  openForm(formRegister);
});
// REGISTER -> LOGIN
openLogin.addEventListener("click", function(e){
  e.preventDefault();
  closeForm(formRegister);
  openForm(formLogin);
});
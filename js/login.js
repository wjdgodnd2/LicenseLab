document.addEventListener("DOMContentLoaded", function () {
  
  let loginForm = document.getElementById("login-form-submit");
  let loginErrorMsg = document.getElementById("login-error-msg");

  loginForm.addEventListener("click", (e) =>  {
    e.preventDefault();
    let username = document.getElementById("username-field").value;
    let password = document.getElementById("password-field").value;

    if (username === "admin" && password === "admin") {
      alert("로그인 성공!");
      window.location.href = "/LicenseLab/mainsub.html";
    } else {
      alert("아이디 혹은 비밀번호를 잘못 입력하였습니다.");
      loginErrorMsg.style.opacity = 1;
    }
  })
});

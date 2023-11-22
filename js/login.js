document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const loginErrorMsg = document.getElementById("login-error-msg");

    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // 폼에서 값 가져오기
      const username = document.getElementById("username-field").value;
      const password = document.getElementById("password-field").value;

      // 사용자 인증 확인 (실제 환경에서는 서버에서 수행될 것입니다)
      if (username === "admin" && password === "admin") {
        // 리다이렉트 또는 성공 메시지 표시
        alert("로그인 성공!"); // 이 부분을 선호하는 성공 표시 방법으로 대체할 수 있습니다.
        
        window.location.href = "./LicenseLab/index.html";
        loginLabel.innerText = "Logout";
      } else {
        // 오류 메시지 표시
        loginErrorMsg.style.opacity = 1;
      }
    });
  });
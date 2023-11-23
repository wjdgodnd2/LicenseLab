document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const loginErrorMsg = document.getElementById("login-error-msg");
  
    const signInLink = document.getElementById("signInLink");
    let isLoggedIn = false; // Initial login state, you might want to check the actual login state from the server

    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // 폼에서 값 가져오기
      const username = document.getElementById("username-field").value;
      const password = document.getElementById("password-field").value;
  
      // 사용자 인증 확인 (실제 환경에서는 서버에서 수행될 것입니다)
      if (username === "admin" && password === "admin") {
        // 리다이렉트 또는 성공 메시지 표시
        alert("로그인 성공!"); // 이 부분을 선호하는 성공 표시 방법으로 대체할 수 있습니다.
        
        window.location.href = "/LicenseLab/index.html";
        isLoggedIn = !isLoggedIn;
        updateMenu();
        // 리다이렉션을 위해 window.location.href = "목표_페이지.html";을 사용할 수 있습니다.
      } else {
        alert("아이디 혹은 비밀번호를 잘못 입력하였습니다."); 
        // 오류 메시지 표시
        loginErrorMsg.style.opacity = 1;
      }
      function updateMenu() {
        if (isLoggedIn) {
          signInLink.innerText = 'Logout';
          // You can add additional logic or menu items for the logged-in state
        } else {
          signInLink.innerText = 'Sign In';
          // Additional logic or menu items for the logged-out state
        }
      }
    });
  //   const loginErrorMsgHolder = document.getElementById("login-error-msg-holder");
  // loginErrorMsgHolder.addEventListener("click", function () {
  //   // 메인 페이지로 이동
  // });
  });

  
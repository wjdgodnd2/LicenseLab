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
        
        window.location.href = "/LicenseLab/index.html";

        // 리다이렉션을 위해 window.location.href = "목표_페이지.html";을 사용할 수 있습니다.
      } else {
        alert("아이디 혹은 비밀번호를 잘못 입력하였습니다."); 
        // 오류 메시지 표시
        loginErrorMsg.style.opacity = 1;
      }
    });
  //   const loginErrorMsgHolder = document.getElementById("login-error-msg-holder");
  // loginErrorMsgHolder.addEventListener("click", function () {
  //   // 메인 페이지로 이동
  // });
  });
  document.addEventListener("DOMContentLoaded", function () {
    const signInLink = document.getElementById("signInLink");
    let isLoggedIn = false; // 초기 로그인 상태, 실제 로그인 상태는 서버에서 확인하는 것이 좋습니다.
  
    // 로그인/로그아웃 상태를 토글하는 함수
    function toggleLoginState() {
      isLoggedIn = !isLoggedIn;
      updateMenu();
    }
  
    // 로그인 상태에 따라 메뉴를 업데이트하는 함수
    function updateMenu() {
      if (isLoggedIn) {
        signInLink.innerText = 'Logout';
        // 로그인 상태에 따른 추가 로직 또는 메뉴 항목을 여기에 추가할 수 있습니다.
      } else {
        signInLink.innerText = 'Sign In';
        // 로그아웃 상태에 따른 추가 로직 또는 메뉴 항목을 여기에 추가할 수 있습니다.
      }
    }
  
    // "Sign In" 링크에 클릭 이벤트를 연결합니다.
    signInLink.addEventListener("click", function (e) {
      e.preventDefault();
      // 여기에 실제 로그인 로직을 수행할 수 있습니다. 현재는 단순한 토글만 수행합니다.
      toggleLoginState();
    });
  
    // 페이지 로드 시 초기 업데이트를 수행합니다.
    updateMenu();
  });
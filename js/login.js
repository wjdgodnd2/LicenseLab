document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const loginErrorMsg = document.getElementById("login-error-msg");
  const signInLink = document.getElementById("signInLink");
  let isLoggedIn = false;

  function updateMenu() {
    if (isLoggedIn) {
      signInLink.querySelector('a').innerText = 'Logout';
      // 로그인 상태에 따른 추가 로직 또는 메뉴 항목을 여기에 추가할 수 있습니다.
    } else {
      signInLink.querySelector('a').innerText = 'Sign In';
      // 로그아웃 상태에 따른 추가 로직 또는 메뉴 항목을 여기에 추가할 수 있습니다.
    }
  }

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username-field").value;
    const password = document.getElementById("password-field").value;

    if (username === "admin" && password === "admin") {
      alert("로그인 성공!");
      window.location.href = "/LicenseLab/mainsub.html";
      isLoggedIn = !isLoggedIn;
      updateMenu();
    } else {
      alert("아이디 혹은 비밀번호를 잘못 입력하였습니다.");
      loginErrorMsg.style.opacity = 1;
    }
  });

  // 함수가 올바른 위치에 정의되었습니다.

  // 로그인 상태 초기화
  updateMenu();

  signInLink.addEventListener("click", function () {
    e.preventDefault();
    if (isLoggedIn) {
      // Logout 상태에서 클릭하면 다시 Sign In 상태로 변경
      isLoggedIn = false;
      updateMenu();
    } else {
      // Sign In 상태에서 클릭하면 로그인 페이지로 이동
      window.location.href = "/LicenseLab/signin/login.html";
    }
  });
});

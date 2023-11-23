document.addEventListener("DOMContentLoaded", function () {
  const signInLink = document.getElementById("signInLink");
  let isLoggedIn = false;

  function toggleLoginState() {
    isLoggedIn = !isLoggedIn;
    updateMenu();
  }

  function updateMenu() {
    if (isLoggedIn) {
      signInLink.innerText = 'Logout';
    } else {
      signInLink.innerText = 'Sign In';
    }
  }

  signInLink.addEventListener("click", function (e) {
    e.preventDefault();

    // 하드코딩된 사용자 이름과 비밀번호
    const hardcodedUsername = "admin";
    const hardcodedPassword = "admin";

    // 사용자에게서 입력된 값 (실제로는 폼에서 가져와야 함)
    const enteredUsername = prompt("Enter username:");
    const enteredPassword = prompt("Enter password:");

    // 간단한 하드코딩된 로그인 로직
    if (enteredUsername === hardcodedUsername && enteredPassword === hardcodedPassword) {
      alert("로그인 성공!");
      toggleLoginState();
    } else {
      alert("아이디 혹은 비밀번호를 잘못 입력하였습니다.");
    }
  });

  updateMenu();
});
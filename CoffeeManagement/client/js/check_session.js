function checkSession() {
  const userSession = JSON.parse(localStorage.getItem('user_session'));
  if (!userSession) {
    window.location.href = './login.html';
  }
}

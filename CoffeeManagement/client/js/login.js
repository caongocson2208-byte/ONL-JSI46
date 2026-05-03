let isSubmitting = false;

const getErrorMessage = code => {
  switch (code) {
    case "auth/invalid-email":       return "Email không hợp lệ.";
    case "auth/user-not-found":      return "Tài khoản không tồn tại.";
    case "auth/wrong-password":
    case "auth/invalid-credential":  return "Email hoặc mật khẩu không đúng.";
    case "auth/too-many-requests":   return "Tài khoản bị tạm khóa do nhập sai nhiều lần.";
    default:                         return "Đăng nhập thất bại. Vui lòng thử lại.";
  }
};

firebase.auth().onAuthStateChanged(user => {
  if (user && !isSubmitting) {
    const session = JSON.parse(localStorage.getItem("user_session"));
    if (session) {
      window.location.href = session.role_id == 1 ? "admin.html" : "index.html";
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const errorMsg  = document.getElementById("error-message");
  const submitBtn = loginForm.querySelector(".btn-submit");
  const emailInput    = loginForm.querySelector("input[type='email']");
  const passwordInput = loginForm.querySelector("input[type='password']");

  loginForm.addEventListener("submit", async e => {
    e.preventDefault();

    errorMsg.textContent = "";
    errorMsg.style.display = "none";
    isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = "Đang đăng nhập...";

    const email    = emailInput.value.trim();
    const password = passwordInput.value;

    let firebaseUser;
    try {
      const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
      firebaseUser = user;
    } catch (error) {
      isSubmitting = false;
      submitBtn.disabled = false;
      submitBtn.textContent = "Đăng nhập";
      errorMsg.textContent = getErrorMessage(error.code);
      errorMsg.style.display = "block";
      return;
    }

    let role_id = 0;
    try {
      const doc = await db.collection("users").doc(firebaseUser.uid).get();
      if (doc.exists) role_id = doc.data().role_id;
    } catch (_) {}

    localStorage.setItem("user_session", JSON.stringify({
      uid: firebaseUser.uid,
      email,
      role_id,
    }));

    window.location.href = role_id == 1 ? "admin.html" : "index.html";
  });
});

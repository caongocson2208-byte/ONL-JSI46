let isSubmitting = false;

// Trả về thông báo lỗi tiếng Việt dựa theo mã lỗi Firebase
const getLoginErrorMessage = errorCode => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Email không hợp lệ.";
    case "auth/user-not-found":
      return "Tài khoản không tồn tại.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Email hoặc mật khẩu không đúng.";
    case "auth/too-many-requests":
      return "Tài khoản bị tạm khóa do nhập sai nhiều lần.";
    default:
      return "Đăng nhập thất bại. Vui lòng thử lại.";
  }
};

// Tự động chuyển trang nếu người dùng đã đăng nhập
firebase.auth().onAuthStateChanged(user => {
  if (user && !isSubmitting) window.location.href = "index.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const errorMsg = document.getElementById("error-message");
  const submitBtn = loginForm.querySelector(".btn-submit");
  const emailInput = loginForm.querySelector("input[type='email']");
  const passwordInput = loginForm.querySelector("input[type='password']");

  if (!loginForm || !errorMsg || !submitBtn || !emailInput || !passwordInput)
    return;

  // Xử lý submit form đăng nhập
  loginForm.addEventListener("submit", async e => {
    e.preventDefault();

    // Ẩn thông báo lỗi cũ
    errorMsg.textContent = "";
    errorMsg.style.display = "none";

    // Vô hiệu hóa nút để tránh submit nhiều lần
    isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = "Đang đăng nhập...";

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(
          emailInput.value.trim(),
          passwordInput.value,
        );
      window.location.href = "index.html";
    } catch (error) {
      // Khôi phục nút và hiển thị lỗi nếu đăng nhập thất bại
      isSubmitting = false;
      submitBtn.disabled = false;
      submitBtn.textContent = "Đăng nhập";

      errorMsg.textContent = getLoginErrorMessage(error.code);
      errorMsg.style.display = "block";
    }
  });
});

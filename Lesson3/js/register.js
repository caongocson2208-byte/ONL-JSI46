// Trả về thông báo lỗi tiếng Việt dựa theo mã lỗi Firebase
const getRegisterErrorMessage = errorCode => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "Email đã được sử dụng.";
    case "auth/invalid-email":
      return "Email không hợp lệ.";
    case "auth/weak-password":
      return "Mật khẩu phải có ít nhất 6 ký tự.";
    default:
      return "Đăng ký thất bại. Vui lòng thử lại.";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const errorMsg = document.getElementById("error-message");
  const submitBtn = registerForm.querySelector(".btn-submit");
  const nameInput = registerForm.querySelector("input[type='text']");
  const emailInput = registerForm.querySelector("input[type='email']");
  const passwordInputs = registerForm.querySelectorAll(
    "input[type='password']",
  );
  const [passwordInput, confirmPasswordInput] = passwordInputs;
  if (
    !registerForm ||
    !errorMsg ||
    !submitBtn ||
    !nameInput ||
    !emailInput ||
    !passwordInput ||
    !confirmPasswordInput
  )
    return;

  // Xử lý submit form đăng ký
  registerForm.addEventListener("submit", async e => {
    e.preventDefault();

    // Ẩn thông báo cũ
    errorMsg.textContent = "";
    errorMsg.style.display = "none";

    // Kiểm tra mật khẩu nhập lại có khớp không
    if (passwordInput.value !== confirmPasswordInput.value) {
      errorMsg.textContent = "Mật khẩu không khớp!";
      errorMsg.style.display = "block";
      return;
    }

    // Vô hiệu hóa nút để tránh submit nhiều lần
    submitBtn.disabled = true;
    submitBtn.textContent = "Đang đăng ký...";

    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(
          emailInput.value.trim(),
          passwordInput.value,
        );
      // Cập nhật tên hiển thị sau khi tạo tài khoản thành công
      await user.updateProfile({ displayName: nameInput.value.trim() });
      window.location.href = "index.html";
    } catch (error) {
      // Khôi phục nút và hiển thị lỗi nếu đăng ký thất bại
      submitBtn.disabled = false;
      submitBtn.textContent = "Đăng ký";

      errorMsg.textContent = getRegisterErrorMessage(error.code);
      errorMsg.style.display = "block";
    }
  });
});

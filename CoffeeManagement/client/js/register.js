const getErrorMessage = code => {
  switch (code) {
    case "auth/email-already-in-use": return "Email đã được sử dụng.";
    case "auth/invalid-email":        return "Email không hợp lệ.";
    case "auth/weak-password":        return "Mật khẩu phải có ít nhất 6 ký tự.";
    default:                          return "Đăng ký thất bại. Vui lòng thử lại.";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const registerForm      = document.getElementById("register-form");
  const errorMsg          = document.getElementById("error-message");
  const submitBtn         = registerForm.querySelector(".btn-submit");
  const nameInput         = registerForm.querySelector("input[type='text']");
  const emailInput        = registerForm.querySelector("input[type='email']");
  const [passwordInput, confirmPasswordInput] = registerForm.querySelectorAll("input[type='password']");

  registerForm.addEventListener("submit", async e => {
    e.preventDefault();

    errorMsg.textContent = "";
    errorMsg.style.display = "none";

    if (passwordInput.value !== confirmPasswordInput.value) {
      errorMsg.textContent = "Mật khẩu không khớp!";
      errorMsg.style.display = "block";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Đang đăng ký...";

    let user;
    try {
      const { user: newUser } = await firebase.auth().createUserWithEmailAndPassword(
        emailInput.value.trim(),
        passwordInput.value,
      );
      user = newUser;
      await user.updateProfile({ displayName: nameInput.value.trim() });
    } catch (error) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Đăng ký";
      errorMsg.textContent = getErrorMessage(error.code);
      errorMsg.style.display = "block";
      return;
    }

    try {
      await db.collection("users").doc(user.uid).set({
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        role_id: 2,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (_) {}

    window.location.href = "index.html";
  });
});

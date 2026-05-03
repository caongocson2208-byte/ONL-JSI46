// Lấy tên hiển thị cho navbar
const getUserName = user =>
  user.displayName || user.email?.split("@")[0] || "Bạn";

// Cập nhật giao diện navbar theo trạng thái đăng nhập
const setupNavbar = user => {
  const navUsername = document.getElementById("nav-username");
  const guestMenu = document.getElementById("guest-menu");
  const userMenu = document.getElementById("user-menu");

  const isLoggedIn = Boolean(user);

  if (navUsername)
    navUsername.textContent = isLoggedIn ? getUserName(user) : "";
  if (guestMenu) guestMenu.style.display = isLoggedIn ? "none" : "";
  if (userMenu) userMenu.style.display = isLoggedIn ? "" : "none";
};

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");
  if (!logoutBtn) return;

  // Xử lý đăng xuất
  logoutBtn.addEventListener("click", async e => {
    e.preventDefault();
    try {
      await firebase.auth().signOut();
      window.location.href = "index.html";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  });
});

// Lắng nghe thay đổi trạng thái đăng nhập
firebase.auth().onAuthStateChanged(setupNavbar);

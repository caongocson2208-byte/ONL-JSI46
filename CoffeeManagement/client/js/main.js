const getUserName = user =>
  user.displayName || user.email?.split("@")[0] || "Bạn";

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

  logoutBtn.addEventListener("click", async e => {
    e.preventDefault();
    await firebase.auth().signOut();
    localStorage.removeItem("user_session");
    window.location.href = "index.html";
  });
});

firebase.auth().onAuthStateChanged(setupNavbar);

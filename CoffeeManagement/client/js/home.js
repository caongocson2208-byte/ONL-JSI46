const menuGrid = document.getElementById("menu-grid");

db.collection("products").orderBy("createdAt", "asc").onSnapshot(snapshot => {
    if (snapshot.empty) {
        menuGrid.innerHTML = `<p style="color:#999">Chưa có sản phẩm nào.</p>`;
        return;
    }

    menuGrid.innerHTML = "";
    snapshot.forEach(doc => {
        const p = doc.data();
        const card = document.createElement("div");
        card.className = "menu-card";
        card.innerHTML = `
            <img src="${p.imageUrl}" alt="${p.name}">
            <div class="card-info">
                <div class="card-header-row">
                    <h3>${p.name}</h3>
                    <span class="price">${Number(p.price).toLocaleString("vi-VN")}đ</span>
                </div>
                <button class="btn-order" data-id="${doc.id}" data-name="${p.name}" data-price="${p.price}" data-image="${p.imageUrl}">
                    Đặt hàng
                </button>
            </div>`;
        menuGrid.appendChild(card);
    });

    document.querySelectorAll(".btn-order").forEach(btn => {
        btn.addEventListener("click", () => placeOrder(btn.dataset));
    });
});

async function placeOrder({ id, name, price, image }) {
    const user = firebase.auth().currentUser;
    if (!user) {
        if (confirm("Bạn cần đăng nhập để đặt hàng. Đăng nhập ngay?")) {
            window.location.href = "login.html";
        }
        return;
    }

    if (!confirm(`Xác nhận đặt hàng: ${name} - ${Number(price).toLocaleString("vi-VN")}đ?`)) return;

    try {
        await db.collection("orders").add({
            uid:          user.uid,
            email:        user.email,
            productId:    id,
            productName:  name,
            productImage: image,
            price:        Number(price),
            status:       "Chờ xác nhận",
            createdAt:    firebase.firestore.FieldValue.serverTimestamp(),
        });
        alert(`Đặt hàng thành công! Xem đơn hàng tại trang Đơn hàng.`);
    } catch (err) {
        alert("Đặt hàng thất bại: " + err.message);
    }
}

const STATUS_COLOR = {
  "Chờ xác nhận": "#f39c12",
  "Đang giao hàng": "#2980b9",
  "Đã nhận hàng": "#27ae60",
  "Đã hủy": "#e74c3c",
};

firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const orderList = document.getElementById("order-list");

  db.collection("orders")
    .where("uid", "==", user.uid)
    .onSnapshot(snapshot => {
      if (snapshot.empty) {
        orderList.innerHTML = `<p style="color:#999; text-align:center; margin-top:40px">Bạn chưa có đơn hàng nào.</p>`;
        return;
      }

      // Sort client-side để không cần composite index
      const docs = snapshot.docs.sort((a, b) => {
        const tA = a.data().createdAt?.seconds || 0;
        const tB = b.data().createdAt?.seconds || 0;
        return tB - tA;
      });

      orderList.innerHTML = "";
      docs.forEach(doc => {
        const o = doc.data();
        const color = STATUS_COLOR[o.status] || "#999";

        const card = document.createElement("div");
        card.className = "order-card-ui";
        card.innerHTML = `
                    <div class="order-content-wrapper">
                        <img class="order-img" src="${o.productImage}" alt="${o.productName}">
                        <div class="order-details">
                            <h3>${o.productName}</h3>
                            <p>Tổng tiền: <strong>${Number(o.price).toLocaleString("vi-VN")}đ</strong></p>
                            <p>Ngày đặt: ${o.createdAt ? o.createdAt.toDate().toLocaleString("vi-VN") : "..."}</p>
                            <p>Trạng thái: <strong style="color:${color}">${o.status}</strong></p>
                        </div>
                    </div>
                    ${
                      o.status === "Chờ xác nhận"
                        ? `
                    <div class="order-btn-wrapper">
                        <button class="btn-cancel-order" data-id="${doc.id}">Hủy đơn</button>
                    </div>`
                        : ""
                    }`;

        orderList.appendChild(card);
      });

      document.querySelectorAll(".btn-cancel-order").forEach(btn => {
        btn.addEventListener("click", () => cancelOrder(btn.dataset.id));
      });
    });
});

async function cancelOrder(orderId) {
  if (!confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) return;
  try {
    await db.collection("orders").doc(orderId).update({ status: "Đã hủy" });
  } catch (err) {
    alert("Hủy đơn thất bại: " + err.message);
  }
}

const orderList = document.getElementById("order-list");

const STATUSES = ["Chờ xác nhận", "Đang giao hàng", "Đã nhận hàng", "Đã hủy"];

const STATUS_COLOR = {
    "Chờ xác nhận":   "warning",
    "Đang giao hàng": "primary",
    "Đã nhận hàng":   "success",
    "Đã hủy":         "danger",
};

firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    db.collection("orders")
        .onSnapshot(snapshot => {
            if (snapshot.empty) {
                orderList.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-3">Chưa có đơn hàng nào</td></tr>`;
                return;
            }

            const docs = snapshot.docs.sort((a, b) => {
                const tA = a.data().createdAt?.seconds || 0;
                const tB = b.data().createdAt?.seconds || 0;
                return tB - tA;
            });

            orderList.innerHTML = "";
            let i = 1;
            docs.forEach(doc => {
                const o = doc.data();
                const date = o.createdAt ? o.createdAt.toDate().toLocaleString("vi-VN") : "...";
                const badge = STATUS_COLOR[o.status] || "secondary";

                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${i++}</td>
                    <td>
                        <div class="d-flex align-items-center gap-2">
                            <img src="${o.productImage}" style="width:45px;height:45px;object-fit:cover;border-radius:6px">
                            <span>${o.productName}</span>
                        </div>
                    </td>
                    <td>${o.email}</td>
                    <td>${Number(o.price).toLocaleString("vi-VN")}đ</td>
                    <td>${date}</td>
                    <td><span class="badge bg-${badge}">${o.status}</span></td>
                    <td>
                        <select class="form-select form-select-sm status-select" data-id="${doc.id}" style="min-width:160px">
                            ${STATUSES.map(s => `<option value="${s}" ${s === o.status ? "selected" : ""}>${s}</option>`).join("")}
                        </select>
                    </td>`;
                orderList.appendChild(row);
            });

            document.querySelectorAll(".status-select").forEach(select => {
                select.addEventListener("change", () => updateStatus(select.dataset.id, select.value));
            });
        });
});

async function updateStatus(orderId, status) {
    try {
        await db.collection("orders").doc(orderId).update({ status });
    } catch (err) {
        alert("Cập nhật thất bại: " + err.message);
    }
}

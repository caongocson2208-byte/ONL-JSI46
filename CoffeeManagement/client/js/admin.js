const productForm      = document.querySelector("#product-form");
const saveBtn          = productForm.querySelector(".btn-save");
const productTableBody = document.getElementById("product-list");

firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  db.collection("products")
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {
      let html = "";
      let i = 1;
      snapshot.forEach(doc => {
        const p = doc.data();
        html += `
          <tr>
            <td>${i++}</td>
            <td><img src="${p.imageUrl}" alt="${p.name}" class="product-img"></td>
            <td>${p.name}</td>
            <td>${Number(p.price).toLocaleString("vi-VN")}đ</td>
            <td>
              <button class="btn-delete" data-id="${doc.id}">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>`;
      });

      productTableBody.innerHTML = html || `<tr><td colspan="5" class="text-center text-muted py-3">Chưa có sản phẩm nào</td></tr>`;

      document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", () => deleteProduct(btn.dataset.id));
      });
    }, error => console.error(error));
});

productForm.addEventListener("submit", async e => {
  e.preventDefault();

  const name  = document.getElementById("product_name").value.trim();
  const price = document.getElementById("product_price").value.trim();
  const image = document.getElementById("product_image").files[0];

  if (!name || !price || !image) {
    alert("Vui lòng điền đầy đủ thông tin sản phẩm!");
    return;
  }

  if (!firebase.auth().currentUser) {
    window.location.href = "login.html";
    return;
  }

  saveBtn.disabled = true;
  saveBtn.textContent = "Đang lưu...";

  try {
    const formData = new FormData();
    formData.append("image", image);

    const res  = await fetch("http://localhost:3002/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (!data.success) throw new Error(data.message);

    await db.collection("products").add({
      name,
      price: Number(price),
      imageUrl: data.data.secure_url,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    productForm.reset();
  } catch (error) {
    alert("Lỗi: " + error.message);
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = "Lưu";
  }
});

function deleteProduct(id) {
  if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
  db.collection("products").doc(id).delete()
    .catch(err => alert("Xóa thất bại: " + err.message));
}

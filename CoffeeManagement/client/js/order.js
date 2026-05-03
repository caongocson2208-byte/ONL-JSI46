// ===== order.js =====

// Sample test data based exactly on the screenshot
var userOrders = [
  {
    id: "order_1",
    itemName: "Cà phê cốt dừa",
    price: 40000,
    date: "17:39 08/10/2024",
    status: "Đã nhận hàng",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "order_2",
    itemName: "Trà đào cam sả",
    price: 90000,
    date: "10:14 31/10/2024",
    status: "Chờ xác nhận",
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "order_3",
    itemName: "Trà đào cam sả",
    price: 9000000, // Matching the screenshot exactly
    date: "10:14 31/10/2024",
    status: "Đang giao hàng",
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=200&auto=format&fit=crop",
  },
];

function renderOrders() {
  var orderList = document.getElementById("order-list");
  orderList.innerHTML = ""; // Clear existing

  userOrders.forEach(function (order) {
    var card = document.createElement("div");
    card.className = "order-card-ui";

    // Main content wrapper
    var contentWrapper = document.createElement("div");
    contentWrapper.className = "order-content-wrapper";

    // Image
    var img = document.createElement("img");
    img.className = "order-img";
    img.src = order.image;
    img.alt = order.itemName;

    // Details
    var details = document.createElement("div");
    details.className = "order-details";

    var title = document.createElement("h3");
    title.textContent = order.itemName;

    var price = document.createElement("p");
    price.textContent = "Tổng tiền: " + order.price;

    var date = document.createElement("p");
    date.textContent = "Ngày đặt: " + order.date;

    var status = document.createElement("p");
    status.innerHTML = "Trạng thái: <i>" + order.status + "</i>";

    details.appendChild(title);
    details.appendChild(price);
    details.appendChild(date);
    details.appendChild(status);

    contentWrapper.appendChild(img);
    contentWrapper.appendChild(details);
    card.appendChild(contentWrapper);

    // Cancel Button (Only for "Chờ xác nhận")
    if (order.status === "Chờ xác nhận") {
      var btnDiv = document.createElement("div");
      btnDiv.className = "order-btn-wrapper";

      var cancelBtn = document.createElement("button");
      cancelBtn.className = "btn-cancel-order";
      cancelBtn.textContent = "Hủy đơn";
      cancelBtn.onclick = function () {
        if (confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
          alert("Đã hủy đơn hàng: " + order.itemName);
          // Update state to render update
          order.status = "Đã hủy";
          renderOrders();
        }
      };
      btnDiv.appendChild(cancelBtn);
      card.appendChild(btnDiv);
    }

    orderList.appendChild(card);
  });
}

// Redirect guests to login if they try to access order page
document.addEventListener("DOMContentLoaded", function () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
      window.location.href = "login.html";
    } else {
      renderOrders();
    }
  });
});

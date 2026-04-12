// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUPMjBL4DXK5u3GngmoqrzY0lNFSIJ1i4",
  authDomain: "coffemanagement-e0f7e.firebaseapp.com",
  projectId: "coffemanagement-e0f7e",
  storageBucket: "coffemanagement-e0f7e.firebasestorage.app",
  messagingSenderId: "1026437128964",
  appId: "1:1026437128964:web:094970dccc6d346cc52651",
  measurementId: "G-YJVQ5GX1NQ",
};

try {
  // Khởi tạo Firebase
  firebase.initializeApp(firebaseConfig);
  // Test thử một service của Firebase (Firestore) để chắc chắn config đã hoạt động
  console.log("🔥 Kết nối Firebase thành công!");
} catch (error) {
  console.error("❌ Lỗi khi kết nối Firebase:", error);
}

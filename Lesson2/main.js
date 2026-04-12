const students = [
  {
    name: "An",
    scores: {
      Toan: { score: 7.4, evaluation: "Đ" },
      NguVan: { score: 8.9, evaluation: "Đ" },
      NgoaiNgu: { score: 8.5, evaluation: "Đ" },
      VatLy: { score: 9.0, evaluation: "Đ" },
      HoaHoc: { score: 3.9, evaluation: "KĐ" },
      SinhHoc: { score: 5.0, evaluation : "Đ" },
      LichSu: { score: 8.3, evaluation: "Đ" },
      DiaLy: { score: 9.4, evaluation: "Đ" },
      GDCD: { score: 6.6, evaluation: "Đ" },
    },
  },
  {
    name: "Binh",
    scores: {
      Toan: { score: 3.4, evaluation: "KĐ" },
      NguVan: { score: 5.9, evaluation: "Đ" },
      NgoaiNgu: { score: 5.4, evaluation: "Đ" },
      VatLy: { score: 7.4, evaluation: "Đ" },
      HoaHoc: { score: 9.3, evaluation: "Đ" },
      SinhHoc: { score: 8.6, evaluation: "Đ" },
      LichSu: { score: 5.2, evaluation: "Đ" },
      DiaLy: { score: 7.1, evaluation: "Đ" },
      GDCD: { score: 6.7, evaluation: "Đ" },
    },
  },
  {
    name: "Cuc",
    scores: {
      Toan: { score: 7.4, evaluation: "Đ" },
      NguVan: { score: 8.9, evaluation: "Đ" },
      NgoaiNgu: { score: 8.5, evaluation: "Đ" },
      VatLy: { score: 9.0, evaluation: "Đ" },
      HoaHoc: { score: 3.9, evaluation: "KĐ" },
      SinhHoc: { score: 5.0, evaluation : "Đ" },
      LichSu: { score: 8.3, evaluation: "Đ" },
      DiaLy: { score: 9.4, evaluation: "Đ" },
      GDCD: { score: 6.6, evaluation: "Đ" },
    },
  },
  {
    name: "Dung",
    scores: {
      Toan: { score: 7.4, evaluation: "Đ" },
      NguVan: { score: 8.9, evaluation: "Đ" },
      NgoaiNgu: { score: 8.5, evaluation: "Đ" },
      VatLy: { score: 9.0, evaluation: "Đ" },
      HoaHoc: { score: 3.9, evaluation: "KĐ" },
      SinhHoc: { score: 5.0, evaluation : "Đ" },
      LichSu: { score: 8.3, evaluation: "Đ" },
      DiaLy: { score: 9.4, evaluation: "Đ" },
      GDCD: { score: 6.6, evaluation: "Đ" },
    },
  },
  {
    name: "Hoang",
    scores: {
      Toan: { score: 7.4, evaluation: "Đ" },
      NguVan: { score: 8.9, evaluation: "Đ" },
      NgoaiNgu: { score: 8.5, evaluation: "Đ" },
      VatLy: { score: 9.0, evaluation: "Đ" },
      HoaHoc: { score: 3.9, evaluation: "KĐ" },
      SinhHoc: { score: 5.0, evaluation : "Đ" },
      LichSu: { score: 8.3, evaluation: "Đ" },
      DiaLy: { score: 9.4, evaluation: "Đ" },
      GDCD: { score: 6.6, evaluation: "Đ" },
    },
  }  
];

// Hàm tiện ích: Tính điểm trung bình của một học sinh
const getAverage = (scores) => {
  const subjects = Object.values(scores);
  return subjects.reduce((sum, s) => sum + s.score, 0) / subjects.length;
};
console.log(getAverage(students[0].scores))


// 1. Lọc danh sách 3 học sinh đạt điểm TBHK cao nhất
const top3 = students
  .map((s) => ({ name: s.name, average: getAverage(s.scores) }))
  .sort((a, b) => b.average - a.average)
  .slice(0, 3);
console.log("3 học sinh đạt điểm TBHK cao nhất:", top3);



// 2. Tìm học sinh đạt điểm TBHK thấp nhất
const lowest = students
  .map((s) => ({ name: s.name, average: getAverage(s.scores) }))
  .sort((a, b) => a.average - b.average)[0];
console.log("Học sinh đạt điểm TBHK thấp nhất:", lowest);



// 3. Tính điểm trung bình HK của toàn bộ bạn học sinh trong lớp.
const classAverage = students.reduce((sum, s) => sum + getAverage(s.scores), 0) / students.length;
console.log("Điểm trung bình HK của toàn bộ lớp:", classAverage);



// 4. In ra tên các học sinh đạt danh hiệu học lực: Giỏi - Khá - Trung Bình
const honors = students.map((s) => {
  const average = getAverage(s.scores);
  const evaluation = average >= 8 ? "Giỏi" : average >= 6.5 ? "Khá" : "Trung Bình";
  return { name: s.name, evaluation };
});
console.log("Danh sách học sinh theo danh hiệu học lực:", honors);




// 5. Lọc danh sách học sinh có số điểm TBHK >= 7 (chỉ cần hiển thị tên).
const studentsAbove7 = students
  .filter((s) => getAverage(s.scores) >= 7)
  .map((s) => s.name);
console.log("Danh sách học sinh có TBHK >= 7:", studentsAbove7);




// let x = 10

// if (true) {
//   x = 5
//   console.log(x)
// }

// console.log(x)

// // 1. Hàm gốc
// const sum = (a, b) => {
//   return a + b
// }

// console.log("Hàm gốc:", sum(1, 2))

// // 2. Hàm sử dụng Arrow Function
// const sumArrow = (a, b) => a + b

// console.log("Hàm Arrow:", sumArrow(1, 2))



// Template Literals
// const lastName = 'Cao'
// const firstName = 'Sơn'
// const fullName = `Họ và tên tôi ${lastName} ${firstName}`
// console.log(fullName)


// const product = "Laptop"
// const price = 1500
// const vat = 0.1
// const totalPrice = price + (price * vat)

// const invoice = `Sản phẩm: ${product}
// Giá: ${price}
// VAT: ${vat}
// Tổng tiền: ${totalPrice}`

// console.log(invoice)

// // map()
// let numberMap = [1, 2, 3, 4, 5] 
// let updatedNumber = numberMap.map(number => number * 2)
// console.log(updatedNumber)


// // filer()
// let numberFilter = [1, 2, 3, 4, 5] 
// let filterNumber = numberFilter.filter(number => number > 2)
// console.log(filterNumber)


// // find()
// let numberFind = [1, 2, 3, 4, 5] 
// let findNumber = numberFind.find(number => number > 2)
// console.log(findNumber)


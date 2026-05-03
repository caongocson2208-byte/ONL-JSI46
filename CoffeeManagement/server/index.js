require("dotenv").config();
const express   = require("express");
const cors      = require("cors");
const upload    = require("./middleware/muter");
const cloudinary = require("./utils/cloudinary");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Không nhận được file" });
  }

  cloudinary.uploader.upload(req.file.path, { folder: "coffee-products" }, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    res.json({ success: true, data: result });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

const multer = require("multer");
const path = require("path");

let storage;
try {
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/product-images");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
} catch (error) {
  console.log("Multer  error");
}


const upload = multer({ storage: storage });

module.exports = upload;

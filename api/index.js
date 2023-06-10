const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const xlsx = require("xlsx");

const authMiddleware = require("./middleware/authMiddleware.js");

const userController = require("./controllers/userController.js");
const chamcongController = require("./controllers/chamcongController.js");
const phancongController = require("./controllers/phancongController.js");
const checkinoutController = require("./controllers/checkinoutController.js");

const thongbaoController = require("./controllers/thongbaoController.js");
const insuranceController = require("./controllers/insuranceController.js");
const hopdongController = require("./controllers/hopdongController.js");
const chucvuController = require("./controllers/chucvuController.js");
const phongbanController = require("./controllers/phongbanController.js");

const authRoutes = require("./routes/authRoutes");
const phancongRoutes = require("./routes/phancongRoutes");
const userRoutes = require("./routes/userRoutes");
const chucvuRoutes = require("./routes/chucvuRoutes");
const bangcapRoutes = require("./routes/bangcapRouters.js");
const phongbanRoutes = require("./routes/phongbanRoutes");
const bonusRoutes = require("./routes/khenthuongRoutes.js");
const kyluatRoutes = require("./routes/kyluatRoutes.js");
const baohiemRoutes = require("./routes/baohiemRoutes.js");
const chamcongRoutes = require("./routes/chamcongRoutes.js");

const hopdongRoutes = require("./routes/hopdongRoutes");
const checkinoutRoutes = require("./routes/checkinoutRoutes.js");
const thongbaoRoutes = require("./routes/thongbaoRoutes.js");
const insuranceRoutes = require("./routes/insuranceRoutes.js");
const connectDatabase = require("./config/connect_database.js");

dotenv.config();

const app = express();

//middleware
app.use(express.json()); //middleware phan tich va xu ly yeu cau http
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extends: true })); // ngan chan post qua 30mb
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// File Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
//CONNECT DATABASE
connectDatabase();

//ROUTES
app.post(
  "/api/admin/danhsachnhanvien/create",
  authMiddleware.verifyTokenIsAdmin,
  upload.single("hinhanh"),
  userController.createUser
);
app.put(
  "/api/admin/danhsachnhanvien/:id/update",
  authMiddleware.verifyTokenIsAdmin,
  upload.single("hinhanh"),
  userController.updateUser
);
app.post(
  `/api/admin/chamcong/import`,
  authMiddleware.verifyTokenIsAdmin,
  upload.single("fileImport"),
  chamcongController.importFile
);
app.use("/api", authRoutes);
app.use("/api/admin", userRoutes);
app.use("/api/admin", chucvuRoutes);
app.use("/api/admin", phongbanRoutes);
app.use("/api/admin", hopdongRoutes);
app.use("/api/admin", bangcapRoutes);
app.use("/api/admin", bonusRoutes);
app.use("/api/admin", kyluatRoutes);
app.use("/api/admin", baohiemRoutes);
app.use("/api/admin", chamcongRoutes);
app.use("/api/admin", phancongRoutes);
app.use("/api/admin", thongbaoRoutes);
app.use(
  "/api/user/chamcong/:id",
  checkinoutRoutes,
  checkinoutController.getInOut
);
app.use(
  "/api/user/contract/:id",
  hopdongRoutes,
  hopdongController.getHopDongByIdNhanVien
);
app.use(
  "/api/user/insurance/:id",
  insuranceRoutes,
  insuranceController.getInsuranceDetail
);
app.use(
  "/api/user/notification/:id",
  thongbaoRoutes,
  thongbaoController.getNotificationByIdNhanVien
);
app.use(
  "/api/user/notificationunread/:id",
  thongbaoRoutes,
  thongbaoController.getNotificationUnReadByIdNhanVien
);
app.use(
  "/api/user/updatethongbao/:id/:tieude/:thoigiangui",
  thongbaoRoutes,
  thongbaoController.updateNotificationReaded
);
app.use(
  "/api/user/danhsachnhanvien/:id",
  userRoutes,
  userController.getUserInformation
);
app.use(
  "/api/user/nhanvienphongban/:id",
  userRoutes,
  userController.getUserbyIDPhongBan
);
app.use(
  "/api/user/changepassword/:email",
  userRoutes,
  userController.ChangePassword
);
app.use(
  "/api/user/nhanvienchucvu/:id",
  chucvuRoutes,
  chucvuController.getNhanVienChucVu
);
app.use(
  "/api/user/phancongnhanvien",
  phancongRoutes,
  phancongController.CreatePhanCong
);
app.use(
  "/api/user/addphancong",
  phancongRoutes,
  phancongController.AddPhanCong
);
app.use(
  "/api/user/phancong/:emailnhanvien/:ngayPhanCong/:ngayBatDau",
  phancongRoutes,
  phancongController.getDanhSachCongViec
);
app.use(
  "/api/user/xoaphancong/:ngayPhanCong/:value",
  phancongRoutes,
  phancongController.deleteCongViec
);
app.use(
  "/api/user/danhgianhanvien/:ngayPhanCong/:value",
  phancongRoutes,
  phancongController.danhgiaCongViec
);
app.use(
  "/api/user/laydatachamcong/:id",
  chamcongRoutes,
  chamcongController.getHistoryById
);

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log("Server PORT is ", PORT));

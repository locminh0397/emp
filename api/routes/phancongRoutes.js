const express= require('express');
const authMiddleware= require('../middleware/authMiddleware');
const phancongController= require('../controllers/phancongController');
const router = express.Router();
router.post('/phancong/create', authMiddleware.verifyTokenIsAdmin, phancongController.CreatePhanCong)
router.get('/phancong/:id/:ngayphancong/:ngaybatdau', authMiddleware.verifyTokenIsAdmin, phancongController.getDanhSachCongViecByIdNhanVien)
module.exports= router;
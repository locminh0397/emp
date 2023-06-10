const express= require('express');
const authMiddleware= require('../middleware/authMiddleware');
const khenthuongController= require('../controllers/khenthuongController');
const router= express.Router();

router.post('/khenthuong/create', authMiddleware.verifyTokenIsAdmin, khenthuongController.createKhenThuong);
router.get('/khenthuong', authMiddleware.verifyTokenIsAdmin, khenthuongController.getAllKhenThuong);
router.get('/khenthuong/:id', authMiddleware.verifyTokenIsAdmin, khenthuongController.getKhenThuongById);
router.delete('/khenthuong/:id/delete', authMiddleware.verifyTokenIsAdmin, khenthuongController.deleteKhenThuong);
router.put('/khenthuong/:id/update', authMiddleware.verifyTokenIsAdmin, khenthuongController.updateKhenThuong);
router.post('/khenthuong/:id/send', authMiddleware.verifyTokenIsAdmin, khenthuongController.sendKhenThuong);
module.exports= router; 
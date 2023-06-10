const express= require('express');
const authMiddleware= require('../middleware/authMiddleware');
const hopdongController= require('../controllers/hopdongController');
const router= express.Router();

router.get('/hopdong/:id', authMiddleware.verifyTokenIsAdmin, hopdongController.getHopDongByIdNhanVien);
router.get('/hopdong/:id/:idHD', authMiddleware.verifyTokenIsAdmin, hopdongController.getHopDongByIdHopDong);
router.get('/daidienhopdong', authMiddleware.verifyTokenIsAdmin, hopdongController.getDaiDien)
router.post('/hopdong/:id/create', authMiddleware.verifyTokenIsAdmin, hopdongController.createHopDongByIdNhanVien);
router.put('/hopdong/:id/update/:idHD', authMiddleware.verifyTokenIsAdmin, hopdongController.updateHopDongByIdNhanVien);
router.delete('/hopdong/:id/delete/:idHD', authMiddleware.verifyTokenIsAdmin, hopdongController.deleleHopDongByIdNhanVien); 
module.exports= router;
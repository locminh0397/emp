const express= require('express');
const authMiddleware= require('../middleware/authMiddleware');
const insuranceController= require('../controllers/insuranceController');
const router = express.Router();

router.get("/insurance/:id", authMiddleware.verifyToken, insuranceController.getInsuranceDetail);
module.exports= router;
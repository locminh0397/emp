const db = require('../models');
const getInsuranceDetail = async (req, res) => {
    try {
        const { id } = req.params;
        
        const getInsurance = await db.BaoHiem.findOne({
            where: {
                idNhanVien: id
            }
        });
       
        res.status(200).json({ getInsurance });
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}
module.exports = { getInsuranceDetail}
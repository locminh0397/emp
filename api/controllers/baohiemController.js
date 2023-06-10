const db = require('../models');
const { Op } = require('sequelize');
const getNhanVienNotInBaoHiem = async (req, res) => {
    try {
        const [result, metadata] = await db.sequelize.query(
            "SELECT idNhanVien FROM `baohiem`;"
        )
        let dataEmployee = [];
        result.map(item => dataEmployee.push(item.idNhanVien))

        const employee = await db.NhanVien.findAll({
            where: {
                id: {
                    [Op.notIn]: dataEmployee
                }
            }
        })
        res.status(200).json({
            employee
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getBaoHiemById= async(req, res)=>{
    try {
        const {id}= req.params;
        const getBaoHiem= await db.BaoHiem.findOne({
            where:{
                id: id
            },
            include:[{
                model: db.NhanVien
            }]
        });
        res.status(200).json({
            getBaoHiem
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const createBaoHiem = async (req, res) => {
    try {
        const {
            idNhanVien,
            insuranceCode,
            dateStart,
            insurancePremium,
            percentCompany,
            percentEmployee,
            moneyEmployee,
            creator,
            noteInsurance,
            money
        } = req.body;
        await db.BaoHiem.create({
            MaBH: insuranceCode,
            NgayBD: dateStart,
            MucDong: insurancePremium,
            PhanTramLD: percentEmployee,
            PhanTramCT: percentCompany,
            GhiChu: noteInsurance,
            NguoiThucHien: creator,
            NhanVienDong: money,
            idNhanVien: idNhanVien
        })
        res.status(200).json({
            msg:'Bảo hiểm đã được tạo thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const updateBaoHiem= async(req, res)=>{
    try {
        const { id }= req.params;
        const {
      
            insuranceCode,
            dateStart,
            insurancePremium,
            percentCompany,
            percentEmployee,
            moneyEmployee,
            creator,
            noteInsurance,
            money
        } = req.body;
        await db.BaoHiem.update({
            MaBH: insuranceCode,
            NgayBD: dateStart,
            MucDong: insurancePremium,
            PhanTramLD: percentEmployee,
            PhanTramCT: percentCompany,
            GhiChu: noteInsurance,
            NguoiThucHien: creator,
            NhanVienDong: money,
       
        },{
            where:{
                id:id
            }
        })
        res.status(200).json({
            msg:'Bảo hiểm đã được cập nhật thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getBaoHiem= async(req, res)=>{
    try {
        const getBaoHiem= await db.BaoHiem.findAll({
            include:[{
                model:db.NhanVien
            }]
        })
        res.status(200).json({
            getBaoHiem
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const deleteBaoHiem= async(req, res)=>{
    try {
        const {id}= req.params;
        await db.BaoHiem.destroy({
            where:{
                id:id
            }
        })
        res.status(200).json({
            msg:'Bảo hiểm đã được xóa thành công.'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
module.exports = {
    getNhanVienNotInBaoHiem,
    createBaoHiem,
    getBaoHiem,
    deleteBaoHiem,
    getBaoHiemById,
    updateBaoHiem
}
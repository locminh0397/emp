const db = require('../models');
const createKyLuat = async (req, res) => {
    try {
        const {
            punishCode,
            decisionNumber,
            dateDecision,
            title,
            mouth,
            moneyPunish,
            contentPunish,
            idNhanVien,
        }= req.body;
        await db.KyLuat.create({
            MaKL: punishCode,
            SoQD: decisionNumber,
            NgayQD: dateDecision,
            TieuDe:title,
            NoiDung:contentPunish,
            Thang: mouth,
            TienPhat: moneyPunish
        });
        const getKyLuat= await db.KyLuat.findOne({
            where:{
                MaKL: punishCode
            }
        })
 
        for (let i=0; i<idNhanVien.length;i++){
            await db.NhanVienKyLuat.create({
                idNhanVien: idNhanVien[i].value,
                idKyLuat: getKyLuat.id,
                NgayTao: new Date()
            })
        }
        res.status(200).json({
            msg: "Kỷ luật đã được tạo thành công"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getAllKyLuat= async(req, res)=>{
    try {
        const getKyLuat= await db.KyLuat.findAll();
        res.status(200).json({
            getKyLuat
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getKyLuatById= async(req, res)=>{
    try {
        const {id}= req.params;
        const getKyLuat = await db.KyLuat.findOne({
            where:{
                id: id
            },
            include:[{
                model: db.NhanVien,
                as:'nhanvien',
            }]
        })
        res.status(200).json({
            getKyLuat
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}
const deleteKyLuat= async (req, res)=>{
    try {
        const {id}= req.params;
        await db.KyLuat.destroy({
            where: {
                id: id
            }
        })
        res.status(200).json({
            msg:'Kỷ luật đã được xóa thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const updateKyLuat= async(req, res)=>{
    try {
        const {id}= req.params;
        const {
            punishCode,
            decisionNumber,
            dateDecision,
            title,
            mouth,
            moneyPunish,
            contentPunish,
            idNhanVien,
        }= req.body;
        await db.KyLuat.update({
            MaKL: punishCode,
            SoQD: decisionNumber,
            NgayQD: dateDecision,
            TieuDe:title,
            NoiDung:contentPunish,
            Thang: mouth,
            TienPhat: moneyPunish
        },{
            where:{
                id: id
            }
        })
        let dataOld=[] // Chua id cua bang cu
        let dataUpdate=[]// Chua id cua form update
        idNhanVien.map(item=>dataUpdate.push(item.value))
  
        const getNhanVienByIdKyLuat= await db.NhanVienKyLuat.findAll({
            where:{
                idKyLuat: id
            }
        })
        
        for (let i=0;i<getNhanVienByIdKyLuat.length;i++){
            dataOld.push(getNhanVienByIdKyLuat[i].dataValues.idNhanVien)
        }
        let dataNewUpdate= dataUpdate.filter(element=>!dataOld.includes(element));// chua id can tao moi
        let dataDelete= dataOld.filter(element=>!dataUpdate.includes(element)); // chua id can xoa
        await dataNewUpdate.map(item=> db.NhanVienKyLuat.create({
            idNhanVien: item,
            idKyLuat: id,
            NgayTao: new Date()
        }))
        await dataDelete.map(item=> db.NhanVienKyLuat.destroy({
            where:{
                idNhanVien: item,
                idKyLuat: id
            }
        }))
        res.status(200).json({
            msg:'Khen thưởng đã cập nhật thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const sendKyLuat= async(req, res)=>{
    try {
        const { id } = req.params;
        const getKyLuat = await db.KyLuat.findOne({
            where: {
                id: id
            },
            include: [{
                model: db.NhanVien,
                as: 'nhanvien',
            }]
        });
        const newNotification= await db.ThongBao.create({
            TieuDe: getKyLuat.TieuDe,
            NoiDung: getKyLuat.NoiDung,
            TrangThai:'Đã gửi',
            ThoiGianGui: new Date()
        })
        for (let i = 0; i < getKyLuat.nhanvien.length; i++) {
            await db.NhanVienThongBao.create({
                idNhanVien: getKyLuat.nhanvien[i].id,
                idThongBao: newNotification.id,
            })
        }
        res.status(200).json({
            msg:'Thông báo kỷ luật đã được gửi'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
module.exports = {
    createKyLuat,
    getAllKyLuat,
    deleteKyLuat,
    getKyLuatById,
    updateKyLuat,
    sendKyLuat
}
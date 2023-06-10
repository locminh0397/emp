const db = require('../models');
const createKhenThuong = async (req, res) => {
    try {
        const {
            bonusCode,
            decisionNumber,
            dateDecision,
            title,
            mouth,
            moneyBonus,
            contentBonus,
            idNhanVien,
        } = req.body;
        await db.KhenThuong.create({
            MaKT: bonusCode,
            SoQD: decisionNumber,
            NgayQD: dateDecision,
            TieuDe: title,
            NoiDung: contentBonus,
            Thang: mouth,
            TienThuong: moneyBonus
        });
        const getKhenThuong = await db.KhenThuong.findOne({
            where: {
                MaKT: bonusCode
            }
        })

        for (let i = 0; i < idNhanVien.length; i++) {
            await db.NhanVienKhenThuong.create({
                idNhanVien: idNhanVien[i].value,
                idKhenThuong: getKhenThuong.id,
                NgayTao: new Date()
            })
        }
        res.status(200).json({
            msg: "Khen thưởng đã được tạo thành công"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getAllKhenThuong = async (req, res) => {
    try {
        const getKhenThuong = await db.KhenThuong.findAll();
        res.status(200).json({
            getKhenThuong
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getKhenThuongById = async (req, res) => {
    try {
        const { id } = req.params;
        const getKhenThuong = await db.KhenThuong.findOne({
            where: {
                id: id
            },
            include: [{
                model: db.NhanVien,
                as: 'nhanvien',
            }]
        })
        res.status(200).json({
            getKhenThuong
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const deleteKhenThuong = async (req, res) => {
    try {
        const { id } = req.params;
        await db.KhenThuong.destroy({
            where: {
                id: id
            }
        })
        res.status(200).json({
            msg: 'Khen thưởng đã được xóa thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const updateKhenThuong = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            bonusCode,
            decisionNumber,
            dateDecision,
            title,
            mouth,
            moneyBonus,
            contentBonus,
            idNhanVien,
        } = req.body;
        await db.KhenThuong.update({
            MaKT: bonusCode,
            SoQD: decisionNumber,
            NgayQD: dateDecision,
            TieuDe: title,
            NoiDung: contentBonus,
            Thang: mouth,
            TienThuong: moneyBonus
        }, {
            where: {
                id: id
            }
        })
        let dataOld = [] // Chua id cua bang cu
        let dataUpdate = []// Chua id cua form update
        idNhanVien.map(item => dataUpdate.push(item.value))

        const getNhanVienByIdKhenThuong = await db.NhanVienKhenThuong.findAll({
            where: {
                idKhenThuong: id
            }
        })

        for (let i = 0; i < getNhanVienByIdKhenThuong.length; i++) {
            dataOld.push(getNhanVienByIdKhenThuong[i].dataValues.idNhanVien)
        }
        let dataNewUpdate = dataUpdate.filter(element => !dataOld.includes(element));// chua id can tao moi
        let dataDelete = dataOld.filter(element => !dataUpdate.includes(element)); // chua id can xoa
        await dataNewUpdate.map(item => db.NhanVienKhenThuong.create({
            idNhanVien: item,
            idKhenThuong: id,
            NgayTao: new Date()
        }))
        await dataDelete.map(item => db.NhanVienKhenThuong.destroy({
            where: {
                idNhanVien: item,
                idKhenThuong: id
            }
        }))
        res.status(200).json({
            msg: 'Khen thưởng đã cập nhật thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const sendKhenThuong = async (req, res) => {
    try {
        const { id } = req.params;
        const getKhenThuong = await db.KhenThuong.findOne({
            where: {
                id: id
            },
            include: [{
                model: db.NhanVien,
                as: 'nhanvien',
            }]
        });
        const newNotification= await db.ThongBao.create({
            TieuDe: getKhenThuong.TieuDe,
            NoiDung: getKhenThuong.NoiDung,
            TrangThai:'Đã gửi',
            ThoiGianGui: new Date()
        })
        for (let i = 0; i < getKhenThuong.nhanvien.length; i++) {
            await db.NhanVienThongBao.create({
                idNhanVien: getKhenThuong.nhanvien[i].id,
                idThongBao: newNotification.id,
            })
        }
        res.status(200).json({
            msg:'Thông báo khen thưởng đã được gửi'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
module.exports = {
    createKhenThuong,
    getAllKhenThuong,
    deleteKhenThuong,
    getKhenThuongById,
    updateKhenThuong,
    sendKhenThuong
}
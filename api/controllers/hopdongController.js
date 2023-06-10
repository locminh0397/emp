const db = require('../models');
const { Sequelize, Model, DataTypes, Op } = require('sequelize');
//Lay Hop Dong Cua Nhan Vien
const getHopDongByIdNhanVien = async (req, res) => {
    try {
        const { id } = req.params;
        const getHD = await db.HopDong.findAll({
            where: {
                idNhanVien: id
            },
        });
       
       
        const dataHD=[]
        for (let i=0;i<getHD.length;i++){
            const user= await db.NhanVien.findOne({
                where: {
                    id: getHD[i].idDaiDien
                }
            })
            dataHD.push({
                ...getHD[i].dataValues,
                user: user
            })
        }
    
        res.status(200).json({
            hopdong: dataHD
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
};
//Lay thong tin hop dong theo idNhanVien và id HD
const getHopDongByIdHopDong= async(req, res)=>{
    try {
     
        const {id, idHD}=req.params;

        const contract= await db.HopDong.findOne({
            where:{
                id: idHD
            },
            include:[{
                model: db.NhanVien
            }]
        });
        res.status(200).json({
            contract

        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
//Tao Hop Dong cho Nhan Vien
const createHopDongByIdNhanVien = async (req, res) => {

    try {

        const { id } = req.params;
        const {
            idDaiDien,
            mahd,
            tenhopdong,
            loaihopdong,
            thoihan,
            luongcoban,
            hesoluong,
            cachtra,
            ngaytra,
            ghichu
        } = req.body;
        await db.HopDong.create({
            idDaiDien: idDaiDien,
            MaHD: mahd,
            TenHD: tenhopdong,
            LoaiHD: loaihopdong,
            ThoiHan: thoihan,
            LuongCoBan: luongcoban,
            HeSoLuong: hesoluong,
            CachTra: cachtra,
            VaoNgay: ngaytra,
            NoiDung: ghichu,
            idNhanVien: id
        });

        // await db.HopDong.create({
        //     SoQD: SoQD,
        //     TieuDe: TieuDe,
        //     NgayKy: NgayKy,
        //     NgayBatDau: NgayBatDau,
        //     NgayKetThuc: NgayKetThuc,
        //     NoiDung: NoiDung,
        //     idNhanVien: id
        // })
        res.status(200).json({
            msg: "Hợp đồng đã được tạo thành công"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
};
// Lay dai dien hop dong ben A
const getDaiDien = async (req, res) => {
    try {
        const userDaiDien = await db.NhanVien.findAll({
            include: [{
                model: db.ChucVu,
                as: 'chucvu',
                through: {
                    attributes: ['NgayKetThuc', 'NgayBatDau'],
                    where: {
                        NgayKetThuc: null
                    }
                }
            }],

        })

        let dataDaiDien = userDaiDien.filter(item => item.dataValues.chucvu.length != 0)

        res.status(200).json({
            dataDaiDien
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const updateHopDongByIdNhanVien = async (req, res) => {
    try {
        const { id, idHD } = req.params;
        const {
            idDaiDien,
            mahd,
            tenhopdong,
            loaihopdong,
            thoihan,
            luongcoban,
            hesoluong,
            cachtra,
            ngaytra,
            ghichu
        } = req.body;
        await db.HopDong.update({
            idDaiDien: idDaiDien,
            MaHD: mahd,
            TenHD: tenhopdong,
            LoaiHD: loaihopdong,
            ThoiHan: thoihan,
            LuongCoBan: luongcoban,
            HeSoLuong: hesoluong,
            CachTra: cachtra,
            VaoNgay: ngaytra,
            NoiDung: ghichu,

        }, {
            where: {
                idNhanVien: id,
                id: idHD
            }
        });
     
        res.status(200).json({
            msg: "Hợp đồng đã được cập nhật thành công",
       
        })
    } catch (err) {
        res.status(500).json({
            error: error.message
        })
    }
}
const deleleHopDongByIdNhanVien= async(req, res)=>{
    try {
        const {id, idHD}= req.params;
        await db.HopDong.destroy({
            where:{
                idNhanVien: id,
                id: idHD
            }
        })
        res.status(200).json({
            msg:'Hợp đồng đã được xóa thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
module.exports = { getHopDongByIdNhanVien, createHopDongByIdNhanVien, updateHopDongByIdNhanVien, getDaiDien,deleleHopDongByIdNhanVien, getHopDongByIdHopDong }
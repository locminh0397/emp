const db = require('../models');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize')
const getAllUser = async (req, res) => {
    try {
        const userlist = await db.NhanVien.findAll({
            include: [{ model: db.PhongBan }]
        });

        res.status(200).json({ userlist });
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getDaiDien = async (req, res) => {
    try {

        const getDaiDien = await db.NhanVien.findAll({
            include: [
                {
                    model: db.ChucVu,
                    as: 'chucvu',
                    where: {
                        TenChucVu: {
                            [Op.in]: ['Trưởng phòng', 'Giám đốc']
                        }
                    },
                    through: {
                        where: {
                            NgayKetThuc: {
                                [Op.is]: null
                            }
                        }
                    }

                }
            ]
        })
        res.status(200).json({
            getDaiDien
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getUserInformation = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db.NhanVien.findOne({
            where: {
                id: id
            },
            include: [{ model: db.PhongBan }]
        });


        delete user.Password

        var a = user.HoTen.lastIndexOf(' ');
        user.dataValues.hovatendem = user.HoTen.substring(0, a);
        user.dataValues.ten = user.HoTen.substring(a + 1, user.HoTen.length);
        res.status(200).json({
            user
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
//Lay danh sach chuc vu theo nhan vien

const createUser = async (req, res) => {
    try {

        const {
            hovatendem,
            ten,
            email,
            password,
            ngaysinh,
            gioitinh,
            honnhan,
            dantoc,
            quoctich,
            tongiao,
            sodienthoai,
            quequan,
            noio,
            hokhau,
            cccd,
            ngaycap,
            noicap,
            idPhongBan,
            hinhanhPath,
            chucvu
        } = req.body;
        const dataChucVu = chucvu.split(',');
        const checkEmail = await db.NhanVien.findOne({
            where: {
                Email: email
            }
        });
        if (checkEmail) {
            return res.status(400).json({ error: "Email đã được tạo từ trước" });
        }
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        await db.NhanVien.create({
            HoTen: hovatendem + ' ' + ten,
            NgaySinh: ngaysinh,
            Email: email,
            Password: hashPassword,
            GioiTinh: gioitinh,
            HonNhan: honnhan,
            DanToc: dantoc,
            QuocTich: quoctich,
            TonGiao: tongiao,
            SoDT: sodienthoai,
            QueQuan: quequan,
            NoiO: noio,
            HoKhau: hokhau,
            CCCD: cccd,
            NgayCap: ngaycap,
            NoiCap: noicap,
            HinhAnh: hinhanhPath,
            idPhongBan: idPhongBan
        });
        const newUser = await db.NhanVien.findOne({
            where: {
                Email: email
            }
        });
        await dataChucVu.map((item) => {
            db.NhanVienChucVu.create({
                idNhanVien: newUser.id,
                idChucVu: item,
                NgayBatDau: new Date()
            })
        })
        res.status(200).json({ msg: "Nhân viên đã được tạo" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.body.hovatendem) {

            const {
                hovatendem,
                ten,
                email,
                ngaysinh,
                gioitinh,
                honnhan,
                dantoc,
                quoctich,
                tongiao,
                sodienthoai,
                quequan,
                noio,
                hokhau,
                cccd,
                ngaycap,
                noicap,
                idPhongBan,
                chucvu,
            } = req.body;
            const checkEmail = await db.NhanVien.findOne({
                where: {
                    Email: email
                }
            })
            if (checkEmail && checkEmail.id != id) {
                return res.status(400).json({ error: "Email đã được tạo" })
            }
            if (chucvu.length !== 0) {
                const dataChucVu = chucvu.split(',');

                await dataChucVu.map((item) => {
                    db.NhanVienChucVu.create({
                        idNhanVien: id,
                        idChucVu: item,
                        NgayBatDau: new Date()
                    })
                })
            }
            await db.NhanVien.update({
                HoTen: hovatendem + ' ' + ten,
                NgaySinh: ngaysinh,
                Email: email,

                GioiTinh: gioitinh,
                HonNhan: honnhan,
                DanToc: dantoc,
                QuocTich: quoctich,
                TonGiao: tongiao,
                SoDT: sodienthoai,
                QueQuan: quequan,
                NoiO: noio,
                HoKhau: hokhau,
                CCCD: cccd,
                NgayCap: ngaycap,
                NoiCap: noicap,
                idPhongBan: idPhongBan
            }, {
                where: {
                    id: id
                }
            });

            res.status(200).json({ msg: "Cập nhật nhân viên thành công" });
        } else {

            const {
                hinhanhPath
            } = req.body;
            await db.NhanVien.update({
                HinhAnh: hinhanhPath
            }, {
                where: {
                    id: id
                }
            })
            res.status(200).json({ msg: "Cập nhật avatar thành công" });
        }



    } catch (err) {
        res.status(500).json({ error: err.message })
    }

}
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const checkUserAdmin = await db.NhanVien.findOne({
            where: {
                id: id
            }
        });
        if (checkUserAdmin.isAdmin) return res.status(404).json({
            error: "Không thể xóa nhân viên Admin"
        })
        await db.NhanVien.destroy({
            where: {
                id: id
            }
        });
        res.status(200).json({
            msg: "Nhân viên đã được xóa",
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
const getUserbyIDPhongBan = async (req, res) => {   
    try {
     const nhanViens = await db.NhanVien.findAll({
     
     include: [
       {
         model: db.PhongBan,
         where: { id: req.params.id},
       },
       {
         model: db.ChucVu,
         as: 'chucvu',
         where: { TenChucVu: 'Nhân Viên' },
       },
     ],
   });
   res.status(200).json({nhanViens})
} 
catch (error) {
 console.error(error);
 res.status(500).json({ message: "Internal server error" });
}
}
const ChangePassword = async (req, res) => {
    const newpassword= req.body.newpassword; 
    try { 
      await db.NhanVien.update(
      {
        Password : bcrypt.hashSync(newpassword, 10)
      },{
        where: {          
          Email : req.params.email,             
        }
      }
        
    );
    res.status(200).json({ msg: "Mật khẩu đã được thay đổi" });
  } catch (error) {
    res.status(500).json({
        error: error.message
    })
  
  }
  }
module.exports = { getAllUser, getUserInformation, createUser, updateUser, deleteUser, getDaiDien,getUserbyIDPhongBan,ChangePassword }
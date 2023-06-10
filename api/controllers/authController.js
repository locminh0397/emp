const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.NhanVien.findOne({
      where: {
        Email: email,
      },
    });
    if (!user)
      return res.status(400).json({ error: "Tài khoản không tồn tại" });

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) return res.status(400).json({ error: "Mật khẩu sai " });

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET
    );
    delete user.Password;

    const machucvu = await db.NhanVienChucVu.findAll({
      where: {
        idNhanVien: user.id,
        NgayKetThuc: null,
      },
    });
    const tenchucvu = [];
    for (const item of machucvu) {
      const chucvu = await db.ChucVu.findOne({
        where: {
          id: item.idChucVu,
        },
      });
      const ten_chucvu = chucvu.TenChucVu;
      if (!tenchucvu.includes(ten_chucvu)) {
        tenchucvu.push(ten_chucvu);
      }
    }
    const phongban = await db.PhongBan.findOne({
      where: {
        id: user.idPhongBan,
      },
    });
    const tenphongban = phongban.TenPB;
    res.status(200).json({ user, token, tenchucvu, tenphongban });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
const password = async (req, res) => {
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    res.status(201).json(passwordHash);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
module.exports = { login, password };

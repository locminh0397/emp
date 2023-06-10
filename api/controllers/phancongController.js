const db = require('../models');
const moment = require('moment');

const formatday =(day)=>{
  const isoDate = moment(day, 'DD/MM/YYYY').toISOString();
  return(isoDate)
}
const AddPhanCong = async (req, res) => {   
  const { email,startDate,endDate }=req.body; 
          const user = await db.NhanVien.findOne({
              where: {
                  Email: email
              },
          });                        
          try {

              const getidphancong = await db.PhanCong.findOne({
                  where: {
                      NgayBatDau: formatday(startDate),
                      idNhanVien: user.id,
                  },
              });
              if (!getidphancong) 
              {   
                   await db.PhanCong.create({
                      NgayBatDau : formatday(startDate),
                      NgayKetThuc : formatday(endDate),
                      idNhanVien : user.id,
                  });                 
                  res.status(200).json({ msg: "Phân công đã được tạo" });    
              }    
              else  {                  
                  res.status(200).json({ msg: "Phân công đã được tạo" });     
              }   
                                    
            } catch (error) {
              res.status(500).json({ message: error.message });
            }          
        
}
const CreatePhanCong = async (req, res) => {   
    const { ngayphancong,email,congviec,startDate,endDate }=req.body; 
             const user = await db.NhanVien.findOne({
                where: {
                    Email: email
                },
            });                        
            try {
                const getidphancong = await db.PhanCong.findOne({
                    where: {
                        NgayBatDau: formatday(startDate),
                        idNhanVien: user.id,
                    },
                });
               
                 {
                     await db.PhanCongTheoNgay.create({
                        NgayPhanCong : formatday(ngayphancong),
                        TenCV : congviec,
                        idPhanCong : getidphancong.id,
                    });    
                    res.status(200).json({ msg: "Công việc đã được tạo" });   
                    } 
                                      
              } catch (error) {
                res.status(500).json({ message: error.message });
              }          
          
}
const getDanhSachCongViec =  async (req, res) => {
    const user = await db.NhanVien.findOne({
        where: {
            Email: req.params.emailnhanvien
        },
    });   
    try {
      const phancong = await db.PhanCong.findOne({
        where: { 
          NgayBatDau : formatday(req.params.ngayBatDau),
          idNhanVien: user.id },
      });

      if (!phancong) {
        return res.status(404).send('Không tìm thấy thông tin phân công');
      }
      const phancongtheongay = await db.PhanCongTheoNgay.findAll({
        where: { NgayPhanCong: formatday(req.params.ngayPhanCong), idPhanCong: phancong.id },
      });
      const tencv = phancongtheongay.map((pc) => ({
        TenCV: pc.TenCV,
        KPI: pc.KPI,
      }));   
      res.status(200).json(tencv)   
         } catch (err) {
      res.status(500).send('Lỗi server');
    }
  }

  const getDanhSachCongViecByIdNhanVien =  async (req, res) => {
       
      try {
        const phancong = await db.PhanCong.findOne({
          where: { 
            NgayBatDau : formatday(req.params.ngaybatdau),
            idNhanVien: req.params.id },
        });
  
        if (!phancong) {
          return res.status(404).send('Không tìm thấy thông tin phân công');
        }
        const phancongtheongay = await db.PhanCongTheoNgay.findAll({
          where: { NgayPhanCong: formatday(req.params.ngayphancong), idPhanCong: phancong.id },
        });
        const tencv = phancongtheongay.map((pc) => ({
          TenCV: pc.TenCV,
          KPI: pc.KPI,
        }));   
        res.status(200).json(tencv)   
           } catch (err) {
        res.status(500).send('Lỗi server');
      }
    }
  const deleteCongViec = async (req, res) => {
   
  try {           
    await db.PhanCongTheoNgay.destroy({
        where: {
          NgayPhanCong : formatday(req.params.ngayPhanCong),
          TenCV : req.params.value,             
        }
    })
    res.status(200).json({ msg: "Công việc đã được xóa" });
} catch (error) {
    res.status(500).json({
        error: error.message
    })
}
}
const danhgiaCongViec = async (req, res) => {
  const kpi= req.body.kpi; 
  try { 
    await db.PhanCongTheoNgay.update(
    {
      KPI : `${kpi}%` 
    },{
      where: {
        NgayPhanCong : formatday(req.params.ngayPhanCong),
        TenCV : req.params.value,             
      }
    }
      
  );
  res.status(200).json({ msg: "Công việc đã được update" });
} catch (error) {
  res.status(500).json({
      error: error.message
  })

}
}

module.exports = {  CreatePhanCong,getDanhSachCongViec, deleteCongViec , AddPhanCong, danhgiaCongViec,getDanhSachCongViecByIdNhanVien}
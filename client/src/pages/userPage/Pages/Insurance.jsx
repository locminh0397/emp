import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Header } from '../components';


const Insurance = () => {
  const [dataBH, setDataBH] = useState(null);// Lay du lieu data tu api
  const getBH = async (id, token) => {
    const res = await fetch(`/api/user/insurance/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    setDataBH(data);
  }
  
  const token = useSelector((state) => state.token);
  const userid = useSelector((state) => state.user.id);
  const user = useSelector((state) => {
    return state.user;
  })
  const chucvu = useSelector((state) => {
    return state.chucvu;
  })
  const phongban = useSelector((state) => {
    return state.phongban;
  });
  useEffect(() => {
    getBH(userid, token);
  }, []) 
  if (!dataBH) return null
  if (!(dataBH.getInsurance)) return null
  return (
    <div className="bg-white border shadow-sm m-2 z mt-24 p-2 md:p-10 rounded-3xl">
      <Header title="Hồ Sơ BHXH" />      
      <form >
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, marginRight: "10px",fontWeight :900 }}>
            Nhân Viên <br></br>
            Chức Vụ <br></br>
            Phòng Ban <br></br>
            Tham Chiếu <br></br>
          </div>
          <div style={{ flex: 1, marginRight: "10px", }}>
            {user.HoTen} <br></br>
            {chucvu} <br></br>
            {phongban} <br></br>
            {dataBH.getInsurance.MaBH}<br></br>
          </div>
          <div style={{ flex: 1, marginRight: "10px",fontWeight :900  }}>
            Ngày bắt đầu <br></br>
            Mức đóng <br></br>
            Người LĐ đóng <br></br>
            Người sử dụng LĐ đóng <br></br>
          </div>
          <div style={{ flex: 1, }}>
            {dataBH.getInsurance.NgayBD} <br></br>
            {dataBH.getInsurance.MucDong} <br></br>
            {dataBH.getInsurance.NhanVienDong}<br></br>
            {dataBH.getInsurance.PhanTramCT} %<br></br>
          </div>
        </div>    
      </form>
    </div>

  );
};

export default Insurance;

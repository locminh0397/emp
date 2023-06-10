import { useState, useEffect } from "react";
import Tippy from "@tippyjs/react/headless";
import { useStateContext } from "context/ContextProvider";
import ButtonNotification from "./ButtonNotification";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Notification = ({ icon, color, numNotice = 0, dotColor }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token); // Lay token kiem tra xac thuc
  const user = useSelector((state) => state.user); // Lay token kiem tra xac thuc
  const { currentColor } = useStateContext();
  const [dataTB, setDataTB] = useState(null); // Lay du lieu data tu api
  let chuaxem = 0;

  const handleClick = async (events) => {
    const tieude = events.target.value;
    const thoigiangui = events.target.id;
    const id = user.id;

    await fetch(`/api/user/updatethongbao/${id}/${tieude}/${thoigiangui}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tieude, thoigiangui, id }),
    });
    getTB();
  };
  const handleThongBao = () => {
    return navigate("/user/notification");
  };
  const getTB = async () => {
    const res = await fetch(`/api/user/notificationunread/${user.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dataThongbao = await res.json();
    let data = [];
    dataThongbao.getThongBao.forEach((item, index) => {
      if (item.nhanVienThongBao[0].TrangThai === "Chưa xem") {
        data.push({
          STT: index + 1,
          TieuDe: item.TieuDe,
          NoiDung: item.NoiDung,
          NgayThongBao: item.ThoiGianGui,
        });
        chuaxem++;
      }
    });
    setDataTB(data);
  };
  useEffect(() => {
    getTB();
    // thời gian tính bằng miliseconds, 5 phút = 300000 miliseconds
  }, []);

  if (!dataTB) return null;
  return (
    <Tippy
      placement="bottom"
      interactive={true}
      render={(attrs) => {
        return (
          <div className="nav-item bg-white p-4 rounded-lg w-96 border shadow-lg">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg ">Thông Báo</p>
            </div>
            <div className="mt-5">
              {dataTB.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center leading-8 gap-5 border-b-1 border-color p-3"
                  >
                    <div>
                      <button
                        className="font-semibold"
                        value={item.TieuDe}
                        id={item.NgayThongBao}
                        onClick={handleClick}
                      >
                        {item.TieuDe}
                      </button>
                      <p className="text-gray-500 text-sm">
                        {item.NgayThongBao?.slice(0, 10)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5">
              <button
                style={{
                  color: "white",
                  backgroundColor: currentColor,
                  width: "100%",
                  borderRadius: "10px",
                }}
                className="text-md p-3 w-full hover:drop-shadow-xl "
                onClick={handleThongBao}
              >
                Xem tất cả thông báo
              </button>
            </div>
          </div>
        );
      }}
    >
      <button
        type="button"
        style={{ color }}
        className="relative text-2xl rounded-full p-3 hover:bg-light-gray"
      >
        {numNotice == 0 || (
          <span
            style={{ background: dotColor }}
            className="absolute inline-flex justify-center rounded-full h-4 w-4 right-1 top-1 text-0.7 leading-4 text-white "
          >
            {numNotice}
          </span>
        )}

        {icon}
      </button>
    </Tippy>
  );
};

export default Notification;

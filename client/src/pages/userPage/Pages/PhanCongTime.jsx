import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
const moment = require('moment');
import "moment/locale/vi";
moment.locale('vi');
import { useSelector } from "react-redux";
import { useStateContext } from 'context/ContextProvider';

function getMondayOfWeek(year, weekNumber) {
  return moment().year(year).isoWeek(weekNumber).startOf('isoWeek').toDate();
}
function getSaturdayOfWeek(year, weekNumber) {
  return moment().year(year).isoWeek(weekNumber).startOf('isoWeek').add(5, 'days').toDate();
}
function formatday(day) {
  const arr = day.split('/');
  const newStr = arr.join('-');
  return newStr; // "3-5-2023"
}
function increaseDay(day, index) {
  let parts = day.split("/");
  let date = new Date(parts[2], parts[1] - 1, parts[0]);
  // Cộng thêm một ngày bằng phương thức setDate()
  date.setDate(date.getDate() + index);

  // Định dạng lại chuỗi ngày thành dạng "dd/mm/yyyy"
  let newDateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  return newDateString;
}
// Sử dụng hàm để lấy ngày Monday trong tuần hiện tại
const today = new Date();
const monday = getMondayOfWeek(2023, 17);
const getCurrentWeek = () => {
  const now = new Date();
  const startOfWeek = new Date(now.getFullYear(), 0, 1);
  const currentWeek = Math.ceil((((now - startOfWeek) / 86400000) + startOfWeek.getDay() + 1) / 7);


  return currentWeek;
};
const PhanCongTime = (props) => {
  const token = useSelector((state) => state.token);
  const { showNotification } = useStateContext();
  const [phancong, setPhanCong] = useState(false);
  const [kpi, setKPI] = useState(0);
  const [danhgiacongviec, setDanhGiaCongViec] =useState(Array(6).fill().map(() => Array(10).fill(false))) ;
  const [danhgia, setDanhGia] = useState(false);
  const [showTextbox, setShowTextbox] = useState(Array(6).fill(false));
  const [congviec, setCongViec] = useState(Array(6).fill(false));
  const [danhsachcongviec, setDanhsachCongViec] = useState(Array(6).fill([]));
  const [kpis, setKPIs] = useState(Array(6).fill(null));
  const weekOptions = [];
  const currentWeek = getCurrentWeek();
  const currentYear = new Date().getFullYear();
  const start_Date = getMondayOfWeek(currentYear, currentWeek);
  const end_Date = getSaturdayOfWeek(currentYear, currentWeek);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [startDate, setStartDate] = useState(start_Date.toLocaleDateString(('vi-VN')))
  const [endDate, setEndDate] = useState(end_Date.toLocaleDateString(('vi-VN')));

  const fetchData = async () => {
    try {
      const email = props.data.Email;
      const promises = []; // khởi tạo mảng promises để lưu các promise từ việc gọi API
      for (let i = 0; i < 6; i++) {
        const ngayphancong = (increaseDay(startDate, i));

        promises.push(fetch(`/api/user/phancong/${email}/${formatday(ngayphancong)}/${formatday(startDate)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        })); // thêm promise từ việc gọi API vào mảng promises
      }
      const results = await Promise.all(promises); // chờ tất cả các promise trong mảng promises hoàn thành
      const jsonResults = await Promise.all(results.map(res => res.json())); // chuyển đổi các kết quả từ response sang json
      const tenCVs = jsonResults.map((t) => t.map(ten=> (ten.TenCV)));
      const kpis = jsonResults.map((t) => t.map(kpi=> (kpi.KPI)));
      setKPIs(kpis);
      
      setDanhsachCongViec(tenCVs); // gán giá trị cho mảng resultArray
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate]);
  const handleAdd = (event) => {
    setShowTextbox(prevArray => {
      const newArray = [...prevArray];
      newArray[event.target.value] = true;
      return newArray;
    });
  };

  const handleXoaCongViec = async (event) => {
    const value = (event.target.value)
    const index = parseInt(event.target.id);
    const ngaychon = (increaseDay(startDate, index));


    const res = await fetch(`/api/user/xoaphancong/${formatday(ngaychon)}/${value}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const dataRes = await res.json();
    if (dataRes.msg) {
      showNotification('success', dataRes.msg);
    } else {
      showNotification('error', dataRes.error);
    }
    fetchData()
  }
  const handleAddDanhGia= async(event)=>{
    const i = parseInt(event.target.id);
    const index = parseInt(event.target.name);
    const ngaychon = (increaseDay(startDate, index));
    const value = (event.target.value)
    setDanhGiaCongViec(prevArray => {
      const newArray = [...prevArray];
      newArray[index][i] = false;
      return newArray;
    });
    await fetch(`/api/user/danhgianhanvien/${formatday(ngaychon)}/${value}`,
      {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({kpi}),
      }
  ).then(async (res) => {
      const messageRes = await res.json();
      if (messageRes.error) {
          showNotification('error', messageRes.error)
      } else {
          showNotification('success', messageRes.msg)          
      }

  });
  fetchData();

  }
  const handleDanhGiaCongViec = async (event) => {
    const i = parseInt(event.target.id);
    const index = parseInt(event.target.name);
    const value = (event.target.value)
    const ngaychon = (increaseDay(startDate, index));
    setDanhGiaCongViec(prevArray => {
      const newArray = [...prevArray];
      newArray[index][i] = true;
      return newArray;
    });
  }
  const handleEditKPI = async (event) => {
    const i = parseInt(event.target.id);
    const index = parseInt(event.target.name);
    const value = (event.target.value)
    const ngaychon = (increaseDay(startDate, index));
    setDanhGiaCongViec(prevArray => {
      const newArray = [...prevArray];
      newArray[index][i] = true;
      return newArray;
    });
    fetchData();
  }
  const handleAddCongViec = async (event) => {
    const index = parseInt(event.target.value)
    const ngayphancong = (increaseDay(startDate, index))
    const email = props.data.Email;

    setShowTextbox(prevArray => {
      const newArray = [...prevArray];
      newArray[event.target.value] = false;
      return newArray;
    });

    await fetch('/api/user/phancongnhanvien', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ ngayphancong, email, congviec, startDate, endDate }),
    })
      .then(async (res) => {
        const messageRes = await res.json();
        if (messageRes.error) {
          showNotification('error', messageRes.error)

        } else {
          getData(email, ngayphancong, event)
          showNotification('success', messageRes.msg)

        }

      })
  };
  const getData = async (email, ngayphancong, event) => {
    const DSCV = await fetch(`/api/user/phancong/${email}/${formatday(ngayphancong)}/${formatday(startDate)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
    const danhsach = await DSCV.json();
    const tenCVs = danhsach.map(ten=> (ten.TenCV));
    setDanhsachCongViec(prevArray => {
      const newArray = [...prevArray];
      newArray[event.target.value] = tenCVs;
      return newArray;
    });
  }
  const handleTextChange = debounce((event) => {
    setCongViec(event.target.value);
  }, 300);
  const handleTextDanhGiaChange = debounce((event) => {
    setKPI(parseInt(event.target.value));
  }, 300);
  

  const weeksInYear = (year) => {
    const yearEnd = new Date(year, 11, 31);
    const daysInYear = (yearEnd - new Date(year, 0, 1)) / 86400000;
    return Math.ceil((daysInYear + 1) / 7);
  };


  const totalWeeksInYear = weeksInYear(currentYear);
  for (let i = currentWeek; i <= totalWeeksInYear; i++) {
    weekOptions.push({ label: `Tuần ${i}`, value: i });
  }
  const handleSubmit =async () => {
    const email = props.data.Email;
    await fetch('/api/user/addphancong', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({startDate, email, endDate }),
    })
      .then(async (res) => {
        const messageRes = await res.json();
        if (messageRes.error) {
          showNotification('error', messageRes.error)

        } else {          
          showNotification('success', messageRes.msg)
        }

      })
    setPhanCong(true);
    setDanhGia(false);
  }
  const handleDanhGia =async () => {
    setDanhGia(true);
    setPhanCong(false);
  }
  const handleWeekChange = (event) => {
    const selectedWeek = event.target.value;
    setSelectedWeek(selectedWeek);
    const startDate = getMondayOfWeek(currentYear, selectedWeek);
    const endDate = getSaturdayOfWeek(currentYear, selectedWeek);
    setStartDate(startDate.toLocaleDateString(('vi-VN')));
    setEndDate(endDate.toLocaleDateString(('vi-VN')));
  };
  return (
    <div>

      <div className='phancongtime'>
        <select onChange={handleWeekChange}>
          {weekOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div>
          <label>Ngày bắt đầu: </label>
          <input type="text" value={startDate} readOnly />
        </div>
        <div>
          <label>Ngày kết thúc: </label>
          <input type="text" value={endDate} readOnly />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleSubmit}>
          Phân Công
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleDanhGia}>
          Đánh Giá
        </button>


      </div>
      {
        phancong && <div style={{ display: "flex" }}>
          {[...Array(6)].map((_, index) => (
            <div className='ngayphancong' key={index} style={{ flex: 1, textAlign: "center" }}>
              {moment().startOf('isoWeek').add(index, "days").format("dddd").charAt(0).toUpperCase()
                + moment().startOf('isoWeek').add(index, "days").format("dddd").slice(1)
              }
              <div>
                {increaseDay(startDate, index)}
              </div>
              <div>
                {danhsachcongviec[index].map((_, i) => (
                  <div>
                    <label className="flex-auto rounded-md border-0 bg-white/5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"  >
                      {(danhsachcongviec[index][i])}
                    </label>
                    <button
                      id={index}
                      type="submit"
                      value={(danhsachcongviec[index][i])}
                      className="flex-none rounded-md bg-indigo-500 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      onClick={handleXoaCongViec}
                    >
                      Xóa
                    </button>
                  </div>
                ))
                }

                {showTextbox[index] && <div className="flex ">
                  <input
                    id="congviec"
                    name="congviec"
                    type="text"
                    className="flex-auto rounded-md border-0 bg-white/5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    placeholder="Tên công việc"
                    onChange={handleTextChange}
                  />
                  <button
                    type="submit"
                    value={index}
                    className="flex-none rounded-md bg-indigo-500 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    onClick={handleAddCongViec}
                  >
                    Add
                  </button>
                </div>}
                {
                  !showTextbox[index] && <button className="rounded-full bg-blue-500 h-5 w-5 hover:bg-blue-700 text-white font-bold  focus:outline-none focus:shadow-outline "
                    type="submit"
                    value={index}
                    onClick={handleAdd}>
                    +
                  </button>
                }


              </div>


            </div>
          ))}
        </div>
      }
       {
        danhgia && <div style={{ display: "flex" }}>
          {[...Array(6)].map((_, index) => (
            <div className='ngayphancong' key={index} style={{ flex: 1, textAlign: "center" }}>
              {moment().startOf('isoWeek').add(index, "days").format("dddd").charAt(0).toUpperCase()
                + moment().startOf('isoWeek').add(index, "days").format("dddd").slice(1)
              }
              <div>
                {increaseDay(startDate, index)}
              </div>
              <div>
                {danhsachcongviec[index].map((_, i) => (
                  <div className='danhgiakpi'>
                    <label className="flex-auto rounded-md border-0 bg-white/5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"  >
                      {(danhsachcongviec[index][i])}
                    </label>
                    {kpis[index][i] && !danhgiacongviec[index][i]&& <button   
                      id={i}
                      name={index}
                      type="submit"
                      value={(danhsachcongviec[index][i])}                   
                      className="flex-none rounded-md bg-indigo-500 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      onClick={handleEditKPI}
                    >
                      {(kpis[index][i])}
                    </button> }  
                    {!kpis[index][i]&& <button
                      id={i}
                      name={index}
                      type="submit"
                      value={(danhsachcongviec[index][i])}
                      className="flex-none rounded-md bg-indigo-500 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      onClick={handleDanhGiaCongViec}
                    >
                      Đánh giá
                    </button> }  
                    {danhgiacongviec[index][i] && <div className='danhgiacongviec'>
                      <label className="rounded-md border-0 bg-white/5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"  >
                      Đạt 
                      </label> 
                      <input type="text" id="input-box" name="input-box"
                      onChange={handleTextDanhGiaChange}
                      />
                      <label >% KPI</label>
                      <button className="flex-none rounded-md bg-indigo-500 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      id={i}
                      name={index}
                      type="submit"
                      value={(danhsachcongviec[index][i])}
                      onClick={handleAddDanhGia}>
                      OK
                    </button>
                    </div>   }           
                  </div>
                  
                ))
                }                    
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default PhanCongTime;

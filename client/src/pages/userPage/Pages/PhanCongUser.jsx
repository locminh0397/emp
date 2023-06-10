import React, { useState, useEffect } from 'react';
import { Header } from '../components';
const moment = require('moment');
import "moment/locale/vi";
moment.locale('vi');
import { useSelector } from "react-redux";

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
export default function PhanCongUser() {

  const user = useSelector(state => state.user);// Lay token kiem tra xac thuc
  const token = useSelector((state) => state.token);

  const weekOptions = [];
  const currentWeek = getCurrentWeek();
  const currentYear = new Date().getFullYear();
  const start_Date = getMondayOfWeek(currentYear, currentWeek);
  const end_Date = getSaturdayOfWeek(currentYear, currentWeek);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [startDate, setStartDate] = useState(start_Date.toLocaleDateString(('vi-VN')))
  const [endDate, setEndDate] = useState(end_Date.toLocaleDateString(('vi-VN')));
  const [danhsachcongviec, setDanhsachCongViec] = useState(Array(6).fill([]));
  const fetchData = async () => {
    try {
      const email = user.Email;
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
      //setKPIs(kpis);
      
      setDanhsachCongViec(tenCVs); // gán giá trị cho mảng resultArray
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate]);

  const handleWeekChange = (event) => {
    const selectedWeek = event.target.value;
    setSelectedWeek(selectedWeek);
    const startDate = getMondayOfWeek(currentYear, selectedWeek);
    const endDate = getSaturdayOfWeek(currentYear, selectedWeek);
    setStartDate(startDate.toLocaleDateString(('vi-VN')));
    setEndDate(endDate.toLocaleDateString(('vi-VN')));
  };
  const weeksInYear = (year) => {
    const yearEnd = new Date(year, 11, 31);
    const daysInYear = (yearEnd - new Date(year, 0, 1)) / 86400000;
    return Math.ceil((daysInYear + 1) / 7);
  };
  const totalWeeksInYear = weeksInYear(currentYear);
  for (let i = currentWeek; i <= totalWeeksInYear; i++) {
    weekOptions.push({ label: `Tuần ${i}`, value: i });
  }
  return (
    <div className="bg-white border shadow-sm m-2 z mt-24 p-2 md:p-10 rounded-3xl">
      <Header title="Phân Công" />
      <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
        <div className='mt-12 mb-8 flex flex-col gap-12'>
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div className='p-6 px-0 pt-0 pb-2'>
              <div>
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

                  </div>
                  {
                    <div style={{ display: "flex" }}>
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

                              </div>
                            ))
                            }

                          </div>


                        </div>
                      ))}
                    </div>

                  }
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

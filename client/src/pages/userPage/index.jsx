import React from 'react'
import { Route, Routes} from 'react-router-dom';
import { useSelector } from "react-redux";
import NavBar from "../../components/Navbar";
import SideBar from "../../components/Sidebar";
import { useStateContext } from 'context/ContextProvider';
import "../../App.css";
import { Home, Profile, Calendar, Notification, Contract, Insurance, PhanCong,PhanCongUser, ChangePassword } from '../userPage/Pages';
const UserPage = () => {
  const { activeMenu } = useStateContext();
  const ChucVu= useSelector((state)=>{
    if (state.chucvu){   
     return state.chucvu;          
   }else{
     return false;
   }
 });

  return (
    <div className="dashboard overflow-hidden">
   
        <div className='flex relative'>
          {
            activeMenu ? (
              <div className='w-72 fixed sidebar bg-white'>
                <SideBar />
              </div>
            ) : (
              <div className='w-0'>
                <SideBar />
              </div>
            )
          }
          <div className={
            activeMenu ? 'bg-main-bg min-h-screen md:ml-72 w-full overflow-hidden'
              : ' bg-main-bg w-full min-h-screen flex-2 overflow-hidden'
          }>
            <div className="fixed md:static bg-main-bg navbar w-full">
              <NavBar />
            </div>
            <div>
              <Routes>
                <Route path="/dashboard" element={<Home />} />
                <Route path="/" element={<Home/>} />               
                <Route path="/changepassword" element={<ChangePassword/>} />
                <Route path="/contract" element={<Contract />} />
                <Route path="/chamcong" element={<Calendar />} />
                <Route path="/phancong" element={ChucVu.includes("Trưởng phòng") ? <PhanCong/>:<PhanCongUser/>} />
                <Route path="/insurance" element={<Insurance />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notification" element={<Notification />} />
              </Routes>
            </div>
          </div>
        </div>    
    </div>
  );
}

export default UserPage;

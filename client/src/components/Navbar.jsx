import React, { useState,useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useSelector } from 'react-redux';

import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';


import avatar from '../data/avatar.jpg';
import { useStateContext } from '../context/ContextProvider';
import Tippy from '@tippyjs/react/headless';
import ButtonIconSetting from './NavBar/ButtonIconProfile';
import UserProfile from "./NavBar/UserProfile";
import Notification from './NavBar/Notification';
import Chat from './NavBar/Chat';




const NavbarButton = ({ title, actionFunc, icon, color, numNotice = 0, dotColor }) => {
    return (
        <Tippy
            placement='bottom'
            interactive={true}
            render={
                attrs => {
                    return (
                        <div className="relative flex flex-col grow shrink w-23"  {...attrs}>
                            <ButtonIconSetting icon={<RiNotification3Line />} title="Hello wolrd" />
                        </div>
                    )
                }
            } >
            <button
                type="button"
                onClick={actionFunc}
                style={{ color }}
                className="relative text-2xl rounded-full p-3 hover:bg-light-gray"
            >
                {numNotice == 0 || (<span
                    style={{ background: dotColor }}
                    className="absolute inline-flex justify-center rounded-full h-4 w-4 right-1 top-1 text-0.7 leading-4 text-white "
                >
                    {numNotice}
                </span>)
                }

                {icon}



            </button>
        </Tippy>
    );
}
function Navbar() {
    const { currentColor,
        activeMenu,
        setActiveMenu,
    } = useStateContext();

    const handleActiveMenu = () => setActiveMenu(!activeMenu);
    const userAccount = "Tien";
    const token = useSelector(state => state.token);// Lay token kiem tra xac thuc
    const user = useSelector(state => state.user);// Lay token kiem tra xac thuc    
    const [dataTB, setDataTB] = useState(null);// Lay du lieu data tu api
    let chuaxem=0;
    
    const getTB = async () => {
        const res = await fetch(`/api/user/notificationunread/${user.id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
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
    
    }
    useEffect(() => {
        getTB();
    }, [])
   if (!dataTB) return null
   
  


//setCountUnread(chuaxem);


    return (
        
        <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">

            <button onClick={handleActiveMenu} style={{ color: currentColor }} className="relative text-2xl rounded-full p-3 hover:bg-light-gra"><AiOutlineMenu /></button>
            <div className='flex'>
                {/* <NavButton title="Chat" actionFunc={() => handleClick('chat')} color={currentColor}
                    dotColor={currentColor} numNotice={12} icon={<BsChatLeft />} />
                <NavButton  actionFunc={() => handleClick('notification')}
                       /> */}
                
                <Notification numNotice={dataTB.length} color={currentColor} icon={<RiNotification3Line />} dotColor={currentColor} />
                <UserProfile avatar={avatar} userAccount={userAccount} />


            </div>
        </div>
    );
}

export default Navbar;
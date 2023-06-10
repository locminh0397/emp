import React from 'react'
import avatar from 'data/avatar.jpg';
import { useStateContext } from "../../../context/ContextProvider";
import { useState, useEffect } from 'react';
import { FaPen, FaDownload } from "react-icons/fa";

const User = () => {
    const { currentColor, screenSize } = useStateContext();
    // const [iconEdit, setIconEdit] = useState(true);
    // useEffect(() => {
    //     if (screenSize >= 900) {
    //         setIconEdit(false)
    //     }
    // }, [screenSize]);
    return (
        <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
            <div className='flex flex-wrap lg:flex-nowrap justify-between '>
                <div className='p-4 text-xl md:text-2xl font-bold'>
                    <h1>Thông tin của bạn</h1>
                </div>

            </div>
            <div className="relative mt-5 h-72 w-[92%] md:w-full mx-auto overflow-hidden rounded-xl 
            bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] 
            bg-cover bg-center">
                <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
            </div>
            <div className='relative flex flex-col bg-clip-border rounded-xl bg-white w-[85%] md:w-[90%]
            text-gray-700 shadow-md mx-auto -mt-20 mb-6 '>
                <div className="p-4">
                    <div className="mb-10 flex items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <img src={avatar} alt="avatar" className='inline-block relative object-cover object-center 
                            w-[74px] h-[74px] rounded-lg shadow-lg shadow-blue-gray-500/40' />
                            <div>
                                <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug mb-1">Nguyen Danh</h5>
                                <p className="block antialiased font-sans text-sm leading-normal font-normal">Developer</p>
                            </div>
                        </div>

                        <div className="flex justify-center text-center">
                            <button
                                type="button"
                                style={{ backgroundColor: currentColor }}
                                className="flex self-center text-base text-white opacity-0.9 mr-3 p-2 pr-3
                    md:mr-0 md:py-3 md:px-4 md:pr-5
                    hover:drop-shadow-xl rounded-xl  "
                            >
                                <FaDownload className='self-center mr-1 md:mr-2' /> Download report
                            </button>
                        </div>


                    </div>
                    <div className="grid grid-cols-1 gap-12 mb-12 px-4 md:grid-cols-2 ">
                        <div>
                            <div className='relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-none'>
                                <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent 
                            text-gray-700 shadow-none mx-0 mt-0 mb-4 flex items-center justify-between gap-4">
                                    <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed">Thông tin của bạn</h6>
                                </div>
                                <div className="p-0">
                                    <h2 className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold capitalize">Giới thiệu</h2>
                                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">
                                        Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally difficult paths,
                                        choose the one more painful in the short term (pain avoidance is creating an illusion of equality).
                                    </p>
                                    <hr className="my-8 border-blue-gray-50"></hr>
                                    <ul className="flex flex-col gap-2 p-0">
                                        <li className="flex items-center gap-2">
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold capitalize">
                                                Họ và Tên:
                                            </p>
                                            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">
                                                Alec M. Thompson
                                            </p>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold capitalize">
                                                Số Điện thoại:
                                            </p>
                                            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">
                                                (44) 123 1234 123</p>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold capitalize">
                                                Email:
                                            </p>
                                            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">
                                                alecthompson@mail.com
                                            </p>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold capitalize">
                                                Địa Chỉ:
                                            </p>
                                            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">
                                                Thành Phố Hồ Chí Minh
                                            </p>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-3">
                                Công việc đang thực hiện
                            </h6>
                            <ul className="flex flex-col gap-6">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <img src={avatar} alt="Sophie B." className="inline-block relative object-cover object-center w-12 h-12 rounded-lg shadow-lg shadow-blue-gray-500/25" />
                                        <div>
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 mb-1 font-semibold">
                                                Tiêu đề công việc
                                            </p>
                                            <p className="block antialiased font-sans text-xs font-normal text-blue-gray-400">
                                                Ghi chú công việc....
                                            </p>
                                        </div>
                                    </div>
                                    <button className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg text-blue-500 hover:bg-blue-500/10 active:bg-blue-500/30" type="button">
                                        Xem chi tiết
                                    </button>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <img src={avatar} alt="Sophie B." className="inline-block relative object-cover object-center w-12 h-12 rounded-lg shadow-lg shadow-blue-gray-500/25" />
                                        <div>
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 mb-1 font-semibold">
                                                Tiêu đề công việc
                                            </p>
                                            <p className="block antialiased font-sans text-xs font-normal text-blue-gray-400">
                                                Ghi chú công việc....
                                            </p>
                                        </div>
                                    </div>
                                    <button className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg text-blue-500 hover:bg-blue-500/10 active:bg-blue-500/30" type="button">
                                        Xem chi tiết
                                    </button>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <img src={avatar} alt="Sophie B." className="inline-block relative object-cover object-center w-12 h-12 rounded-lg shadow-lg shadow-blue-gray-500/25" />
                                        <div>
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 mb-1 font-semibold">
                                                Tiêu đề công việc
                                            </p>
                                            <p className="block antialiased font-sans text-xs font-normal text-blue-gray-400">
                                                Ghi chú công việc....
                                            </p>
                                        </div>
                                    </div>
                                    <button className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg text-blue-500 hover:bg-blue-500/10 active:bg-blue-500/30" type="button">
                                        Xem chi tiết
                                    </button>
                                </div>
                            </ul>


                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;

import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { BsTrash } from 'react-icons/bs';
import { FiEdit3, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useStateContext } from 'context/ContextProvider';
const TrashIcon = ({ row, ...props }) => {
    return (
        <div className='h-9 w-9 flex justify-center items-center rounded-lg border bg-red-500 cursor-pointer hover:bg-red-700'>
            <BsTrash className='text-base text-white' {...props} />
        </div>
    )
}
const EditIcon = ({ ...props }) => {
    return (
        <div className='h-9 w-9 flex justify-center items-center rounded-lg border bg-yellow-500 cursor-pointer hover:bg-yellow-700'>
            <FiEdit3 className='text-base text-white' {...props} />
        </div>
    )
}
const ViewIcon = ({ ...props }) => {
    return (
        <div className='h-9 w-9 flex justify-center items-center rounded-lg border bg-blue-500 cursor-pointer hover:bg-blue-700'>
            <FiEye className='text-base text-white' {...props} />
        </div>
    );
}
const DepartmentList = () => {
    const [selectedRows, setSelectedRows] = useState();
    const [dataDepartment, setDataDepartment] = useState(null);// Lay du lieu data tu api
    const [searchText, setSearchText] = useState('');// Lay du lieu tim kiem
    const token = useSelector(state => state.token);// Lay token kiem tra xac thuc
  
    const navigate = useNavigate();
    const {showNotification} = useStateContext();
    const getDepartment = async () => {
        const res = await fetch('/api/admin/phongban', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await res.json();
       
        setDataDepartment(data);
    }
    useEffect(() => {
        getDepartment();
    }, [])
    let data = [];
    if (!dataDepartment) return null;
    dataDepartment.getPhongBan.map((item, index) => {
        data.push({
            id: item.id,
            stt: index,
            departmentCode: item.MaPB,
            title: item.TenPB,
            numberEmployee: item.SoLuong,
            tel: item.SoDienThoai
        })

    }
    )

    const filteredData = data.filter((row) => {
        return (
            row.title.toLowerCase().includes(searchText.toLowerCase())
        )
    })
    const customStyle = {
        rows: {
            style: {
                fontSize: '14px',
                fontWeight: '600'
            }
        },
        headCells: {
            style: {
                fontSize: '16px',
                fontWeight: 'bold'
            }
        }
    }
    const columns = [
        {
            name: 'STT',
            selector: row => row.stt,
            sortable: true,
            width: '80px'
        },
        {
            name: 'Mã phòng ban',
            selector: row => row.departmentCode,
            sortable: true,
        },
        {
            name: 'Tên phòng ban',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Số lượng',
            selector: row => row.numberEmployee,
            sortable: true,
        },
        {
            name: 'Số điện thoại',
            selector: row => row.tel,
            sortable: true,
        },
        {
            name: 'Thao tác',
            cell: (row) => {
                return (
                    <div className='flex gap-1 pr-2'>
                        <TrashIcon onClick={() => handleDelete(row.id)} />
                        <EditIcon onClick={() => handleEdit(row.departmentCode)} />
                        <ViewIcon onClick={() => handleView(row.id)} />
                    </div>
                );
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        }
    ]
    const handleEdit = async (id) => {
        navigate(`/admin/department/${id}/update`);
        // Xử lý khi người dùng click vào nút chỉnh sửa
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn chắc chắn muốn xóa phòng ban này?")){
            const res= await fetch(`/api/admin/phongban/${id}/delete`,{
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const dataRes= await res.json();
            if (dataRes.msg){
                getDepartment();
                showNotification('success', dataRes.msg);
            }else{
                showNotification('error', dataRes.error);
            }
           
        }
        
        

    }

    const handleView = (id) => {
        // Xử lý khi người dùng click vào nút xem chi tiết
    };
    const handleCreateDepartment = () => {
        navigate('/admin/department/create');
    }
    return (
        <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
           
            <div className='flex flex-wrap lg:flex-nowrap justify-between '>
                <div className='p-4 text-xl md:text-2xl font-bold'>
                    <h1>Trang phòng ban</h1>
                </div>
                <div className="flex justify-center text-center">
                    {/* <button
            type="button"
            style={{ backgroundColor: currentColor }}
            className="flex self-center text-base text-white opacity-0.9 mr-3 p-2 pr-3
            md:mr-0 md:py-3 md:px-4 md:pr-5
            hover:drop-shadow-xl rounded-xl  "
        >
            <FaDownload className='self-center mr-1 md:mr-2' /> Download report
        </button> */}
                </div>
            </div>
            <div className='mt-12 mb-8 flex flex-col gap-12'>
                <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
                    <div className="relative flex justify-between bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-8 p-6">
                        <h6 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-relaxed text-white">
                            Danh sách phòng ban
                        </h6>
                        <button
                            onClick={handleCreateDepartment}
                            className='py-3 px-8 bg-red-500 rounded-full text-white font-bold  text-base transform hover:translate-y-1 transition-all duration-500'>
                            Tạo phòng ban
                        </button>
                    </div>
                    <div className='p-6 px-0 pt-0 pb-2'>
                        {/* {successNotification && (<div className='mx-6 mb-3 px-4 py-3 border rounded-lg bg-green-600 text-xl text-white'>{successNotification}</div>)} */}
                        <DataTable
                            className='overflow-auto'
                            customStyles={customStyle}
                            responsive
                            columns={columns}
                            data={filteredData}
                            selectableRows
                            onSelectedRowsChange={setSelectedRows}
                            pagination
                            paginationPerPage={10}
                            paginationComponentOptions={[10, 20, 30]}
                            highlightOnHover
                            selectableRowsHighlight
                            subHeader
                            subHeaderComponent={[
                                <input
                                    key="search"
                                    type="text"
                                    className='p-2 mr-3 rounded-lg text-base border-2 hover:border-blue-700 focus-visible:border-blue-700 mb-2 md:mb-0'
                                    placeholder='Tìm kiếm...'
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />,
                            ]}
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DepartmentList

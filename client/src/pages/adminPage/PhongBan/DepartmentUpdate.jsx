import { useState, useEffect } from 'react';
import InputText from 'components/input/InputText';
import SelectInput from 'components/input/SelectInput';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { useStateContext } from 'context/ContextProvider';
import DataTable from 'react-data-table-component';
import * as yup from "yup";
const createDepartmentSchema = yup.object().shape({
    departmentCode: yup.string().required('required'),
    nameDepartment: yup.string().required('Xin nhập tên phòng ban'),
    numberDepartment: yup.string().required('Xin nhập số lượng nhân viên'),
    addressDepartment: yup.string().required('Xin nhập địa chỉ phòng ban'),
    telDepartment: yup.string().matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ').required('Xin nhập số điện thoại'),
    noteDepartment: yup.string()
});


const DepartmentUpdate = () => {
    const token = useSelector((state) => state.token);
    const [selectedRows, setSelectedRows] = useState();
    const { showNotification } = useStateContext();
    const navigate = useNavigate();
    const { MaPB } = useParams();
    const [searchText, setSearchText] = useState('');
    const [dataDepartment, setDataDepartment] = useState(null);
    const [errorDepartment, setErrorDepartment] = useState();
    const getDepartmentInfo = async (id) => {
        const resDepartment = await fetch(`/api/admin/phongban/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        const dataRes = await resDepartment.json();
        setDataDepartment(dataRes.getPBInfo)

    }
    const [getDataDaiDien, setGetDaTaDaiDien] = useState(null);
    const getDaiDien = async () => {
        await fetch(`/api/admin/danhsachnhanviendaidien`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(
            async (res) => {
                const resData = await res.json();
                if (resData.error) {
                    showNotification('error', resData.error)
                } else {
                    setGetDaTaDaiDien(resData)
                }
            }
        )
    }
    useEffect(() => {
        getDepartmentInfo(MaPB);
        getDaiDien()
    }, []);
    if (!dataDepartment) return null;
    if (!getDataDaiDien) return null;
    let dataEmployee=[]
    for (let i=0;i<dataDepartment.getUserInPB.length;i++){
        dataEmployee.push({
            id: dataDepartment.getUserInPB[i].id,
            stt: i,
            name: dataDepartment.getUserInPB[i].HoTen,
            email: dataDepartment.getUserInPB[i].Email,
            tel: dataDepartment.getUserInPB[i].SoDT
        })
    }
    let dataDaiDien = []
    for (let i = 0; i < getDataDaiDien.getDaiDien.length; i++) {
        dataDaiDien.push({
            label: getDataDaiDien.getDaiDien[i].HoTen,
            value: getDataDaiDien.getDaiDien[i].id
        })
    }
    const handleSubmit = async (values) => {
        const postDepartment = await fetch(`/api/admin/phongban/${MaPB}/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(values)
        })
        const saveResJson = await postDepartment.json();
        if (saveResJson.msg) {
            showNotification('success', saveResJson.msg);
            // NotificationManager.success('Thành công', data.msg);
            navigate('/admin/department');
        } else {
            setErrorDepartment(saveResJson.error)
        }

    }
    
    const filteredData = dataEmployee.filter((row) => {
        return (
            row.name.toLowerCase().includes(searchText.toLowerCase())
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
            name: 'Tên nhân viên',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Số điện thoại',
            selector: row => row.tel,
            sortable: true,
        },
       
    ]
    const initialValuesDepartment = {
        departmentCode: dataDepartment.MaPB,
        nameDepartment: dataDepartment.TenPB,
        numberDepartment: dataDepartment.SoLuong,
        addressDepartment: dataDepartment.DiaChi,
        telDepartment: dataDepartment.SoDienThoai,
        // representative: dataDepartment.NguoiDaiDien,
        noteDepartment: dataDepartment.MoTa
    }
    const handleReturn = () => {
        navigate('/admin/department');
    }
    return (
        <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
            <div className='flex flex-wrap lg:flex-nowrap justify-between '>
                <div className='p-4 text-xl md:text-3xl font-bold'>
                    <h1>Cập nhật phòng ban</h1>
                </div>
            </div>
            <div className="relative mt-5 h-72 w-[92%] md:w-full mx-auto overflow-hidden rounded-xl 
            bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=htmlFormat&fit=crop&w=1920&q=80)] 
            bg-cover bg-center">
                <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
            </div>
            <div className='relative flex flex-col bg-clip-border rounded-xl bg-white w-[85%] md:w-[90%]
            text-gray-700 shadow-md mx-auto -mt-24 mb-6'>
                <div className='p-4'>
                    <div className="mb-8 flex items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            {/* <img src={avatar} alt="avatar" className='inline-block relative object-cover object-center 
                            w-[74px] h-[74px] rounded-lg shadow-lg shadow-blue-gray-500/40' />
                            <div>
                                <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug mb-1">Nguyen Danh</h5>
                                <p className="block antialiased font-sans text-sm leading-normal font-normal">Developer</p>
                            </div> */}
                            <h2 className='pl-4 pt-3 text-2xl font-semibold'>Hãy chỉnh sửa thông tin phòng ban</h2>
                        </div>
                        <button className='border rounded-lg border-slate-400 text-white text-base px-5 py-3 bg-green-500 hover:bg-green-700' onClick={handleReturn}>
                            Trở lại
                        </button>
                        {/* <div className="flex justify-center text-center">
                            <button
                                type="button"
                                style={{ backgroundColor: currentColor }}
                                className="flex self-center text-base text-white opacity-0.9 mr-3 p-2 pr-3
                    md:mr-0 md:py-3 md:px-4 md:pr-5
                    hover:drop-shadow-xl rounded-xl  "
                            >
                                <FaDownload className='self-center mr-1 md:mr-2' /> Download report
                            </button>
                        </div> */}
                    </div>
                    <div className='grid grid-cols-1 gap-12 mb-12'>
                        <div className='w-full'>
                            <Formik
                                onSubmit={handleSubmit}
                                initialValues={initialValuesDepartment}
                                validationSchema={createDepartmentSchema}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleBlur,
                                    handleChange,
                                    handleSubmit,
                                    setFieldValue,
                                    resetForm,
                                }) => {
                                    return (

                                        <form className='bg-white w-full shadow-md p-3 rounded' onSubmit={handleSubmit}>
                                            <div className='grid grid-cols-1 md:grid-cols-3 md:gap-6'>
                                                <InputText
                                                    title="Mã phòng ban"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.departmentCode}
                                                    name="departmentCode"
                                                    type='text'
                                                    disabled
                                                    errors={errors.name}

                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                                <div className='col-span-2'>
                                                    <InputText
                                                        title='Tên phòng ban'
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        name='nameDepartment'
                                                        type='text'
                                                        errors={errors.nameDepartment}
                                                        touched={touched.nameDepartment}
                                                        value={values.nameDepartment}
                                                        className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                    />
                                                </div>

                                            </div>
                                            <div className='grid grid-cols-1 md:grid-cols-3 md:gap-6'>
                                                <InputText
                                                    title="Số lượng"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    errors={errors.numberDepartment}
                                                    touched={touched.numberDepartment}
                                                    value={values.numberDepartment}
                                                    name="numberDepartment"
                                                    type='number'
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                                <div className='col-span-2'>
                                                    <InputText
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        errors={errors.addressDepartment}
                                                        touched={touched.addressDepartment}
                                                        value={values.addressDepartment}
                                                        title='Địa chỉ'
                                                        name='addressDepartment'
                                                        type='text'
                                                        className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                    />
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                <InputText
                                                    title="Số điện thoại"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    errors={errors.telDepartment}
                                                    touched={touched.telDepartment}
                                                    value={values.telDepartment}
                                                    name="telDepartment"
                                                    type='text'
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                                {/* <SelectInput
                                                    title='Người đại diện'
                                                    id='representative'
                                                    labelDefault="---Lựa chọn người đại diện---"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.representative}
                                                    options={dataDaiDien}
                                                    name='representative'
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                /> */}
                                            </div>
                                            <div className='grid grid-cols-1 mb-3'>
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor='noteDepartment'>
                                                    Ghi chú
                                                </label>
                                                <Field
                                                    id='noteDepartment'
                                                    name='noteDepartment'
                                                    as="textarea"
                                                    value={values.noteDepartment}
                                                    onChange={handleChange}
                                                    rows={5}
                                                    className='shadow appearance-none border border-slate-950 rounded-lg p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                />


                                            </div>
                                            {errorDepartment && (<div className='text-red-500 flex items-center justify-center mb-2'>{errorDepartment}</div>)}
                                            <div className="flex items-center justify-center mb-4">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                                    Cập nhật phòng ban
                                                </button>

                                            </div>
                                        </form>
                                    )
                                }
                                }

                            </Formik>

                        </div>
                        <div className='w-full'>
                        <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
                    <div className="relative flex justify-between bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-8 p-6">
                        <h6 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-relaxed text-white">
                            Danh sách nhân viên trong phòng ban
                        </h6>
                        <p className='text-base font-semibold'>Tổng : {dataDepartment.SiSo}</p>
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
                </div>
            </div>
        </div>
    )
}

export default DepartmentUpdate;

import { useState, useEffect } from 'react';
import InputText from 'components/input/InputText';
import SelectInput from 'components/input/SelectInput';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { useStateContext } from 'context/ContextProvider';
import { Formik, Field } from 'formik';
import * as yup from "yup";
import { useNavigate, useParams} from 'react-router-dom';
const createContractSchema = yup.object().shape(
    {
        idDaiDien: yup.string().required('Xin chọn người đại diện'),
        tenhopdong: yup.string().required('Xin nhập tên'),
        loaihopdong: yup.string().required('Xin chọn loại hợp đồng'),
        thoihan: yup.string().required('Xin nhập thời hạn hợp đồng'),
        luongcoban: yup.string().matches(/^[0-9]*$/, 'Xin nhập chữ số').required('Xin nhập lương cơ bản'),
        hesoluong: yup.number().required('Xin nhập hệ số lương'),
        cachtra: yup.string().required('Xin chọn cách trả'),
        ngaytra: yup.string().required('Xin nhập ngày trả'),
    }
)
const ContractUpdate = () => {
    const [getDataDaiDien, setGetDataDaiDien] = useState(null);
    const { showNotification } = useStateContext();
    const token = useSelector(state => state.token);
    const {id, idHD}= useParams();
    const navigate= useNavigate();
    const getDaiDien = async () => {
        await fetch('/api/admin/daidienhopdong', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(
            async (res) => {
                const resData = await res.json();
                if (resData.error) {
                    showNotification('error', resData.error)
                } else {
                    setGetDataDaiDien(resData);
                }
            }
        )
    }
    const [getDataContract, setGetDataContract]= useState(null)
    const getContract= async(id, idHD)=>{
        await fetch(`/api/admin/hopdong/${id}/${idHD}`,{
            method: 'GET',
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(
            async (res)=>{
                const resData= await res.json();
                if (resData.error){
                    showNotification('error', resData.error)
                }else{
                    setGetDataContract(resData)
                }
            }
        )
    }
    useEffect(() => {

        getDaiDien();
        getContract(id, idHD);
    }, [])
    if (!getDataDaiDien) return null;
   
    if (!getDataContract) return null;

    let dataDaiDien = [];
    //Them truong dai dien vao form
    for (let i = 0; i < getDataDaiDien.dataDaiDien.length; i++) {
        let flat = 0;
        let dataChucVu = []
        for (let j = 0; j < getDataDaiDien.dataDaiDien[i].chucvu.length; j++) {
            dataChucVu.push({
                label: getDataDaiDien.dataDaiDien[i].chucvu[j].TenChucVu,
                value: getDataDaiDien.dataDaiDien[i].chucvu[j].TenChucVu
            })
            if (getDataDaiDien.dataDaiDien[i].chucvu[j].TenChucVu.includes('Giám đốc')) {
                flat = 1;
            }
        }
        if (flat == 1) {
            dataDaiDien.push({
                id: getDataDaiDien.dataDaiDien[i].id,
                HoTen: getDataDaiDien.dataDaiDien[i].HoTen,
                DiaChi: getDataDaiDien.dataDaiDien[i].NoiO,
                SoDienThoai: getDataDaiDien.dataDaiDien[i].SoDT,
                ChucVu: dataChucVu
            })
        }
    }

    let time = new Date().getTime();
    time = time.toString();
    time = time.slice(4, time.length);
    const filter= dataDaiDien.filter((item)=>item.id===getDataContract.contract.idDaiDien);
    const initialValuesContract = {
        idDaiDien: filter[0].id,
        hotena: filter[0].HoTen,
        chucvu: filter[0].ChucVu,
        daidien: "",
        diachia: filter[0].DiaChi,
        sodienthoaia: filter[0].SoDienThoai,
        idNhanVien: getDataContract.contract.idNhanVien,
        hotenB: getDataContract.contract.NhanVien.HoTen,
        cccdb: getDataContract.contract.NhanVien.CCCD,
        ngaycapb: getDataContract.contract.NhanVien.NgayCap,
        tai: getDataContract.contract.NhanVien.NoiCap,
        mahd: 'MHD' + time,
        tenhopdong: "Hợp đồng lao động",
        loaihopdong: getDataContract.contract.LoaiHD,
        thoihan: getDataContract.contract.ThoiHan,
        luongcoban: getDataContract.contract.LuongCoBan,
        hesoluong: getDataContract.contract.HeSoLuong,
        cachtra: getDataContract.contract.CachTra,
        ngaytra: getDataContract.contract.VaoNgay,
        ghichu: getDataContract.contract.NoiDung
    }



    const handleSubmit = async(values) => {
        await fetch(`/api/admin/hopdong/${id}/update/${idHD}`, {
            method:'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(values)
        }).then(
            async(res)=>{
                const resData= await res.json();
                if (resData.msg){
                    showNotification('success', resData.msg)
                    navigate(`/admin/contract/${id}`)
                }else{
                    showNotification('error', resData.error)
                }
            }
        )
    }
    const handleReturn = async () => {
        navigate(`/admin/contract/${id}`)
    }
    return (
        <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
            <div className='flex flex-wrap lg:flex-nowrap justify-between '>
                <div className='p-4 text-xl md:text-3xl font-bold'>
                    <h1>Cập nhật hợp đồng</h1>
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
                            <h2 className='pl-4 pt-3 text-2xl font-semibold'>Hãy điền thông tin hợp đồng</h2>
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
                                initialValues={initialValuesContract}
                                onSubmit={handleSubmit}
                                validationSchema={createContractSchema}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleBlur,
                                    handleChange,
                                    handleSubmit,
                                    setFieldValue
                                }) => {
                                    return (
                                        <form className='bg-white w-full shadow-md p-3 rounded' onSubmit={handleSubmit}>
                                            <h3 className='text-xl font-semibold mb-3'>I. Bên A</h3>
                                            <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-3'>
                                                <div className='mb-4'>
                                                    <label className=' block tetx-gray-700 font-bold mb-3'>Chọn người đại diện</label>
                                                    <Field
                                                        disabled
                                                        onChange={(e) => {
                                                            if (e.target.value) {
                                                                for (let i = 0; i < dataDaiDien.length; i++) {
                                                                    if (dataDaiDien[i].id == e.target.value) {
                                                                        setFieldValue('hotena', dataDaiDien[i].HoTen)
                                                                        setFieldValue('diachia', dataDaiDien[i].DiaChi)
                                                                        setFieldValue('sodienthoaia', dataDaiDien[i].SoDienThoai)
                                                                        setFieldValue('chucvu', dataDaiDien[i].ChucVu)
                                                                    }
                                                                }
                                                            } else {
                                                                setFieldValue('hotena', "")
                                                                setFieldValue('diachia', "")
                                                                setFieldValue('sodienthoaia', "")
                                                                setFieldValue('chucvu',[])
                                                            }
                                                            setFieldValue('idDaiDien', e.target.value)
                                                        }}
                                                        as="select" name='idDaiDien' 
                                                        value={values.idDaiDien} 
                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    >
                                                        <option value=''>
                                                            ---Lựa chọn người đại diện---
                                                        </option>
                                                        {

                                                            dataDaiDien.map((item, index) => {
                                                                return (<option value={item.id} key={item.HoTen + index}>{item.HoTen}</option>)
                                                            })
                                                        }
                                                    </Field>
                                                </div>
                                                <div className='col-span-2'>
                                                    <InputText
                                                        title="Họ và tên"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.hotena}
                                                        errors={errors.hotena}
                                                        touched={touched.hotena}
                                                        name="hotena"
                                                        id='hovatendem'
                                                        type="text"
                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                <div className='mb-4'>

                                                    <label className="block text-gray-700 font-bold mb-2" htmlFor='chucvu'>
                                                        Chức vụ
                                                    </label>



                                                    <Select
                                                        isMulti
                                                        disabled
                                                        name='chucvu'
                                                        value={values.chucvu}
                                                
                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    />
                                                </div>
                                                <InputText
                                                    title="Đại diện cho"
                                                    id="represent"
                                                    type="text"
                                                    value="Công ty trách nhiệm hữu hạn"
                                                    disabled
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />

                                            </div>
                                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                <InputText
                                                    title="Địa chỉ"
                                                    type="text"
                                                    id="diachia"
                                                    name="diachia"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.diachia}
                                                    errors={errors.diachia}
                                                    touched={touched.diachia}
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    disabled

                                                />
                                                <InputText
                                                    title="Số điện thoại"
                                                    id="sodienthoaia"
                                                    name="sodienthoaia"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.sodienthoaia}
                                                    errors={errors.sodienthoaia}
                                                    touched={touched.sodienthoaia}
                                                    type="text"
                                                    disabled
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                            </div>
                                            <hr className='my-2'></hr>
                                            <h3 className='text-xl font-semibold mb-3'>II. Bên B</h3>
                                            <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-3'>
                                                <InputText
                                                    title="Mã nhân viên"
                                                    id="idNhanVien"
                                                    name="idNhanVien"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.idNhanVien}
                                                    errors={errors.idNhanVien}
                                                    touched={touched.idNhanVien}
                                                    type="text"
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    disabled

                                                />
                                                <div className='col-span-2'>
                                                    <InputText
                                                        title="Họ và tên"
                                                        type="text"
                                                        id="hotenB"
                                                        name="hotenB"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.hotenB}
                                                        errors={errors.hotenB}
                                                        touched={touched.hotenB}
                                                        disabled
                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-3'>
                                                <InputText
                                                    title="Số CCCD"
                                                    id="cccdb"
                                                    name="cccdb"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.cccdb}
                                                    errors={errors.cccdb}
                                                    touched={touched.cccdb}
                                                    type="text"
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    disabled

                                                />

                                                <InputText
                                                    title="Ngày Cấp"
                                                    id="ngaycapb"
                                                    name="ngaycapb"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.ngaycapb}
                                                    errors={errors.ngaycapb}
                                                    touched={touched.ngaycapb}
                                                    type="date"
                                                    disabled
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                                <InputText
                                                    title="Tại"
                                                    id="tai"
                                                    name="tai"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.tai}
                                                    errors={errors.tai}
                                                    touched={touched.tai}
                                                    type="text"
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    disabled

                                                />

                                            </div>
                                            <hr className='my-2'></hr>
                                            <h3 className='text-xl font-semibold mb-3'>III. Thông tin hợp đồng</h3>
                                            <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-3'>
                                                <InputText
                                                    title="Mã hợp đồng"
                                                    id="mahd"
                                                    name="mahd"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.mahd}
                                                    errors={errors.mahd}
                                                    touched={touched.mahd}
                                                    type="text"
                                                    disabled
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"


                                                />
                                                <div className='col-span-2'>
                                                    <InputText
                                                        title="Tên hợp đồng"
                                                        id="tenhopdong"
                                                        name="tenhopdong"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.tenhopdong}
                                                        errors={errors.tenhopdong}
                                                        touched={touched.tenhopdong}
                                                        type="text"

                                                        disabled
                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-3'>
                                                <div className='col-span-2'>
                                                    <SelectInput
                                                        title="Loại hợp đồng"
                                                        id="loaihopdong"
                                                        name='loaihopdong'
                                                        labelDefault="---Lựa chọn loại hợp đồng---"
                                                        onBlur={handleBlur}
                                                        value={values.loaihopdong}
                                                        onChange={(e) => {
                                                            setFieldValue('loaihopdong', e.target.value)
                                                            setFieldValue('thoihan','Không thời hạn')
                                                   
                                                        }}
                                                        errors={errors.loaihopdong}
                                                        touched={touched.loaihopdong}
                                                        options={[
                                                            {
                                                                value: 'Hợp đồng xác định thời hạn',
                                                                label: 'Hợp đồng xác định thời hạn'
                                                            },
                                                            {
                                                                value: 'Hợp đồng không xác định thời hạn',
                                                                label: 'Hợp đồng không xác định thời hạn'
                                                            },
                                                            {
                                                                value: 'Hợp đồng thử việc',
                                                                label: 'Hợp đồng thử việc'
                                                            },
                                                            {
                                                                value: 'Hợp đồng học việc',
                                                                label: 'Hợp đồng học việc'
                                                            },
                                                        ]}

                                                        className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'

                                                    />
                                                </div>
                                                {values.loaihopdong!=='Hợp đồng không xác định thời hạn' && (
                                                    <SelectInput
                                                        title="Thời hạn hợp đồng"
                                                        id="thoihan"
                                                        name='thoihan'
                                                        labelDefault="---Lựa chọn thời hạn---"
                                                        onBlur={handleBlur}
                                                        value={values.thoihan}
                                                        onChange={handleChange}
                                                        errors={errors.thoihan}
                                                        touched={touched.thoihan}
                                                        className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                        options={[
                                                            
                                                            {
                                                                value: '1 Tháng',
                                                                label: '1 Tháng'
                                                            },
                                                            {
                                                                value: '3 Tháng',
                                                                label: '3 Tháng'
                                                            },
                                                            {
                                                                value: '6 Tháng',
                                                                label: '6 Tháng'
                                                            },
                                                            {
                                                                value: '1 Năm',
                                                                label: '1 Năm'
                                                            },
                                                            {
                                                                value: '2 Năm',
                                                                label: '2 Năm'
                                                            },
                                                        ]}


                                                    />
                                                )}
                                            </div>
                                            <div className='grid grid-cols-1 md:grid-cols-4 md:gap-2'>
                                                <InputText
                                                    title='Lương cơ bản'
                                                    type='text'
                                                    id="luongcoban"
                                                    name='luongcoban'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.luongcoban}
                                                    errors={errors.luongcoban}
                                                    touched={touched.luongcoban}
                                                    className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                />
                                                <InputText
                                                    title='Hệ số lương'
                                                    type='number'
                                                    id="hesoluong"
                                                    name='hesoluong'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.hesoluong}
                                                    errors={errors.hesoluong}
                                                    touched={touched.hesoluong}
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                                <SelectInput
                                                    title="Cách trả lương"
                                                    id="cachtra"
                                                    name='cachtra'
                                                    labelDefault="---Lựa chọn cách trả---"
                                                    onBlur={handleBlur}
                                                    value={values.cachtra}
                                                    onChange={handleChange}
                                                    errors={errors.cachtra}
                                                    touched={touched.cachtra}
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    options={[
                                                        { value: 'Trả bằng tiền mặt', label: 'Trả bằng tiền mặt' },
                                                        { value: 'Trả qua thẻ', label: 'Trả qua thẻ' },
                                                    ]}
                                                />
                                                <InputText
                                                    title='Vào ngày'
                                                    type='number'
                                                    id="ngaytra"
                                                    name='ngaytra'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.ngaytra}
                                                    errors={errors.ngaytra}
                                                    touched={touched.ngaytra}
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                            </div>
                                            <div className='grid grid-cols-1 mb-3'>
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor='noteDepartment'>
                                                    Ghi chú
                                                </label>
                                                <Field
                                                    id='ghichu'
                                                    name='ghichu'
                                                    as="textarea"
                                                    value={values.ghichu}
                                                    onChange={handleChange}
                                                    rows={5}
                                                    className='shadow appearance-none border border-slate-950 rounded-lg p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                />


                                            </div>
                                            <div className="flex items-center justify-center mb-4">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                                    Cập nhật hợp đồng
                                                </button>

                                            </div>
                                        </form>
                                    )
                                }}
                            </Formik>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContractUpdate


import { useState, useEffect } from 'react';
import { FaPen, FaDownload } from "react-icons/fa";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Formik, Field } from 'formik';
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import InputText from "components/input/InputText";
import SelectInput from 'components/input/SelectInput';

// import AvatarInput from 'components/input/AvatarInput';
import { useStateContext } from 'context/ContextProvider';

const createEmployeeSchema = yup.object().shape(
    {
        hovatendem: yup.string().required('Xin nhập họ và tên đệm'),
        ten: yup.string().required('Xin nhập tên'),
        email: yup.string().email('Hãy nhập theo định dạng email').required('Xin nhập email'),
        password: yup.string().required('Xin nhập mật khẩu'),
        ngaysinh: yup.date().required('Xin chọn ngày sinh'),
        gioitinh: yup.string().min(1, 'Xin chọn giới tính').required('Xin chọn giới tính'),
        honnhan: yup.string().required('Xin chọn hôn nhân'),
        dantoc: yup.string().required('Xin nhập dân tộc'),
        quoctich: yup.string().required('Xin nhập quốc tịch'),
        tongiao: yup.string().required('Xin nhập tôn giáo'),
        sodienthoai: yup.string().matches(/^[0-9]{10}$/, 'Xin nhập đúng định dạng số điện thoại').required('Xin nhập số điện thoại'),
        quequan: yup.string().required('Xin nhập quê quán'),
        noio: yup.string().required('Xin nhập nơi ở'),
        hokhau: yup.string().required('Xin nhập hộ khẩu'),
        cccd: yup.string().matches(/^[0-9]{12}$/, 'Xin nhập đúng định dạng căn cước công dân').required('Xin nhập số cccd'),
        ngaycap: yup.date().required('Xin chọn ngày cấp'),
        noicap: yup.string().required('Xin nhập nơi cấp'),
        idPhongBan: yup.string().required('Xin chọn phòng ban'),
        hinhanh: yup.mixed().test('fileFormat', 'Sai định dạng ảnh', (value) =>
            value && ['image/jpeg', 'image/png'].includes(value.type)
        ).test('fileSize', 'File too large', (value) =>
            value && value.size <= 2000000
        ).required('Xin chọn ảnh avatar'),
        idChucVu: yup.array().min(1, 'Xin hãy chọn ít nhất 1 chức vụ')
    }
)

const CreateUser = () => {

    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const [selectedFile, setSelectedFile] = useState(null);
    const { showNotification } = useStateContext();
    const [dataDepartment, setDataDepartment] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);// Lay du lieu data tu api
    // const [iconEdit, setIconEdit] = useState(true);
    // useEffect(() => {
    //     if (screenSize >= 900) {
    //         setIconEdit(false)
    //     }
    // }, [screenSize]);
    const [getDataPosition, setGetDataPosition] = useState(null);
    const getPosition = async () => {
        const res = await fetch('/api/admin/chucvu', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(
            async (res) => {
                const data = await res.json();

                if (data.error) {
                    showNotification('error', data.error);
                } else {
                    setGetDataPosition(data)
                }
            }
        )
    }
    const getDepartment = async () => {
        const res = await fetch('/api/admin/phongban', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(
            async (res) => {
                const data = await res.json();

                setDataDepartment(data)
            }
        )

    }
    useEffect(() => {
        getDepartment();
        getPosition();

    }, []);
    let data = [];

    if (!getDataPosition) return null;
    if (!dataDepartment) return null;
    let dataPosition = [];
    for (let i = 0; i < getDataPosition.getCV.length; i++) {
        dataPosition.push({

            value: getDataPosition.getCV[i].id,
            label: getDataPosition.getCV[i].TenChucVu

        })

    };

    const initialValues = {
        hovatendem: "",
        ten: "",
        email: "",
        password: "",
        ngaysinh: "",
        gioitinh: "",
        honnhan: "",
        dantoc: "",
        quoctich: "",
        tongiao: "",
        sodienthoai: "",
        quequan: "",
        noio: "",
        hokhau: "",
        cccd: "",
        ngaycap: "",
        noicap: "",
        idPhongBan: "",
        hinhanh: "",
        idChucVu: []
    }



    const handleSelectChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
    };
    const handleReturn = () => {
        navigate('/admin/userlist');
    }
    const handleSubmit = async (values) => {
        let data=[];
        values.idChucVu.map(item=>{
            data.push(item.value)
        })
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append('hinhanhPath', values.hinhanh.name);
        formData.append('chucvu',data)
        await fetch(
            '/api/admin/danhsachnhanvien/create',
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            }
        ).then(async (res) => {
            const messageRes = await res.json();
            if (messageRes.error) {
                showNotification('error', messageRes.error)

            } else {
                showNotification('success', messageRes.msg)
                navigate('/admin/userlist')
            }

        });
    }
    return (
        <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
            <div className='flex flex-wrap lg:flex-nowrap justify-between '>
                <div className='p-4 text-xl md:text-3xl font-bold'>
                    <h1>Tạo nhân viên</h1>
                </div>

            </div>
            <div className="relative mt-5 h-72 w-[92%] md:w-full mx-auto overflow-hidden rounded-xl 
            bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=htmlFormat&fit=crop&w=1920&q=80)] 
            bg-cover bg-center">
                <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
            </div>
            <div className='relative flex flex-col bg-clip-border rounded-xl bg-white w-[85%] md:w-[90%]
            text-gray-700 shadow-md mx-auto -mt-24 mb-6 '>
                <div className="p-4">
                    <div className="mb-8 flex items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            {/* <img src={avatar} alt="avatar" className='inline-block relative object-cover object-center 
                            w-[74px] h-[74px] rounded-lg shadow-lg shadow-blue-gray-500/40' />
                            <div>
                                <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug mb-1">Nguyen Danh</h5>
                                <p className="block antialiased font-sans text-sm leading-normal font-normal">Developer</p>
                            </div> */}
                            <h2 className='pl-4 pt-3 text-2xl font-semibold'>Hãy điền một số thông tin</h2>
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
                    <div className="grid grid-cols-1 gap-12 mb-12">
                        <div className="w-full">
                            <Formik
                                onSubmit={handleSubmit}
                                initialValues={initialValues}
                                validationSchema={createEmployeeSchema}
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
                                    {/* console.log(values.idChucVu) */}
                                    return (
                                        <form className="bg-white w-full shadow-md p-3 rounded" onSubmit={handleSubmit}>
                                            <div className='w-full flex justify-center flex-col items-center'>
                                                <div className="w-28 h-28 bg-slate-400 mb-2 rounded-full border border-slate-900">
                                                    {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Selected Avatar" className='w-28 h-28 object-cover rounded-full border border-slate-800 shadow-md overflow-hidden mb-2' />}
                                                </div>

                                                <div className='mb-4'>
                                                    {errors.hinhanh && touched.hinhanh ? (<div className='text-sm text-red-700 mb-1'>{errors.hinhanh}</div>) :
                                                        (<div className='mb-3'></div>)
                                                    }
                                                    <label htmlFor="hinhanh" className="inline-block px-4 py-2 leading-none text-white bg-blue-500 rounded hover:bg-blue-600 cursor-pointer">Chọn ảnh đại diện</label>
                                                    <input type="file" id="hinhanh" accept="image/*" className="hidden" name="hinhanh" onChange={e => {
                                                        setFieldValue('hinhanh', e.currentTarget.files[0])
                                                        setSelectedFile(e.target.files[0])
                                                    }} />

                                                </div>
                                            </div>
                                            <h3 className='text-xl font-semibold mb-3'>I. Thông tin chung</h3>
                                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                <InputText
                                                    title="Họ và tên đệm"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.hovatendem}
                                                    errors={errors.hovatendem}
                                                    touched={touched.hovatendem}
                                                    name="hovatendem"
                                                    id='hovatendem'
                                                    type="text"
                                                    placeholder="Họ và tên đệm..."
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                                <InputText
                                                    title="Tên"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.ten}
                                                    errors={errors.ten}
                                                    touched={touched.ten}
                                                    name="ten"
                                                    id="ten"
                                                    type="text"
                                                    placeholder="Tên..."
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />

                                            </div>
                                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                <InputText
                                                    title="Email"
                                                    name="email"
                                                    id="email"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.email}
                                                    errors={errors.email}
                                                    touched={touched.email}
                                                    type="email"
                                                    placeholder="Email..."
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                                <InputText
                                                    title="Password"
                                                    name='password'
                                                    id='password'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.password}
                                                    errors={errors.password}
                                                    touched={touched.password}
                                                    type="password"
                                                    placeholder="Password..."
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                            </div>
                                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                <InputText
                                                    title="Ngày sinh"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.ngaysinh}
                                                    errors={errors.ngaysinh}
                                                    touched={touched.ngaysinh}
                                                    id="ngaysinh"
                                                    name="ngaysinh"
                                                    type="date"
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                                <SelectInput
                                                    title="Giới tính"
                                                    id='gioitinh'
                                                    labelDefault="---Lựa chọn giới tính---"
                                                    onBlur={handleBlur}
                                                    errors={errors.gioitinh}
                                                    touched={touched.gioitinh}
                                                    onChange={handleChange}
                                                    value={values.gioitinh}
                                                    options={[
                                                        {
                                                            value: 'Nam',
                                                            label: 'Nam'
                                                        },
                                                        {
                                                            value: 'Nữ',
                                                            label: 'Nữ'
                                                        }
                                                    ]}
                                                    name='gioitinh'
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                            </div>
                                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>

                                                <SelectInput
                                                    title="Hôn nhân"
                                                    id='honnhan'
                                                    name='honnhan'
                                                    labelDefault="---Lựa chọn hôn nhân---"
                                                    onBlur={handleBlur}
                                                    value={values.honnhan}
                                                    onChange={handleChange}
                                                    errors={errors.honnhan}
                                                    touched={touched.honnhan}
                                                    options={[{
                                                        value: 'Độc thân',
                                                        label: 'Độc thân'
                                                    }, {
                                                        value: 'Đã kết hôn',
                                                        label: 'Đã kết hôn'
                                                    }, {
                                                        value: 'Đã ly hôn',
                                                        label: 'Đã ly hôn'
                                                    }, {
                                                        value: 'Khác',
                                                        label: 'Khác'
                                                    }
                                                    ]}
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                                <InputText
                                                    title="Dân tộc"
                                                    id="dantoc"
                                                    type="text"
                                                    name='dantoc'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.dantoc}
                                                    errors={errors.dantoc}
                                                    touched={touched.dantoc}
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    placeholder='Dân tộc...'
                                                />
                                            </div>
                                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                <InputText
                                                    title="Quốc tịch"
                                                    id="quoctich"
                                                    type="text"
                                                    name='quoctich'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.quoctich}
                                                    errors={errors.quoctich}
                                                    touched={touched.quoctich}
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    placeholder='Quốc tịch...'
                                                />
                                                <InputText
                                                    title="Tôn giáo"
                                                    id="tongiao"
                                                    type="text"
                                                    name='tongiao'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.tongiao}
                                                    errors={errors.tongiao}
                                                    touched={touched.tongiao}
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    placeholder='Tôn giáo...'
                                                />


                                            </div>
                                            <hr className='my-2'></hr>
                                            <h3 className='text-xl font-semibold mb-3'>II. Thông tin liên hệ</h3>
                                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                <InputText
                                                    title="Số điện thoại"
                                                    id="sodienthoai"
                                                    type="tel"
                                                    name='sodienthoai'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.sodienthoai}
                                                    errors={errors.sodienthoai}
                                                    touched={touched.sodienthoai}
                                                    placeholder="Số điện thoại..."
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"

                                                />
                                                <InputText
                                                    title="Quê quán"
                                                    id="quequan"
                                                    type="text"
                                                    name='quequan'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.quequan}
                                                    errors={errors.quequan}
                                                    touched={touched.quequan}
                                                    placeholder="Quê quán..."
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />

                                            </div>
                                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                <InputText
                                                    title="Nơi ở"
                                                    id="noio"
                                                    name='noio'
                                                    type="text"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.noio}
                                                    errors={errors.noio}
                                                    touched={touched.noio}
                                                    placeholder="Nơi ở..."
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"

                                                />
                                                <InputText
                                                    title="Hộ khẩu"
                                                    id="hokhau"
                                                    name='hokhau'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.hokhau}
                                                    errors={errors.hokhau}
                                                    touched={touched.hokhau}
                                                    type="text"
                                                    placeholder="Hộ khẩu..."
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />

                                            </div>
                                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                <InputText
                                                    title="Số CCCD"
                                                    id="cccd"
                                                    type="tel"
                                                    name='cccd'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.cccd}
                                                    errors={errors.cccd}
                                                    touched={touched.cccd}
                                                    placeholder="Số CCCD..."
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"

                                                />
                                                <InputText
                                                    title="Ngày cấp "
                                                    id="ngaycap"
                                                    name='ngaycap'
                                                    type="date"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.ngaycap}
                                                    errors={errors.ngaycap}
                                                    touched={touched.ngaycap}
                                                    placeholder="Ngày cấp..."
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />

                                            </div>
                                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                <InputText
                                                    title="Nơi cấp"
                                                    id="noicap"
                                                    name="noicap"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.noicap}
                                                    errors={errors.noicap}
                                                    touched={touched.noicap}
                                                    type="text"
                                                    placeholder="Nơi cấp..."
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"

                                                />


                                            </div>
                                            <hr className='my-2'></hr>
                                            <h3 className='text-xl font-semibold mb-3'>III. Phòng ban và chức vụ</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                                                <div className='mb-4'>
                                                    <label className=' block tetx-gray-700 font-bold mb-2'>Phòng ban</label>
                                                    <Field
                                                        as="select" name='idPhongBan' value={values.idPhongBan} className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    >
                                                        <option value=''>
                                                            ---Lựa chọn phòng ban---
                                                        </option>
                                                        {

                                                            dataDepartment.getPhongBan.map((item, index) => {
                                                                return (<option value={item.id} key={item.TenPB + index}>{item.TenPB}</option>)
                                                            })
                                                        }
                                                    </Field>
                                                </div>
                                                <div className='mb-4'>

                                                    <label className="block text-gray-700 font-bold mb-2" htmlFor='chucvu'>
                                                        Chức vụ
                                                    </label>


                                                    
                                                    <Select
                                                        isMulti
                                                        name='idChucVu'
                                                        options={dataPosition}
                                                        onChange={(e)=>{
                                                            // console.log(e)
                                                            setSelectedOptions(e);
                                                            setFieldValue('idChucVu',e);
                                                        }}
                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>
                                            {/* <div className="mb-6">
                                     <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                                        Password
                                    </label>
                                    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                                        <p className="text-red-500 text-xs italic">Please choose a password.</p> 
                                        
                                </div> */}
                                            <div className="flex items-center justify-center mb-4">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={handleSubmit}>
                                                    Tạo nhân viên
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
    );
}

export default CreateUser;

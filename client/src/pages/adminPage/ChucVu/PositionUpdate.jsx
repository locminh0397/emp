import React, { useEffect, useState } from 'react';
import InputText from 'components/input/InputText';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { useStateContext } from 'context/ContextProvider';
import * as yup from "yup";
import { useParams } from 'react-router-dom';
const createPositionSchema = yup.object().shape({
    positionCode: yup.string().required(''),
    namePosition: yup.string().required('Xin nhập tên chức vụ'),
    missionPosition: yup.string().required('Xin nhập nhiệm vụ chức vụ'),
    creatorPosition: yup.string().required('Xin nhập người tạo'),
    notePosition: yup.string()
});
const PositionCreate = () => {
    const token = useSelector(state => state.token);
    const user = useSelector(state => state.user);
    const { id } = useParams();
    const { showNotification } = useStateContext();
    const navigate = useNavigate();
    const [getDataPosition, setGetDataPosition] = useState(null);
    const [errorPosition, setErrorPosition] = useState('');
    const getPosition = async (id) => {
        await fetch(`/api/admin/chucvu/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then(
            async (res) => {
                const resData = await res.json();
                if (resData.error) {
                    showNotification('error', resData.error)
                } else {
                    setGetDataPosition(resData)
                }
            }
        )
    }
    useEffect(() => {
        getPosition(id);
    }, []);
    if (!getDataPosition) return null;
    const initialValuesPosition = {
        positionCode: getDataPosition.getCV.MaChucVu,
        namePosition: getDataPosition.getCV.TenChucVu,
        missionPosition: getDataPosition.getCV.NhiemVu,
        creatorPosition: user.HoTen,
        notePosition: getDataPosition.getCV.MoTa
    }
    const handleSubmit = async (values) => {
        await fetch(`/api/admin/chucvu/${id}/update`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(values)
        }).then(
            async (res) => {
                const resData = await res.json();
                if (resData.msg) {
                    showNotification('success', resData.msg)
                    navigate('/admin/position');
                } else {
                    showNotification('error', resData.error)
                }
            }
        )
    }

    
    const handleReturn = async () => {
        navigate('/admin/position')
    }
    return (
        <div className='mt-20 md:mt-8 mx-auto w-full md:w-[90%]'>
            <div className='flex flex-wrap lg:flex-nowrap justify-between '>
                <div className='p-4 text-xl md:text-3xl font-bold'>
                    <h1>Cập nhật chức vụ</h1>
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
                            <h2 className='pl-4 pt-3 text-2xl font-semibold'>Hãy điền thông tin chức vụ</h2>
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
                                initialValues={initialValuesPosition}
                                validationSchema={createPositionSchema}
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
                                            <div className='grid grid-cols-1 md:grid-cols-3 md:gap-6'>
                                                <InputText
                                                    title="Mã chức vụ"
                                                    id="positionCode"
                                                    type='text'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.positionCode}
                                                    name='positionCode'
                                                    disabled
                                                    errors={errors.name}
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                                <div className='col-span-2'>
                                                    <InputText
                                                        title='Tên chức vụ'
                                                        id='namePosition'
                                                        name='namePosition'
                                                        type='text'
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.namePosition}
                                                        errors={errors.namePosition}
                                                        touched={touched.namePosition}
                                                        className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                    />
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                <InputText
                                                    title="Nhiệm vụ"
                                                    id="missionPosition"
                                                    type='text'
                                                    name='missionPosition'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.missionPosition}
                                                    errors={errors.missionPosition}
                                                    touched={touched.missionPosition}
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                                <InputText
                                                    title="Người tạo"
                                                    id="creatorPosition"
                                                    name="creatorPosition"
                                                    type="text"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.creatorPosition}
                                                    errors={errors.creatorPosition}
                                                    touched={touched.creatorPosition}
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                            </div>
                                            <div className='grid grid-cols-1 mb-3'>
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor='noteDepartment'>
                                                    Ghi chú
                                                </label>
                                                <Field
                                                    id='notePosition'
                                                    name='notePosition'
                                                    as="textarea"
                                                    value={values.notePosition}
                                                    onChange={handleChange}
                                                    rows={5}
                                                    className='shadow appearance-none border border-slate-950 rounded-lg p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                />


                                            </div>
                                            <div className="flex items-center justify-center mb-4">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                                    Cập nhật chức vụ
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

export default PositionCreate

import { useState, useEffect } from "react";
import InputText from "components/input/InputText";
import SelectInput from "components/input/SelectInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field } from "formik";
import { useStateContext } from "context/ContextProvider";
import * as yup from "yup";
const createDepartmentSchema = yup.object().shape({
  departmentCode: yup.string().required("required"),
  nameDepartment: yup.string().required("Xin nhập tên phòng ban"),
  numberDepartment: yup.string().required("Xin nhập số lượng nhân viên"),
  addressDepartment: yup.string().required("Xin nhập địa chỉ phòng ban"),
  telDepartment: yup
    .string()
    .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
    .required("Xin nhập số điện thoại"),
  noteDepartment: yup.string(),
});

const DepartmentCreate = () => {
  const token = useSelector((state) => state.token);
  const { showNotification } = useStateContext();
  const navigate = useNavigate();
  const [errorDepartment, setErrorDepartment] = useState("");
  const [getDataDaiDien, setGetDaTaDaiDien] = useState(null);
  const getDaiDien = async () => {
    await fetch(`/api/admin/danhsachnhanviendaidien`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res) => {
      const resData = await res.json();
      if (resData.error) {
        showNotification("error", resData.error);
      } else {
        setGetDaTaDaiDien(resData);
      }
    });
  };
  useEffect(() => {
    getDaiDien();
  }, []);
  if (!getDataDaiDien) return null;

  let dataDaiDien = [];
  for (let i = 0; i < getDataDaiDien.getDaiDien.length; i++) {
    dataDaiDien.push({
      label: getDataDaiDien.getDaiDien[i].HoTen,
      value: getDataDaiDien.getDaiDien[i].id,
    });
  }
  const handleSubmit = async (values, { resetForm }) => {
    const postDepartment = await fetch("/api/admin/phongban/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });
    const saveResJson = await postDepartment.json();
    if (saveResJson.msg) {
      showNotification("success", saveResJson.msg);
      // NotificationManager.success('Thành công', data.msg);
      navigate("/admin/department");
    } else {
      setErrorDepartment(saveResJson.error);
    }
  };
  let time = new Date().getTime();
  time = time?.toString();
  time = time?.slice(4, time.length);
  const initialValuesDepartment = {
    departmentCode: "MPB" + time,
    nameDepartment: "",
    numberDepartment: "",
    addressDepartment: "",
    telDepartment: "",
    // representative: "",
    noteDepartment: "",
  };
  const handleReturn = () => {
    navigate("/admin/department");
  };
  return (
    <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
      <div className="flex flex-wrap lg:flex-nowrap justify-between ">
        <div className="p-4 text-xl md:text-3xl font-bold">
          <h1>Tạo phòng ban</h1>
        </div>
      </div>
      <div
        className="relative mt-5 h-72 w-[92%] md:w-full mx-auto overflow-hidden rounded-xl 
            bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=htmlFormat&fit=crop&w=1920&q=80)] 
            bg-cover bg-center"
      >
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <div
        className="relative flex flex-col bg-clip-border rounded-xl bg-white w-[85%] md:w-[90%]
            text-gray-700 shadow-md mx-auto -mt-24 mb-6"
      >
        <div className="p-4">
          <div className="mb-8 flex items-center justify-between gap-6">
            <div className="flex items-center justify-between gap-6">
              {/* <img src={avatar} alt="avatar" className='inline-block relative object-cover object-center 
                            w-[74px] h-[74px] rounded-lg shadow-lg shadow-blue-gray-500/40' />
                            <div>
                                <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug mb-1">Nguyen Danh</h5>
                                <p className="block antialiased font-sans text-sm leading-normal font-normal">Developer</p>
                            </div> */}
              <h2 className=" text-2xl font-semibold">
                Hãy điền thông tin phòng ban
              </h2>
            </div>
            <button
              className="border rounded-lg border-slate-400 text-white text-base px-5 py-3 bg-green-500 hover:bg-green-700"
              onClick={handleReturn}
            >
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
                onSubmit={(values, { resetForm }) =>
                  handleSubmit(values, { resetForm })
                }
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
                    <form
                      className="bg-white w-full shadow-md p-3 rounded"
                      onSubmit={handleSubmit}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6">
                        <InputText
                          title="Mã phòng ban"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.departmentCode}
                          name="departmentCode"
                          type="text"
                          disabled
                          errors={errors.name}
                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                        <div className="col-span-2">
                          <InputText
                            title="Tên phòng ban"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="nameDepartment"
                            type="text"
                            errors={errors.nameDepartment}
                            touched={touched.nameDepartment}
                            value={values.nameDepartment}
                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6">
                        <InputText
                          title="Số lượng"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          errors={errors.numberDepartment}
                          touched={touched.numberDepartment}
                          value={values.numberDepartment}
                          name="numberDepartment"
                          type="number"
                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                        <div className="col-span-2">
                          <InputText
                            onBlur={handleBlur}
                            onChange={handleChange}
                            errors={errors.addressDepartment}
                            touched={touched.addressDepartment}
                            value={values.addressDepartment}
                            title="Địa chỉ"
                            name="addressDepartment"
                            type="text"
                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                        <InputText
                          title="Số điện thoại"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          errors={errors.telDepartment}
                          touched={touched.telDepartment}
                          value={values.telDepartment}
                          name="telDepartment"
                          type="text"
                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                        {/* <InputText
                                                    title='Người đại diện'
                                                    name='representative'
                                                    type='text'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    errors={errors.representative}
                                                    touched={touched.representative}
                                                    value={values.representative}
                                                    className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                /> */}
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
                      <div className="grid grid-cols-1 mb-3">
                        <label
                          className="block text-gray-700 font-bold mb-2"
                          htmlFor="noteDepartment"
                        >
                          Ghi chú
                        </label>
                        <Field
                          id="noteDepartment"
                          name="noteDepartment"
                          as="textarea"
                          value={values.noteDepartment}
                          onChange={handleChange}
                          rows={5}
                          className="shadow appearance-none border border-slate-950 rounded-lg p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                      </div>
                      {errorDepartment && (
                        <div className="text-red-500 flex items-center justify-center mb-2">
                          {errorDepartment}
                        </div>
                      )}
                      <div className="flex items-center justify-center mb-4">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="submit"
                        >
                          Tạo phòng ban
                        </button>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCreate;

import React, { useState, useEffect } from "react";
import InputText from "components/input/InputText";
import SelectInput from "components/input/SelectInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field } from "formik";
import { useStateContext } from "context/ContextProvider";
import * as yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
const createPunishSchema = yup.object().shape({
  punishCode: yup.string().required(""),
  decisionNumber: yup.string().required("Xin nhập số quyết định"),
  dateDecision: yup.date().required("Xin chọn ngày quyết định"),
  title: yup.string().required("Xin nhập tiêu đề"),
  mouth: yup.number().required("Xin nhập tháng khen thưởng"),
  moneyPunish: yup
    .string()
    .matches(/^[0-9]*$/, "Xin nhập chữ số")
    .required("Xin nhập tiền thưởng"),
  contentPunish: yup.string().required("Xin nhập nội dung"),
  idNhanVien: yup.array().min(1, "Xin chọn ít nhất 1 nhân viên"),
});
const PunishCreate = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const { showNotification } = useStateContext();

  const [getDataEmployee, setGetDataEmployee] = useState(null);
  const getEmployee = async () => {
    await fetch(`/api/admin/danhsachnhanvien`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res) => {
      const resData = await res.json();
      if (resData.error) {
        showNotification("error", resData.error);
      } else {
        setGetDataEmployee(resData);
      }
    });
  };
  useEffect(() => {
    getEmployee();
  }, []);
  if (!getDataEmployee) return null;
  let dataEmployee = [];
  for (let i = 0; i < getDataEmployee.userlist.length; i++) {
    dataEmployee.push({
      value: getDataEmployee.userlist[i].id,
      label: getDataEmployee.userlist[i].HoTen,
    });
  }
  let time = new Date().getTime();
  time = time.toString();
  time = time?.slice(4, 13);
  const initialValuePunish = {
    punishCode: "MKL" + time,
    decisionNumber: "",
    dateDecision: "",
    title: "",
    mouth: "",
    moneyPunish: "",
    contentPunish: "",
    idNhanVien: [],
  };
  const handleSubmit = async (values) => {
    await fetch(`/api/admin/kyluat/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    }).then(async (res) => {
      const resData = await res.json();
      if (resData.error) {
        showNotification("error", resData.error);
      } else {
        showNotification("success", resData.msg);
        navigate(`/admin/punish`);
      }
    });
  };
  const handleReturn = async () => {
    navigate(`/admin/punish`);
  };

  return (
    <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
      <div className="flex flex-wrap lg:flex-nowrap justify-between ">
        <div className="p-4 text-xl md:text-3xl font-bold">
          <h1>Tạo kỷ luật</h1>
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
            <div className="flex items-center gap-6">
              {/* <img src={avatar} alt="avatar" className='inline-block relative object-cover object-center 
                    w-[74px] h-[74px] rounded-lg shadow-lg shadow-blue-gray-500/40' />
                    <div>
                        <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug mb-1">Nguyen Danh</h5>
                        <p className="block antialiased font-sans text-sm leading-normal font-normal">Developer</p>
                    </div> */}
              <h2 className="pl-4 pt-3 text-2xl font-semibold">
                Hãy điền thông tin kỷ luật
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
                onSubmit={handleSubmit}
                initialValues={initialValuePunish}
                validationSchema={createPunishSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                }) => {
                  return (
                    <form
                      className="bg-white w-full shadow-md p-3 rounded"
                      onSubmit={handleSubmit}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                        <InputText
                          title="Mã kỷ luật"
                          id="punishCode"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.punishCode}
                          errors={errors.punishCode}
                          touched={touched.punishCode}
                          name="punishCode"
                          disabled
                          type="text"
                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                        <InputText
                          title="Số quyết định"
                          id="decisionNumber"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.decisionNumber}
                          errors={errors.decisionNumber}
                          touched={touched.decisionNumber}
                          name="decisionNumber"
                          type="text"
                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6">
                        <InputText
                          title="Ngày quyết định "
                          id="dateDecision"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.dateDecision}
                          errors={errors.dateDecision}
                          touched={touched.dateDecision}
                          name="dateDecision"
                          type="date"
                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                        <div className="col-span-2">
                          <InputText
                            title="Tiêu đề"
                            id="title"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.title}
                            errors={errors.title}
                            touched={touched.title}
                            name="title"
                            type="text"
                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                        <InputText
                          title="Tháng phạt"
                          id="mouth"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.mouth}
                          errors={errors.mouth}
                          touched={touched.mouth}
                          name="mouth"
                          type="number"
                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                        <InputText
                          title="Tiền phạt"
                          id="moneyPunish"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.moneyPunish}
                          errors={errors.moneyPunish}
                          touched={touched.moneyPunish}
                          name="moneyPunish"
                          type="text"
                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-1 mb-6">
                        <label
                          className="block text-gray-700 font-bold mb-2"
                          htmlFor="contentPunish"
                        >
                          Nội dung
                        </label>
                        {errors.contentPunish && touched.contentPunish ? (
                          <div className="text-sm text-red-700 mb-1">
                            {errors.contentPunish}
                          </div>
                        ) : (
                          <div className="mb-3"></div>
                        )}
                        <div className="h-52 md:h-40">
                          <ReactQuill
                            theme="snow"
                            value={values.contentPunish}
                            onChange={(e) => {
                              setFieldValue("contentPunish", e);
                            }}
                            onBlur={(e) => {
                              if (e.index == 0) {
                                setFieldValue("contentPunish", "");
                              }
                            }}
                            id="contentPunish"
                            style={{
                              height: "130px",
                            }}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1">
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="idNhanVien"
                          >
                            Danh sách nhân viên
                          </label>
                          {errors.idNhanVien && touched.idNhanVien ? (
                            <div className="text-sm text-red-700 mb-1">
                              {errors.idNhanVien}
                            </div>
                          ) : (
                            <div className="mb-3"></div>
                          )}

                          <Select
                            isMulti
                            name="idNhanVien"
                            options={dataEmployee}
                            onChange={(e) => {
                              // console.log(e)

                              setFieldValue("idNhanVien", e);
                            }}
                            onBlur={handleBlur}
                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-center mb-4">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="submit"
                        >
                          Tạo kỷ luật
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

export default PunishCreate;

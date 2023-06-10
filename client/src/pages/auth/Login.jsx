import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Input, Checkbox, Button } from "@material-tailwind/react";
import * as yup from "yup";
import { Formik } from "formik";
import { FiUser, FiKey } from "react-icons/fi";

import { setLogin } from "../../state/auth.js";
import avatar from "../../assets/avatar.svg";
import unlock from "../../assets/unlock.svg";
import wave from "../../assets/wave.png";
import { useDispatch, useSelector } from "react-redux";
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Cần nhập định dạng email")
    .required("Email không được để trống"),
  password: yup.string().required("Cần nhập password"),
});
const initialValuesLogin = {
  email: "",
  password: "",
};

const LoginPage = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const navigate = useNavigate();
  // const handleLogin = async (email, password) => {
  //     let values = {
  //         email: email,
  //         password: password
  //     }
  //     console.log(email);
  //     const saveRes = await fetch("http://localhost:9000/api/login", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: values,
  //     });
  //     const saveResJson = await saveRes.json();
  //     if (saveResJson) {
  //         (
  //             setLogin({
  //                 user: saveResJson.user,
  //                 token: saveResJson.token,
  //                 isAdmin: saveResJson.isAdmin
  //             })
  //         );
  //         // navigate("/admin");
  //     }

  // }
  const [errorLogin, setErrorLogin] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const checkState = useSelector((state) => state);
  // if (checkState.user) {
  //     navigate('/admin')
  // } else {
  //     navigate('/')
  // }

  const handleLogin = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:9000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn.user) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
          chucvu: loggedIn.tenchucvu,
          phongban: loggedIn.tenphongban,
        })
      );
      navigate("/admin");
    } else {
      setErrorLogin(loggedIn.msg);
    }
  };

  return (
    <>
      <img
        src={wave}
        className="fixed hidden lg:block inset-0 h-full"
        style={{ zIndex: 1000 }}
      />
      <div className="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
        <img
          src={unlock}
          className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto"
        />

        <Formik
          onSubmit={handleLogin}
          initialValues={initialValuesLogin}
          validationSchema={loginSchema}
        >
          {({ values, handleBlur, handleChange, handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center w-1/2"
            >
              <img src={avatar} className="w-32" />
              <h2 className="my-8 font-display font-bold text-3xl text-gray-700 text-center">
                Chào mừng bạn đến với website quản lý nhân sự
              </h2>

              <div className="relative">
                <FiUser className="absolute top-3 left-2 text-red-500 text-xl" />

                <input
                  type="email"
                  placeholder="Nhập email..."
                  className="p-2 pl-9 border-b-2 font-display rounded-lg focus:outline-none focus:border-red-500 transition-all duration-500  text-lg"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="email"
                />
              </div>
              <div className="relative mt-8">
                <FiKey className="absolute top-3 left-2 text-red-500 text-xl" />
                <input
                  type="password"
                  placeholder="Nhập mật khẩu..."
                  className="p-2 pl-9 border-b-2 font-display rounded-lg focus:outline-none focus:border-red-500 transition-all duration-500  text-lg"
                  lable="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errorLogin && (
                <div className="p-6 pb-3 text-red-500 text-xs">
                  {errorLogin}
                </div>
              )}
              <button
                type="submit"
                className="py-3 px-20 bg-red-500 rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500"
              >
                Đăng nhập
              </button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default LoginPage;

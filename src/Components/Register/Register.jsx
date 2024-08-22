import axios from "axios";
import { useFormik } from "formik";
import { useState, useEffect, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import SecLoader from "../SecLoader/SecLoader";
import { TokenContext } from "../../context/TokenContext";

function Register() {
  let [isLoading, setIsLoading] = useState(false);
  let [message, setmessege] = useState(null);
  let { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  // fetch data
  async function register() {
    setIsLoading(true);
    console.log(values);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((res) => {
        setIsLoading(false);
        console.log(res.data.message);
        setmessege(res.data.message);
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        console.log(token);
        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setmessege(err.response?.data?.message || "Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  // clean memory
  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);
  // handle form with formik ,validate with yup
  let { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: "",
      },
      onSubmit: () => {
        setmessege("");
        register();
      },
      validationSchema: Yup.object({
        name: Yup.string()
          .required("Name is required")
          .min(3, "Name must be at least 3 characters")
          .max(20, "Name must be not more than 20 char"),
        email: Yup.string()
          .required("Email is required")
          .email("enter valid email"),
        password: Yup.string()
          .required("Password is required")
          .min(6, "Password must be at least 6 characters"),
        rePassword: Yup.string()
          .required("Please confirm your password")
          .oneOf([Yup.ref("password")], "Passwords do not match"),
        phone: Yup.string()
          .required("Phone number is required")
          .matches(/^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/),
      }),
    });

  return (
    <>
      <div className=" md:w-[50vw]  mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-12 mt-9 flex flex-col items-center">
        <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
          Welcome to My FreshCart
        </h1>
        <form
          onSubmit={handleSubmit}
          action="#"
          className="w-full flex flex-col gap-4"
        >
          <div className="flex items-start flex-col justify-start">
            <label
              htmlFor="name"
              className="text-sm text-gray-700 dark:text-gray-200 mr-2"
            >
              Name:
            </label>
            <input
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              id="name"
              name="name"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500  "
            />
            {touched.name && <p className="text-red-500"> {errors.name} </p>}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label
              htmlFor="email"
              className="text-sm text-gray-700 dark:text-gray-200 mr-2"
            >
              Email:
            </label>
            <input
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              id="email"
              name="email"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 "
            />
            {touched.email && <p className="text-red-500"> {errors.email} </p>}
          </div>
          <div className="flex items-start flex-col justify-start">
            <label
              htmlFor="password"
              className="text-sm text-gray-700 dark:text-gray-200 mr-2"
            >
              Password:
            </label>
            <input
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              id="password"
              name="password"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 "
            />
            {touched.password && (
              <p className="text-red-500"> {errors.password} </p>
            )}
          </div>
          <div className="flex items-start flex-col justify-start">
            <label
              htmlFor="rePassword"
              className="text-sm text-gray-700 dark:text-gray-200 mr-2"
            >
              Confirm Password:
            </label>
            <input
              value={values.rePassword}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              id="rePassword"
              name="rePassword"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 "
            />
            {touched.rePassword && (
              <p className="text-red-500"> {errors.rePassword} </p>
            )}
          </div>
          <div className="flex items-start flex-col justify-start">
            <label
              htmlFor="phone"
              className="text-sm text-gray-700 dark:text-gray-200 mr-2"
            >
              phone:
            </label>
            <input
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 "
            />
            {touched.phone && <p className="text-red-500"> {errors.phone} </p>}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500"
            disabled={isLoading}
          >
            {isLoading ? <SecLoader /> : "Register"}
          </button>
          <p
            className={`text-center ${
              message && message.length > 7 ? "text-red-500" : "text-green-500"
            }`}
          >
            {message && message}
          </p>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500 dark:text-gray-300">
            Already have an account?{" "}
          </span>
          <Link to="/login" className="text-blue-500 hover:text-blue-600">
            Login
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;

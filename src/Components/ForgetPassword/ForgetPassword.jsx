import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import SecLoader from "../SecLoader/SecLoader";
import { useState } from "react";
import ResetCode from "../ResetCode/ResetCode";

function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      setMessage("");
      setIsLoading(true);
      try {
        const res = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
          values
        );
        setMessage(res.data.statusMsg);
        console.log(res);
      } catch (err) {
        setMessage(err.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Enter a valid email"),
    }),
  });

  // Destructure Formik handlers and values
  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    formik;

  return (
    <div className="md:w-[50vw] mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-12 mt-9 flex flex-col items-center">
      <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
        Reset My password
      </h1>
      {message == "success" ? (
        <ResetCode />
      ) : (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {/* Email Field */}
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
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {touched.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          {/* Password Field */}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500"
            disabled={isLoading}
          >
            {isLoading ? <SecLoader /> : "Forget"}
          </button>

          {/* Displaying Message */}
          {message && (
            <p
              className={`text-center ${
                message.length > 7 ? "text-red-500" : "text-green-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      )}

      <div className="mt-4 text-center">
        <span className="text-sm text-gray-500 dark:text-gray-300">
          {`Don't have an account?`}
        </span>
        <Link to="/register" className="text-blue-500 hover:text-blue-600">
          Register
        </Link>
      </div>
    </div>
  );
}

export default ForgetPassword;

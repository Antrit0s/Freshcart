import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import SecLoader from "../SecLoader/SecLoader";
import { useState } from "react";

function ResetCode() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: async (values) => {
      setMessage("");
      setIsLoading(true);
      try {
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          values
        );
        console.log(data);
        setMessage(data.data.status);

        if (data.data.status === "success") {
          setTimeout(() => {
            navigate("/login"); // Navigate to login page after 1 second
          }, 1000);
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "Something went wrong";
        setMessage(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: Yup.object({
      resetCode: Yup.string().required("Reset code is required"),
    }),
  });

  // Destructure Formik handlers and values
  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    formik;

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      {/* Reset Code Field */}
      <div className="flex items-start flex-col justify-start">
        <label
          htmlFor="resetCode"
          className="text-sm text-gray-700 dark:text-gray-200 mr-2"
        >
          Reset Code:
        </label>
        <input
          value={values.resetCode}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          id="resetCode"
          name="resetCode"
          className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {touched.resetCode && (
          <p className="text-red-500">{errors.resetCode}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500"
        disabled={isLoading}
      >
        {isLoading ? <SecLoader /> : "Verify Code"}
      </button>

      {/* Displaying Message */}
      {message && (
        <p
          className={`text-center ${
            message === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}

export default ResetCode;

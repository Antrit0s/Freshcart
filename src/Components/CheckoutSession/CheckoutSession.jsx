import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import SecLoader from "../SecLoader/SecLoader";

function CheckoutSession() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const cartId = localStorage.getItem("cartId"); // Ensure cartId is correctly stored and retrieved

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: async (values) => {
      setMessage("");
      setIsLoading(true);
      try {
        const res = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkoutsession/${cartId}`,
          { shippingAddress: values },
          {
            headers: { token: localStorage.getItem("token") },
            params: { url: "http://localhost:5173" },
            // Remove params if not needed
          }
        );
        console.log(res);
        setMessage({ type: "success", text: "Submission successful" });
      } catch (err) {
        setMessage({
          type: "error",
          text: err.response?.data?.message || "Submission failed",
        });
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: Yup.object({
      details: Yup.string().required("Details are required"),
      phone: Yup.string()
        .required("Phone is required")
        .matches(
          /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/,
          "Invalid phone number"
        ),
      city: Yup.string().required("City is required"),
    }),
  });

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    formik;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-xl">
        <div className="md:flex">
          <div className="w-full px-6 py-8 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
            <p className="mt-4 text-gray-600">
              Please fill out the form below to complete your purchase.
            </p>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  className="block text-gray-800 font-bold mb-2"
                  htmlFor="details"
                >
                  Details
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="details"
                  name="details"
                  type="text"
                  placeholder="Address details"
                  value={values.details}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                />
                {touched.details && errors.details && (
                  <p className="text-red-500 mt-1">{errors.details}</p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-800 font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="01283******"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                />
                {touched.phone && errors.phone && (
                  <p className="text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-800 font-bold mb-2"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Ex: Cairo"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                />
                {touched.city && errors.city && (
                  <p className="text-red-500 mt-1">{errors.city}</p>
                )}
              </div>
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <SecLoader /> : "Submit"}
              </button>
              {message && (
                <p
                  className={`mt-4 ${
                    message.type === "success"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {message.text}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSession;

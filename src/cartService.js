import { toast, Bounce } from "react-toastify";
import axios from "axios";
export async function addToCart(product, setisLoadingSec) {
  let mode = localStorage.theme;
  try {
    setisLoadingSec(true);
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId: product._id },
      { headers: { token: localStorage.getItem("token") } }
    );

    const { data } = response;
    console.log(data);
    let catId = data.data._id;

    toast.success(data.message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: mode,
      transition: Bounce,
    });
  } catch (error) {
    setisLoadingSec(false);
    console.error("Error adding to cart:", error);

    // Extract error message from the response if available
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to add to cart. Please try again.";

    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  } finally {
    setisLoadingSec(false);
  }
}

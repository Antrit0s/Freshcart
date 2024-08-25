import { toast, Bounce } from "react-toastify";
import axios from "axios";

export async function addToCart(product, setIsLoadingSec) {
  let mode = localStorage.theme;
  try {
    setIsLoadingSec(true);
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId: product._id },
      { headers: { token: localStorage.getItem("token") } }
    );

    const { data } = response;
    console.log(data);
    const cartId = data.data._id;
    localStorage.setItem("cartId", cartId);

    toast.success(data.message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: mode,
      transition: Bounce,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);

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
      theme: "light",
      transition: Bounce,
    });
  } finally {
    setIsLoadingSec(false);
  }
}

import { toast, Bounce } from "react-toastify";
import axios from "axios";

export async function addToFavourite(product, setAddedToWishlist) {
  // Retrieve theme mode from localStorage
  let mode = localStorage.theme;

  try {
    // Make a POST request to add the product to the wishlist
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId: product._id },
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    console.log("Added " + product._id + " to wishlist");
    setAddedToWishlist(true);
    // Display a success notification
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
    console.log("Error adding to wishlist:", error);

    // Determine the error message to display
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to add to wishlist. Please try again.";

    // Display an error notification
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
  }
}

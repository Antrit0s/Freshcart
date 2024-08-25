import { toast, Bounce } from "react-toastify";
import axios from "axios";
export async function addToFavourite(product) {
  let { data } = axios.post(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    { productId: product._id },
    {
      headers: { token: localStorage.getItem("token") },
    }
  );
}

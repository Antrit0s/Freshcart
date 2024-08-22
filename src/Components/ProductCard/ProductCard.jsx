import { Link } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa6";
import { addToCart } from "../../cartService";
import SecLoader from "../SecLoader/SecLoader";
import { useState } from "react";
import { toast, Bounce } from "react-toastify";
import axios from "axios";
function ProductCard({ product, index }) {
  const [isLoadingSec, setisLoadingSec] = useState(false);
  const [cartId, setCartId] = useState(localStorage.getItem("cartId" || ""));
  async function addToCart(product, setisLoadingSec, setCartId, cartId) {
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
      console.log(catId);
      setCartId(catId);
      localStorage.setItem("cartId", catId);
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
  return (
    <div className="product-card align-middle hover:shadow-custom-green rounded-lg  overflow-hidden group">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
        <Link to={"/ProductDetails/" + product._id} className="w-52">
          <img
            className="rounded w-full"
            src={product.imageCover || "/path-to-placeholder.jpg"} // Fallback image if `imageCover` is missing
            alt={product.title || "Product Image"} // Fallback alt text
          />
        </Link>
        <div className="p-5">
          <h5 className="mb-2 text-green-300 tracking-tight">
            {product.category?.name || "Uncategorized"}
          </h5>
          <h5 className="mb-2 font-bold tracking-tight line-clamp-1 dark:text-white">
            {product.title || "Untitled Product"}
          </h5>
          <div className="detail flex justify-between dark:text-white">
            <span>
              {product.price ? `${product.price} EGP` : "Price not available"}
            </span>
            <span className="flex items-center">
              {product.ratingsAverage || "No rating"}
              <svg
                className="w-4 h-4 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            </span>
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <button
              onClick={() => {
                addToCart(product, setisLoadingSec, setCartId, cartId);
              }}
              className="bg-green-300 py-2 px-3 rounded-lg w-3/4 mx-auto translate-y-60 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
            >
              {isLoadingSec ? <SecLoader /> : "Add to Cart"}
            </button>
            <button className="text-gray-400 hover:text-red-500">
              <FaHeart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

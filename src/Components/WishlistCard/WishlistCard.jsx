// WishlistCard.js
import React, { useState } from "react";
import { addToCart } from "../../cartService";
import SecLoader from "../SecLoader/SecLoader";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

function WishlistCard({ favProducts, getWishlist }) {
  const [loadingStates, setLoadingStates] = useState({});
  const [removingStates, setRemovingStates] = useState({});

  const handleAddToCart = async (favProduct) => {
    setLoadingStates((prevState) => ({
      ...prevState,
      [favProduct.id]: true,
    }));

    await addToCart(favProduct, (isLoading) => {
      setLoadingStates((prevState) => ({
        ...prevState,
        [favProduct.id]: isLoading,
      }));
    });
  };

  async function removeFromWishlist(id) {
    setRemovingStates((prevState) => ({
      ...prevState,
      [id]: true,
    }));

    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(data);

      toast.success(data.status, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: localStorage.getItem("mode"),
        transition: Bounce,
      });
      getWishlist();
    } catch (error) {
      console.log(error);
    } finally {
      setRemovingStates((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }
  }

  return (
    <>
      {favProducts.map((favProduct, index) => (
        <div
          key={index}
          className="fav-product-container p-2 w-full grid md:grid-cols-3 items-center justify-center"
        >
          <div className="fav-product-image col-span-1">
            <img
              className="rounded-lg md:w-52"
              src={favProduct.imageCover}
              alt={favProduct.title}
            />
          </div>
          <div className="fav-product-details md:flex gap-2 justify-between items-center p-3 md:col-span-2">
            <div className="flex flex-col items-start justify-center gap-2">
              <h5 className="font-semibold text-lg">{favProduct.title}</h5>
              <h6>{favProduct.price} EGP</h6>
              <button
                className={`add-to-cart-button py-2 px-3 rounded-lg text-white mt-2 ${
                  removingStates[favProduct.id]
                    ? "bg-gray-400"
                    : "bg-red-500 hover:bg-red-400"
                }`}
                onClick={() => removeFromWishlist(favProduct.id)}
                disabled={removingStates[favProduct.id]}
              >
                {removingStates[favProduct.id] ? <SecLoader /> : "Remove"}
              </button>
            </div>
            <div>
              <button
                className={`add-to-cart-button py-2 px-3 rounded-lg text-white mt-2 ${
                  loadingStates[favProduct.id]
                    ? "bg-gray-400"
                    : "bg-green-300 hover:bg-green-600"
                }`}
                onClick={() => handleAddToCart(favProduct)}
                disabled={loadingStates[favProduct.id]}
              >
                {loadingStates[favProduct.id] ? <SecLoader /> : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default WishlistCard;

import { Link } from "react-router-dom";
import SecLoader from "../SecLoader/SecLoader";
import axios from "axios";
import { useState, useEffect } from "react";

function CartProduct({
  cartItems,
  removingItems,
  removeCartItem,
  setCartItems,
  getCart,
  cartId,
}) {
  const [isLoading, setIsLoading] = useState(false);

  // Function to format numbers with commas
  // Function to format numbers with commas
  function commafy(num) {
    if (num === undefined || num === null || isNaN(num)) {
      return "0";
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  async function changeQuantity(id, count) {
    if (count > 0) {
      setIsLoading(true);
      try {
        const { data } = await axios.put(
          `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
          { count: count },
          { headers: { token: localStorage.getItem("token") } }
        );
        setCartItems(data.data);
      } catch (err) {
        console.error("Error updating quantity:", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      removeCartItem(id);
    }
  }

  // Calculate the total count of items
  const totalItemCount =
    cartItems.products?.reduce((total, p) => total + p.count, 0) || 0;

  async function clearCart() {
    setCartItems([]);
    try {
      let { data } = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      console.log(data);

      getCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }

  return (
    <>
      <div className="lg:flex gap-3">
        <div className="products bg-white dark:bg-slate-300 p-5 pb-10 rounded-lg mt-4 lg:w-3/4">
          {cartItems.products?.map((p) => (
            <div
              key={p.product?._id}
              className="product-item mb-4 md:flex items-center border-b-2"
            >
              <div className="img md:w-1/3 md:mr-2">
                <Link to={`/ProductDetails/${p.product?._id}`}>
                  <img
                    className="h-30 w-30 md:w-96 md:h-auto rounded-lg p-1"
                    src={p.product?.imageCover}
                    alt={p.product?.title}
                  />
                </Link>
              </div>
              <div className="content flex flex-col items-center mb-2 md:mb-0 md:items-start md:w-2/3">
                <div className="details">
                  <h6 className="font-bold">{p.product?.title}</h6>
                  <h5 className="font-semibold">
                    Price: {commafy(p.price)} EGP
                  </h5>
                  <button
                    onClick={() => removeCartItem(p.product._id)}
                    className={`bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-full ${
                      removingItems[p.product?._id]
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={removingItems[p.product?._id]}
                  >
                    {removingItems[p.product?._id] ? <SecLoader /> : "Remove"}
                  </button>
                </div>
                <div className="buttons flex flex-col md:flex-row items-center mt-4">
                  <button
                    onClick={() => changeQuantity(p.product?._id, p.count - 1)}
                    className="p-3 border rounded-full bg-red-500 hover:bg-red-400"
                    disabled={isLoading}
                  >
                    {isLoading ? <SecLoader /> : "-"}
                  </button>
                  <input
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (!isNaN(value) && value !== p.count) {
                        changeQuantity(p.product?._id, value);
                      }
                    }}
                    className="mx-2 w-auto text-center"
                    type="number"
                    value={p.count}
                    min="1"
                  />
                  <button
                    onClick={() => changeQuantity(p.product._id, p.count + 1)}
                    className="p-3 border rounded-full bg-green-500 hover:bg-green-400"
                    disabled={isLoading}
                  >
                    {isLoading ? <SecLoader /> : "+"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="total bg-white dark:bg-slate-300 mt-4 p-7 lg:h-fit rounded-lg flex flex-col items-center lg:w-1/4">
          <p className="text-lg font-semibold">
            Subtotal ({totalItemCount} item{totalItemCount !== 1 ? "s" : ""}):
          </p>
          <p className="text-lg font-semibold">
            {commafy(cartItems.totalCartPrice)} EGP
          </p>
          <hr />
          <Link
            to={`/checkoutsession/${cartId}`}
            className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-full my-4"
          >
            Checkout
          </Link>
          <div className="border-t-2 w-full flex justify-center pb-10">
            <button
              onClick={clearCart}
              className="mt-4 rounded-full py-2 px-4 text-white bg-red-800 hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartProduct;

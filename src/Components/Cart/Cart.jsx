import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

import { toast, Bounce } from "react-toastify";

import CartProduct from "../CartProduct/CartProduct";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(localStorage.getItem("cartId"));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [removingItems, setRemovingItems] = useState({});
  let mode = localStorage.theme;

  useEffect(() => {
    getCart();
  }, []);

  async function getCart() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      console.log(data);
      setCartId(data.data.cartOwner);
      localStorage.setItem("cartId", cartId);

      setCartItems(data.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setError("Failed to load cart data.");
    } finally {
      setIsLoading(false);
    }
  }

  async function removeCartItem(id) {
    try {
      setRemovingItems((prev) => ({ ...prev, [id]: true }));
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(data);
      toast.success("Item has been removed", {
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
      // Refresh the cart items after removing an item
      setCartItems(data.data);
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setError("Failed to remove item from cart.");
      toast.success(data.status, {
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
    } finally {
      setRemovingItems((prev) => ({ ...prev, [id]: false }));
    }
  }

  if (isLoading)
    return (
      <div className="container flex justify-center items-center">
        <Loader />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <div className="flex flex-col gap-3 p-1 dark:text-gray-800">
        <h2 className="text-center font-bold dark:text-white">Shopping Cart</h2>
        {cartItems.products?.length === 0 ? (
          <div className="bg-white dark:bg-slate-300 p-5 rounded-lg">
            Empty cart
          </div>
        ) : (
          <CartProduct
            cartItems={cartItems}
            removingItems={removingItems}
            removeCartItem={removeCartItem}
            setCartItems={setCartItems}
            getCart={getCart}
          />
        )}
      </div>
    </div>
  );
}

export default Cart;

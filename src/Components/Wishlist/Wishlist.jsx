import axios from "axios";
import { useContext, useEffect, useState } from "react";
import WishlistCard from "../WishlistCard/WishlistCard";
import Loader from "../Loader/Loader";
import { WishlistContext } from "../../context/WishlistContext";

function Wishlist() {
  let { Wishlist, setWishlist } = useContext(WishlistContext);
  const [favProducts, setFavProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getWishlist();
  }, []);
  async function getWishlist() {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(data);
      setFavProducts(data.data);
      setWishlist(data.data);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="container    dark:text-white my-8 rounded-lg">
      <h1 className="font-semibold text-2xl my-3 ml-2">My wish List</h1>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <WishlistCard favProducts={favProducts} getWishlist={getWishlist} />
        </div>
      )}
    </div>
  );
}

export default Wishlist;

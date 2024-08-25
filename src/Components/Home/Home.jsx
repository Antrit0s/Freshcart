import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import Loader from "../Loader/Loader";

function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getProducts() {
      try {
        setIsLoading(true);
        let { data } = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/products"
        );
        console.log(data.data);
        setProducts(data.data);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getProducts(); // Call the function to fetch products
  }, []);

  return (
    <>
      <div className="container my-4">
        <div className="flex justify-center items-center ">
          {isLoading ? (
            <div className="">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-5 lg:grid-cols-4 overflow-hidden">
              {products.map((product, index) => (
                <ProductCard key={index} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;

// ProductDetails.js
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductSlider from "../ProductSlider/ProductSlider";
import { FaHeart, FaStar } from "react-icons/fa6";
import Loader from "../Loader/Loader";
import ProductCard from "../ProductCard/ProductCard";
import SecLoader from "../SecLoader/SecLoader";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRelated, setIsLoadingRelated] = useState(false);
  const [isLoadingSec, setIsLoadingSec] = useState(false);

  useEffect(() => {
    if (id) {
      getProductDetails(id);
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      getRelatedProducts(product);
    }
  }, [product]);

  // Fetch product details
  async function getProductDetails(productId) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${productId}`
      );
      setProduct(data.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Fetch related products
  async function getRelatedProducts(product) {
    const catID = product.category._id;
    try {
      setIsLoadingRelated(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products",
        { params: { category: catID } }
      );
      setRelatedProduct(data.data);
    } catch (error) {
      console.error("Error fetching related products:", error);
    } finally {
      setIsLoadingRelated(false);
    }
  }

  // Add product to cart
  async function handleAddToCart(product) {
    try {
      setIsLoadingSec(true);
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: product._id },
        { headers: { token: localStorage.getItem("token") } }
      );
      const { data } = response;
      localStorage.setItem("cartId", data.data._id);
      toast.success(data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: localStorage.theme || "light",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart. Please try again.", {
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
      setIsLoadingSec(false);
    }
  }

  if (isLoading) return <Loader />;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="flex flex-col">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-3 md:gap-x-4">
        <div className="w-[200px] mt-2 mb-3 md:mb-0 md:w-4/12 p-3">
          {product.images && <ProductSlider images={product.images} />}
        </div>
        <div className="md:w-8/12 px-2 dark:text-white">
          <h2 className="font-bold text-lg">{product.title}</h2>
          <p>{product.description}</p>
          <div className="flex justify-between">
            <p className="font-semibold">{product.price} EGP</p>
            <p className="flex items-center gap-1">
              <span>{product.ratingsAverage}</span>
              <FaStar className="text-yellow-100" />
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-green-300 py-2 px-3 rounded-lg w-3/4 mx-auto"
            >
              {isLoadingSec ? <SecLoader /> : "Add to Cart"}
            </button>
            <button className="text-white hover:text-red-500">
              <FaHeart />
            </button>
          </div>
        </div>
      </div>
      {isLoadingRelated ? (
        <Loader />
      ) : (
        <div className="container flex justify-center">
          <div className="mt-3 p-5 grid grid-cols-1 md:grid-cols-3 gap-3 lg:grid-cols-4 overflow-hidden items-center justify-center">
            {relatedProduct.map((related, index) => (
              <ProductCard
                key={index}
                product={related}
                addToCart={handleAddToCart} // Pass the function as a prop
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SubCategory from "../SubCategory/SubCategory";
import Loader from "../Loader/Loader";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [clickedCategory, setclickedCategory] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/categories"
        );
        console.log(data);

        setCategories(data.data); // Adjust based on the API response structure
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to fetch categories. Please try again later.");
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);
  const handleClick = (category) => {
    setShowModal(true);
    console.log(category.name);
    console.log(category._id);
    setclickedCategory(category);
  };
  if (isLoading) return <Loader />;
  return (
    <div className="container flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-5 lg:grid-cols-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div onClick={() => handleClick(category)} key={category._id}>
              <div className="max-w-sm bg-white border  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-custom-green hover:cursor-pointer">
                <img
                  className="rounded w-full h-80 object-center object-cover aspect-[4/3]"
                  src={category.image || "/path-to-placeholder.jpg"}
                  alt={category.name || "Product Image"}
                />

                <div className="flex justify-center items-center py-2 px-1">
                  <h5 className="mb-2 text-green-600 dark:text-green-300 text-center text-base md:text-3xl font-sans font-medium tracking-tight text-wrap">
                    {category.name || "Uncategorized"}
                  </h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 flex flex-col justify-center"
            role="alert"
          >
            <span className="font-medium"> No Categories available</span>
            <span className="font-medium"> {error}</span>
          </div>
        )}
      </div>
      {showModal && <SubCategory clickedCategory={clickedCategory} />}
    </div>
  );
}

export default Categories;

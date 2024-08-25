import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

function SubCategory({ clickedCategory }) {
  const [subCategories, setSubCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (clickedCategory) {
      getSubCategory(clickedCategory);
    }
  }, [clickedCategory]);

  async function getSubCategory(category) {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${category._id}/subcategories`
      );
      console.log(data);
      setSubCategories(data.data); // Adjust based on the API response structure
    } catch (err) {
      console.error("Error fetching subcategories:", err);
      setError("Failed to fetch subcategories. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      {isLoading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <h2 className="font-bold text-center py-4 ">
            {clickedCategory?.name} Subcategories
          </h2>

          {error ? (
            <div className="text-red-500">{error}</div>
          ) : subCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-5">
              {subCategories.map((subCategory) => (
                <div
                  key={subCategory._id}
                  className="bg-white border rounded-lg p-4  shadow hover:shadow-custom-green"
                >
                  <h3 className="text-lg font-semibold text-center text-base md:text-3xl font-sans font-medium">
                    {subCategory.name}
                  </h3>
                </div>
              ))}
            </div>
          ) : (
            <div>No subcategories available.</div>
          )}
        </>
      )}
    </div>
  );
}

export default SubCategory;

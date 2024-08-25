import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import BrandCard from "../BrandCard/BrandCard";

function Brands() {
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    getBrands();
  }, []);

  async function getBrands() {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      console.log(data);
      setBrands(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleClick(brand) {
    setSelectedBrand(brand); // Set the clicked brand as the selected brand
    setShowModal(true); // Show the modal
  }

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-3 p-3 md:gap-6">
        {brands.map((brand) => (
          <div
            onClick={() => handleClick(brand)}
            className="rounded-lg border border-black/25 shadow-lg hover:shadow-custom-green"
            key={brand.id}
          >
            <div className="img">
              <img
                className="rounded w-full"
                src={brand.image}
                alt={brand.name}
              />
            </div>
            <div>
              <p className="bg-white text-center p-4 font-sans">{brand.name}</p>
            </div>
          </div>
        ))}
        {showModal && selectedBrand && (
          <BrandCard
            brand={selectedBrand}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Brands;

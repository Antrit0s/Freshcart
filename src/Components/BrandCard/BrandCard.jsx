import { FaXmark } from "react-icons/fa6";

function BrandCard({ brand, onClose }) {
  // Function to handle clicking outside the modal
  function handleBackgroundClick(e) {
    if (e.target === e.currentTarget) {
      onClose(); // Close the modal
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackgroundClick} // Attach the click handler to the background div
    >
      <div className="bg-white rounded-lg p-5 w-11/12 max-w-md">
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FaXmark size={20} />
          </button>
        </div>

        {/* Brand Information */}
        <div className="text-center">
          <p className="text-2xl font-bold mb-2">{brand.name}</p>
          <p className="text-gray-500 mb-4">{brand.slug}</p>
          <div>
            <img
              className="w-full h-auto rounded-lg"
              src={brand.image}
              alt={brand.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandCard;

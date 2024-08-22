import Slider from "react-slick";

function ProductSlider({ images }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  // Conditional rendering with a ternary operator
  return images.length < 1 ? (
    <img
      className="mx-auto rounded-md w-40"
      src="images"
      alt="Placeholder Image"
    />
  ) : (
    <Slider {...settings} className="text-center md:h-auto">
      {images.map((image, index) => (
        <img
          className="mx-auto rounded-md w-40"
          key={index}
          src={image}
          alt={`Product Image ${index + 1}`}
        />
      ))}
    </Slider>
  );
}

export default ProductSlider;

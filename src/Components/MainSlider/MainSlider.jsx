import Slider from "react-slick";
import img1 from "../../assets/imgs/main-slider-1.jpeg";
import img2 from "../../assets/imgs/main-slider-2.jpeg";
import img3 from "../../assets/imgs/main-slider-3.jpeg";
import { useState, useEffect } from "react";

function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const [images, setImages] = useState([]);

  useEffect(() => {
    // Setting images state with the list of images
    setImages([img1, img2, img3]);
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <Slider {...settings} className="text-center md:h-auto w-3/4 mb-2">
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

export default MainSlider;

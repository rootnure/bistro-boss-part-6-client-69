import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import categoryImg1 from "../../assets/home/slide1.jpg";
import categoryImg2 from "../../assets/home/slide2.jpg";
import categoryImg3 from "../../assets/home/slide3.jpg";
import categoryImg4 from "../../assets/home/slide4.jpg";
import categoryImg5 from "../../assets/home/slide5.jpg";
import SectionTitle from "../Shared/SectionTitle";

const Category = () => {
  const categories = [
    { _id: "bbrCat001", img: categoryImg1, title: "Salads" },
    { _id: "bbrCat002", img: categoryImg2, title: "Pizzas" },
    { _id: "bbrCat003", img: categoryImg3, title: "Soups" },
    { _id: "bbrCat004", img: categoryImg4, title: "Desserts" },
    { _id: "bbrCat005", img: categoryImg5, title: "Salads" },
  ];
  const screenWidth = window.screen.width;
  return (
    <section>
      <SectionTitle
        heading="Order Online"
        subHeading="From 11:00AM to 10:00PM"></SectionTitle>
      <Swiper
        slidesPerView={screenWidth > 1400 ? 4 : 3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper w-full md:w-11/12 lg:w-2/3">
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            <img src={category.img} alt="" className="w-fit mx-auto" />
            <h3 className="text-lg md:text-2xl lg:text-4xl uppercase text-center -mt-8 md:-mt-12 lg:-mt-16 mb-12 text-white font-medium [text-shadow:_2px_2px_0_rgb(0_0_0_/_40%)] lg:[text-shadow:_4px_4px_0_rgb(0_0_0_/_40%)]">
              {category.title}
            </h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Category;

import PropTypes from "prop-types";
import FoodCard from "../Shared/FoodCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import "./OrderTabPaginationSwiperStyles.css";


const OrderTab = ({ foodItems }) => {
    const dataPerPage = window.screen.width > 1400 ? 8 : 6;
    const pageCount = Math.ceil(foodItems.length / dataPerPage);
    const pages = [...Array(pageCount).keys()];
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };
    return (
        <>
            <Swiper
                pagination={pagination}
                modules={[Pagination]}
                className="mySwiper orderPageUniqueClass"
            >
                {
                    pages.map(page => <SwiperSlide key={page}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-16">
                            {
                                foodItems.slice(page * dataPerPage, (page + 1) * dataPerPage).map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                            }
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </>
    );
};

OrderTab.propTypes = {
    foodItems: PropTypes.array.isRequired
}

export default OrderTab;
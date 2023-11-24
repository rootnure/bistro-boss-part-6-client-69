import SectionTitle from '../Shared/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaQuoteLeft } from "react-icons/fa";

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';

import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/reviews")
            .then(res => res.json())
            .then(data => setReviews(data))
    }, []);

    return (
        <section>
            <SectionTitle
                heading="Testimonials"
                subHeading="What Our Clients Say"
            ></SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className='py-12 flex items-center flex-col gap-8 w-10/12 mx-auto text-center'>
                            <Rating
                                style={{ maxWidth: "175px" }}
                                value={review.rating}
                                readOnly></Rating>
                            <h1 className="text-7xl"><FaQuoteLeft></FaQuoteLeft></h1>
                            <p>{review.details}</p>
                            <h2 className="text-3xl text-orange-400 font-semibold">{review.name}</h2>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Testimonials;
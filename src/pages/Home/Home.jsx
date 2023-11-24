import { Helmet } from "react-helmet-async";
import Container from "../../components/Container";
import Cover from "../Shared/Cover";
import Banner from "./Banner";
import Category from "./Category";
import ChefRecommends from "./ChefRecommends";
import Featured from "./Featured";
import PopularMenu from "./PopularMenu";
import Testimonials from "./Testimonials";
import coverImg from "../../assets/home/banner.jpg";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <div className="space-y-12 md:space-y-16 lg:space-y-24 mb-24">
                <Banner></Banner>
                <Container>
                    <Category></Category>
                    <Cover
                        bgImg={coverImg}
                        title="Bistro Boss"
                        description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet illum nostrum quos laboriosam architecto? Debitis dolores molestias, ut delectus temporibus accusamus architecto corrupti iure explicabo maiores quaerat illo enim perferendis?"
                    ></Cover>
                    <PopularMenu></PopularMenu>
                    <section>
                        <h2 className="text-4xl text-center font-medium w-full py-20 bg-black text-white">Call Us: +88 0192345678910</h2>
                    </section>
                    <ChefRecommends></ChefRecommends>
                </Container>
                <Featured></Featured>
                <Container>
                    <Testimonials></Testimonials>
                </Container>
            </div>
        </>
    );
};

export default Home;
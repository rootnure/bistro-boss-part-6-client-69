import SectionTitle from "../Shared/SectionTitle";
import featuredImg from "../../assets/home/featured.jpg";
import Container from "../../components/Container";
import MainBtn from "../../components/MainBtn";

const Featured = () => {
    return (
        <section style={{ backgroundImage: `url("${featuredImg}")` }} className="bg-cover bg-fixed">
            <div className="px-6 md:px-10 lg:px-20 py-12 md:py-16 lg:py-20 bg-slate-700 bg-opacity-60 text-white">
                <Container>
                    <SectionTitle
                        subHeading="Check It Out"
                        heading="Featured Items"
                    ></SectionTitle>
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-x-20 gap-y-12">
                        <div>
                            <img src={featuredImg} alt="" />
                        </div>
                        <div className="space-y-4 text-center md:text-left">
                            <p className="text-2xl font-light">Aug 23, 2026</p>
                            <p className="font-semibold text-lg">Where Can I Get Some?</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur similique praesentium accusantium consectetur adipisci odit, ratione, quas minima laborum mollitia delectus dignissimos sint. Reprehenderit soluta libero, placeat eos officia neque eligendi quos nemo molestiae hic aliquam laboriosam, a perferendis sit temporibus inventore praesentium ex magni? Maiores perferendis consectetur consequatur iure?</p>
                            <MainBtn>Order Now</MainBtn>
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    );
};

export default Featured;
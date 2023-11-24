import SectionTitle from "../Shared/SectionTitle";
import chefRecImg from "../../assets/home/slide1.jpg";
import FoodCard from "../Shared/FoodCard";

const ChefRecommends = () => {

    const recommends = [
        { _id: "1", image: chefRecImg, name: "Caeser Salad", recipe: "Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets." },
        { _id: "2", image: chefRecImg, name: "Caeser Salad", recipe: "Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets." },
        { _id: "3", image: chefRecImg, name: "Caeser Salad", recipe: "Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets." },
    ]

    return (
        <section>
            <SectionTitle
                heading="Chef Recommends"
                subHeading="Should Try"
            ></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    recommends.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                }
            </div>
        </section>
    );
};

export default ChefRecommends;
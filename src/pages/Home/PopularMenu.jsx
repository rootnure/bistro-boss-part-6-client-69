import SectionTitle from "../Shared/SectionTitle";
import Items from "../Shared/Items";
import useMenu from "../../hooks/useMenu";

const PopularMenu = () => {
    const [menu] = useMenu();
    const popularMenu = menu.filter(item => item.category.toLowerCase() === "popular".toLowerCase());

    return (
        <section>
            <SectionTitle
                heading="From Our Menu"
                subHeading="Popular Items"
            ></SectionTitle>
            <Items items={popularMenu} isBgWhite={true}></Items>
        </section>
    );
};

export default PopularMenu;
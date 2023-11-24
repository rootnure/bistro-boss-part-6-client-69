import { Helmet } from "react-helmet-async";
import Cover from "../Shared/Cover";
import useMenu from "../../hooks/useMenu";
import MenuItems from "./MenuItems";
import menuBg from "../../assets/menu/menu-bg.png";
import sectionBannerBgImg from "../../assets/menu/banner3.jpg";
import dessertBgImg from "../../assets/menu/dessert-bg.jpeg";
import pizzaBgImg from "../../assets/menu/pizza-bg.jpg";
import saladBgImg from "../../assets/menu/pizza-bg.jpg";
import soupBgImg from "../../assets/menu/soup-bg.jpg";

const Menu = () => {
    const [menu, loading] = useMenu();
    const offers = menu.filter(item => item.category.toLowerCase() === "offered");
    const desserts = menu.filter(item => item.category.toLowerCase() === "dessert");
    const pizzas = menu.filter(item => item.category.toLowerCase() === "pizza");
    const salads = menu.filter(item => item.category.toLowerCase() === "salad");
    const soups = menu.filter(item => item.category.toLowerCase() === "soup");
    return (
        <>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <main className="space-y-24 pb-24 bg-auto" style={{ backgroundImage: `url(${menuBg})` }}>
                <Cover
                    isPageCover
                    bgImg={sectionBannerBgImg}
                    title="Menu"
                    description="Order Your Favourate Food From Our Menu."
                ></Cover>
                {/* offer menu */}
                <MenuItems
                    sectionHeading="Today's Offer"
                    sectionSubHeading="Don't Miss"
                    loading={loading}
                    items={offers}
                    sectionBtnText="Order Your Favourate Food"
                ></MenuItems>
                {/* dessert menu */}
                <MenuItems
                    sectionBannerBgImgLink={dessertBgImg}
                    sectionBannerTitle="dessert"
                    sectionBannerDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe soluta dolorem accusantium architecto voluptatum provident? Expedita beatae vero dignissimos sit dicta repellat, ad quaerat veritatis!"
                    loading={loading}
                    items={desserts}
                    sectionBtnText="Order Your Favourate Food"
                ></MenuItems>
                {/* pizza menu */}
                <MenuItems
                    sectionBannerBgImgLink={pizzaBgImg}
                    sectionBannerTitle="pizza"
                    sectionBannerDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe soluta dolorem accusantium architecto voluptatum provident? Expedita beatae vero dignissimos sit dicta repellat, ad quaerat veritatis!"
                    loading={loading}
                    items={pizzas}
                    sectionBtnText="Order Your Favourate Food"
                ></MenuItems>
                {/* salad menu */}
                <MenuItems
                    sectionBannerBgImgLink={saladBgImg}
                    sectionBannerTitle="salad"
                    sectionBannerDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe soluta dolorem accusantium architecto voluptatum provident? Expedita beatae vero dignissimos sit dicta repellat, ad quaerat veritatis!"
                    loading={loading}
                    items={salads}
                    sectionBtnText="Order Your Favourate Food"
                ></MenuItems>
                {/* soups menu */}
                <MenuItems
                    sectionBannerBgImgLink={soupBgImg}
                    sectionBannerTitle="soup"
                    sectionBannerDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe soluta dolorem accusantium architecto voluptatum provident? Expedita beatae vero dignissimos sit dicta repellat, ad quaerat veritatis!"
                    loading={loading}
                    items={soups}
                    sectionBtnText="Order Your Favourate Food"
                ></MenuItems>
            </main>
        </>
    );
};

export default Menu;
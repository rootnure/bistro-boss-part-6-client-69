import PropTypes from "prop-types";
import Container from "../../components/Container";
import SectionTitle from "../Shared/SectionTitle";
import Items from "../Shared/Items";
import Loading from "../Shared/Loading";
import Cover from "../Shared/Cover";

const MenuItems = ({ sectionBannerBgImgLink, sectionBannerTitle, sectionBannerDescription, sectionHeading, sectionSubHeading, loading, items, sectionBtnText }) => {
    return (
        <section className="space-y-12 md:space-y-16 lg:space-y-24">
            {(sectionBannerBgImgLink || sectionBannerTitle || sectionBannerDescription) ?
                <Cover
                    bgImg={sectionBannerBgImgLink}
                    title={sectionBannerTitle}
                    description={sectionBannerDescription}
                ></Cover> : ""}
            <Container>
                {(sectionHeading || sectionSubHeading) ?
                    <SectionTitle
                        heading={sectionHeading}
                        subHeading={sectionSubHeading}
                    ></SectionTitle> : ""}
                {loading ?
                    <Loading></Loading> :
                    <Items
                        items={items}
                        isBgWhite
                        btnText={sectionBtnText}
                        title={sectionBannerTitle}
                    ></Items>}
            </Container>
        </section>
    );
};

MenuItems.propTypes = {
    sectionBannerBgImgLink: PropTypes.string,
    sectionBannerTitle: PropTypes.string,
    sectionBannerDescription: PropTypes.string,
    sectionHeading: PropTypes.string,
    sectionSubHeading: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    sectionBtnText: PropTypes.string.isRequired
}

export default MenuItems;
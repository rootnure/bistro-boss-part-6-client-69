import PropTypes from "prop-types";
import MainBtn from "../../components/MainBtn";
import Item from "./Item";
import { Link } from "react-router-dom";

const Items = ({
  items,
  isBgWhite = true,
  btnText = "View Full Menu",
  title,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
        {items.slice(0, 6).map((item) => (
          <Item key={item._id} item={item}></Item>
        ))}
      </div>
      <div className="flex justify-center my-8">
        <Link to={title ? `/shop/${title}` : "/shop"}>
          <MainBtn isBgWhite={isBgWhite}>{btnText}</MainBtn>
        </Link>
      </div>
    </>
  );
};

Items.propTypes = {
  items: PropTypes.array.isRequired,
  isBgWhite: PropTypes.bool,
  btnText: PropTypes.string,
  title: PropTypes.string,
};

export default Items;

import PropTypes from "prop-types";

const Item = ({ item }) => {
  const { name, image, price, recipe } = item;
  return (
    <div className="flex gap-1">
      <img
        src={image}
        alt=""
        className="w-20 h-full rounded-[0_80px_80px_80px] me-3"
      />
      <div className="2xl:pb-2 2xl:space-y-4 flex-1">
        <h3 className="uppercase font-bold">{name}--------------</h3>
        <p>{recipe}</p>
      </div>
      <p className="text-yellow-600 font-bold">${price.toFixed(2)}</p>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Item;

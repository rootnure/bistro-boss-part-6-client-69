import PropTypes from "prop-types";

const MainBtn = ({ children, isBgWhite, handleAddToCart }) => {
    return (
        <>
            <button onClick={handleAddToCart} className={`btn btn-outline border-t-0 border-l-0 border-r-0 border-b-4 bg-opacity-40 font-black uppercase ${isBgWhite ? "bg-gray-300 hover:text-yellow-400" : "border-white hover:text-yellow-500 text-white bg-gray-400"}`}>{children}</button>
        </>
    );
};

MainBtn.propTypes = {
    children: PropTypes.string.isRequired,
    isBgWhite: PropTypes.bool,
    handleAddToCart: PropTypes.func
}

export default MainBtn;
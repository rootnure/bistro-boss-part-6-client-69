import PropTypes from "prop-types";

const WoodenBtn = ({ children, disabled }) => {
    return (
        <>
            <button className="btn bg-[#D1A054B2] text-white hover:bg-[#D1A054]" disabled={disabled}>{children}</button>
        </>
    );
};

WoodenBtn.propTypes = {
    children: PropTypes.string.isRequired,
    disabled: PropTypes.bool
}

export default WoodenBtn;
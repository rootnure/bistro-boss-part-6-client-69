import PropTypes from "prop-types";

const Container = ({ children }) => {
    return (
        <>
            <div className='container mx-auto space-y-12 md:space-y-16 lg:space-y-24'>
                {children}
            </div>
        </>
    );
};

Container.propTypes = {
    children: PropTypes.node.isRequired
}

export default Container;
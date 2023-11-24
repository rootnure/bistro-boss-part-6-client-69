import PropTypes from "prop-types";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="w-fit mx-auto mb-12 text-center">
      {subHeading && (
        <p className="text-yellow-500 font-semibold mb-3 text-lg">
          ---- {subHeading} ----
        </p>
      )}
      {heading && (
        <h3 className="text-4xl uppercase font-medium border-y-4 py-4 px-12">
          {heading}
        </h3>
      )}
    </div>
  );
};

SectionTitle.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
};

export default SectionTitle;

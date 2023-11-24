import PropTypes from "prop-types";

const ContactCard = ({ info }) => {
  const { _id, title, description, icon } = info;
  return (
    <>
      <div className="flex flex-col">
        <div className="bg-yellow-600 text-white text-3xl text-center py-6">
          {icon}
        </div>
        <div className="p-6 pt-0 border flex-1">
          <div className="p-8 text-center bg-gray-100 pb-16 h-full">
            <p className="text-3xl mb-3">{title}</p>
            {description.split("\n ").map((line, idx) => (
              <p key={_id + idx}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

ContactCard.propTypes = {
  info: PropTypes.object.isRequired,
};

export default ContactCard;

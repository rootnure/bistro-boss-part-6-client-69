import PropTypes from "prop-types";
import { Parallax } from "react-parallax";

const Cover = ({ bgImg, title, description, isPageCover = false }) => {
  return (
    <>
      {title || description || bgImg ? (
        <Parallax
          blur={{ min: -50, max: 50 }}
          bgImage={bgImg}
          bgImageAlt={`Background Image for ${title}`}
          strength={-250}>
          <section
            className={`hero min-h-fit ${
              isPageCover ? "md:h-[700px] pt-24 md:pt-48" : "md:h-[550px]"
            } px-12 md:px-20 lg:px-48 py-12 md:py-28`}>
            <div className="hero-overlay bg-opacity-60 bg-black"></div>
            <div className="hero-content text-center p-6 md:p-10 lg:p-16 text-white">
              <div className="mb-4">
                {title ? (
                  isPageCover ? (
                    <h1 className="font-cinzel mb-6 text-6xl font-bold uppercase">
                      {title}
                    </h1>
                  ) : (
                    <h1 className="font-cinzel mb-5 text-4xl font-bold uppercase">
                      <span className="text-6xl">{title[0]}</span>
                      {title.slice(1, title.length)}
                    </h1>
                  )
                ) : (
                  ""
                )}
                {description ? <p className="text-lg">{description}</p> : ""}
              </div>
            </div>
          </section>
        </Parallax>
      ) : (
        ""
      )}
    </>
  );
};

Cover.propTypes = {
  isPageCover: PropTypes.bool,
  bgImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Cover;

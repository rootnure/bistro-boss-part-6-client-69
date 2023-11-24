import { Helmet } from "react-helmet-async";
import Cover from "../Shared/Cover";
import bgImg from "../../assets/contact/banner.jpg";
import Container from "../../components/Container";
import SectionTitle from "../Shared/SectionTitle";
import ContactCard from "./ContactCard";
import { FaClock, FaLocationDot, FaPhoneVolume } from "react-icons/fa6";
import ContactForm from "./ContactForm";

const ContactUs = () => {
  const contactCardInfo = [
    {
      _id: "aaa",
      title: "Phone",
      description: "+880 1234-567890",
      icon: <FaPhoneVolume className="mx-auto" />,
    },
    {
      _id: "bbb",
      title: "Address",
      description: "23/1, Fulbaria, Dhaka-1200",
      icon: <FaLocationDot className="mx-auto" />,
    },
    {
      _id: "ccc",
      title: "Working Hours",
      description: "Mon - Fri: 08:00 - 22:00\n Sat - Sun: 10:00 - 23:00",
      icon: <FaClock className="mx-auto" />,
    },
  ];
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Contact Us</title>
      </Helmet>
      <main className="space-y-24 pb-24">
        <Cover
          bgImg={bgImg}
          title="Contact Us"
          description="Would You Like to Try a Dish?"
          isPageCover={true}
        />
        <Container>
          <section>
            <SectionTitle heading="Our Location" subHeading="Visit Us" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contactCardInfo.map((info) => (
                <ContactCard key={info._id} info={info} />
              ))}
            </div>
          </section>
          <section>
            <SectionTitle
              heading="Contact Form"
              subHeading="Send Us a Message"
            />
            <ContactForm />
          </section>
        </Container>
      </main>
    </>
  );
};

export default ContactUs;

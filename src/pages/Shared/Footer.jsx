import { FaTwitter, FaYoutube, FaFacebookF } from "react-icons/fa6";
import Container from "../../components/Container";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname.includes("login") || pathname.includes("register") ? (
        ""
      ) : (
        <footer>
          <div className="bg-neutral text-neutral-content">
            <Container>
              <div className="footer py-10">
                <aside>
                  <h2 className="text-3xl">Bistro Boss</h2>
                  <p>
                    ACME Industries Ltd.
                    <br />
                    Providing reliable tech since 1992
                  </p>
                </aside>
                <nav>
                  <header className="footer-title">Social</header>
                  <div className="grid grid-flow-col gap-4 text-xl">
                    <a>
                      <FaTwitter></FaTwitter>
                    </a>
                    <a>
                      <FaYoutube></FaYoutube>
                    </a>
                    <a>
                      <FaFacebookF></FaFacebookF>
                    </a>
                  </div>
                </nav>
              </div>
            </Container>
          </div>
          <div className="footer-center p-4 bg-black text-white font-medium">
            <aside>
              <p>
                Copyright © 2023 - All right reserved by ACME Industries Ltd
              </p>
            </aside>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;

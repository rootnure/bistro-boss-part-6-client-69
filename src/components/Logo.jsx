import { Link, useLocation } from "react-router-dom";

const Logo = () => {
  const { pathname } = useLocation();
  const isDashboard = pathname.includes("dashboard");
  return (
    <Link to="/" className="uppercase text-center">
      <div className={`font-cinzel ${isDashboard ? "mt-12 mb-6" : ""}`}>
        <h3 className={`text-3xl ${isDashboard ? "font-extrabold" : ""}`}>
          <span className="tracking-wider whitespace-nowrap">Bistro Bos</span>s
        </h3>
        <p className={isDashboard ? "font-bold" : ""}>
          <span className="tracking-[10px]">Restauran</span>t
        </p>
      </div>
    </Link>
  );
};

export default Logo;

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import useAuthHook from "../../hooks/useAuthHook";
import { toast } from "react-toastify";
import Logo from "../../components/Logo";
import useCart from "../../hooks/useCart";

const NavBar = () => {
  const { user, logOut } = useAuthHook();
  const navigate = useNavigate();
  const [cart] = useCart();
  const { pathname } = useLocation();

  const handleLogOut = () => {
    logOut().then(() => {
      navigate("/");
      toast.success("Logout Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  };

  const navItems = (
    <>
      <li>
        <NavLink
          className="hover:text-white hover:scale-110 duration-75"
          to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className="hover:text-white hover:scale-110 duration-75"
          to="/menu">
          Our Menu
        </NavLink>
      </li>
      <li>
        <NavLink
          className="hover:text-white hover:scale-110 duration-75"
          to="/shop">
          Our Shop
        </NavLink>
      </li>
      <li>
        <NavLink
          className="hover:text-white hover:scale-110 duration-75"
          to="/contact-us">
          Contact Us
        </NavLink>
      </li>
      {user ? (
        <>
          <li>
            <p className="indicator me-4 hover:text-white">
              <span className="indicator-item badge badge-secondary px-1">
                {cart.length}
              </span>
              <NavLink
                className="scale-110 hover:scale-125 duration-75"
                to="/dashboard/cart">
                <FaShoppingCart className="text-2xl" />
              </NavLink>
            </p>
          </li>
          <Link to="/dashboard" className="h-full cursor-pointer">
            <img
              src={user.photoURL}
              alt={`DP of ${user.displayName}`}
              className="max-h-9 scale-125 hover:scale-[1.35] duration-75 rounded-full"
            />
          </Link>
        </>
      ) : (
        <></>
      )}
    </>
  );

  return (
    <>
      <div className="bg-black bg-opacity-50 backdrop-blur text-white fixed top-0 z-10 left-0 right-0">
        <Container>
          <div className="navbar">
            <div className="navbar-start">
              {!pathname.includes("login") && (
                <div className="dropdown">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost lg:hidden text-xl">
                    <FaBars />
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow text-black bg-base-100 rounded-box w-52">
                    {navItems}
                  </ul>
                </div>
              )}
              <Logo />
            </div>
            {pathname.includes("login") || pathname.includes("register") ? (
              ""
            ) : (
              <>
                <div className="navbar-center hidden lg:flex">
                  <ul className="menu menu-horizontal px-1 gap-x-2">
                    {navItems}
                  </ul>
                </div>
              </>
            )}
            <div className="navbar-end">
              {user ? (
                <>
                  <button
                    onClick={handleLogOut}
                    className="btn btn-outline text-white hover:scale-110 duration-75 hover:bg-transparent hover:border-white uppercase"
                    to="/login">
                    LogOut
                  </button>
                </>
              ) : (
                <>
                  <Link
                    className="btn btn-outline text-white hover:scale-110 duration-75 hover:bg-transparent hover:border-white"
                    to="/login">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
      {pathname.includes("login") || pathname.includes("register") ? (
        <div className="mb-[76px]"></div>
      ) : (
        ""
      )}
    </>
  );
};

export default NavBar;

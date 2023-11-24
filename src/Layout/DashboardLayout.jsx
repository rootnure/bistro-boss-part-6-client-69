import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import "./DashboardLayout.css";
import {
  FaCalendar,
  FaCalendarCheck,
  FaHome,
  FaShoppingCart,
  FaStar,
  FaUtensilSpoon,
  FaWallet,
} from "react-icons/fa";
import Logo from "../components/Logo";
import {
  FaBagShopping,
  FaBars,
  FaBook,
  FaEnvelope,
  FaListUl,
  FaUsers,
} from "react-icons/fa6";
import Container from "../components/Container";
import useAdmin from "../hooks/useAdmin";

const DashboardLayout = () => {
  const { pathname } = useLocation();

  const [isAdmin] = useAdmin();

  return (
    <Container>
      <div className="flex">
        {/* dashboard sidebar */}
        <div className="w-72 min-h-screen bg-amber-500">
          <Logo />
          <ul className="menu dashboard space-y-4 p-4 uppercase text-base font-cinzel font-semibold">
            {isAdmin ? (
              <>
                {/* admin menu items */}
                <li>
                  <Link
                    to="/dashboard"
                    className={pathname === "/dashboard" ? "active" : ""}>
                    <FaHome className="text-2xl" /> Admin Home
                  </Link>
                </li>
                <li>
                  <NavLink to="/dashboard/add-items">
                    <FaUtensilSpoon className="text-2xl" /> Add Items
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-items">
                    <FaListUl className="text-2xl" /> Manage Items
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-bookings">
                    <FaBook className="text-2xl" /> Manage Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/all-users">
                    <FaUsers className="text-2xl" /> All Users
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {/* user menu items */}
                <li>
                  <Link
                    to="/dashboard"
                    className={pathname === "/dashboard" ? "active" : ""}>
                    <FaHome className="text-2xl" /> User Home
                  </Link>
                </li>
                <li>
                  <NavLink to="/dashboard/reservation">
                    <FaCalendar className="text-2xl" /> Reservation
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/payment-history">
                    <FaWallet className="text-2xl" /> Payment History
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/cart">
                    <FaShoppingCart className="text-2xl" /> My Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/my-review">
                    <FaStar className="text-2xl" /> Add Review
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/my-bookings">
                    <FaCalendarCheck className="text-2xl" /> My Booking
                  </NavLink>
                </li>
              </>
            )}

            <p className="divider"></p>

            {/* shared menu items */}
            <li>
              <Link to="/">
                <FaHome className="text-2xl" /> Home
              </Link>
            </li>
            <li>
              <Link to="/menu">
                <FaBars className="text-2xl" /> Menu
              </Link>
            </li>
            <li>
              <Link to="/shop">
                <FaBagShopping className="text-2xl" /> Shop
              </Link>
            </li>
            <li>
              <Link to="/contact-us">
                <FaEnvelope className="text-2xl" /> Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* dashboard content */}
        <div className="flex-1 min-h-screen bg-gray-100 p-16">
          <Outlet></Outlet>
        </div>
      </div>
    </Container>
  );
};

export default DashboardLayout;

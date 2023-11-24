import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAuthHook from "../hooks/useAuthHook";
import Loading from "../pages/Shared/Loading";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuthHook();
    const location = useLocation();
    if (loading) return <Loading></Loading>
    if (!user) return <Navigate to="/login" state={{ from: location }} replace={true}></Navigate>
    return children;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
}

export default PrivateRoute;
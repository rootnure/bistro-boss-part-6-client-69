import { Outlet } from 'react-router-dom';
import Footer from '../pages/Shared/Footer';
import NavBar from '../pages/Shared/NavBar';
import ScrollToTop from '../components/ScrollToTop';

const MainLayout = () => {
    return (
        <>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
            <ScrollToTop></ScrollToTop>
        </>
    );
};

export default MainLayout;
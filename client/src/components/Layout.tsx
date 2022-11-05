import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <div className="mt-20">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;

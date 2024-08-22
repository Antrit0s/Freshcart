import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function Layout() {
  return (
    <>
      <Navbar />
      <div className=" flex items-center justify-center py-12 min-h-screen">
        <Outlet className=" " />
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
    </>
  );
}

export default Layout;

import { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DesktopSidebar from "./DesktopSidebar";
import DockBar from "./DockBar";
import Footer from "./Footer";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? "hidden" : "";
      return next;
    });
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <Header onMenuToggle={toggleSidebar} isMenuOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <DesktopSidebar />

      <div className="lg:pl-[220px]">
        <main className="pt-14">
          <Outlet />
        </main>
        <Footer />
      </div>
      <DockBar />
    </>
  );
};

export default Layout;

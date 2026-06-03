import { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DockBar from "./DockBar";
import Footer from "./Footer";
import SplashScreen from "./SplashScreen";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (isHomePage) {
      setShowSplash(true);
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        setShowSplash(false);
        document.body.style.overflow = "";
      }, 2200);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      setShowSplash(false);
    }
  }, [isHomePage]);

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
      {isHomePage && showSplash && <SplashScreen />}

      <Header onMenuToggle={toggleSidebar} isMenuOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <main className="pt-14">
        <Outlet />
      </main>

      <Footer />
      <DockBar />
    </>
  );
};

export default Layout;

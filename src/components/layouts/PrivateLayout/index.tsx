import { useState, useEffect } from "react";
import AppHeader from "./../components/Header";
import AppSidebar from "./../components/Sidebar";
import AppFooter from "./../components/Footer";
import Main from "./../components/Main";
import { useAppSelector } from "../../../redux/hooks";
import { Navigate } from "react-router-dom";

function PrivateLayout() {
  const state = useAppSelector((store) => store.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleWindowResize = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  };

  useEffect(() => {
    // Add a window resize event listener
    window.addEventListener("resize", handleWindowResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  if (!state.isLoggedIn) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <>
      <div className="bg-gray-50 dark:bg-slate-900">
        {/*<!-- ========== HEADER ========== -->*/}
        <AppHeader toggleSidebar={toggleSidebar} />
        {/*<!-- ========== END HEADER ========== -->*/}

        {/*<!-- ========== MAIN CONTENT ========== -->*/}
        {/*<!-- Sidebar -->*/}
        <AppSidebar isSidebarOpen={isSidebarOpen} />
        {/*<!-- End Sidebar -->*/}

        {/*<!-- Content -->*/}
        <div className="w-full h-full bg-gray-50 pt-16  sm:px-6 md:px-8 lg:pl-64 lg:pr-0 overflow-auto">
          <Main />
          <AppFooter />
        </div>
        {/*<!-- End Content -->*/}
        {/*<!-- ========== END MAIN CONTENT ========== -->*/}
      </div>
    </>
  );
}

export default PrivateLayout;

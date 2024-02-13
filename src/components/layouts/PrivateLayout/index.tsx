import { useEffect } from "react";
import AppHeader from "./../components/Header";
import AppSidebar from "./../components/Sidebar";
import AppFooter from "./../components/Footer";
import Main from "./../components/Main";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Navigate } from "react-router-dom";
import Overlay from "../components/Overlay";
import { toggleSidebar } from "../../../redux/slices/sidebar";

function PrivateLayout() {
  const state = useAppSelector((store) => store.auth);
  const sidebar = useAppSelector((store) => store.sidebar);

  const dispatch = useAppDispatch();

  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  const handleWindowInitialResize = () => {
    if (window.innerWidth < 1024) {
      if (sidebar.isOpen) {
        dispatch(toggleSidebar(true));
      }
    }
    //   setIsSidebarOpen(false);
    // } else {
    //   setIsSidebarOpen(true);
    // }
  };

  const handleWindowResize = () => {
    if (window.innerWidth < 1024) {
      dispatch(toggleSidebar(false));
    }else{
      // dispatch(toggleSidebar(false));
    }
  };

  useEffect(() => {
    // Handle initial window resize
    handleWindowInitialResize();

    // Add a window resize event listener
    window.addEventListener('resize', handleWindowResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []); // Add dependencies as needed

  if (!state.isLoggedIn) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <>
      <div className="bg-gray-50 dark:bg-slate-900">
        {/*<!-- ========== HEADER ========== -->*/}
        <AppHeader />
        {/*<!-- ========== END HEADER ========== -->*/}

        {/*<!-- ========== MAIN CONTENT ========== -->*/}
        {/*<!-- Sidebar -->*/}
        <AppSidebar isSidebarOpen={sidebar.isOpen} />
        {/*<!-- End Sidebar -->*/}

        {/*<!-- Content -->*/}
        <Overlay loading={sidebar.isOpen}
        >
          <div className="w-full h-screen bg-grey-50 pt-16  sm:px-6 md:px-8 lg:pl-64 lg:pr-0 overflow-auto">
            <Main />
            <AppFooter />
          </div>
        </Overlay>
        {/*<!-- End Content -->*/}
        {/*<!-- ========== END MAIN CONTENT ========== -->*/}
      </div>
    </>
  );
}

export default PrivateLayout;

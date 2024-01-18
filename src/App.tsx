import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "./components/layouts/PublicLayout";
import Protectedlayout from "./components/layouts/ProtectedLayout";
import PrivateLayout from "./components/layouts/PrivateLayout";
import IncidentList from "./pages/Incident/list";
import Dashboard from "./pages/Dashboard";
import IncidentDetail from "./pages/Incident/detail";
import Login from "./pages/Auth/Login";
import OTPVerification from "./pages/Auth/OTP";
import ProtectedOtpLayout from "./components/layouts/ProtectedOtpLayout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Protectedlayout />,
      children: [
        {
          path: "",
          element: <Login />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
    {
      path: "otp/verify",
      element: <ProtectedOtpLayout />,
      children: [
        {
          path: "",
          element: <OTPVerification />,
        },
      ],
    },
    {
      path: "about-us",
      element: <PublicLayout />,
      children: [
        {
          path: "",
          element: <>About Us</>,
        },
      ],
    },
    {
      path: "faq",
      element: <PublicLayout />,
      children: [
        {
          path: "",
          element: <>About Us</>,
        },
      ],
    },
    {
      path: "home",
      element: <PrivateLayout />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "incidents",
          element: <IncidentList />,
        },
        {
          path: "incidents/:id",
          element: <IncidentDetail />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

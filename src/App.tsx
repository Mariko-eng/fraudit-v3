import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Protectedlayout from "./components/layouts/ProtectedLayout";
import PrivateLayout from "./components/layouts/PrivateLayout";
import IncidentList from "./pages/Incident/list";
import Dashboard from "./pages/Dashboard";
import IncidentDetail from "./pages/Incident/detail";
import Login from "./pages/Auth/Login";
import OTPVerification from "./pages/Auth/OTP";
import ProtectedOtpLayout from "./components/layouts/ProtectedOtpLayout";
import UserList from "./pages/User/list";
import UserDetail from "./pages/User/detail";
import NewIncidentUBA from "./pages/Incident/new/NewIncidentUBA";
import NewIncidentSFI from "./pages/Incident/new/NewIncidentSFI";
import IncidentSuspectsNew from "./pages/Incident/detail/components/suspects/new";
import UsersByCategoryList from "./pages/User/list/category";
import IncidentBySFIList from "./pages/Incident/list/sfi";
import IncidentEditUBA from "./pages/Incident/edit/IncidentEditUBA";
import IncidentEditSFI from "./pages/Incident/edit/IncidentEditSFI";
import TransferList from "./pages/transfer/list";
import SfiList from "./pages/Sfi/list";
import AnalyticsGraphMonth from "./pages/Analytics/graphs/month";
import AnalyticsGraphClassfication from "./pages/Analytics/graphs/classification";
import AnalyticsGraphCategory from "./pages/Analytics/graphs/category";
import AnalyticsGraphSubCategory from "./pages/Analytics/graphs/sub_category";
import AnalyticsGraphSfi from "./pages/Analytics/graphs/sfi";
import AnalyticsGraphGeneral from "./pages/Analytics/graphs/general";
import AnalyticsStatsMonth from "./pages/Analytics/stats/month";
import AnalyticsStatsClassfication from "./pages/Analytics/stats/classification";
import AnalyticsStatsSfi from "./pages/Analytics/stats/sfi";
import AnalyticsStatsGeneral from "./pages/Analytics/stats/general";
import AnalyticsStatsCategory from "./pages/Analytics/stats/category";
import AnalyticsStatsSubCategory from "./pages/Analytics/stats/sub_category";
import IncidentReports from "./pages/Reports/incidents";
import SuspectReports from "./pages/Reports/suspects";
import NewUserRoot from "./pages/User/new/root";
import NewUser from "./pages/User/new/user";
import EditUser from "./pages/User/edit/user";
import EditUserRoot from "./pages/User/edit/root";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

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
      path: "forgot-password",
      element: <ForgotPassword />,
    },

    {
      path: "reset-password",
      element: <ResetPassword />,
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
          path: "incidents/status/:status",
          element: <IncidentList />,
        },
        {
          path: "incidents/sfi/:sfi",
          element: <IncidentBySFIList />,
        },
        {
          path: "incidents/:id",
          element: <IncidentDetail />,
        },
        {
          path: "incidents/:id/edit-sfi",
          element: <IncidentEditSFI />,
        },
        {
          path: "incidents/:id/edit-uba",
          element: <IncidentEditUBA />,
        },
        {
          path: "incidents/:id/suspects-new",
          element: <IncidentSuspectsNew />,
        },
        {
          path: "incidents/sfi/new",
          element: <NewIncidentSFI />,
        },
        {
          path: "incidents/uba/new",
          element: <NewIncidentUBA />,
        },
        {
          path: "transfers",
          element: <TransferList />,
        },

        {
          path: "sfis",
          element: <SfiList />,
        },

        {
          path: "users",
          element: <UserList />,
        },
        {
          path: "users/category/:category",
          element: <UsersByCategoryList />,
        },
        {
          path: "users/detail/:id",
          element: <UserDetail />,
        },

        {
          path: "users/new",
          element: <NewUser />,
        },

        {
          path: "users/:id/edit",
          element: <EditUser />,
        },

        {
          path: "users/new/root",
          element: <NewUserRoot />,
        },

        {
          path: "users/:id/edit/root",
          element: <EditUserRoot />,
        },

        {
          path: "analytics/graphs/month",
          element: <AnalyticsGraphMonth />,
        },
        {
          path: "analytics/graphs/classification",
          element: <AnalyticsGraphClassfication />,
        },
        {
          path: "analytics/graphs/category",
          element: <AnalyticsGraphCategory />,
        },
        {
          path: "analytics/graphs/sub_category",
          element: <AnalyticsGraphSubCategory />,
        },
        {
          path: "analytics/graphs/sfi",
          element: <AnalyticsGraphSfi />,
        },
        {
          path: "analytics/graphs/general",
          element: <AnalyticsGraphGeneral />,
        },

        {
          path: "analytics/stats/month",
          element: <AnalyticsStatsMonth />,
        },
        {
          path: "analytics/stats/classification",
          element: <AnalyticsStatsClassfication />,
        },
        {
          path: "analytics/stats/category",
          element: <AnalyticsStatsCategory />,
        },
        {
          path: "analytics/stats/sub_category",
          element: <AnalyticsStatsSubCategory />,
        },
        {
          path: "analytics/stats/sfi",
          element: <AnalyticsStatsSfi />,
        },
        {
          path: "analytics/stats/general",
          element: <AnalyticsStatsGeneral />,
        },
        {
          path: "reports/incidents",
          element: <IncidentReports />,
        },
        {
          path: "reports/suspects",
          element: <SuspectReports />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

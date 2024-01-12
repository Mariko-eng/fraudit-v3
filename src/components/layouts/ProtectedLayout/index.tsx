import { Navigate, Outlet } from "react-router";
import { authUser } from "../../../constants/sample_data/user_data";

const Protectedlayout = () => {
  if (authUser.isLoggedIn) {
    return <Navigate to={"/home"} replace={true} />;
  }

  return <Outlet />;
};

export default Protectedlayout;

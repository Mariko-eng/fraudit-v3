import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../../redux/hooks";

const ProtectedOtpLayout = () => {
  const state = useAppSelector((store) => store.auth);

  console.log(0, state);

  if (state.isLoggedIn) {
    console.log(1, state);

    if (state.user) {
      console.log(2, state);

      if (state.user.is_otp_verified) {
        console.log(3, state);

        return <Navigate to={"/home"} replace={true} />;
      }
    }
  }

  return <Outlet />;
};

export default ProtectedOtpLayout;

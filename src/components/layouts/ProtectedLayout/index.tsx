import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../../redux/hooks";


const Protectedlayout = () => {
  const state = useAppSelector((store) => store.auth);

  // console.log(0, state)

  if (state.isLoggedIn) {
      console.log(1, state)

    if(state.user){
        console.log(2, state)

      if(state.user.is_otp_verified){
          console.log(3, state)

          return <Navigate to={"/home"} replace={true} />;
      }else{
          console.log(4, state)

          return <Navigate to={"/otp/verify"} replace={true} />;
      }
    }
  }

  return <Outlet />;
};

export default Protectedlayout;

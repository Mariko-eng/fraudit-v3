import { SyntheticEvent, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import AuthService from "../../../services/auth.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CustomError } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../redux/reducers/auth";

export interface QueryTypes {
  isError?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: CustomError | any;
  data?: object;
}

const OTPVerification = () => {
  const navigate = useNavigate();

  const state = useAppSelector((store) => store.auth);

  const dispatch = useAppDispatch();

  const [oTPError, setOTPError] = useState<boolean>(false);

  const [otpCode, setOtpCode] = useState("");

  const { isLoading, isError, isSuccess }: QueryTypes = useQuery({
    queryKey: [],
    queryFn: () =>
      AuthService.requestOtp(
        {},
        {
          Authorization: `Bearer ${state.tokens?.access}`,
          "Content-Type": "application/json",
        }
      ),
  });

  const otpMutation = useMutation({
    mutationFn: () =>
      AuthService.verifyOtp(
        { otp: otpCode },
        {
          Authorization: `Bearer ${state.tokens?.access}`,
          "Content-Type": "application/json",
        }
      ),
    onSuccess: () => {
      return navigate("/home");
    },
    onError: (error) => {
      console.log(error);

      setOTPError(true);
      setTimeout(() => {
        setOTPError(false);
      }, 5000);
    },
  });

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    /* API call */
    /* verify otp mutation */

    // console.log(otpCode)

    otpMutation.mutate();
  };

  const render = () => {
    if (isLoading) {
      return (
        <>
          <div className="relative">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-4 w-4 text-[#00AFD7] mt-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm text-[#00AFD7] font-medium">
                    Loading
                  </h3>
                  <div className="text-sm text-[#00AFD7] mt-2">
                    <span className="font-semibold">
                      Requesting One Time Password
                    </span>
                    <br />
                    Sending OTP to email or phone number.
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-0 left-0 w-full h-full bg-white/[.5] rounded-md dark:bg-gray-800/[.4]"></div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div
                className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-[#00AFD7] rounded-full"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (isError) {
      return (
        <>
          <div>
            <div
              className="bg-red-50 border border-red-200 rounded-md p-4 mb-3"
              role="alert"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-4 w-4 text-yellow-400 mt-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm text-yellow-800 font-semibold">
                    OTP Verification Error
                  </h3>
                  <div className="mt-1 text-sm text-yellow-700">
                    {isError ? (
                      <>Failed To Send OTP Code!</>
                    ) : otpMutation.isError ? (
                      <>You have submitted a wrong OTP Code!</>
                    ) : (
                      <></>
                    )}

                    {/* {error.errorMessage
                ? error.message
                : otpMutation.error ?
                otpMutation.error.message
              : "Something went Wrong! Failed to send OTP"} */}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                className="mt-2 text-sm text-[#00AFD7]"
                onClick={() => dispatch(logoutUser())}
              >
                Login Again
              </button>
              <button
                className="mt-2 text-sm text-emerald-700"
                onClick={() => window.location.reload()}
              >
                Resend Otp
              </button>
            </div>
          </div>
        </>
      );
    }

    if (isSuccess) {
      return (
        <>
          {/*<!-- Form -->*/}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-y-4">
              {/*<!-- Form Group -->*/}
              <div>
                <p className="text-md dark:text-white">
                  We have sent a verification code to&nbsp;
                  {state.user?.email}. To verify that this is your email
                  address, enter the code below.
                </p>
              </div>
              {/*<!-- End Form Group -->*/}

              {/*<!-- Form Group -->*/}
              <div>
                {otpMutation.isError && oTPError && (
                  <div
                    className="bg-red-50 border border-red-200 rounded-md p-4 mb-3"
                    role="alert"
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-4 w-4 text-yellow-400 mt-0.5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm text-yellow-800 font-semibold">
                          OTP Verification Error
                        </h3>
                        <div className="mt-1 text-sm text-yellow-700">
                          {isError ? (
                            <>Failed To Send OTP Code!</>
                          ) : otpMutation.isError ? (
                            <>You have submitted a wrong OTP Code!</>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="relative">
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    required
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    disabled={!!otpMutation.isPending}
                    className="py-3 px-4 block w-full border-gray-200 bg-gray-50 rounded-md text-sm focus:border-[#00AFD7] focus:ring-[#00AFD7] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                    aria-describedby="password-error"
                    data-private
                  />
                  <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                    <svg
                      className="h-5 w-5 text-red-500"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                  </div>
                </div>
                <p
                  className="hidden text-xs text-red-600 mt-2"
                  id="password-error"
                >
                  OTP Error
                </p>
              </div>
              {/*<!-- End Form Group -->*/}

              <button
                type="submit"
                disabled={!!otpMutation.isPending}
                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#00AFD7] text-white hover:bg-[#00AED7] focus:outline-none focus:ring-2 focus:ring-[#00AFD7] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              >
                Submit OTP
              </button>
            </div>
          </form>
          {/*<!-- End Form -->*/}
          <div className="flex justify-end">
            <button
              className="mt-2 text-sm text-emerald-700"
              onClick={() => window.location.reload()}
            >
              Resend Otp
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" name="description" content="FraudIT Login Page" />
        <title>FraudIT | Login OTP</title>
      </Helmet>
      <div className="h-full">
        <div className="dark:bg-slate-900 bg-gray-100 flex h-full items-center py-10">
          <div className="w-full max-w-md mx-auto p-6">
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                    OTP Verification Code
                  </h1>
                </div>

                <div className="mt-5">{render()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPVerification;

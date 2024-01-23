import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { FormikProvider, useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import LogoLight from "./../../../assets/UBALogoOnlyLight.png";
import LogoDark from "./../../../assets/UBALogoOnlyDark.png";
import { Link } from "react-router-dom";
import { clearMessage } from "../../../redux/slices/message";
import { loginUser } from "../../../redux/reducers/auth";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

const Login = () => {
  const message = useAppSelector((state) => state.message);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      await dispatch(loginUser({ email: data.email, password: data.password }));

      // incidents.push(data);
      // return Promise.resolve([]);
    } catch (err) {
      // return Promise.reject("Error");
    }
  };

  const loginMutation = useMutation({
    onMutate() {
      // console.log(variables);
    },
    mutationFn: handleLogin,
    onSuccess: () => {
      // console.log(data);
      // queryClient.invalidateQueries({ queryKey: ["incidents"] });
    },
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.mixed()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: async (values, { resetForm }) => {
      loginMutation.mutate({
        email: values.email,
        password: values.password,
      });
    },
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" name="description" content="FraudIT Login Page" />
        <title>FraudIT | Login</title>
      </Helmet>

      <div className="h-full">
        <div className="dark:bg-slate-900 bg-gray-100 flex h-full items-center py-16">
          <div className="w-full max-w-md mx-auto p-6">
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <div className="flex justify-center">
                    <img src={LogoLight} className="w-1/2 dark:hidden" />
                    <img src={LogoDark} className="w-1/2 hidden dark:block" />
                  </div>
                  <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                    Sign in
                  </h1>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Fraud Incident Tracker
                  </p>
                </div>

                <div className="mt-5">
                  {!auth.isLoading && Boolean(message.message) && (
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
                            Login Error
                          </h3>
                          <div className="mt-1 text-sm text-yellow-700">
                            { message.message }
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* <!-- Form --> */}
                  {/* <form onSubmit={handleSubmit}> */}
                  <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="grid gap-y-4">
                        {/* <!-- Form Group --> */}
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm mb-2 dark:text-white"
                          >
                            Email address
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              id="email"
                              {...formik.getFieldProps("email")}
                              className={` ${
                                formik.touched.email &&
                                Boolean(formik.errors.email) &&
                                "border-red-600"
                              } py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-[#00AFD7] focus:ring-[#00AFD7] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`}
                              aria-describedby="email-error"
                            />
                          </div>
                          <ErrorMessage
                            name="email"
                            component="p"
                            className="mt-2 text-sm text-red-600 dark:text-red-500"
                          />
                        </div>
                        {/*  <!-- End Form Group --> */}

                        {/*  <!-- Form Group --> */}
                        <div>
                          <div className="flex justify-between items-center">
                            <label
                              htmlFor="password"
                              className="block text-sm mb-2 dark:text-white"
                            >
                              Password
                            </label>

                            <Link
                              className="text-sm text-[#00AFD7] hover:text-[#00AFD2] decoration-2 hover:underline font-medium"
                              to="/forgot-password"
                            >
                              Forgot password?
                            </Link>
                          </div>

                          <div className="relative">
                            <input
                              type="password"
                              id="password"
                              {...formik.getFieldProps("password")}
                              className={` ${
                                formik.touched.password &&
                                Boolean(formik.errors.password) &&
                                "border-red-600"
                              } py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-[#00AFD7] focus:ring-[#00AFD7] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`}
                            />
                          </div>
                          <ErrorMessage
                            name="password"
                            component="p"
                            className="mt-2 text-sm text-red-600 dark:text-red-500"
                          />
                        </div>
                        {/* <!-- End Form Group --> */}

                        {/*  <!-- Checkbox --> */}

                        <button
                          type="submit"
                          className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#00AFD7] text-white hover:bg-[#00AFD2] focus:outline-none focus:ring-2 focus:ring-[#00AFD7] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  </FormikProvider>
                  {/* <!-- End Form --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

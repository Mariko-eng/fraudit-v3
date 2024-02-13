import { ErrorMessage, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from '@tanstack/react-query';
import UserService from '../../../../services/user.service';
import { useAppSelector } from '../../../../redux/hooks';
import { API, CustomError } from '../../../../utils/api';
import { useEffect, useState } from 'react';
import { SuccessModal } from '../../../../components/modals/messages/SuccessModal';
import { ErrorModal } from '../../../../components/modals/messages/ErrorModal';
import { LoadingModal } from '../../../../components/modals/messages/LoadingModal';
import { SfiListModel, SfiModel } from "../../../../models/sfi";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
    const state = useAppSelector(store => store.auth)
    const [open, setOpen] = useState<boolean>(false);

    const [sfis, setSfis] = useState<SfiModel[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
    const getSfis = async () => {
      try {
        const url = `/api/sfi-entity/list/`;

        const response = await API.get(url, {
          headers: {
            Authorization: `Bearer ${state.tokens?.access}`,
          },
        });

        const data = response.data as SfiListModel;
        setSfis(data.results as SfiModel[]);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };
    getSfis();
  }, [state, setSfis]);

    const registerUserMutation = useMutation({
    mutationFn: async (form : object) =>
      await UserService.registerUser(
        { ...form },
        {
          Authorization: `Bearer ${state.tokens?.access}`,
          "Content-Type": "application/json",
        }
      ),
    onSuccess: (val) => {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        navigate('/home/users')
        return val;
      }, 3000);
    },
    onError: (error: CustomError) => {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        return error;
      }, 4000);
    },
  });

    const userCategoryList: string[] = ["SOC", "SFI", "UBA"];

  const validationSchema = Yup.object({
    user_category: Yup.string().required("User category is required"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name are required"),
    phone_number: Yup.string().required("Phone number is required"),
    sfi_id: Yup.string().when("user_category", {
      is: (userCategory: string) => userCategory === "SFI",
      then: () => Yup.string().required("Please select an SFI/Bank"),
      otherwise: () => Yup.string(),
    }),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirm_password: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), ""], "Passwords must match"),
  });

    const formik = useFormik({
    initialValues: {
      user_category: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      sfi_id: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      // console.log(values);
      registerUserMutation.mutate(values);
    },
  });

  const handleChange = formik.handleChange;


  return (
    <>
      {/* modals */}

      {registerUserMutation.isPending && open && (
        <LoadingModal
          open={open}
          setOpen={setOpen}
          loadingMessage="Registering New User..."
        />
      )}

      {registerUserMutation.isError && open && (
        <ErrorModal
          open={open}
          setOpen={setOpen}
          errorTitle={registerUserMutation.error.response?.statusText}
          errorMessage={
            registerUserMutation.error.errorMessage ??
            "Something went wrong. Please try again later."
          }
        />
      )}

      {registerUserMutation.isSuccess && open && (
        <SuccessModal
          open={open}
          setOpen={setOpen}
          successTitle="Success!"
          successMessage="New User Registered Successfully!"
        />
      )}
      {/* endmodals */}

      <div>
        {/*<!-- Card -->*/}
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="px-8 py-8 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    Add User: SOC | UBA | SFI
                  </h4>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Manage your name, password and account settings.
                    </p>
                  </div>
                </div>
                <hr />

                <FormikProvider value={formik}>
                  <form onSubmit={formik.handleSubmit}>
                    {/* <!-- User Category --> */}
                    <div className="col-span-3">
                      <div className="inline-block">
                        <label
                          htmlFor="institution"
                          className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                        >
                         Select user category
                        </label>
                      </div>
                    </div>
                    <div className="col-span-9">
                      <div className="sm:flex">
                        <select
                          name="user_category"
                          //   value={userData.user_category}
                          value={formik.values.user_category}
                          onChange={(e) => {
                            formik.resetForm();
                            return handleChange(e);
                          }}
                          className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-[#00AFD7] focus:ring-[#00AFD7] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                          required
                        >
                          <option value="">Please select one</option>
                          {userCategoryList && userCategoryList.length > 0 ? (
                            userCategoryList.map((item, idx) => (
                              <option key={idx} value={item}>
                                {item}
                              </option>
                            ))
                          ) : (
                            <></>
                          )}
                        </select>
                      </div>
                    </div>

                    {/* <!-- Other Form Fields --> */}

                    {formik.values.user_category === "" ? (
                      <div className="mt-2 text-sm text-blue-500"> Please select user category </div>
                    ) : (
                      <div>
                        {/* <!-- End Col --> */}

                          {formik.values.user_category === "SFI" && (
                            <>
                              {sfis && sfis.length > 0 ? (
                                <div>
                                  <div className="col-span-3">
                                    ˆ
                                    <div className="inline-block">
                                      <label
                                        htmlFor="institution"
                                        className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                                      >
                                        Select SFI
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-span-9">
                                    <div className="sm:flex">
                                      <select
                                        {...formik.getFieldProps("sfi_id")}
                                        onChange={handleChange}
                                        className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-[#00AFD7] focus:ring-[#00AFD7] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                                      >
                                        <option value="">Select SFI</option>
                                        {sfis && sfis.length > 0 ? (
                                          sfis.map((sfi, idx) => (
                                            <option key={idx} value={sfi.id}>
                                              {sfi.unique_number}
                                            </option>
                                          ))
                                        ) : (
                                          <></>
                                        )}
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <div className="col-span-3">
                                    <div className="inline-block">
                                      <label
                                        htmlFor="institution"
                                        className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                                      >
                                        SFI
                                      </label>
                                    </div>
                                  </div>
                                  <div className="">
                                    No SFIs/Banks To Select From!
                                  </div>
                                </div>
                              )}
                            </>
                          )}

                          <ErrorMessage
                            name="sfi_id"
                            component="div"
                            className="text-red-500"
                          />
                          {/* <!-- End Col --> */}


                        <div className="col-span-3">
                          <label
                            htmlFor="af-account-full-name"
                            className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                          >
                            Full name
                          </label>
                          <div className="hs-tooltip inline-block">
                            <button
                              type="button"
                              className="hs-tooltip-toggle ml-1"
                            >
                              <svg
                                className="inline-block w-3 h-3 text-gray-400 dark:text-gray-600"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                              </svg>
                            </button>
                            <span
                              className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm dark:bg-slate-700"
                              role="tooltip"
                            >
                              Displayed on public forums, such as Preline
                            </span>
                          </div>
                        </div>

                        <div className="col-span-9">
                          <div className="sm:flex">
                            <div className="w-full">
                            <input
                              id="first_name"
                              type="text"
                              {...formik.getFieldProps("first_name")}
                              onChange={handleChange}
                              className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-[#00AFD7] focus:ring-[#00AFD7] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                              placeholder="Maria"
                            />
                            <ErrorMessage
                              name="first_name"
                              component="div"
                              className="text-red-500"
                            />
                          </div>
                          <div className="w-full">
                            <input
                              type="text"
                              id="last_name"
                              {...formik.getFieldProps("last_name")}
                              onChange={handleChange}
                              className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-[#00AFD7] focus:ring-[#00AFD7] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                              placeholder="Boone"
                            />
                            <ErrorMessage
                              name="last_name"
                              component="div"
                              className="text-red-500"
                            />
                          </div>
                          </div>
                        </div>

                        {/* <!-- End Col --> */}

                        <div className="col-span-3">
                          <div className="inline-block">
                            <label
                              htmlFor="contact"
                              className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                            >
                              Phone Contact
                            </label>
                          </div>
                        </div>
                        {/* <!-- End Col --> */}

                        <div className="col-span-9">
                          <div className="sm:flex">
                            <input
                              id="phone_number"
                              type="text"
                              {...formik.getFieldProps("phone_number")}
                              onChange={handleChange}
                              className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-[#00AFD7] focus:ring-[#00AFD7] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                              placeholder="+x(xxx)xxx-xx-xx"
                            />
                          </div>
                          <ErrorMessage
                            name="phone_number"
                            component="div"
                            className="text-red-500"
                          />
                          </div>
                          {/* <!-- End Col --> */}

                          {/* <!-- Email --> */}
                          <div className="col-span-3">
                            <label
                              htmlFor="email"
                              className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                            >
                              Email
                            </label>
                          </div>
                          {/* <!-- End Col --> */}

                          <div className="col-span-9">
                            <input
                              id="email"
                              type="email"
                              {...formik.getFieldProps("email")}
                              onChange={handleChange}
                              className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-[#00AFD7] focus:ring-[#00AFD7] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                              placeholder="maria@site.com"
                            />
                          </div>
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500"
                          />
                          {/* <!-- End Col --> */}
                          <div className="col-span-3">
                            <label
                              htmlFor="password"
                              className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                            >
                              Password
                            </label>
                          </div>
                          {/* <!-- End Col --> */}

                          <div className="col-span-9">
                            <div className="space-y-2">
                              <input
                                id="password"
                                type="password"
                                {...formik.getFieldProps("password")}
                                onChange={handleChange}
                                className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-[#00AFD7] focus:ring-[#00AFD7] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                                placeholder="Enter password"
                                minLength={8}
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500"
                              />
                              <input
                                id="confirm_password"
                                type="password"
                                {...formik.getFieldProps("confirm_password")}
                                onChange={handleChange}
                                className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-[#00AFD7] focus:ring-[#00AFD7] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                                placeholder="Enter password again"
                                minLength={8}
                              />
                              <ErrorMessage
                                name="confirm_password"
                                component="div"
                                className="text-red-500"
                              />
                            </div>
                            {/* {!validatePassword() && (
                          <span className="text-sm text-red-500">
                            Passwords do not match
                          </span>
                        )} */}
                          </div>
                          {/* <!-- End Col --> */}

                          <div className="mt-5 flex justify-end gap-x-2">
                            <button
                              type="button"
                              className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#00AFD7] transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                              onClick={() => formik.resetForm()}
                            >
                              Reset
                            </button>
                            {formik.values.user_category === "SFI" ? (
                              <>
                                {sfis && sfis.length > 0 ? (
                                  <button
                                    type="submit"
                                    className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#00AFD7] text-white hover:bg-[#00AFE7] focus:outline-none focus:ring-2 focus:ring-[#00AFD7] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                  >
                                    Save
                                  </button>
                                ) : (
                                  <div></div>
                                )}
                              </>
                            ) : (
                              <>
                                <button
                                  type="submit"
                                  className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#00AFD7] text-white hover:bg-[#00AFE7] focus:outline-none focus:ring-2 focus:ring-[#00AFD7] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                >
                                  Save
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                    )}
                  </form>
                </FormikProvider>

                {/* </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewUser
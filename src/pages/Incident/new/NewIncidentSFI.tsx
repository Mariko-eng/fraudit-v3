import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ErrorMessage, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { LoadingModal } from "../../../components/modals/messages/LoadingModal";
import { ErrorModal } from "../../../components/modals/messages/ErrorModal";
import { SuccessModal } from "../../../components/modals/messages/SuccessModal";
import { SubCategory,
    category_list,
  get_sub_category_list,
 } from "../../../data/categories";
import { currencyCodes } from "../../../data/currency_codes";
import IncidentService from "../../../services/incident.service";
import { CustomError } from "../../../utils/api";
import { SfiModel } from "../../../models/sfi";


const NewIncidentSFI = () => {
  const navigate = useNavigate();

  const state = useAppSelector((store) => store.auth);

  const [open, setOpen] = useState<boolean>(false);

  const [isResetForm, setIsResetForm] = useState<boolean>(false);

  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const addIncidentMutation = useMutation({
    mutationFn: (form : object) =>
      IncidentService.addIncident(
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

  const validationSchema = Yup.object({
    classification: Yup.string().required("Required!"),
    category: Yup.string().required("Required!"),
    sub_category: Yup.string().required("Required!"),
    currency: Yup.string().required("Select Currency!"),
    suspected_amount: Yup.number(),
    actual_amount: Yup.number(),
    discovered_date: Yup.date().required("Enter discovered date!"),
    actual_date: Yup.date().required("Enter actual date!"),
    description: Yup.string().required("Enter incident description!"),
    police_reference_no: Yup.string(),
    actions_taken: Yup.string(),
    lessons_taken: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      sfi_id: "",
      classification: "",
      category: "",
      sub_category: "",
      currency: "UGX",
      suspected_amount: 0,
      actual_amount: 0,
      discovered_date: "",
      actual_date: "",
      police_reference_no: "",
      description: "",
      actions_taken: "",
      lessons_taken: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      // Handle form submission here
      if (state.user?.sfi) {
        values.sfi_id = (state.user?.sfi as SfiModel).id;
        const res = await addIncidentMutation.mutateAsync(values);
        // const res = addIncidentMutation.mutate(values);

        if (res.status === 201) {

        if (isResetForm) {
              resetForm(); // Reset the form fields
              return;
            }else{
              return navigate(`/home/incidents/${res.data.id}`, {});
            }


          // if (formik.submitCount === 1) {
          //   resetForm(); // Reset the form fields
          // }

          // if (formik.submitCount > 1) {
          //   return navigate(`/incidents/${res.data.id}`, {});
          // }
        }
      }
    },
  });

  const handleChange = formik.handleChange;

  return (
    <>
      {addIncidentMutation.isPending && open && (
        <LoadingModal
          open={open}
          setOpen={setOpen}
          loadingMessage="Reporting Incident..."
        />
      )}

      {addIncidentMutation.isError && open && (
        <ErrorModal
          open={open}
          setOpen={setOpen}
          errorTitle={addIncidentMutation.error.response?.statusText}
          errorMessage={
            addIncidentMutation.error.errorMessage ??
            "Failed to report incident. Please try again!"
          }
        />
      )}

      {addIncidentMutation.isSuccess && open && (
        <SuccessModal
          open={open}
          setOpen={setOpen}
          successTitle="Success!"
          successMessage="Reporting Incident Successfully"
        />
      )}
      <div className="">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700 px-10 py-10">
                <FormikProvider value={formik}>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="space-y-12">
                      <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-400">
                          New Incident
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Write a few sentences about the occurence
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
                            >
                              Classification
                            </label>
                            <div className="mt-2">
                              <select
                                id="classification"
                                {...formik.getFieldProps("classification")}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00AFD7] sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-gray-400"
                              >
                                <option value="" disabled>
                                  Select...
                                </option>
                                <option value="INTERNAL">Internal</option>
                                <option value="EXTERNAL">External</option>
                              </select>
                            </div>
                            <ErrorMessage
                              name="classification"
                              component="div"
                              className="text-red-500"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <div className="grid grid-cols-2">
                              <label
                                htmlFor="country"
                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
                              >
                                Category
                              </label>
                              <div className="mt-2">
                                <select
                                  id="category"
                                  {...formik.getFieldProps("category")}
                                  // onChange={handleChange}
                                  onChange={(e) => {
                                    setSubCategories(
                                      get_sub_category_list(e.target.value)
                                    );
                                    handleChange(e);
                                  }}
                                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00AFD7] sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-gray-400"
                                >
                                  <option value="" disabled>
                                    Select...
                                  </option>
                                  {category_list.map((item, idx) => (
                                    <option key={idx} value={item.name}>
                                      {item.desc}
                                    </option>
                                  ))}
                                </select>
                                <ErrorMessage
                                  name="category"
                                  component="div"
                                  className="text-red-500"
                                />
                              </div>
                              <label
                                htmlFor="country"
                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
                              >
                                SubCategory
                              </label>
                              <div className="mt-2">
                                <select
                                  id="sub_category"
                                  {...formik.getFieldProps("sub_category")}
                                  onChange={handleChange}
                                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00AFD7] sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-gray-400"
                                >
                                  {formik.values.category === "" ? (
                                    <option value="">None</option>
                                  ) : (
                                    <>
                                      {subCategories.map((item, idx) => (
                                        <option key={idx} value={item.name}>
                                          {item.desc}
                                        </option>
                                      ))}
                                    </>
                                  )}
                                </select>
                                <ErrorMessage
                                  name="sub_category"
                                  component="div"
                                  className="text-red-500"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="discovered_date"
                              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
                            >
                              Discovered Date
                            </label>
                            <div className="mt-2">
                              <input
                                type="date"
                                id="discovered_date"
                                {...formik.getFieldProps("discovered_date")}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00AFD7] sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-gray-400"
                              />
                            </div>
                            <ErrorMessage
                              name="discovered_date"
                              component="div"
                              className="text-red-500"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="occurenceDate"
                              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
                            >
                              Occurence Date
                            </label>
                            <div className="mt-2">
                              <input
                                type="date"
                                id="actual_date"
                                {...formik.getFieldProps("actual_date")}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00AFD7] sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-gray-400"
                              />
                            </div>
                            <ErrorMessage
                              name="actual_date"
                              component="div"
                              className="text-red-500"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="estimatedLoss"
                              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
                            >
                              Currency
                            </label>
                            <div className="mt-2">
                              <select
                                id="currency"
                                {...formik.getFieldProps("currency")}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00AFD7] sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-gray-400"
                              >
                                {currencyCodes.map((item, idx) => (
                                  <option key={idx}>{item}</option>
                                ))}
                              </select>
                            </div>
                            <ErrorMessage
                              name="suspected_amount"
                              component="div"
                              className="text-red-500"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="estimatedLoss"
                              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
                            >
                              Estimated Amount
                            </label>
                            <div className="mt-2">
                              <input
                                type="number"
                                id="suspected_amount"
                                autoComplete="suspected_amount"
                                placeholder="100000"
                                {...formik.getFieldProps("suspected_amount")}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00AFD7] sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-gray-400"
                              />
                            </div>
                            <ErrorMessage
                              name="suspected_amount"
                              component="div"
                              className="text-red-500"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="estimatedLoss"
                              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
                            >
                              Actual Amount
                            </label>
                            <div className="mt-2">
                              <input
                                type="number"
                                id="actual_amount"
                                autoComplete="actual_amount"
                                placeholder="100000"
                                {...formik.getFieldProps("actual_amount")}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00AFD7] sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-gray-400"
                              />
                            </div>
                            <ErrorMessage
                              name="suspected_amount"
                              component="div"
                              className="text-red-500"
                            />
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
                            >
                              Description
                            </label>
                            <div className="mt-2">
                              <textarea
                                id="description"
                                rows={3}
                                className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00AFD7] sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-gray-400"
                                {...formik.getFieldProps("description")}
                                onChange={handleChange}
                                placeholder="Write a few sentences about the occurence"
                              />
                            </div>
                            <ErrorMessage
                              name="description"
                              component="div"
                              className="text-red-500"
                            />
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="police_reference_no"
                              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
                            >
                              Police Reference No
                            </label>
                            <div className="mt-2">
                              <textarea
                                id="police_reference_no"
                                rows={1}
                                className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00AFD7] sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-gray-400"
                                {...formik.getFieldProps("police_reference_no")}
                                onChange={handleChange}
                                placeholder="Write a police reference number"
                              />
                            </div>
                            <ErrorMessage
                              name="police_reference_no"
                              component="div"
                              className="text-red-500"
                            />
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="details"
                              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
                            >
                              Actions Taken
                            </label>
                            <div className="mt-2">
                              <textarea
                                id="actions_taken"
                                rows={3}
                                className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00AFD7] sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-gray-400"
                                {...formik.getFieldProps("actions_taken")}
                                onChange={handleChange}
                                placeholder="Actions performed to counter the incident"
                              />
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="lesson_taken"
                              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
                            >
                              Lessons Learnt
                            </label>
                            <div className="mt-2">
                              <textarea
                                id="lessons_taken"
                                rows={3}
                                className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00AFD7] sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-gray-400"
                                {...formik.getFieldProps("lessons_taken")}
                                onChange={handleChange}
                                placeholder="Write a few lessons learnt from incident"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={() => formik.resetForm()}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsResetForm(true);
                          formik.submitForm();
                        }}
                        className="rounded-md border-[#00AFD7] border-opacity-100 bg-gray-100 px-3 py-2 text-sm font-semibold text-[#00AFD7] shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        Save & Add Another
                      </button>
                      <button
                        type="submit"
                          onClick={() => {
                          setIsResetForm(false);
                          formik.submitForm();
                        }}
                        className="rounded-md bg-[#00AFD7] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#00AFD7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00AFD7]"
                      >
                        Save & Continue
                      </button>
                    </div>
                  </form>
                </FormikProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewIncidentSFI
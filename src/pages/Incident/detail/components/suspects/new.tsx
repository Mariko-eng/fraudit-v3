import { useState } from "react";
import { ChangeEvent, SyntheticEvent } from "react";
import { useParams, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import { LoadingModal } from "../../../../../components/modals/messages/LoadingModal";
import { ErrorModal } from "../../../../../components/modals/messages/ErrorModal";
import { SuccessModal } from "../../../../../components/modals/messages/SuccessModal";
import { CustomError } from "../../../../../utils/api";
import IncidentService from "../../../../../services/incident.service";
import { useAppSelector } from "../../../../../redux/hooks";

interface IncidentSuspect {
  involved_sfi_name: string;
  individual_id_type: string;
  individual_id_details: string;
  individual_name: string;
  individual_email: string;
  individual_phone: string;
  suspect_image: File | undefined;
  remarks: string;
}

const IncidentSuspectsNew = () => {
  const params = useParams();

  const { id } = params;
  const incidentId = id;

  const state = useAppSelector((store) => store.auth);

  const [open, setOpen] = useState<boolean>(false);
  //   const [openAddSuspects, setOpenAddSuspects] = useState<boolean>(false);

  const [fileInputKeys, setFileInputKeys] = useState<{
    [name: string]: number;
  }>({});

  const navigate = useNavigate();

  const [suspects, setSuspects] = useState<IncidentSuspect[]>([
    {
      involved_sfi_name: "",
      individual_name: "",
      individual_id_type: "",
      individual_id_details: "",
      individual_email: "",
      individual_phone: "",
      suspect_image: undefined,
      remarks: "",
    },
  ]);

  const addSuspect = (event: SyntheticEvent) => {
    event.preventDefault();

    const oldAccounts = [...suspects];

    setSuspects([
      ...oldAccounts,
      {
        involved_sfi_name: "",
        individual_name: "",
        individual_id_type: "",
        individual_id_details: "",
        individual_email: "",
        individual_phone: "",
        suspect_image: undefined,
        remarks: "",
      },
    ]);
  };

  const removeSuspect = (
    event: SyntheticEvent,
    indexOfRemovedAccount: number
  ) => {
    event.preventDefault();

    setSuspects([
      ...suspects.filter((_suspect, idx) => indexOfRemovedAccount !== idx),
    ]);
  };

  const handleResetFileInput = (name: string) => {
    // Reset the file input key for the specific name
    setFileInputKeys((prevKeys) => ({
      ...prevKeys,
      [name]: (prevKeys[name] || 0) + 1,
    }));

    // Add any other logic if needed based on the name
  };

  const hasValidSuspectsData = () => {
    for (const suspect of suspects) {
      const isValid =
        // Boolean(suspect.involved_sfi_name) &&
        Boolean(suspect.individual_name) &&
        Boolean(suspect.individual_id_type) &&
        Boolean(suspect.individual_id_details);

      if (isValid) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  };

  const handleOnchangeSuspectWithLoop = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    event.preventDefault();

    const [targetName, targetIndex] = event.target.name.split("-");

    const oldSuspects: IncidentSuspect[] = [...suspects];

    const updatedSuspects: IncidentSuspect[] = [];

    const indexOfCulprit = Number(targetIndex);

    for (let i = 0; i < oldSuspects.length; i++) {
      if (i === indexOfCulprit) {
        // Check if the input is a file
        if (event.target.type === "file") {
          //   console.log(event.target.name)
          //   console.log(targetName)

          updatedSuspects.push({
            ...oldSuspects[i],
            [targetName]: (event.target as HTMLInputElement).files?.[0] || null,
          });
        } else {
          updatedSuspects.push({
            ...oldSuspects[i],
            [targetName]: event.target.value,
          });
        }
      } else {
        updatedSuspects.push(oldSuspects[i]);
      }
    }

    // console.log("updatedSuspects")
    // console.log(updatedSuspects)

    setSuspects(updatedSuspects);
  };

  const addIncidentSuspectsMutation = useMutation({
    mutationFn: ({ suspectsData }: { suspectsData: FormData }) => {
      //   setOpenAddSuspects(false);
      setOpen(true);
      if (incidentId) {
        return IncidentService.addIncidentSuspects(
          suspectsData,
          incidentId,
          `Bearer ${state.tokens?.access}`
        );
      } else {
        return Promise.reject("Something went wrong!");
      }
    },
    onSuccess: (val) => {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
      setSuspects([
        {
          involved_sfi_name: "",
          individual_name: "",
          individual_id_type: "",
          individual_id_details: "",
          individual_email: "",
          individual_phone: "",
          suspect_image: undefined,
          remarks: "",
        },
      ]);
      return val;
    },
    onError: (error: CustomError) => {
      console.log(error);
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        return error;
      }, 4000);
    },
  });

  const handleAddSuspects = () => {
    // Create FormData object
    const formData = new FormData();
    if (incidentId) {
      formData.append("incident_id", incidentId);
    }

    // Append each item in the suspectsList to FormData
    suspects.forEach((suspect, index) => {
      formData.append(
        `suspects_data[${index}]involved_sfi_name`,
        JSON.stringify(suspect.involved_sfi_name)
      );

      formData.append(
        `suspects_data[${index}]individual_id_type`,
        suspect.individual_id_type
      );

      formData.append(
        `suspects_data[${index}]individual_id_details`,
        suspect.individual_id_details
      );

      formData.append(
        `suspects_data[${index}]individual_name`,
        suspect.individual_name
      );

      formData.append(
        `suspects_data[${index}]individual_email`,
        suspect.individual_email
      );

      formData.append(
        `suspects_data[${index}]individual_phone`,
        suspect.individual_phone
      );

      // Check if suspect_image is provided
      if (suspect.suspect_image) {
        formData.append(
          `suspects_data[${index}]suspect_image`,
          suspect.suspect_image,
          suspect.suspect_image.name
        );
      }
    });

    // const data = {
    //   incident_id: incidentID,
    //   involved_individuals: culprits,
    // };

    addIncidentSuspectsMutation.mutate({
      suspectsData: formData,
    });
  };

  const handleSubmit = () => {
    handleAddSuspects();
  };

  return (
    <>
      {addIncidentSuspectsMutation.isPending && open && (
        <LoadingModal
          open={open}
          setOpen={setOpen}
          loadingMessage="Updating Incident ..."
        />
      )}

      {addIncidentSuspectsMutation.isError && open && (
        <ErrorModal
          open={open}
          setOpen={setOpen}
          errorTitle={addIncidentSuspectsMutation.error.response?.statusText}
          errorMessage={
            addIncidentSuspectsMutation.error.errorMessage ??
            addIncidentSuspectsMutation.error.message
          }
        />
      )}

      {addIncidentSuspectsMutation.isSuccess && open && (
        <SuccessModal
          open={open}
          setOpen={setOpen}
          successTitle="Sucess!"
          successMessage="Incident updated successfully!"
        />
      )}

      <>
        <Helmet>
          <meta
            charSet="utf-8"
            name="description"
            content="FraudIT AdminDashboard | Incident Details"
          />
          <title>FraudIT | Dashboard - Incident Details</title>
        </Helmet>

        <div>
          {/*<!-- Card -->*/}
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                  <div className="px-4 py-4">
                    <div className="flex justify-start items-center">
                      <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">
                          Incident Information
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                          Add Supects / Invloved Inviduals.
                        </p>
                      </div>
                    </div>

                    <div>
                      {suspects && suspects.length > 0 ? (
                        suspects.map((item, index) => (
                          <div key={index}>
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-semibold">
                                Involved Individual #{index + 1}
                              </h4>
                              <div className="flex">
                                {suspects?.length === 1 ? (
                                  <></>
                                ) : (
                                  <button
                                    onClick={(event) => {
                                      handleResetFileInput(
                                        `suspect_image-${index}`
                                      );
                                      removeSuspect(event, index);
                                      return;
                                    }}
                                    disabled={
                                      suspects?.length <= 1 ? true : false
                                    }
                                    className="w-10 rounded-full bg-[#00AFD7] px-1 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#00AFE7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                  >
                                    -
                                  </button>
                                )}

                                {index === suspects?.length - 1 ? (
                                  <button
                                    onClick={(event) => addSuspect(event)}
                                    className="w-10 ml-2 rounded-full bg-[#00AFD7] px-1 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#00AFE7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                  >
                                    +
                                  </button>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-wrap">
                              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2">
                                {/* First Input Field */}
                                <input
                                  type="text"
                                  name={`individual_name-${index}`}
                                  id={`individual_name-${index}`}
                                  value={item.individual_name}
                                  onChange={handleOnchangeSuspectWithLoop}
                                  className="w-full p-2 border rounded"
                                  placeholder="First & Last Name"
                                />
                              </div>
                              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2">
                                {/* Second Input Field */}
                                <input
                                  type="text"
                                  name={`individual_email-${index}`}
                                  id={`individual_email-${index}`}
                                  value={item.individual_email}
                                  onChange={handleOnchangeSuspectWithLoop}
                                  className="w-full p-2 border rounded"
                                  placeholder="Email Address"
                                />
                              </div>
                              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2">
                                {/* Third Input Field */}
                                <input
                                  type="text"
                                  name={`individual_phone-${index}`}
                                  id={`individual_phone-${index}`}
                                  value={item.individual_email}
                                  onChange={handleOnchangeSuspectWithLoop}
                                  className="w-full p-2 border rounded"
                                  placeholder="Phone Number"
                                />
                              </div>

                              <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-2">
                                {/* 4th Input Field */}
                                <select
                                  className="w-full p-2 border rounded"
                                  id={`individual_id_type-${index}`}
                                  name={`individual_id_type-${index}`}
                                  value={item.individual_id_type}
                                  onChange={handleOnchangeSuspectWithLoop}
                                >
                                  <option value="">Select ID Type</option>
                                  <option value="NATIONAL">National ID</option>
                                  <option value="PASSPORT">Passport ID</option>
                                </select>
                              </div>
                              <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-2">
                                {/* Fourth Input Field */}
                                <input
                                  type="text"
                                  name={`individual_id_details-${index}`}
                                  id={`individual_id_details-${index}`}
                                  value={item.individual_id_details}
                                  onChange={handleOnchangeSuspectWithLoop}
                                  className="w-full p-2 border rounded"
                                  placeholder="Selected ID Details"
                                />
                              </div>
                              <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-2">
                                {/* Third Input Field */}
                                <input
                                  key={
                                    fileInputKeys[`suspect_image-${index}`] || 0
                                  }
                                  type="file"
                                  name={`suspect_image-${index}`}
                                  id={`suspect_image-${index}`}
                                  // value={item.suspect_image || undefined}
                                  onChange={handleOnchangeSuspectWithLoop}
                                  className="w-full p-2 border rounded"
                                  placeholder="Choose Suspect Photo"
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="mt-6 flex items-center justify-start gap-x-6">
                      <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={() => navigate(-1)}
                      >
                        Go Back
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit} // Your button's click handler
                        disabled={!hasValidSuspectsData()}
                        className={
                          !hasValidSuspectsData()
                            ? "rounded-md bg-[#00CCEC] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#00CCEC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00CCEC]"
                            : "rounded-md bg-[#00AFD7] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#00AFD7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00AFD7]"
                        }
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default IncidentSuspectsNew;

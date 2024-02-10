import { useQuery, useMutation } from "@tanstack/react-query";
import { Tabs } from "flowbite-react";
import { HiArchive, HiFolder, HiUserCircle } from "react-icons/hi";
import { useParams, useNavigate } from "react-router";
import IncidentService from "../../../services/incident.service";
import { useAppSelector } from "../../../redux/hooks";
import { useEffect, useState } from "react";
import { IncidentModel } from "../../../models/incident";
import { MdEdit } from "react-icons/md";
import IncidentDetails from "./tabs/IncidentDetails";
import IncidentFiles from "./tabs/IncidentFiles";
import IncidentSuspects from "./tabs/IncidentSuspects";
import { CustomError } from "../../../utils/api";
import AddIncidentFilesModal from "./components/new_incident_files";
import { LoadingModal } from "../../../components/modals/messages/LoadingModal";
import { ErrorModal } from "../../../components/modals/messages/ErrorModal";
import { SuccessModal } from "../../../components/modals/messages/SuccessModal";
import { Link } from "react-router-dom";
import IncidentActionsButton from "./components/actions_button";
import { CreatedByUserModel } from "../../../models/user";
import { SfiModel } from "../../../models/sfi";

const IncidentDetail = () => {
  const params = useParams();

  const { id } = params;
  const incidentId = id;

  const navigate = useNavigate()

  const state = useAppSelector((store) => store.auth);

  const { user } = state;

  const [open, setOpen] = useState<boolean>(false);

  const [openAddFiles, setOpenAddFiles] = useState<boolean>(false);

  const [incident, setIncident] = useState<IncidentModel | null>(null);

  const incidentQuery = useQuery({
    queryKey: ["incident", incidentId],
    queryFn: async () => {
      // Check if incidentId is defined before making the API call
      if (incidentId) {
        return await IncidentService.getIncidentById(incidentId, {
          Authorization: `Bearer ${state.tokens?.access}`,
        });
      } else {
        // Handle the case where incidentId is undefined (e.g., redirect or display an error)
        throw new Error("Incident ID is undefined");
      }
    },
  });

  // console.log(incidentQuery)

  useEffect(() => {
    if (incidentQuery.isSuccess) {
      const data: IncidentModel = incidentQuery.data as IncidentModel;

      setIncident(data);
    }
  }, [incidentQuery]);

  const addIncidentFilesMutation = useMutation({
    mutationFn: ({ fileData }: { fileData: FormData }) => {
      setOpenAddFiles(false);
      setOpen(true);
      return IncidentService.addFilesToIncident(
        fileData,
        `Bearer ${state.tokens?.access}`
      );
    },
    onSuccess: (val) => {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
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

  const handleAddFiles = (data: FormData) => {
    addIncidentFilesMutation.mutate({
      fileData: data,
    });
  };

  const addIncidentTransferRequestMutation = useMutation({
    mutationFn: (data: object) =>
      IncidentService.addTransferRequest(
        { ...data },
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

  const handleTransfer = () => {
    if (incidentId) {
      addIncidentTransferRequestMutation.mutate(
         { incident_id: incidentId },
      );
    }
  };

  const deleteIncidentMutation = useMutation({
    mutationFn: (ID: string) =>
      IncidentService.deleteIncident(ID, {
        Authorization: `Bearer ${state.tokens?.access}`,
        "Content-Type": "application/json",
      }),
    onSuccess: (val) => {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
          navigate("/home/incidents", { replace: true });
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

  const handleDelete = () => {
    if (incidentId) {
      deleteIncidentMutation.mutate(incidentId);
    }
  };


  return (
    <>
      {addIncidentFilesMutation.isPending && open && (
        <LoadingModal
          open={open}
          setOpen={setOpen}
          loadingMessage="Updating Incident ..."
        />
      )}

      {addIncidentFilesMutation.isError && open && (
        <ErrorModal
          open={open}
          setOpen={setOpen}
          errorTitle={addIncidentFilesMutation.error.response?.statusText}
          errorMessage={
            addIncidentFilesMutation.error.errorMessage ??
            addIncidentFilesMutation.error.message
          }
        />
      )}

      {addIncidentFilesMutation.isSuccess && open && (
        <SuccessModal
          open={open}
          setOpen={setOpen}
          successTitle="Sucess!"
          successMessage="Incident Files Added successfully!"
        />
      )}

      {addIncidentTransferRequestMutation.isPending && open && (
        <LoadingModal
          open={open}
          setOpen={setOpen}
          loadingMessage="Submitting Incident BlackList Request ..."
        />
      )}

      {addIncidentTransferRequestMutation.isError && open && (
        <ErrorModal
          open={open}
          setOpen={setOpen}
          errorTitle={
            addIncidentTransferRequestMutation.error.response?.statusText
          }
          errorMessage={
            addIncidentTransferRequestMutation.error.errorMessage ??
            addIncidentTransferRequestMutation.error.message
          }
        />
      )}

      {addIncidentTransferRequestMutation.isSuccess && open && (
        <SuccessModal
          open={open}
          setOpen={setOpen}
          successTitle="Sucess!"
          successMessage="Incident Black List Request Submitted successfully!"
        />
      )}

      {deleteIncidentMutation.isPending && open && (
        <LoadingModal
          open={open}
          setOpen={setOpen}
          loadingMessage="Deleting Incident ..."
        />
      )}

      {deleteIncidentMutation.isError && open && (
        <ErrorModal
          open={open}
          setOpen={setOpen}
          errorTitle={deleteIncidentMutation.error.response?.statusText}
          errorMessage={
            deleteIncidentMutation.error.errorMessage ??
            deleteIncidentMutation.error.message
          }
        />
      )}

      {deleteIncidentMutation.isSuccess && open && (
        <SuccessModal
          open={open}
          setOpen={setOpen}
          successTitle="Sucess!"
          successMessage="Incident deleted successfully!"
        />
      )}

      <div>
        <div className="mb-4 col-span-full xl:mb-2">
          <nav className="flex mb-5" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
              <li className="inline-flex items-center">
                <a
                  href="#"
                  className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"
                >
                  <svg
                    className="w-5 h-5 mr-2.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <a
                    href="#"
                    className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white"
                  >
                    Incident
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span
                    className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500"
                    aria-current="page"
                  >
                    Details
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        {incidentQuery.isLoading ? (
          <div className="text-yellow-400">Loading</div>
        ) : incidentQuery.isError ? (
          <div className="text-red-400">Something Went Wrong!</div>
        ) : incidentQuery.isSuccess ? (
          <div>
            <Tabs aria-label="Tabs with icons" style="underline">
              <Tabs.Item active title="Incident Data" icon={HiFolder}>
                <div className="m-1">
                  {/*<!-- Table Section -->*/}
                  <div>
                    {/*<!-- Card -->*/}
                    <div className="flex flex-col">
                      <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                            <div className="px-4 py-4">
                              <div className="flex justify-between">
                                <div className="px-4 sm:px-0">
                                  <h3 className="text-base font-semibold leading-7 text-gray-900">
                                    Incident Information
                                  </h3>
                                  <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                                    Details of the incident.
                                  </p>
                                </div>
                                <div>
                                  {incident?.status !== "BLACK" && (
                                    <>
                                      {user?.user_category === "SOC" ||
                                      user?.user_category === "UBA" ? (
                                        <>
                                          {(
                                            incident?.created_by as CreatedByUserModel
                                          )?.id === user.id && (
                                            <IncidentActionsButton
                                              incidentId={incident?.id}
                                              incidentStatus={incident?.status}
                                              handleTransfer={() =>
                                                handleTransfer()
                                              }
                                              handleDelete={() =>
                                                handleDelete()
                                              }
                                            />
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {user?.user_category === "SFI" && (
                                            <>
                                              {(user.sfi as SfiModel)?.id ===
                                                incident?.sfi?.id && (
                                                <IncidentActionsButton
                                                  incidentId={incident?.id}
                                                  incidentStatus={
                                                    incident?.status
                                                  }
                                                  handleTransfer={() =>
                                                    handleTransfer()
                                                  }
                                                  handleDelete={() =>
                                                    handleDelete()
                                                  }
                                                />
                                              )}
                                            </>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>

                              <IncidentDetails incident={incident} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*<!-- End Table Section -->*/}
                </div>
              </Tabs.Item>
              <Tabs.Item title="Uploaded Files" icon={HiArchive}>
                <div className="m-1">
                  {/*<!-- Table Section -->*/}
                  <div>
                    {/*<!-- Card -->*/}
                    <div className="flex flex-col">
                      <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                            <div className="px-4 py-4">
                              <div className="flex justify-between">
                                <div className="px-4 sm:px-0">
                                  <h3 className="text-base font-semibold leading-7 text-gray-900">
                                    Incident Information
                                  </h3>
                                  <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                                    Details of the incident.
                                  </p>
                                </div>
                                <div>
                                  <button
                                    style={{ height: "40px", width: "150px" }}
                                    onClick={() => setOpenAddFiles(true)}
                                    className="bg-[#00AFD7] p-2 text-white rounded flex items-center justify-center"
                                  >
                                    <span className="mr-1">
                                      <MdEdit />
                                    </span>
                                    Add Files
                                  </button>
                                </div>
                              </div>

                              {incident ? (
                                <IncidentFiles
                                  incidentFiles={incident.incidentfile_set}
                                />
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*<!-- End Table Section -->*/}
                </div>
              </Tabs.Item>
              <Tabs.Item title="Suspects" icon={HiUserCircle}>
                <div className="m-1">
                  {/*<!-- Table Section -->*/}
                  <div>
                    {/*<!-- Card -->*/}
                    <div className="flex flex-col">
                      <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                            <div className="px-4 py-4">
                              <div className="flex justify-between">
                                <div className="px-4 sm:px-0">
                                  <h3 className="text-base font-semibold leading-7 text-gray-900">
                                    Incident Information
                                  </h3>
                                  <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                                    Details of the incident.
                                  </p>
                                </div>

                                <Link
                                  to={`/home/incidents/${incidentId}/suspects-new`}
                                  style={{ height: "40px", width: "150px" }}
                                  className="bg-[#00AFD7] p-2 text-white rounded flex items-center justify-center"
                                >
                                  <span className="mr-1">
                                    <MdEdit />
                                  </span>
                                  Add Suspects
                                </Link>
                              </div>

                              {incident ? (
                                <IncidentSuspects
                                  suspects={
                                    incident.incidentinvolvedindividual_set
                                  }
                                />
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*<!-- End Table Section -->*/}
                </div>
              </Tabs.Item>
            </Tabs>
          </div>
        ) : (
          <></>
        )}
      </div>
      <AddIncidentFilesModal
        open={openAddFiles}
        setOpen={setOpenAddFiles}
        addIncidentFiles={handleAddFiles}
        incidentId={incident?.id}
      />
    </>
  );
};

export default IncidentDetail;

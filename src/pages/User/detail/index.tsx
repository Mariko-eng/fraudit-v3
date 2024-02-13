import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { CustomError } from "../../../utils/api";
import UserService from "../../../services/user.service";
import { UserModel } from "../../../models/user";
import DeactivateUserModal from "./components/UserDeActivateModal";
import ActivateUserModal from "./components/UserActivateModal";
import { LoadingModal } from "../../../components/modals/messages/LoadingModal";
import { ErrorModal } from "../../../components/modals/messages/ErrorModal";
import UserActionsButton from "./components/Actions";
import { SfiModel } from "../../../models/sfi";

const UserDetail = () => {
  const params = useParams();
  const { id } = params;
  const userId = id;

  const state = useAppSelector((store) => store.auth);

  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const [openActivate, setOpenActivate] = useState<boolean>(false);
  const [openDeActivate, setOpenDeActivate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [operation, setOperation] = useState<
    "delete" | "activate" | "deactivate"
  >("deactivate");
  const [user, setUser] = useState<UserModel | null>(null);

  const queryClient = useQueryClient();

  const userProfileQuery = useQuery({
    queryKey: ["userProfileQuery", userId],
    queryFn: async () => {
      if (userId) {
        return await UserService.getUserById(userId, {
          Authorization: `Bearer ${state.tokens?.access}`,
        });
      } else {
        throw new Error("User ID is undefined");
      }
    },
  });

  useEffect(() => {
    if (userProfileQuery.isSuccess) {
      const data: UserModel = userProfileQuery.data as UserModel;

      setUser(data);
    }
  }, [userProfileQuery, setUser]);

  // Use useEffect to trigger a manual refetch when needed
  useEffect(() => {
    // Manually trigger a refetch when the component mounts or when specific dependencies change
    queryClient.refetchQueries({ queryKey: ["userProfileQuery", userId] });
  }, [queryClient, userId]); // Specify dependencies as needed

  const deactivateUserMutation = useMutation({
    mutationFn: async () => {
      setOpen(true);
      if (userId) {
        return await UserService.deactivateUser(userId, {
          Authorization: `Bearer ${state.tokens?.access}`,
        });
      } else {
        throw new Error("User ID is undefined");
      }
    },
    onSuccess: () => {
      setOpen(true);

      setTimeout(() => {
        setOpen(false);
        window.location.reload();
      }, 1000);
    },
    onError: (error: CustomError) => {
      console.log(error);
      setOpen(true);

      setTimeout(() => {
        setOpen(false);
      }, 4000);
    },
  });

  const activateUserMutation = useMutation({
    mutationFn: async () => {
      setOpen(true);
      if (userId) {
        return await UserService.activateUser(userId, {
          Authorization: `Bearer ${state.tokens?.access}`,
        });
      } else {
        throw new Error("User ID is undefined");
      }
    },
    onSuccess: () => {
      setOpen(true);

      setTimeout(() => {
        setOpen(false);
        window.location.reload();
      }, 1000);
    },
    onError: (error: CustomError) => {
      console.log(error);
      setOpen(true);

      setTimeout(() => {
        setOpen(false);
      }, 4000);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async () => {
      setOpen(true);
      if (userId) {
        return await UserService.deleteUser(userId, {
          Authorization: `Bearer ${state.tokens?.access}`,
        });
      } else {
        throw new Error("User ID is undefined");
      }
    },
    onSuccess: () => {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        navigate("/home/users");
      }, 1000);
    },
    onError: (error: CustomError) => {
      console.log(error);
      setOpen(true);

      setTimeout(() => {
        setOpen(false);
      }, 4000);
    },
  });

  const handleOperation = (operation: "activate" | "deactivate" | "delete") => {
    if (operation === "activate") {
      setOpenActivate(true);
      setOperation("activate");
    }

    if (operation === "deactivate") {
      setOpenDeActivate(true);
      setOperation("deactivate");
    }

    if (operation === "delete") {
      setOpenDelete(true);
      setOperation("delete");
    }
  };

  const handleActivateUser = () => {
    activateUserMutation.mutate();
  };

  const handleDeActivateUser = () => {
    deactivateUserMutation.mutate();
  };

  const handleDeleteUser = () => {
    deleteUserMutation.mutate();
  };

  return (
    <>
      {openDeActivate && operation === "deactivate" && user && (
        <DeactivateUserModal
          open={openDeActivate}
          setOpen={setOpenDeActivate}
          user={user}
          deactivateUser={handleDeActivateUser}
        />
      )}

      {openActivate && operation === "activate" && user && (
        <ActivateUserModal
          open={openActivate}
          setOpen={setOpenActivate}
          user={user}
          activateUser={handleActivateUser}
        />
      )}

      {openDelete && operation === "delete" && user && (
        <ActivateUserModal
          open={openActivate}
          setOpen={setOpenActivate}
          user={user}
          activateUser={handleDeleteUser}
        />
      )}

      {deactivateUserMutation.isPending && open && (
        <LoadingModal
          open={open}
          setOpen={setOpen}
          loadingMessage="Loading... Please Wait!"
        />
      )}

      {deactivateUserMutation.isError && open && (
        <ErrorModal
          open={open}
          setOpen={setOpen}
          errorTitle={deactivateUserMutation.error.response?.statusText}
          errorMessage={deactivateUserMutation.error.errorMessage}
        />
      )}

      {activateUserMutation.isPending && open && (
        <LoadingModal
          open={open}
          setOpen={setOpen}
          loadingMessage="Loading... Please Wait!"
        />
      )}

      {activateUserMutation.isError && open && (
        <ErrorModal
          open={open}
          setOpen={setOpen}
          errorTitle={activateUserMutation.error.response?.statusText}
          errorMessage={activateUserMutation.error.errorMessage}
        />
      )}

      {deleteUserMutation.isPending && open && (
        <LoadingModal
          open={open}
          setOpen={setOpen}
          loadingMessage="Loading... Please Wait!"
        />
      )}

      {deleteUserMutation.isError && open && (
        <ErrorModal
          open={open}
          setOpen={setOpen}
          errorTitle={deleteUserMutation.error.response?.statusText}
          errorMessage={deleteUserMutation.error.errorMessage}
        />
      )}

      <div>
        {/*<!-- Card -->*/}
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                <div className="px-4 py-4">
                  <div className="px-4 sm:px-0 flex justify-between">
                    <div>
                      <h3 className="text-base font-semibold leading-7 text-gray-900">
                        User profile
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                        Personal details and application.
                      </p>
                    </div>

                    {state.user?.user_category === "SOC" && user && (
                      <div>
                        {!state.user?.is_superuser &&
                        user.user_category === "SOC" ? (
                          <></>
                        ) : (
                          <UserActionsButton
                            selectedUser={user}
                            handleActivate={() => handleOperation("activate")}
                            handleDeactivate={() =>
                              handleOperation("deactivate")
                            }
                            handleDelete={() => handleOperation("delete")}
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Account Status
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {userProfileQuery.isSuccess && (
                            <>
                              {user?.is_active ? (
                                <span className="text-green-600">
                                  Activated
                                </span>
                              ) : (
                                <span className="text-red-600">
                                  Deactivated
                                </span>
                              )}
                            </>
                          )}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Full name
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {!user?.first_name && !user?.last_name
                            ? "Not Available"
                            : `${user.first_name} ${user.last_name}`}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          User Category
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {user?.user_category ?? "Not Available"}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Email address
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {user?.email ?? "Not Available"}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Phone number
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {user?.phone_number ?? "Not Available"}
                        </dd>
                      </div>
                      {user?.user_category === "SFI" && (
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-medium leading-6 text-gray-900">
                            SFI/Bank
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {(user?.sfi as SfiModel).unique_number ??
                              "Not Available"}
                          </dd>
                        </div>
                      )}

                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Created Date
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {user?.created_at
                            ? moment(user.created_at).format("LLL")
                            : "Not Available"}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetail;

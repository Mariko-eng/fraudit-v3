import { ParentModal } from "../../../../components/modals";
import { UserModel } from "../../../../models/user";


export const ActivateUserModal = ({
  open,
  activateUser,
  setOpen,
  user,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  activateUser: (id: number | string | undefined) => void;
  user: UserModel;
}) => {
  const handleAction = (id: number | string | undefined) => {
    setOpen(!open);

    return activateUser(id);
  };
  return (
    <ParentModal
      open={open}
      setOpen={setOpen}
      hasButtons
      buttons={
        <>
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
            onClick={() => handleAction(user.id)}
          >
            Activate
          </button>

          <button
            type="button"
            className="mt-3 lg:ml-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => setOpen(false)}
            // ref={cancelButtonRef}
          >
            Cancel
          </button>
        </>
      }
    >
      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-6 w-6 text-orange-600"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Warning
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Are you sure you want to activate this User?
          </p>
        </div>
      </div>
    </ParentModal>
  );
};

export default ActivateUserModal;
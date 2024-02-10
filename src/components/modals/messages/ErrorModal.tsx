import { ParentModal } from "..";
import { MdOutlineWarning } from "react-icons/md";

export const ErrorModal = ({
  errorTitle,
  errorMessage,
  open,
  setOpen,
}: {
  errorTitle?: string;
  errorMessage?: string;
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  return (
    <ParentModal open={open} setOpen={setOpen} hasButtons={false}>
      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
        <MdOutlineWarning
          className="h-6 w-6 text-red-600"
          aria-hidden="true"
        />
      </div>
      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          {errorTitle || "Error"}
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            {errorMessage || "An Error has occured. Please try again"}
          </p>
        </div>
      </div>
    </ParentModal>
  );
};
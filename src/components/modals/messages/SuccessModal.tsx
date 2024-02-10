import { ParentModal } from "..";

export const SuccessModal = ({
  successTitle,
  successMessage,
  open,
  setOpen,
}: {
  successTitle?: string;
  successMessage?: string;
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  return (
    <ParentModal open={open} setOpen={setOpen} hasButtons={false}>
      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-6 w-6 text-green-600"
        >
          <path
            fillRule="evenodd"
            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          {successTitle || "Success"}
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            {successMessage || "Action performed successfully"}
          </p>
        </div>
      </div>
    </ParentModal>
  );
};
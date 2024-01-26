import { useState } from "react";
import { Link } from "react-router-dom";

const IncidentActionsButton = ({
  incidentId,
  incidentStatus,
  openFilesModal,
  handleTransfer,
  handleDelete,
}: {
  incidentId: string | undefined;
  incidentStatus: string | undefined;
  openFilesModal: () => void;
  handleTransfer: () => void;
  handleDelete: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            onClick={toggleDropdown}
            className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-[#00AFD7]"
            id="options-menu"
            aria-haspopup="listbox"
          >
          {"<"} More Options {">"}
          </button>
        </div>

        {/* Dropdown menu */}
        {isOpen && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div
              className="py-1"
              role="menuitem"
              tabIndex={0}
              onClick={() => {
                toggleDropdown();
                openFilesModal();
              }}
            >
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Upload Incident Files
              </a>
            </div>
            <div className="py-1" role="menuitem" tabIndex={1}>
              <Link
                className="relative z-10"
                to={`/min_admin/incidents/accounts/${incidentId}`}
              >
                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Add Involved Accounts
                </div>
              </Link>
            </div>
            {incidentStatus === "GREY" && (
              <div
                className="py-1"
                role="menuitem"
                tabIndex={2}
                onClick={() => {
                  toggleDropdown();
                  handleTransfer();
                }}
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-cyan-700 hover:bg-cyan-100"
                >
                  Add Blacklist Request
                </a>
              </div>
            )}
            <div
              className="py-1"
              role="menuitem"
              tabIndex={3}
              onClick={() => {
                toggleDropdown();
                handleDelete();
              }}
            >
              <a
                href="#"
                className="block px-4 py-2 text-sm text-red-700 hover:bg-red-100"
              >
                Delete Incident Now
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default IncidentActionsButton;

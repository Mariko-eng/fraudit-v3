import { useState } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { UserModel } from "../../../../models/user";

const UserActionsButton = ({
  selectedUser,
  handleActivate,
  handleDeactivate,
  handleDelete,
}: {
  selectedUser: UserModel;
  handleActivate: () => void;
  handleDeactivate: () => void;
  handleDelete: () => void;
}) => {
  const { user } = useAppSelector(store => store.auth)
  const loggedInUser = user;
  const [isOpen, setIsOpen] = useState(false);

  // console.log(user)

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
            {loggedInUser?.is_superuser ? (
              <>
                <>
                  {selectedUser.is_active ? (
                    <div
                      className="py-1"
                      role="menuitem"
                      tabIndex={3}
                      onClick={() => {
                        toggleDropdown();
                        handleDeactivate();
                      }}
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-center text-red-700 hover:bg-red-100"
                      >
                        Deactivate Account
                      </a>
                    </div>
                  ) : (
                    <div
                      className="py-1"
                      role="menuitem"
                      tabIndex={3}
                      onClick={() => {
                        toggleDropdown();
                        handleActivate();
                      }}
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                      >
                        Activate Account
                      </a>
                    </div>
                  )}

                  {selectedUser.is_active === false && (
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
                        Delete Account
                      </a>
                    </div>
                  )}
                </>
              </>
            ) : (
              <>
                {loggedInUser?.user_category === "SOC" && (
                  <>
                    {selectedUser.is_superuser === false && (
                      <>
                        {selectedUser.is_active ? (
                          <div
                            className="py-1"
                            role="menuitem"
                            tabIndex={3}
                            onClick={() => {
                              toggleDropdown();
                              handleDeactivate();
                            }}
                          >
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-center text-red-700 hover:bg-red-100"
                            >
                              Deactivate Account
                            </a>
                          </div>
                        ) : (
                          <div
                            className="py-1"
                            role="menuitem"
                            tabIndex={3}
                            onClick={() => {
                              toggleDropdown();
                              handleActivate();
                            }}
                          >
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                            >
                              Activate Account
                            </a>
                          </div>
                        )}
                        {selectedUser.is_active === false && (
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
                              Delete Account
                            </a>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UserActionsButton;

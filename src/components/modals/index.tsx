import React from "react";

export const ParentModal = (
  {
    children,
    open,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setOpen,
    hasButtons,
    buttons,
  }: {
    children?: React.ReactNode;
    open: boolean;
    setOpen: (value: boolean) => void;
    hasButtons?: boolean;
    buttons?: React.ReactNode;
  },
) => {
  const customModalWidth = {
    minWidth: "30rem", // Set a minimum width
    width: "80%", // Adjust the width as needed
  };
  return (
    <>
      {open && (
        // <div className="w-full fixed inset-0 flex items-center justify-center z-50">
        <div className="w-full fixed inset-0 flex items-center justify-center z-50">
          {/* Modal Overlay */}
          <div className="fixed inset-0 bg-black opacity-50"></div>

          {/* Modal Content */}
          <div className="relative bg-white p-4 rounded-lg shadow-lg sm:my-8 md:w-full sm:max-w-lg"
          style={customModalWidth}> 
            {children}
            {hasButtons && (
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                {buttons}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
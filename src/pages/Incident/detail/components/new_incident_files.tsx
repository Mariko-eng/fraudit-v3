import React from "react";
import { SyntheticEvent, useState } from "react";
import { ParentModal } from "../../../../components/modals/messages";

const AddIncidentFilesModal = ({
  open,
  setOpen,
  incidentId,
  addIncidentFiles,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  incidentId: string | undefined;
  addIncidentFiles: (update: FormData) => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [descError, setDescError] = useState<string>("");

  const excludedFileExtensions = ["mp3", "wav", "avi", "mp4", "mkv", "mov"];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileExtension = files[0].name.split(".").pop();

      if (excludedFileExtensions.includes(fileExtension?.toLowerCase() || "")) {
        setFileError(
          "Selected file is an excluded file type (audio or video)."
        );
      } else {
        setSelectedFile(files[0]);
        setFileError("");
      }
    }
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (desc.trim().length < 5) {
      return setDescError("Provide Sufficient File Description");
    } else {
      setDescError("");
    }

    if (selectedFile) {
      if (incidentId) {
        console.log(incidentId)
        console.log(desc)
        console.log(selectedFile)

        const formData = new FormData();
        formData.append("incident_id", incidentId);
        formData.append("description", desc);
        formData.append("file", selectedFile);

        addIncidentFiles(formData);
      }
    } else {
      // Handle the case where no file is selected
      console.error("No file selected for upload");
      setFileError("No file selected for upload");
    }
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
            className="inline-flex w-full justify-center rounded-md bg-[#00AFD7] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
            onClick={(event) => handleSubmit(event)}
          >
            Submit
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
          Add Incident Files
        </h3>

        <div className="mt-4 overflow-y-hidden">
          <form>
            <div className="col-span-3">
              <label
                htmlFor="description"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-600"
              >
                Short Description
              </label>
            </div>

            <div className="col-span-9">
              <textarea
                id="description"
                name="description"
                value={desc}
                onChange={(e) => {
                  if (e.target.value.trim().length > 5) {
                    setDescError("");
                  }
                  setDesc(e.target.value);
                }}
                className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-[#00AFD7] focus:ring-[#00AFD7] dark:border-gray-200 dark:text-gray-600 dark:bg-gray-100"
                rows={3}
                placeholder="Enter File description..."
              ></textarea>
              {descError !== "" && <p className="text-red-500">{descError}</p>}
            </div>
            <div className="grid grid-cols-12 gap-4 sm:gap-6">
              <div className="col-span-full">
                <label
                  htmlFor="file"
                  // className="sr-only"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Attach Documents
                </label>
                <input
                  type="file"
                  // multiple
                  //   value={selectedFile}
                  name="file"
                  onChange={handleFileChange}
                  id="file"
                  className="mt-2 block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-[#00AFD7] focus:ring-[#00AFD7] dark:border-gray-200 dark:text-gray-600 dark:bg-gray-100 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-2 file:px-4 dark:file:bg-gray-300 dark:file:text-gray-600"
                />
                {fileError !== "" && (
                  <p className="text-red-500">{fileError}</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </ParentModal>
  );
};

export default AddIncidentFilesModal;

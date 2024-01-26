import { IncidentFileModel } from "../../../../models/incident";


const IncidentFiles = ({incidentFiles } : { incidentFiles: IncidentFileModel[] | []}) => {
  const files: (string | undefined)[] = Array.isArray(incidentFiles)
    ? incidentFiles
        .filter((incidentFile) => incidentFile.file !== null)
        .map((incidentFile) => incidentFile.file)
    : [];

  // console.log(files);

  if (Array.isArray(files) && files.length > 0) {
    return files.map((file, idx) => {
      return (
        <li key={idx} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
          <div className="flex w-0 flex-1 items-center">
            <svg
              fill="currentColor"
              width="15px"
              height="15px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.08,12.42,11.9,18.61a4.25,4.25,0,0,1-6-6l8-8a2.57,2.57,0,0,1,3.54,0,2.52,2.52,0,0,1,0,3.54l-6.9,6.89A.75.75,0,1,1,9.42,14l5.13-5.12a1,1,0,0,0-1.42-1.42L8,12.6a2.74,2.74,0,0,0,0,3.89,2.82,2.82,0,0,0,3.89,0l6.89-6.9a4.5,4.5,0,0,0-6.36-6.36l-8,8A6.25,6.25,0,0,0,13.31,20l6.19-6.18a1,1,0,1,0-1.42-1.42Z" />
            </svg>
            <div className="ml-4 flex min-w-0 flex-1 gap-2">
              <span className="truncate font-medium dark:text-gray-400">
                {`${file}`.split("incidents/")[1]}
              </span>
              <span className="flex-shrink-0 text-gray-400">~&lt;10mb</span>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            <a
              href={file}
              download
              target="_blank"
              className="font-medium text-[#00AFD7] hover:text-[#00AFD7]"
            >
              View File
            </a>
          </div>
        </li>
      );
    });
  }

  if (typeof files === "string") {
    return (
      <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
        <div className="flex w-0 flex-1 items-center">
          <svg
            fill="currentColor"
            width="15px"
            height="15px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.08,12.42,11.9,18.61a4.25,4.25,0,0,1-6-6l8-8a2.57,2.57,0,0,1,3.54,0,2.52,2.52,0,0,1,0,3.54l-6.9,6.89A.75.75,0,1,1,9.42,14l5.13-5.12a1,1,0,0,0-1.42-1.42L8,12.6a2.74,2.74,0,0,0,0,3.89,2.82,2.82,0,0,0,3.89,0l6.89-6.9a4.5,4.5,0,0,0-6.36-6.36l-8,8A6.25,6.25,0,0,0,13.31,20l6.19-6.18a1,1,0,1,0-1.42-1.42Z" />
          </svg>
          <div className="ml-4 flex min-w-0 flex-1 gap-2">
            <span className="truncate font-medium dark:text-gray-400">
              {`${files}`.split("incidents/")[1]}
            </span>
            <span className="flex-shrink-0 text-gray-400">~&lt;10mb</span>
          </div>
        </div>
        <div className="ml-4 flex-shrink-0">
          <a
            href={files}
            download
            target="_blank"
            className="font-medium text-[#00AFD7] hover:text-[#00AFD7]"
          >
            View File
          </a>
        </div>
      </li>
    );
  }

  return (
    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
      <div className="flex w-0 flex-1 items-center">
        <svg
          fill="currentColor"
          width="15px"
          height="15px"
          viewBox="0 0 30 30"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>notice1</title>
          <path d="M15.5 3c-7.456 0-13.5 6.044-13.5 13.5s6.044 13.5 13.5 13.5 13.5-6.044 13.5-13.5-6.044-13.5-13.5-13.5zM15.5 27c-5.799 0-10.5-4.701-10.5-10.5s4.701-10.5 10.5-10.5 10.5 4.701 10.5 10.5-4.701 10.5-10.5 10.5zM15.5 10c-0.828 0-1.5 0.671-1.5 1.5v5.062c0 0.828 0.672 1.5 1.5 1.5s1.5-0.672 1.5-1.5v-5.062c0-0.829-0.672-1.5-1.5-1.5zM15.5 20c-0.828 0-1.5 0.672-1.5 1.5s0.672 1.5 1.5 1.5 1.5-0.672 1.5-1.5-0.672-1.5-1.5-1.5z"></path>
        </svg>
        <div className="ml-4 flex min-w-0 flex-1 gap-2">
          <span className="truncate font-medium">
            No Documents attached to this incident.
          </span>
        </div>
      </div>
    </li>
  );
}

export default IncidentFiles
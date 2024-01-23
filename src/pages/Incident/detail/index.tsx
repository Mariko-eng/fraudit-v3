import { useQuery } from "@tanstack/react-query";
import { Tabs } from "flowbite-react";
import { HiArchive, HiFolder, HiUserCircle } from "react-icons/hi";
import { useParams } from "react-router";
import IncidentService from "../../../services/incident.service";
import { useAppSelector } from "../../../redux/hooks";
import { useEffect, useState } from "react";
import { IncidentModel } from "../../../models/incident";

const IncidentDetail = () => {
  const params = useParams();

  const { id } = params;
  const incidentId = id;

  const state = useAppSelector((store) => store.auth);

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

  return (
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
              <div>
                <p>{incident?.category_name}</p>
              </div>
            </Tabs.Item>
            <Tabs.Item title="Uploaded Files" icon={HiArchive}>
              This is{" "}
              <span className="font-medium text-gray-800 dark:text-white">
                Dashboard tab's associated content
              </span>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling.
            </Tabs.Item>
            <Tabs.Item title="Suspects" icon={HiUserCircle}>
              This is{" "}
              <span className="font-medium text-gray-800 dark:text-white">
                Settings tab's associated content
              </span>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling.
            </Tabs.Item>
            <Tabs.Item disabled title="Disabled">
              Disabled content
            </Tabs.Item>
          </Tabs>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default IncidentDetail;

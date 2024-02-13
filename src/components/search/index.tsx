import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleSearch } from "../../redux/slices/search";
import { ParentModal } from "../modals";
import { useQuery } from "@tanstack/react-query";
import IncidentService from "../../services/incident.service";
import { IncidentListModel, IncidentModel } from "../../models/incident";
import { Link } from "react-router-dom";
import moment from "moment";

const SearchComponent = () => {
  const state = useAppSelector((store) => store.auth);

  const search = useAppSelector((store) => store.search);

  const [tableData, setTableData] = useState<IncidentModel[]>([]);

  const dispatch = useAppDispatch();

  const handleToggleSearch = () => {
    dispatch(toggleSearch(!search.isOpen));
  };

  const [searchValue, setSearchValue] = useState<string>("");

  const searchIncidentQuery = useQuery({
    queryKey: ["searchIncidentQuery", searchValue],
    queryFn: async () => {
      return await IncidentService.searchIncidents(searchValue, {
        Authorization: `Bearer ${state.tokens?.access}`,
      });
    },
    enabled: searchValue.trim() !== "",
  });

  useEffect(() => {
    if (searchIncidentQuery.data) {
      const incidentData: IncidentListModel =
        searchIncidentQuery.data as IncidentListModel;

      setTableData(incidentData.results);
    }
  }, [setTableData, searchIncidentQuery]);

  return (
    <>
      <ParentModal
        open={search.isOpen}
        setOpen={handleToggleSearch}
        hasButtons
        buttons={
          <>
            <button
              type="button"
              className="mt-3 lg:ml-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={() => handleToggleSearch()}
            >
              Close
            </button>
          </>
        }
      >
        <div>
          <div className="w-full">
            <form action="#" method="GET" className="lg:hidden">
              <label htmlFor="mobile-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="mobile-search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>

          <div style={{ height: "300px", overflow:"auto"}}>
            <div className="py-2">
              {tableData.map((item, index) => (
                <div key={index} className="py-1">
                  <Link to={`/home/incidents/${item.id}`}>
                    <div className="flex">
                      <h3 className="font-semibold text-gray-600">
                        {item.id?.substring(0, 6)}
                      </h3>
                      <h3 className="font-semibold text-gray-600 ml-3">
                        {item.sfi?.unique_number?.substring(0, 6)}
                      </h3>
                    </div>
                    <h3 className="text-sm font-light">
                      {item.description?.substring(0, 15)}
                    </h3>
                    <h3 className="text-sm font-light">
                      {item.created_at
                        ? moment(item.created_at).format("ll")
                        : "Not Available"}
                    </h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ParentModal>
    </>
  );
};

export default SearchComponent;

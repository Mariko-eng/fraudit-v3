import { useMemo, useState } from 'react'
import { useAppSelector } from '../../../redux/hooks';
import { API } from '../../../utils/api';
import { IncidentSuspectListModel, IncidentSuspectModel } from '../../../models/suspect';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { COLUMNS } from './columns';
import { TbArrowsSort } from "react-icons/tb";
import { CSVLink } from "react-csv";

const SuspectReports = () => {
  const state = useAppSelector((store) => store.auth);

  const [startDate, setStartDate] = useState("");
  const [startDateError, setStartDateError] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [endDateError, setEndDateError] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  
  const [tableData, setTableData] = useState<IncidentSuspectModel[]>([]);

  const getData = async () => {
    if(startDate === ""){
      setStartDateError(true)
    }else{
      setStartDateError(false)
    }

    if(endDate === ""){
      setEndDateError(true)
    }else{
      setEndDateError(false)
    }

    if (startDate !== "" && endDate !== "") {
      setIsLoading(true);
      setError("");
      try {
        const params = {
          filter_type: "report",
          start_date: startDate,
          end_date: endDate,
        };

        const queryString = Object.entries(params)
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join("&");

        const url = `/api/incident/involved-individuals/list/?${queryString}`;

        const response = await API.get(url, {
          headers: {
            Authorization: `Bearer ${state.tokens?.access}`,
          },
        });

        // console.log(response);
        const incidentData: IncidentSuspectListModel =
          response.data as IncidentSuspectListModel;
        setTableData(incidentData.results as IncidentSuspectModel[]);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Something Went Wrong!");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const [columns, data] = useMemo(() => {
    return [COLUMNS, tableData];
  }, [
    tableData,
  ]);

  const tableInstance = useReactTable({
    columns,
    data: data || [],
    state: {},
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const headerGroups = tableInstance.getHeaderGroups();

  const rowModel = tableInstance.getRowModel();

  const export_data = useMemo(() => {
    const cols = [
      "incident",
      "id type",
      "id no",
      "name",
      "email",
      "phone",
      "date",
    ];
    const rows = tableData.map((item) => [
      item.incident,
      item.individual_id_type,
      item.individual_id_details,
      item.individual_name,
      item.individual_email,
      item.individual_phone,
      item.created_at
    ]);

    return [cols, ...rows];
  }, [tableData]);


    return (
    <>
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
                  Reports
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
                <a
                  href="#"
                  className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white"
                >
                  Suspects
                </a>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div>
        <div className="grid grid-cols-3 gap-2">
          <div className="w-full flex items-center justify-center">
            <label
              htmlFor="start_date"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Start Date
            </label>
            <input
              type="date"
              id="start_date"
              name="datepicker"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className={`px-3 py-2 border ${startDateError ? `border-red-500` : `border-cyan-500`} rounded-md w-full focus:outline-none focus:ring focus:border-blue-300`}
            />
          </div>
          <div className="w-full flex items-center justify-center">
            <label
              htmlFor="end_date"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              End Date
            </label>
            <input
              type="date"
              id="end_date"
              name="datepicker"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              className={`px-3 py-2 border ${endDateError ? `border-red-500` : `border-cyan-500`} rounded-md w-full focus:outline-none focus:ring focus:border-blue-300`}
            />
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              className="bg-[#00AFD7] p-2 text-white rounded flex items-center justify-center"
              disabled={isLoading}
              onClick={() => getData()}
            >
              Generate Report
            </button>
          </div>
        </div>

        <hr className="mt-4" />

        {error && <p>{error}</p>}
        {!error && (
          <div>
            <div>
              {data ? (
                <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden p-2">
                  {data.length >= 1 && (
                    <div className="mt-2 py-2">
                        <div className="flex justify-between">
                        <p className="font-bold" >INCIDENT REPORT</p>
                        <div>
                        <CSVLink data={export_data} className="py-1 px-2 border text-sm">Export CSV</CSVLink>

                        {/* <button className="py-1 px-2 border text-sm">Export CSV</button> */}
                        {/* <button className="py-1 px-2 ml-1 border text-sm">Export PDF</button> */}
                        </div>
                        </div>
                        <hr className="my-3" />
                        <p className="mt-2">No of incidents :: <span className="font-bold">{data.length}</span></p>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          {headerGroups.map((headerGroup) => (
                            <tr key={headerGroup.id}>
                              {headerGroup.headers.map((headerItem) => (
                                <th
                                  colSpan={headerItem.colSpan}
                                  key={headerItem.id}
                                  className="w-5 p-4"
                                >
                                  <div className="flex items-start justify-center">
                                    {flexRender(
                                      headerItem.column.columnDef.header,
                                      headerItem.getContext()
                                    )}
                                    {headerItem.column.getCanSort() && (
                                      <TbArrowsSort
                                        className="ml-1"
                                        onClick={() => {
                                          headerItem.column.toggleSorting();
                                        }}
                                      />
                                    )}
                                  </div>
                                </th>
                              ))}
                            </tr>
                          ))}
                        </thead>
                        <tbody>
                          {rowModel.rows.map((row) => (
                            <tr
                              key={row.id}
                              className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                              {row.getVisibleCells().map((cell) => (
                                <td
                                  key={cell.id}
                                  className="w-5 p-4 items-center"
                                >
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></tfoot>
                      </table>
                    </div>
                    </div>
                  )}

                  <br />
                </div>
              ) : (
                <p>Loading....</p>
              )}

              {/* <BasicTable /> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SuspectReports
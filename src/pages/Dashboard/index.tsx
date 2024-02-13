import React, { useEffect, useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { API } from "../../utils/api";
import { useAppSelector } from "../../redux/hooks";
import { DashboardDataModel } from "./data_types";

interface MyComponentProps {}

const Dashboard: React.FC<MyComponentProps> = () => {
  const state = useAppSelector((store) => store.auth);

  const [data, setData] = useState<DashboardDataModel | null>(null);

  useEffect(() => {
    const getCategoricalData = async () => {
      try {
        const url = `/api/dashboard/`;

        const response = await API.get(url, {
          headers: {
            Authorization: `Bearer ${state.tokens?.access}`,
          },
        });

        // console.log(response.data);

        setData(response.data as DashboardDataModel);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };
    getCategoricalData();
  }, [state, setData]);

  const monthslineChartOptions: ApexOptions = useMemo(() => {
    if (data) {
      const monthCategories =
        data.results.month_incidents?.map((item) => item.month) || [];
      const monthSeries =
        data.results.month_incidents?.map((item) => item.count) || [];

      return {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: true,
          },
        },
        series: [{ name: "Incidents", data: monthSeries }],
        xaxis: {
          categories: monthCategories,
        },
      };
    }

    // Return a default or empty options object if dataMultiple is not available
    return {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true,
        },
      },
      series: [],
      xaxis: {
        categories: [],
      },
    };
  }, [data]);

  const statusPieChartOptions: ApexOptions = useMemo(() => {
    if (data) {
      const rawLabels =
        data.results.top_status?.map((item) => item.status) || [];

      const series = data.results.top_status?.map((item) => item.count) || [];

      const desiredLabelOrder = ["SUSPICION", "GREY", "BLACK"];

      // Sort labels and series based on the desired order
      const labelsAndSeries = desiredLabelOrder.map((label) => {
        const index = rawLabels.indexOf(label);
        return {
          label,
          count: index !== -1 ? series[index] : 0,
        };
      });

      // Extract sorted labels and series
      const sortedLabels = labelsAndSeries.map((item) => item.label);
      const sortedSeries = labelsAndSeries.map((item) => item.count);

      const fillColors = ["#6291AE", "#0143F6", "#010000"];

      const colors = ["blue", "grey", "black"];

      return {
        chart: {
          width: 250,
          type: "donut",
          zoom: {
            enabled: true,
          },
        },
        dataLabels: {
          enabled: true,
        },
        fill: {
          colors: fillColors,
        },
        colors: colors,
        labels: sortedLabels,
        series: sortedSeries,
        title: {
          text: "Incident Status",
        },
        legend: {
          show: true,
        },
      };
    }

    // Return a default or empty options object if dataMultiple is not available
    return {
      chart: {
        width: 250,
        type: "donut",
        zoom: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        colors: [],
      },

      labels: [],
      series: [],
      title: {
        text: "",
      },
      colors: [],
      legend: {
        show: true,
      },
    };
  }, [data]);

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
                  Dashboard
                </a>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {data && (
        <div>
          <div className="grid grid-cols-4 gap-4 p-2">
            <div className="flex flex-col shadow rounded p-2 h-auto">
              <h3 className="text-lg font-bold">Summary</h3>
              <hr className="my-1" />
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <p className="text-sm">SFIs/Banks</p>
                  <p className="text-sm text-blue-500 font-semibold">
                    {data.results.summary.sfis}
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <p className="text-sm">Incidents</p>
                  <p className="text-sm text-blue-500 font-semibold">
                    {data.results.summary.incidents}
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <p className="text-sm">Suspects</p>
                  <p className="text-sm text-blue-500 font-semibold">
                    {data.results.summary.suspects}
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <p className="text-sm">Transfers</p>
                  <p className="text-sm text-blue-500 font-semibold">
                    {data.results.summary.transfers}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col shadow rounded p-2 h-auto">
              <h3 className="text-md font-bold">Top SFIs </h3>
              <hr className="my-1" />
              {data.results.top_sfi_incidents.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-between">
                    <p className="text-sm">{item.sfi}</p>
                    <p className="text-sm text-blue-500 font-semibold">
                      {item.num_incidents}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col shadow rounded p-2 h-auto">
              <h5 className="text-md font-bold">Top Categories </h5>
              <hr className="my-1" />
              {data.results.top_categories.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-between">
                    <p className="text-sm">
                      {item.category.substring(0, 15)}...
                    </p>
                    <p className="text-sm text-blue-500 font-semibold">
                      {item.count}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col shadow rounded p-2 h-auto">
              <h3 className="text-md font-bold">Top Sub Categories</h3>
              <hr className="my-1" />
              {data.results.top_sub_categories.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-between">
                    <p className="text-sm">
                      {item.sub_category.substring(0, 15)}...
                    </p>
                    <p className="text-sm text-blue-500 font-semibold">
                      {item.count}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col shadow rounded p-2 h-auto">
              <h3 className="text-md font-bold">Top Months</h3>
              <hr className="my-1" />
              {data.results.top_months.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-between">
                    <p className="text-sm">{item.month}</p>
                    <p className="text-sm text-blue-500 font-semibold">
                      {item.count}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col shadow rounded p-2 h-auto">
              <h3 className="text-md font-bold">Top Years</h3>
              <hr className="my-1" />
              {data.results.top_years.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-between">
                    <p className="text-sm">{item.year}</p>
                    <p className="text-sm text-blue-500 font-semibold">
                      {item.count}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col border-blue-400 rounded">
              <div className="flex flex-col">
                <ReactApexChart
                  options={statusPieChartOptions}
                  series={statusPieChartOptions.series}
                  type="donut"
                  width={300}
                />
              </div>
            </div>
          </div>
          <div>
            <ReactApexChart
              options={monthslineChartOptions}
              series={monthslineChartOptions.series}
              type="line"
              height={250}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

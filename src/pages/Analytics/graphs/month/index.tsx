import { useMemo, useState } from "react";
import { API } from "../../../../utils/api";
import { useAppSelector } from "../../../../redux/hooks";
import { MonthStatsModel, SingleMonthResultsModel } from "./data_types1";
import { MultipleMonthResultsModel } from "./data_types2";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const AnalyticsGraphMonth = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSingle, setIsSingle] = useState<boolean | null>(null);

  const [dataSingle, setDataSingle] = useState<SingleMonthResultsModel | null>(null);
  const [dataMultiple, setDataMultiple] =useState<MultipleMonthResultsModel | null>(null);

  // const [lineChartOptions, setLineChartOptions] = useState<ApexOptions>(initialLineChartOptions);
  // const [chartData, setChartData] = useState<ChartSeries[]>([]);

  const state = useAppSelector((store) => store.auth);

  const getData = async () => {
    setIsLoading(true);
    setIsSingle(null);
    setDataSingle(null);
    setDataMultiple(null);
    try {
      // Convert params object to a query string
      const params = {
        year: selectedYear,
        month: selectedMonth,
      };

      const queryString = Object.entries(params)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");

      const url = `api/analytics/monthly/?${queryString}`;

      const response = await API.get(url, {
        headers: {
          Authorization: `Bearer ${state.tokens?.access}`,
        },
      });

      console.log(response);

      const data = response.data as MonthStatsModel;

      if (data.message === "success") {
        setError("");
        if (data.type === "single") {
          setIsSingle(true);
          setDataSingle(response.data as SingleMonthResultsModel);
        } else {
          setIsSingle(false);
          setDataMultiple(response.data as MultipleMonthResultsModel);
        }
      } else {
        setError("No data was found!");
      }
    } catch (e) {
      console.error("Error fetching data:", e);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Multiple Months Data
  const MStatusPieChartOptions: ApexOptions = useMemo(() => {
    if (dataMultiple) {
      const labels =
        dataMultiple.results.status_incidents?.map((item) => item.status) || [];
      const series =
        dataMultiple.results.status_incidents?.map((item) => item.count) || [];

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
          colors: ["#0143F6", "#6291AE", "#010000"],
        },
        labels: labels,
        series: series,
        title: {
          text: "Incident Status",
        },
        colors: ["grey","blue", "black"],
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
  }, [dataMultiple]);

  const MClassificationPieChartOptions: ApexOptions = useMemo(() => {
    if (dataMultiple) {
      const labels =
        dataMultiple.results.classification_incidents?.map(
          (item) => item.classification
        ) || [];
      const series =
        dataMultiple.results.classification_incidents?.map(
          (item) => item.count
        ) || [];

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
          colors: ["#0143F6", "#6291AE"],
        },
        labels: labels,
        series: series,
        title: {
          text: "Incident Classification",
        },
        colors: ["red", "green"],
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
  }, [dataMultiple]);

  const MMonthslineChartOptions: ApexOptions = useMemo(() => {
    if (dataMultiple) {
      const monthCategories =
        dataMultiple.results.num_suspects_month?.map((item) => item.month) ||
        [];
      const monthSeries =
        dataMultiple.results.month_incidents?.map((item) => item.count) || [];
      const suspectSeries =
        dataMultiple.results.num_suspects_month?.map(
          (item) => item.sum_num_individuals
        ) || [];

      return {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: true,
          },
        },
        series: [
          { name: "Incidents", data: monthSeries },
          { name: "Suspects", data: suspectSeries },
        ],
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
  }, [dataMultiple]);

  const MSategorybarChartOptions: ApexOptions = useMemo(() => {
    if (dataMultiple) {
      const categoryLabels =
        dataMultiple.results.category_incidents?.map((item) =>
          item.category.substring(0, 4)
        ) || [];
      const categorySeries =
        dataMultiple.results.category_incidents?.map((item) => item.count) ||
        [];

      return {
        chart: {
          height: 350,
          type: "bar",
          zoom: {
            enabled: true,
          },
        },
        series: [{ name: "Incidents", data: categorySeries }],
        xaxis: {
          categories: categoryLabels,
        },
      };
    }

    // Return a default or empty options object if dataMultiple is not available
    return {
      chart: {
        height: 350,
        type: "bar",
        zoom: {
          enabled: true,
        },
      },
      series: [],
      xaxis: {
        categories: [],
      },
    };
  }, [dataMultiple]);

  const MSubCategorybarChartOptions: ApexOptions = useMemo(() => {
    if (dataMultiple) {
      const categoryLabels =
        dataMultiple.results.sub_category_incidents?.map((item) =>
          item.sub_category.substring(0, 4)
        ) || [];
      const categorySeries =
        dataMultiple.results.sub_category_incidents?.map(
          (item) => item.count
        ) || [];

      return {
        chart: {
          height: 350,
          type: "bar",
          zoom: {
            enabled: true,
          },
        },
        series: [{ name: "Incidents", data: categorySeries }],
        xaxis: {
          categories: categoryLabels,
        },
      };
    }

    // Return a default or empty options object if dataMultiple is not available
    return {
      chart: {
        height: 350,
        type: "bar",
        zoom: {
          enabled: true,
        },
      },
      series: [],
      xaxis: {
        categories: [],
      },
    };
  }, [dataMultiple]);

  const MSfibarChartOptions: ApexOptions = useMemo(() => {
    if (dataMultiple) {
      const categoryLabels =
        dataMultiple.results.sfi_incidents?.map((item) => item.sfi) || [];
      const categorySeries =
        dataMultiple.results.sfi_incidents?.map((item) => item.count) || [];

      return {
        chart: {
          height: 350,
          type: "bar",
          zoom: {
            enabled: true,
          },
        },
        series: [{ name: "Incidents", data: categorySeries }],
        xaxis: {
          categories: categoryLabels,
        },
      };
    }

    // Return a default or empty options object if dataMultiple is not available
    return {
      chart: {
        height: 350,
        type: "bar",
        zoom: {
          enabled: true,
        },
      },
      series: [],
      xaxis: {
        categories: [],
      },
    };
  }, [dataMultiple]);

  // Single Months Data
  const barChartOptions: ApexOptions = useMemo(() => {
    if (dataSingle) {
      const monthCategories =
        dataSingle.results.category_incidents?.map((item) =>
          item.category.substring(0, 4)
        ) || [];
      const monthSeries =
        dataSingle.results.category_incidents?.map((item) => item.count) || [];
      const suspectSeries =
        dataSingle.results.num_suspects_category?.map(
          (item) => item.sum_num_individuals
        ) || [];

      return {
        chart: {
          height: 350,
          type: "bar",
          zoom: {
            enabled: true,
          },
        },
        series: [
          { name: "Incidents", data: monthSeries },
          { name: "Suspects", data: suspectSeries },
        ],
        xaxis: {
          categories: monthCategories,
        },
      };
    }

    // Return a default or empty options object if dataMultiple is not available
    return {
      chart: {
        height: 350,
        type: "bar",
        zoom: {
          enabled: true,
        },
      },
      series: [],
      xaxis: {
        categories: [],
      },
    };
  }, [dataSingle]);

  const SCategorylineChartOptions: ApexOptions = useMemo(() => {
    if (dataSingle) {
      const labels =
        dataSingle.results.category_incidents?.map((item) => item.category.substring(0,4)) ||
        [];
      const incidentSeries =
        dataSingle.results.category_incidents?.map((item) => item.count) || [];
      const individualSeries =
        dataSingle.results.num_suspects_category?.map(
          (item) => item.sum_num_individuals
        ) || [];

      return {
        chart: {
          height: 350,
          type: "bar",
          zoom: {
            enabled: true,
          },
        },
        series: [
          { name: "Incidents", data: incidentSeries },
          { name: "Suspects", data: individualSeries },
        ],
        xaxis: {
          categories: labels,
        },
      };
    }

    // Return a default or empty options object if dataMultiple is not available
    return {
      chart: {
        height: 350,
        type: "bar",
        zoom: {
          enabled: true,
        },
      },
      series: [],
      xaxis: {
        categories: [],
      },
    };
  }, [dataSingle]);

  const SSubCategorylineChartOptions: ApexOptions = useMemo(() => {
    if (dataSingle) {
      const labels =
        dataSingle.results.sub_category_incidents?.map((item) => item.sub_category.substring(0,4)) ||
        [];
      const incidentSeries =
        dataSingle.results.sub_category_incidents?.map((item) => item.count) || [];
      const individualSeries =
        dataSingle.results.num_suspects_sub_category?.map(
          (item) => item.sum_num_individuals
        ) || [];

      return {
        chart: {
          height: 350,
          type: "bar",
          zoom: {
            enabled: true,
          },
        },
        series: [
          { name: "Incidents", data: incidentSeries },
          { name: "Suspects", data: individualSeries },
        ],
        xaxis: {
          categories: labels,
        },
      };
    }

    // Return a default or empty options object if dataMultiple is not available
    return {
      chart: {
        height: 350,
        type: "bar",
        zoom: {
          enabled: true,
        },
      },
      series: [],
      xaxis: {
        categories: [],
      },
    };
  }, [dataSingle]);

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
                  Analytics
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
                  Graphs
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div>
        <div className="grid grid-cols-3 gap-3">
          <div className="w-full flex items-center justify-center">
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Year
            </label>
            <input
              className="block w-full mx-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              min="1900"
              max="2100"
              step="1"
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(parseInt(e.target.value, 10));
              }}
            />
          </div>
          <div className="w-full flex items-center justify-center">
            <label
              htmlFor="month"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Month
            </label>
            <select
              id="month"
              className="bg-gray-50 mx-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="">All</option>
              <option value="1">Jan</option>
              <option value="2">Feb</option>
              <option value="3">Mar</option>
              <option value="4">Apr</option>
              <option value="5">May</option>
              <option value="6">Jun</option>
              <option value="7">Jul</option>
              <option value="8">Aug</option>
              <option value="9">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              className="bg-[#00AFD7] p-2 text-white rounded flex items-center justify-center"
              disabled={isLoading}
              onClick={() => getData()}
            >
              Generate Results
            </button>
          </div>
        </div>

        {error && <p>{error}</p>}
        {!error && (
          <div>
            {isSingle === null ? (
              <></>
            ) : isSingle === true ? (
              <>
                <div>
                  <h5>Single</h5>
                  <div>
                    <ReactApexChart
                      options={barChartOptions}
                      series={barChartOptions.series}
                      type="bar"
                      height={250}
                    />
                  </div>
                  <div>
                    <ReactApexChart
                      options={SCategorylineChartOptions}
                      series={SCategorylineChartOptions.series}
                      type="bar"
                      height={250}
                    />
                  </div>
                  <div>
                    <ReactApexChart
                      options={SSubCategorylineChartOptions}
                      series={SSubCategorylineChartOptions.series}
                      type="bar"
                      height={250}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h5>Multiple</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <ReactApexChart
                        options={MStatusPieChartOptions}
                        series={MStatusPieChartOptions.series}
                        type="donut"
                        width={300}
                      />
                    </div>
                    <div>
                      <ReactApexChart
                        options={MClassificationPieChartOptions}
                        series={MClassificationPieChartOptions.series}
                        type="donut"
                        width={300}
                      />
                    </div>
                  </div>
                  <div>
                    <ReactApexChart
                      options={MMonthslineChartOptions}
                      series={MMonthslineChartOptions.series}
                      type="line"
                      height={250}
                    />
                  </div>
                  <div>
                    <ReactApexChart
                      options={MSategorybarChartOptions}
                      series={MSategorybarChartOptions.series}
                      type="bar"
                      height={250}
                    />
                  </div>
                  <div>
                    <ReactApexChart
                      options={MSubCategorybarChartOptions}
                      series={MSubCategorybarChartOptions.series}
                      type="bar"
                      height={250}
                    />
                  </div>
                  <div>
                    <ReactApexChart
                      options={MSfibarChartOptions}
                      series={MSfibarChartOptions.series}
                      type="bar"
                      height={250}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AnalyticsGraphMonth;

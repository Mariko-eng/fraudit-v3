import { useEffect, useState, useMemo } from "react";
import { API } from "../../../../utils/api";
import { useAppSelector } from "../../../../redux/hooks";
import { CategoryStatsModel, SingleCategoryResultsModel } from "./data_types1";
import { MultipleCategoryResultsModel } from "./data_types2";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface Category {
  category: string;
}

const AnalyticsGraphCategory = () => {
  const state = useAppSelector((store) => store.auth);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSingle, setIsSingle] = useState<boolean | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [dataSingle, setDataSingle] =
    useState<SingleCategoryResultsModel | null>(null);
  const [dataMultiple, setDataMultiple] =
    useState<MultipleCategoryResultsModel | null>(null);

  useEffect(() => {
    const getCategoricalData = async () => {
      try {
        const url = `/api/analytics/categorical-data/list/`;

        const response = await API.get(url, {
          headers: {
            Authorization: `Bearer ${state.tokens?.access}`,
          },
        });

        setCategories(response.data as Category[]);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };
    getCategoricalData();
  }, [state, setCategories]);

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
        category: selectedCategory,
      };

      const queryString = Object.entries(params)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");

      const url = `api/analytics/category/?${queryString}`;

      const response = await API.get(url, {
        headers: {
          Authorization: `Bearer ${state.tokens?.access}`,
        },
      });

      console.log(response);

      const data = response.data as CategoryStatsModel;

      if (data.message === "success") {
        setError("");
        if (data.type === "single") {
          setIsSingle(true);
          setDataSingle(response.data as SingleCategoryResultsModel);
        } else {
          setIsSingle(false);
          setDataMultiple(response.data as MultipleCategoryResultsModel);
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

  // Multiple Data
  const [amtCategoryNames, setAmtCategoryNames] = useState<string[]>([]);

  const MAmtCategorybarChartOptions: ApexOptions = useMemo(() => {
    if (dataMultiple) {
      setAmtCategoryNames(
        dataMultiple.results.actual_amt_category?.map((item) => item.category)
      );

      const categoryLabels =
        dataMultiple.results.actual_amt_category?.map((item) =>
          item.category.substring(0, 4)
        ) || [];
      const categorySeries =
        dataMultiple.results.actual_amt_category?.map(
          (item) => item.avg_actual_amount
        ) || [];

      return {
        chart: {
          height: 350,
          type: "bar",
          zoom: {
            enabled: true,
          },
        },
        series: [{ name: "Avrage Amount", data: categorySeries }],
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

  const [numCategoryNames, setNumCategoryNames] = useState<string[]>([]);
  
  const MSuspectsCategorybarChartOptions: ApexOptions = useMemo(() => {
    if (dataMultiple) {
      setNumCategoryNames(
        dataMultiple.results.num_suspects_category?.map((item) => item.category)
      );

      const categoryLabels =
        dataMultiple.results.num_suspects_category?.map((item) =>
          item.category.substring(0, 4)
        ) || [];
      const categorySeries =
        dataMultiple.results.num_suspects_category?.map(
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
        series: [{ name: "Cout", data: categorySeries }],
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
  const statusPieChartOptions: ApexOptions = useMemo(() => {
    if (dataSingle) {
      const labels =
        dataSingle.results.status_incidents?.map((item) => item.status) || [];
      const series =
        dataSingle.results.status_incidents?.map((item) => item.count) || [];

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
        colors: ["grey", "blue", "black"],
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
  }, [dataSingle]);

  const classificationPieChartOptions: ApexOptions = useMemo(() => {
    if (dataSingle) {
      const labels =
        dataSingle.results.classification_incidents?.map(
          (item) => item.classification
        ) || [];
      const series =
        dataSingle.results.classification_incidents?.map(
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
  }, [dataSingle]);

  const subCategoryBarChartOptions: ApexOptions = useMemo(() => {
    if (dataSingle) {
      const monthCategories =
        dataSingle.results.sub_category_incidents?.map((item) =>
          item.sub_category.substring(0, 4)
        ) || [];
      const monthSeries =
        dataSingle.results.sub_category_incidents?.map((item) => item.count) ||
        [];
      const suspectSeries =
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

  const sfiBarChartOptions: ApexOptions = useMemo(() => {
    if (dataSingle) {
      const monthCategories =
        dataSingle.results.sfi_incidents?.map((item) => item.sfi) || [];
      const monthSeries =
        dataSingle.results.sfi_incidents?.map((item) => item.count) || [];
      const suspectSeries =
        dataSingle.results.num_suspects_sfi?.map(
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
                  Graphs - Category
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div>
        <div className="grid grid-cols-4 gap-2">
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
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <select
              id="category"
              className="bg-gray-50 mx-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All</option>
              {categories.map((item, index) => (
                <option key={index} value={item.category}>
                  {item.category}
                </option>
              ))}
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
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <ReactApexChart
                        options={statusPieChartOptions}
                        series={statusPieChartOptions.series}
                        type="donut"
                        width={300}
                      />
                    </div>
                    <div>
                      <ReactApexChart
                        options={classificationPieChartOptions}
                        series={classificationPieChartOptions.series}
                        type="donut"
                        width={300}
                      />
                    </div>
                  </div>
                  <div>
                    <ReactApexChart
                      options={subCategoryBarChartOptions}
                      series={subCategoryBarChartOptions.series}
                      type="bar"
                      height={250}
                    />
                  </div>
                  <div>
                    <ReactApexChart
                      options={sfiBarChartOptions}
                      series={sfiBarChartOptions.series}
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
                  <div className="grid grid-cols-3 gap-2 p-2">
                    <div className="col-span-2">
                      <div className="font-bold my-1">
                        Incidents - Average Amounts
                      </div>
                      <ReactApexChart
                        options={MAmtCategorybarChartOptions}
                        series={MAmtCategorybarChartOptions.series}
                        type="bar"
                        height={250}
                      />
                    </div>
                    <div className="col-span-1">
                      <div className="font-bold my-1">Legend</div>
                      <div>
                        {amtCategoryNames.map((item: string, index: number) => (
                          <div key={index} className="flex">
                            <div
                              className="text-xs"
                              style={{ width: "50px" }}
                            >{`${item.substring(0, 4)}-${index}`}</div>
                            <div className="text-xs text-blue-500">
                              - {item}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <hr />

                  <div className="grid grid-cols-3 gap-2 p-2">
                    <div className="col-span-2">
                      <div className="font-bold my-1">
                        Incidents - Number Of Suspects
                      </div>
                      <ReactApexChart
                        options={MSuspectsCategorybarChartOptions}
                        series={MSuspectsCategorybarChartOptions.series}
                        type="bar"
                        height={250}
                      />
                    </div>
                    <div className="col-span-1">
                      <div className="font-bold my-1">Legend</div>
                      <div>
                        {numCategoryNames.map((item: string, index: number) => (
                          <div key={index} className="flex">
                            <div
                              className="text-xs"
                              style={{ width: "50px" }}
                            >{`${item.substring(0, 4)}-${index}`}</div>
                            <div className="text-xs text-blue-500">
                              - {item}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <hr />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AnalyticsGraphCategory;

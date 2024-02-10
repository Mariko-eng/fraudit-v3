import React, {useEffect, useState} from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { API } from "../../utils/api";
import { useAppSelector } from "../../redux/hooks";
import { DashboardDataModel } from "./data_types";

interface MyComponentProps {}

const Dashboard: React.FC<MyComponentProps> = () => {
  const state = useAppSelector((store) => store.auth);

  const [data, setData] = useState<DashboardDataModel[]>([]);

    useEffect(() => {
    const getCategoricalData = async () => {
      try {
        const url = `/api/dashboard/`;

        const response = await API.get(url, {
          headers: {
            Authorization: `Bearer ${state.tokens?.access}`,
          },
        });

        setData(response.data as DashboardDataModel[]);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };
    getCategoricalData();
  }, [state, setCategories]);


  const lineChartOptions: ApexOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: true,
      },
    },
    series: [
      {
        name: "Series 1",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  };

  const pieChartOptions: ApexOptions = {
    chart: {
      width: 250,
      type: "donut",
      zoom: {
        enabled: true,
      },
    },
    plotOptions: {
      pie: {
        // startAngle: -90,
        // endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      colors: ["#0143F6", "#6291AE", "#010000"],
    },
    labels: ["SUSPICION", "GREY", "BLACK"],
    series: [30, 40, 35],
    title: {
      text: "Incident Status",
    },
    colors: ["blue", "grey", "black"],
    legend: {
      show: true,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // formatter: function (val, opts) {
      //   // return val + " - " + opts.w.globals.series[opts.seriesIndex]
      //   return val;
      // },
    },
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 p-2">
        <div className="flex flex-col shadow rounded p-2 h-auto">
          <h3 className="text-lg font-bold">Summary</h3>
          <hr className="my-1" />
          <div className="flex flex-col">
            <div className="flex justify-between">
              <p className="text-sm">Sfis</p>
              <p className="text-sm font-semibold">40</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <p className="text-sm">Incidents</p>
              <p className="text-sm font-semibold">40</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <p className="text-sm">Suspects</p>
              <p className="text-sm font-semibold">40</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <p className="text-sm">Transfer Requests</p>
              <p className="text-sm font-semibold">40</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col shadow rounded p-2 h-auto">
          <h3 className="text-md font-bold">Top SFIs </h3>
          <hr className="my-1" />
          <div className="flex flex-col">
            <div className="flex justify-between">
              <p className="text-sm">SFI 1</p>
              <p className="text-sm font-semibold">40</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <p className="text-sm">SFI 2</p>
              <p className="text-sm font-semibold">40</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col shadow rounded p-2 h-auto">
          <h5 className="text-md font-bold">Top Categories </h5>
          <hr className="my-1" />
          <div className="flex flex-col">
            <div className="flex justify-between">
              <p className="text-sm">Category</p>
              <p className="text-sm font-semibold">40</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <p className="text-sm">Category 2</p>
              <p className="text-sm font-semibold">40</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col shadow rounded p-2 h-auto">
          <h3 className="text-md font-bold">Top Sub Categories</h3>
          <hr className="my-1" />
          <div className="flex flex-col">
            <div className="flex justify-between">
              <p className="text-sm">Category</p>
              <p className="text-sm font-semibold">40</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <p className="text-sm">Category 2</p>
              <p className="text-sm font-semibold">40</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col shadow rounded p-2 h-auto">
          <h3 className="text-md font-bold">Top Months</h3>
          <hr className="my-1" />
          <div className="flex flex-col">
            <div className="flex justify-between">
              <p className="text-sm">Month 1</p>
              <p className="text-sm font-semibold">40</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <p className="text-sm">Month 2</p>
              <p className="text-sm font-semibold">40</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col shadow rounded p-2 h-auto">
          <h3 className="text-md font-bold">Top Years</h3>
          <hr className="my-1" />
          <div className="flex flex-col">
            <div className="flex justify-between">
              <p className="text-sm">Year 1</p>
              <p className="text-sm font-semibold">40</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <p className="text-sm">Year 2</p>
              <p className="text-sm font-semibold">40</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col border-blue-400 rounded">
          <div className="flex flex-col">
            <ReactApexChart
              options={pieChartOptions}
              series={pieChartOptions.series}
              type="donut"
              width={300}
            />
          </div>
        </div>
      </div>
      <div>
        <ReactApexChart
          options={lineChartOptions}
          series={lineChartOptions.series}
          type="line"
          height={250}
        />
      </div>

    </div>
  );
};

export default Dashboard;

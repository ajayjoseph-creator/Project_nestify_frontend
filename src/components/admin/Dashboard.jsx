import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axiosInstance from "../../api/axiosInstance";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get("/admin/stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("📊 Stats fetched:", res.data);
        setStats(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch admin stats:", err);
      }
    };

    fetchStats();
  }, []);

  const chartData = {
    labels: ["Users", "Properties", "Revenue"],
    datasets: [
      {
        label: "Admin Stats",
        data: [stats.totalUsers, stats.totalProperties, stats.totalRevenue],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Overall Stats" },
    },
  };

  return (
    <div className="grid grid-cols-4 gap-4 w-full p-6 dark:bg-[#121212] bg-white min-h-screen">
      {/* Cards */}
      <div className="col-span-1 bg-[#1e1e1e] text-white rounded-lg p-4 shadow-md flex flex-col justify-center items-center">
        <h2 className="text-lg">Total Users</h2>
        <p className="text-3xl font-bold">{stats.totalUsers}</p>
      </div>

      <div className="col-span-1 bg-[#1e1e1e] text-white rounded-lg p-4 shadow-md flex flex-col justify-center items-center">
        <h2 className="text-lg">Total Properties</h2>
        <p className="text-3xl font-bold">{stats.totalProperties}</p>
      </div>

      <div className="col-span-1 bg-[#1e1e1e] text-white rounded-lg p-4 shadow-md flex flex-col justify-center items-center">
        <h2 className="text-lg">Total Revenue</h2>
        <p className="text-3xl font-bold">₹{stats.totalRevenue}</p>
      </div>

      <div className="col-span-1 bg-[#1e1e1e] text-white rounded-lg p-4 shadow-md flex items-center justify-center">
        🚀 Welcome Admin!
      </div>

      {/* Chart */}
      <div className="col-span-2 bg-white dark:bg-[#1e1e1e] rounded-lg h-[400px] shadow-md p-4">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Placeholder for more stats */}
      <div className="col-span-2 bg-white dark:bg-[#1e1e1e] rounded-lg h-[400px] shadow-md p-4">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
          More analytics coming soon... 😎
        </h2>
      </div>
    </div>
  );
};

export default Dashboard;

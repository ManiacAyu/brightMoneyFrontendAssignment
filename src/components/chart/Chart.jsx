import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyBillingChart = () => {
  const [selectedYear, setSelectedYear] = useState("2020");
  const bills = useSelector((state) => state.bills);

  // Extract unique years from bills
  const years = [...new Set(bills.map((bill) => bill.date.split("-")[2]))];

  // Compute monthly expenses for the selected year
  const chartData = useMemo(() => {
    const monthlyExpenses = Array(12).fill(0);

    bills.forEach(({ amount, date }) => {
      const [day, month, year] = date.split("-");
      if (year === selectedYear) {
        monthlyExpenses[parseInt(month) - 1] += parseInt(amount);
      }
    });

    return {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: `Expenses in ${selectedYear}`,
          data: monthlyExpenses,
          borderColor: "rgba(75, 192, 192, 1)", // Teal color
          backgroundColor: "rgba(75, 192, 192, 0.2)", // Light teal fill
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "rgba(75, 192, 192, 1)", // Teal points
          pointBorderColor: "#fff", // White point borders
          pointHoverBackgroundColor: "#fff", // White on hover
          pointHoverBorderColor: "rgba(75, 192, 192, 1)", // Teal on hover
        },
      ],
    };
  }, [bills, selectedYear]);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Monthly Billing Chart
      </h2>

      {/* Year Selector */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="block appearance-none w-48 bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {/* Dropdown Arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex justify-center bg-white p-6 rounded-lg shadow-md">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default MonthlyBillingChart;
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// #region Data
const datasets = {
  week: [
    { label: "Mon", value: 40000 },
    { label: "Tue", value: 65000 },
    { label: "Wed", value: 48000 },
    { label: "Thu", value: 58000 },
    { label: "Fri", value: 82400 },
    { label: "Sat", value: 67000 },
    { label: "Sun", value: 27000 },
  ],
  month: [
    { label: "W1", value: 210000 },
    { label: "W2", value: 340000 },
    { label: "W3", value: 290000 },
    { label: "W4", value: 410000 },
  ],
  year: [
    { label: "Jan", value: 320000 },
    { label: "Feb", value: 410000 },
    { label: "Mar", value: 380000 },
    { label: "Apr", value: 520000 },
    { label: "May", value: 490000 },
    { label: "Jun", value: 600000 },
    { label: "Jul", value: 570000 },
    { label: "Aug", value: 640000 },
    { label: "Sep", value: 610000 },
    { label: "Oct", value: 700000 },
    { label: "Nov", value: 680000 },
    { label: "Dec", value: 750000 },
  ],
};
// #endregion


const formatValue = (v) =>
  v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v.toString();

const periods = [
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
  { key: "year", label: "This Year" },
];
// #endregion

// #region Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 text-white text-sm rounded-lg px-4 py-3 shadow-lg">
      <p className="font-medium mb-1">{label}</p>
      <p className="text-orange-400 font-semibold">
        EGP {payload[0].value.toLocaleString()}
      </p>
    </div>
  );
};
// #endregion

// #region Main Component
const SalesOverview = () => {
  const [period, setPeriod] = useState({ key: "week", label: "This Week" });
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const data = datasets[period.key];

  return (
    <div className="bg-white rounded-lg h-75 max-h-57.5  border grow border-gray-100 p-3 w-full 2xl:w-[40%] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-base font-semibold text-gray-800">
          Sales Overview
        </h2>
        <div
          className="text-sm! drop-down-list min-w-25 justify-between!"
          onClick={(e) => setDropDownOpen((prev) => !prev)}
        >
          <p className="current_option ">{period.label}</p>
          <FaAngleDown />
          {dropDownOpen && (
            <div className="options fade-in-aminate z-20">
              {periods.map((p) => (
                <span onClick={(e) => setPeriod(p)} key={p.key}>
                  {p.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%" className="grow">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EA580C" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#EA580C" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f1f5f9"
            vertical={false}
          />

          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            dy={8}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            tickFormatter={formatValue}
            dx={-10}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#EA580C",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#EA580C"
            strokeWidth={2}
            fill="url(#salesGradient)"
            dot={{ fill: "#EA580C", strokeWidth: 2, stroke: "#fff", r: 4 }}
            activeDot={{
              fill: "#EA580C",
              strokeWidth: 2,
              stroke: "#fff",
              r: 6,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
// #endregion

export default SalesOverview;

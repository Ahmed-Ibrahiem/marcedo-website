import { useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import useOutside_click from "../../../../Hooks/Outside_click";

const datasets = {
  week: [
    { name: "Delivered", value: 150, color: "#22C55E" },
    { name: "Processing", value: 45, color: "#F59E0B" },
    { name: "Pending", value: 30, color: "#A855F7" },
    { name: "Cancelled", value: 20, color: "#EF4444" },
  ],
  month: [
    { name: "Delivered", value: 520, color: "#22C55E" },
    { name: "Processing", value: 180, color: "#F59E0B" },
    { name: "Pending", value: 95, color: "#A855F7" },
    { name: "Cancelled", value: 65, color: "#EF4444" },
  ],
  year: [
    { name: "Delivered", value: 6200, color: "#22C55E" },
    { name: "Processing", value: 2100, color: "#F59E0B" },
    { name: "Pending", value: 980, color: "#A855F7" },
    { name: "Cancelled", value: 720, color: "#EF4444" },
  ],
};

const periods = [
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
  { key: "year", label: "This Year" },
];

const CenterLabel = ({ cx, cy, total }) => (
  <>
    <text
      x={cx}
      y={cy - 8}
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontSize: 24, fontWeight: 700, fill: "#1e293b" }}
    >
      {total}
    </text>
    <text
      x={cx}
      y={cy + 20}
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontSize: 13, fill: "#94a3b8" }}
    >
      Total
    </text>
  </>
);

const OrdersOverview = () => {
  const [period, setPeriod] = useState({ key: "week", label: "This Week" });
  const data = datasets[period.key];
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const total = data.reduce((s, d) => s + d.value, 0);
  const menuRef = useRef(null);

  useOutside_click(menuRef, () => setDropDownOpen(false));

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-3 2xl:w-[30%] min-w-70 lg:min-w-100 max-h-57.5">
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-base font-semibold text-gray-800">
          Orders Overview
        </h2>
        <div
          ref={menuRef}
          className="text-sm! drop-down-list min-w-25 justify-between! "
          onClick={(e) => setDropDownOpen((prev) => !prev)}
        >
          <p className="current_option ">{period.label}</p>
          <FaAngleDown className={`${dropDownOpen ? "-rotate-90!" : ""}`} />
          {dropDownOpen && (
            <div className="options fade-in-aminate z-20 fade-in-animate">
              {periods.map((p) => (
                <span onClick={(e) => setPeriod(p)} key={p.key}>
                  {p.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex items-center flex-col sm:flex-row gap-5">
        {/* Donut */}
        <div className="w-42.5 h-42.5 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="90%"
                paddingAngle={3}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} stroke="none" />
                ))}

                {/* العدد والنص في المنتصف */}
                <CenterLabel cx={85} cy={85} total={total} />
              </Pie>

              <Tooltip
                formatter={(value, name) => [value, name]}
                contentStyle={{
                  borderRadius: 8,
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  fontSize: 13,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3 flex-1">
          {data.map((item) => {
            const pct = ((item.value / total) * 100).toFixed(1);
            return (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-gray-800">
                    {item.value.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-400">({pct}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
// #endregion

export default OrdersOverview;

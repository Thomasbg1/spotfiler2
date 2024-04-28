import "../assets/Chart.css";
import React from "react";
import { Pie, PieChart, Tooltip, Text, Cell } from "recharts";
import TenArtists from "./TenArtists";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Chart({ pie, artistToGenres, token }) {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload) {
      return (
        <div className="custom-tooltip">
          <Text className="text-chart">{`${payload[0].name} : ${payload[0].value}%`}</Text>
        </div>
      );
    }

    return null;
  };

  return (
    <body>
      <div className="recharts-wrapper">
        <h1 className="chart-title">Vos genres favoris</h1>

        <PieChart
          className="justify-content-center align-items-center"
          width={600}
          height={700}
        >
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={pie}
            cx={250}
            outerRadius={255}
            fill="#151718"
          >
            {pie.map((entry, index) => (
              <Cell fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={CustomTooltip} />
        </PieChart>

        <TenArtists artistToGenres={artistToGenres} token={token}>
          {" "}
        </TenArtists>
      </div>
    </body>
  );
}

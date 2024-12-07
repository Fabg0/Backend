import React from "react";
import { ResponsiveBar } from "@nivo/bar";

function ProductsChart({ data }) {
  
  const chartData = data.map((product) => ({
    name: product.name,
    stock: product.stock,
  }));

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveBar
        data={chartData}
        keys={["stock"]}
        indexBy="name"
        layout="horizontal"
        margin={{ top: 30, right: 30, bottom: 30, left: 100 }}
        padding={0.2}
        valueScale={{ type: "linear" }}
        colors="rgba(63, 81, 181, 0.5)" 
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 3, 
          tickPadding: 3,
          tickRotation: 0,
          legend: "Stock",
          legendPosition: "middle",
          legendOffset: 30,
          legendText: { fontSize: 10 }, // Fuente más pequeña
        }}
        axisLeft={{
          tickSize: 3,
          tickPadding: 3,
          tickRotation: 0,
          legend: "Producto",
          legendPosition: "middle",
          legendOffset: -70,
          legendText: { fontSize: 10 },
        }}
        labelSkipWidth={16}
        labelSkipHeight={16}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.4]],
        }}
        theme={{
          axis: {
            ticks: {
              line: { stroke: "#bbb", strokeWidth: 0.5 },
              text: { fontSize: 10, fill: "#666" }, 
            },
            legend: {
              text: { fontSize: 12, fill: "#888" }, 
            },
          },
        }}
        animate={true}
        motionStiffness={50}
        motionDamping={20}
      />
    </div>
  );
}

export default ProductsChart;

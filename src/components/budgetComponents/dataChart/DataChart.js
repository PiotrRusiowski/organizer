import React from "react";
import { connect } from "react-redux";
import { VictoryPie } from "victory";
const DataChart = ({ walletsList }) => {
  const data = [
    { x: "Cats", y: 50 },
    { x: "Dogs", y: 35 },
    { x: "B", y: 15 },
  ];

  const chartData = walletsList.map((wallet) => {
    const singleData = { x: wallet.walletName, y: wallet.walletBalance };
    return singleData;
  });

  const colorScale = ["tomato", "orange", "gold", "cyan", "navy"];

  return (
    <div style={{ width: "50%", height: "50%" }}>
      <VictoryPie data={chartData} colorScale={colorScale} />;
    </div>
  );
};

const mapStateToprops = (state) => ({
  walletsList: state.walletsList,
});

export default connect(mapStateToprops)(DataChart);

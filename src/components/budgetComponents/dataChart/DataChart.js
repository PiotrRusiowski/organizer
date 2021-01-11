import React from "react";
import { connect } from "react-redux";
import { VictoryPie } from "victory";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
const DataChart = ({ walletsList }) => {
  const data = [
    { x: "Cats", y: 50 },
    { x: "Dogs", y: 35 },
    { x: "B", y: 15 },
  ];
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const chartData = walletsList.map((wallet) => {
    const singleData = { x: wallet.walletName, y: wallet.walletBalance };
    return singleData;
  });

  const colorScale = ["tomato", "orange", "gold", "cyan", "navy"];

  return (
    <div style={{ width: "30%", height: "30%" }}>
      <Card className={classes.root}>
        <VictoryPie data={chartData} colorScale={colorScale} />
      </Card>
    </div>
  );
};

const mapStateToprops = (state) => ({
  walletsList: state.walletsList,
});

export default connect(mapStateToprops)(DataChart);

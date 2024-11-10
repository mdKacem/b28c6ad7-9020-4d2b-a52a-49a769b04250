// src/ColumnChart.js
import React, { Component } from "react";
import Chart from "react-apexcharts";

class ColumnChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData || [],
      chartOptions: props.chartOptions || {},
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // Update state if props change
    if (nextProps.chartData !== prevState.chartData || nextProps.chartOptions !== prevState.chartOptions) {
      return {
        chartData: nextProps.chartData,
        chartOptions: nextProps.chartOptions,
      };
    }
    return null;
  }

  render() {
    const { chartData, chartOptions } = this.state;

    // Check if data is available
    if (!chartData.length || !chartOptions) {
      return <div>No data available</div>;
    }

    return (
      <Chart
        options={chartOptions}
        series={chartData}
        type='bar'
        width='100%'
        height='100%'
      />
    );
  }
}

export default ColumnChart;
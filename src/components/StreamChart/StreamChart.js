import React, { Component } from 'react'
import Chart from "chart.js";
import classes from "./StreamChart.module.css";
let streamChart;

export default class StreamChart extends Component {
    chartRef = React.createRef();
    
    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }

    buildChart = () => {
        const myChartRef                = this.chartRef.current.getContext("2d");
        const { data, average, labels } = this.props;

        if (typeof streamChart !== "undefined") streamChart.destroy();

        streamChart = new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels  : labels,
                datasets: [
                    {
                        label      : "Sales",
                        data       : data,
                        fill       : true,
                        borderColor: "#6610f2"
                    },
                    {
                        label      : "National Average",
                        data       : average,
                        fill       : true,
                        borderColor: "#FF0000"
                    }
                ]
            },
            options: {
                //Customize chart options
            }
        });

    }

    render() {

        return (
            <div className={classes.graphContainer}>
                <canvas
                    id  = "myChart"
                    ref = {this.chartRef}
                />
            </div>
        )
    }
}
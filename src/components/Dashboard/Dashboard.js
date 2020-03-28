import React, { Component } from 'react'
import StreamChart from '../StreamChart/StreamChart';
import { managerData, yearLabels, nationalAverageData } from "../../mockData";
import classes from "./Dashboard.module.css";
export default class Dashboard extends Component {

    state = {
    data   : managerData,
    average: nationalAverageData,
    labels : yearLabels
    }
    render() {
        const { data, average, labels } = this.state;
        return (
            <div className={classes.container}>
            <header>
                {/* <img src={chartIcon} alt="bar chart icon" /> */}
                <h1>Stream Dashboard</h1>
            </header>
                <StreamChart
                    data    = {data}
                    average = {average}
                    labels  = {labels} />
            </div>
        )
    }
}

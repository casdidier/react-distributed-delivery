import React, { Component } from 'react'
import StackedAreaChart from '../Charts/StackedAreaChart';

import { convertUnixTimeToDate, convertUnixTimeToChartDate, convertToGbps } from '../../tools';
import classes from './Dashboard.module.css';

const mock =  [
    {date: 'date 1', p2p: 4000, cdn: 2400},
    {date: 'date 1', p2p: 3000, cdn: 1398},
    {date: 'date 1', p2p: 2000, cdn: 9800},
    {date: 'date 1', p2p: 2780, cdn: 3908},
    {date: 'date 1', p2p: 1890, cdn: 4800},
    {date: 'date 1', p2p: 2390, cdn: 3800},
    {date: 'date 1', p2p: 3490, cdn: 4300},
];



export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data         : mock,
            session_token: localStorage.getItem('session_token'),
            from         : 1584450601773,
            to           : 1585426201773,
            };

        this.retrieveData = this.retrieveData.bind(this)
    }
    retrieveData() {

        const body = {
            session_token: this.state.session_token,
            from         : this.state.from,
            to           : this.state.to,
        }

        fetch('http://wwww.localhost:3000/bandwidth', {
            method : 'POST',
            body   : JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                const error = new Error(res.error);
                throw error;
            }
            })
            .then(data => this.setState({data: this.transformData(data)}))
            .catch(err => {
            console.error(err);
            alert('Data could not be retrieved from server');
            })

    }

    transformData(bandwidthData) {
  
        const [cdnData, p2pData] = Object.values(bandwidthData);
        const transformedData    = [];
        
        for (var i=0; i<cdnData.length; i++) {
          const entry           = {};
                entry.humandate = convertUnixTimeToDate(cdnData[i][0]);
                entry.chartDate = convertUnixTimeToChartDate(cdnData[i][0]);
                entry.cdn       = convertToGbps(cdnData[i][1]);
                entry.p2p       = convertToGbps(p2pData[i][1]);
          
          transformedData.push(entry);
        }

        return transformedData;
    }

    render() {
        const { data } = this.state;
        return (
            <div className={classes.container}>
            <header>
                {/* <img src={chartIcon} alt="bar chart icon" /> */}
                <h1>Stream Dashboard</h1>
            </header>
                <StackedAreaChart data = {data}/>
                <button onClick={this.retrieveData}></button>
            </div>
        )
    }
}

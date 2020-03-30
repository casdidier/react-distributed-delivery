import React, { Component } from 'react'
import StackedAreaChart from '../Charts/StackedAreaChart';
import SimpleLineChart from '../Charts/SimpleLineChart';
import TinyAreaChart from '../Charts/TinyAreaChart';
import DatePicker from "react-datepicker";
import { convertUnixTimeToDate, convertUnixTimeToChartDate,
     convertToGbps, convertDateToUnixTimestamp } from '../../tools';
 
import classes from "./Dashboard.module.css";
import "react-datepicker/dist/react-datepicker.css";

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bandwidthData: [],
            audienceData : [],
            session_token: localStorage.getItem('session_token'),
            from         : new Date().getTime() - 15*86400000,      // date 15 days before
            to           : Date.now(),
            startDate    : new Date(),
            endDate      : new Date(),
            };

        this.retrieveData = this.retrieveData.bind(this)
    }

    retrieveBandwidthData = () => this.retrieveData('http://wwww.localhost:3000/bandwidth', this.transformBandwidthData, 'bandwidthData');
    retrieveAudienceData  = () => this.retrieveData('http://wwww.localhost:3000/audience', this.transformDataAudience, 'audienceData');

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.retrieveBandwidthData();
        this.retrieveAudienceData();
    }
    
    
    retrieveData(URL, transform, dataLabel) {

        const body = {
            session_token: this.state.session_token,
            from         : this.state.from,
            to           : this.state.to,
        }

        fetch(URL, {
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
            .then(data => {
                let       stateData  = {};
                stateData[dataLabel] = transform(data);
                this.setState(stateData)})
            .catch(err => {
            console.error(err);
            alert('Data could not be retrieved from server');
            })

    }

    transformBandwidthData(data) {
  
        const [cdnData, p2pData] = Object.values(data);
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

    transformDataAudience(data) {
  
        const audienceData    = Object.values(data)[0];
        const transformedData = [];
        
        for (var i=0; i<audienceData.length; i++) {
          const entry           = {};
                entry.humandate = convertUnixTimeToDate(audienceData[i][0]);
                entry.chartDate = convertUnixTimeToChartDate(audienceData[i][0]);
                entry.viewers   = audienceData[i][1];
          
          transformedData.push(entry);
        }
        return transformedData;
    }

    handleChangeStartDate = date => {
        this.setState({
          from: convertDateToUnixTimestamp(date)
        });
        this.fetchData();
      };

    handleChangeEndDate = date => {
        this.setState({
            to: convertDateToUnixTimestamp(date)
        });
        this.fetchData();
    };

    render() {
        const { audienceData, bandwidthData } = this.state;
        return (
            <div>
                <h1>Stream Dashboard</h1>
                <StackedAreaChart data = {bandwidthData}/>
                <SimpleLineChart data={audienceData}/>
                <div className = {classes.containerTiny}>
                    <DatePicker
                        selected = {this.state.from}
                        onChange = {this.handleChangeStartDate}
                    />
                    <TinyAreaChart data={bandwidthData}/>
                    <DatePicker
                        selected = {this.state.to}
                        onChange = {this.handleChangeEndDate}
                    />
                </div>
                {/* <button onClick={this.retrieveBandwidthData}></button>
                <button onClick={this.retrieveAudienceData}></button> */}
            </div>
        )
    }
}

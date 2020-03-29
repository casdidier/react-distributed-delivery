import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

const StackedAreaChart = ({data}) => {
  	return (
    	<AreaChart width={600} height={400} data={data}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="chartDate"/>
        <YAxis/>
        <Tooltip/>
        <Area type='monotone' dataKey='p2p' stackId="1" stroke='#8884d8' fill='#8884d8' />
        <Area type='monotone' dataKey='cdn' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
      </AreaChart>
    );
  }

export default StackedAreaChart


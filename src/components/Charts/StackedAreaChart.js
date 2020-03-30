import React from 'react'

import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,ReferenceLine
} from 'recharts';

const maxBandwidth = (data, typeData) => Math.max.apply(Math, data.map(function(o) { return o[typeData]; }));

const maxThroughput = (data) => maxBandwidth(data, 'cdn') + maxBandwidth(data, 'p2p');

const StackedAreaChart = ({data}) => {
  	return (
      <ResponsiveContainer width='100%' height={300}> 
        <AreaChart data={data}
              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="chartDate"/>
          <YAxis/>
          <ReferenceLine y={maxBandwidth(data, 'cdn')} label={`Max CDN contribution ${maxBandwidth(data, 'cdn')}Gbps`} stroke="#9A193E"/>
          <ReferenceLine y={maxBandwidth(data, 'p2p')} label={`Max throughput ${maxThroughput(data)}Gbps`} stroke="#3FCB7E"/>
          <Tooltip/>
          <Area type='monotone' dataKey='cdn' stackId="1" stroke='#9A193E' fill='#C42151' />
          <Area type='monotone' dataKey='p2p' stackId="1" stroke='#C9EDD9' fill='#3FCB7E' />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

export default StackedAreaChart


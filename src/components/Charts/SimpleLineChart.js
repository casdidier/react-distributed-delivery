import React from 'react'

import {
    LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';

  
const SimpleLineChart = ({data}) =>  {
    
      return (
        <ResponsiveContainer width='100%' height={300}> 
            <LineChart
            width  = {500}
            height = {300}
            data   = {data}
            margin = {{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
            >
            <XAxis dataKey="chartDate" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="viewers" stroke="#DDA02A" />
            </LineChart>
        </ResponsiveContainer>
      );
  }

  export default SimpleLineChart
  
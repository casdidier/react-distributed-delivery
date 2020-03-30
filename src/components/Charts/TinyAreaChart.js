import React from 'react'

import {
    AreaChart, Area, ResponsiveContainer
} from 'recharts';

const TinyAreaChart = ({data}) => {
  	return (
        <ResponsiveContainer width='60%' height={50}>
            <AreaChart width={200} height={60} data={data}
                margin={{top: 5, right: 0, left: 0, bottom: 5}}>
            <Area type='monotone' dataKey='p2p' stroke='#8884d8' fill='#8884d8' />
        </AreaChart>
      </ResponsiveContainer>
    );
};

export default TinyAreaChart
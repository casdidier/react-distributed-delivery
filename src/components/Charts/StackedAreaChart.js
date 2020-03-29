import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const renderTooltipContent = (o) => {
	const { payload, label } = o;
  // console.log(JSON.stringify(payload, null, 4));
  const humanDate = payload.humanDate;
  
  return (
  	<div className="customized-tooltip-content">
    	{/* <p className="date">{`${label} (${humanDate})`}</p> */}
      <p className="total">{`${label} ${humanDate}`}</p>
      <ul className="list">
      	{
        	payload.map((entry, index) => (
          	<li key={`item-${index}`} style={{color: entry.color}}>
            	{`${entry.name}: ${entry.value}`}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

const StackedAreaChart = ({data}) => {
  	return (
      <ResponsiveContainer width='100%' height={300} background-color={"#000000"}> 
        <AreaChart data={data}
              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="chartDate"/>
          <YAxis/>
          <Tooltip content={renderTooltipContent}/>
          <Area type='monotone' dataKey='p2p' stackId="1" stroke='#8884d8' fill='#8884d8' />
          <Area type='monotone' dataKey='cdn' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

export default StackedAreaChart


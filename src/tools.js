export const convertUnixTimeToDate = (unixTimestamp) => {
    const humanDateFormat = new Date(unixTimestamp).toLocaleString()
 
    return humanDateFormat;
}

export const convertUnixTimeToChartDate = (unixTimestamp) => {
    const dateObject = new Date(unixTimestamp);

    const humanDateFormats = (args) => dateObject.toLocaleString(args);
 
    const chartDate = 
            `${humanDateFormats({day: "numeric"}).substr(0,5)}`
    return chartDate;
}

export const convertToGbps = (bps) => parseFloat((bps*Math.pow(10,-9)).toFixed(2));

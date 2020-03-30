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

export const retrieveData = (URL, tranformData, state = {session_token : 0, from : 0, to : 0}) => {
    const body = {
        session_token: state.session_token,
        from         : state.from,
        to           : state.to,
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
        .then(data => this.setState({data: tranformData(data)}))
        .catch(err => {
        console.error(err);
        alert('Data could not be retrieved from server');
        })

}
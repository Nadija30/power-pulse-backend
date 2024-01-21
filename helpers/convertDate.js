const isDatePastOrToday = (incommigDateString) => {
    const incommigDate = new Date(Date.parse(incommigDateString));
    
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf()

    const incomming = incommigDate.valueOf()

    console.log(incomming, today)

    return (incomming <= today + 86400000); // 24*60*60*1000 earlier then tomorrow
}

module.exports = isDatePastOrToday;


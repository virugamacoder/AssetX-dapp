export const chartData = [
    ["Date", "Low", "Open", "Close", "High"],
    [new Date(2024, 0, 1), 20, 28, 25, 30],
    [new Date(2024, 0, 2), 28, 25, 22, 29],
    [new Date(2024, 0, 3), 22, 30, 28, 35],
    [new Date(2024, 0, 4), 26, 31, 30, 34],
    [new Date(2024, 0, 5), 25, 34, 32, 36],
    [new Date(2024, 0, 6), 30, 32, 33, 37],
    [new Date(2024, 0, 7), 31, 33, 35, 38],
    [new Date(2024, 0, 8), 34, 35, 34, 40],
    [new Date(2024, 0, 9), 32, 34, 36, 39],
    [new Date(2024, 0, 10), 30, 36, 32, 35],
    [new Date(2024, 0, 11), 32, 45, 60, 80],
    [new Date(2024, 0, 12), 35, 38, 39, 60],
    [new Date(2024, 0, 13), 30, 36, 32, 35],
    [new Date(2024, 0, 14), 30, 36, 32, 35],
    [new Date(2024, 0, 15), 30, 36, 32, 35],
    [new Date(2024, 0, 16), 32, 34, 36, 39],
    [new Date(2024, 0, 17), 30, 36, 32, 35],
    [new Date(2024, 0, 18), 32, 69, 80, 100],
    [new Date(2024, 0, 19), 35, 38, 39, 60],
    [new Date(2024, 0, 20), 30, 36, 32, 35],
    [new Date(2024, 0, 21), 20, 28, 25, 30],
    [new Date(2024, 0, 22), 28, 25, 22, 29],
    [new Date(2024, 0, 23), 22, 30, 28, 35],
    [new Date(2024, 0, 24), 26, 31, 30, 34],
    [new Date(2024, 0, 25), 25, 34, 32, 36],
    [new Date(2024, 0, 26), 30, 32, 33, 37],
    [new Date(2024, 0, 27), 31, 33, 35, 38],
    [new Date(2024, 0, 28), 34, 35, 34, 40],
    [new Date(2024, 0, 29), 32, 34, 36, 39],
    [new Date(2024, 0, 30), 30, 36, 32, 35],
    [new Date(2024, 0, 31), 30, 36, 32, 35],

];

export const chartOptions = {
    legend: "none",
    backgroundColor: '#121212',
    bar: { groupWidth: "50%" }, // Remove space between bars.
    candlestick: {
        fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
        risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
    },
    hAxis: {
        title: 'Date',
        textStyle: { color: '#DDDDDD' },
        gridlines: { color: '#121212' }, // Hide x-axis gridlines
    },
    vAxis: {
        title: 'Price',
        textStyle: { color: '#DDDDDD' },
        gridlines: { color: '#121212' }, // Hide x-axis gridlines
        // gridlines: { count: 0 }, // Hide y-axis gridlines
    },
    titleTextStyle: {
        color: '#FFFFFF', // White title text
    },
};
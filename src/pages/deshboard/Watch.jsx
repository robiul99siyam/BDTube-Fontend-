import { useEffect, useState } from 'react';
import { CChart } from '@coreui/react-chartjs';

const Watch = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        fetch("http://127.0.0.1:8000/netfiex/videoWatch/")
            .then(response => response.json())
            .then(data => {
                console.log('API Data:', data); // Inspect the data

                const labels = data.map(item => new Date(item.start_time).toLocaleDateString()); // Adjust if necessary
                const watchTimes = data.map(item => parseFloat(item.watch_time.replace(':', '-')) || 0); // Convert to a number

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: "Watch Time",
                            backgroundColor: "rgba(151, 187, 205, 0.2)",
                            borderColor: "rgba(151, 187, 205, 1)",
                            pointBackgroundColor: "rgba(151, 187, 205, 1)",
                            pointBorderColor: "#fff",
                            data: watchTimes,
                        },
                    ],
                });
            })
            .catch(err => console.error('Error fetching watch time data:', err));
    }, []);

    return (
        <>
            <h1 className="text-center text-3xl font-bold pb-5">Watch Time Visualization</h1>
            <CChart
                type="line"
                data={chartData}
                options={{
                    plugins: {
                        legend: {
                            labels: {
                                color: '#000', // Label color
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: '#ccc', // Grid line color
                            },
                            ticks: {
                                color: '#000', // Tick label color
                            },
                        },
                        y: {
                            grid: {
                                color: '#ccc', // Grid line color
                            },
                            ticks: {
                                color: '#000', // Tick label color
                            },
                        },
                    },
                }}
            />
        </>
    );
}

export default Watch;

import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
    const chartRef = React.useRef<null>(null);

    React.useEffect(() => {
        const d = chartRef.current;
        return () => {
            if (d) {
                (d as any).destroy!();
            }
        };
    }, []);

    const data = {
        labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        datasets: [
            {
                label: 'Daily Average',
                data: [30, 45, 60, 50, 70, 45, 30],
                backgroundColor: 'rgba(33, 150, 243, 0.5)',
                borderColor: 'rgba(33, 150, 243, 1)',
                borderWidth: 1,
            },
        ],
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#000', // or any color you need
                    stepSize: 1,
                },
                grid: {
                    display: false,
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#000', // or any color you need
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <Box>
            <Box>
                <Typography variant="h5" component="h2">
                    Daily Average
                </Typography>
                <Typography variant="h6">
                    1h 25m
                </Typography>
                <Typography color="textSecondary">
                    ↑ 47% from last week
                </Typography>
                <Bar data={data} options={options} ref={chartRef} />
                <Typography color="textSecondary">
                    Updated today 11:26
                </Typography>
            </Box>
        </Box>
    );
};

export default BarChart;

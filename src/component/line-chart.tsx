import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Box } from '@mui/material';
import { format } from 'date-fns';

Chart.register(...registerables);

interface LineChartData {
    date: string;
    value: number;
}

interface LineChartProps {
    data: LineChartData[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
    const chartData = {
        labels: data.map(d => format(d.date, 'ccccc')),
        datasets: [
            {
                label: 'Value',
                data: data.map(d => d.value),
                fill: false,
                backgroundColor: 'rgb(33, 150, 243)',
                borderColor: 'rgba(33, 150, 243, 0.5)',
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                min: 0,
                max: 1.0,
                border: {
                    display: false,
                },
                ticks: {
                    display: false,
                    maxTicksLimit: 2,
                },
                grid: {
                    display: true,
                }
            },
            x: {
                border: {
                    display: false,
                },
                ticks: {

                },
                grid: {
                    display: false,
                }
            }
        },
        plugins: {
            legend: {
                display: false,
            }
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <Box>
            <Line data={chartData} options={chartOptions} />
        </Box>
    );
};

export default LineChart;

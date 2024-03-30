import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
//import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Header from '../component/header';
import { auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { DailyStats, Wellness } from '../model';
import * as api from '../api';
import WellnessWheel from '../component/wellness';

Chart.register(...registerables);
//ChartJS.register(ArcElement, Tooltip, Legend);

const StatsPage: React.FC = () => {
    const [dailyStats, setDailyStats] = React.useState([] as DailyStats[]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            console.log(user);
            if (!user) {
                return;
            }
            const dailyStats = await api.getDailyStats(user.uid);
            setDailyStats(dailyStats)
        })();
    }, [user, navigate]);

    const wellness = {
        social: .7,
        financial: .4,
        emotional: .48,
        physical: .82,
        spiritual: .95,
        intellectual: .65,
    };

    return (
        <Box>
            <Header title="Stats" />
            <Box sx={{ pt: 15, mx: 2 }}>
                <Typography variant="h1">Stats</Typography>
                {dailyStats.length > 0 && (<WellnessWheel wellness={dailyStats[0].wellness} />)}
                
            </Box>
            {/*
            <Box>
                <BarChart />
            </Box>
            */}
        </Box>
    );
};

const BarChart = () => {
    const chartRef = useRef<null>(null);

    useEffect(() => {
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

export default StatsPage;

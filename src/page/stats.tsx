import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
//import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Header from '../component/header';

Chart.register(...registerables);
//ChartJS.register(ArcElement, Tooltip, Legend);

type Wellness = {
    social: number,
    financial: number,
    emotional: number,
    physical: number,
    spiritual: number,
    intellectual: number,
};
const StatsPage: React.FC = () => {
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
                <WellnessWheel wellness={wellness} />
            </Box>
            <Box>
                <BarChart />
            </Box>
        </Box>
    );
};

const WellnessWheel: React.FC<{ wellness: Wellness | undefined }> = ({ wellness }) => {
    const colors: Record<string, string> = {
        emotional: 'rgba(120, 111, 170, OPACITY)',    // emotionalの色
        physical: 'rgba(170, 87, 153, OPACITY)',     // physicalの色
        social: 'rgba(109, 175, 88, OPACITY)',      // socialの色
        spiritual: 'rgba(241, 150, 91, OPACITY)',   // spiritualの色
        financial: 'rgba(93, 181, 249, OPACITY)',    // financialの色
        intellectual: 'rgba(231, 187, 76, OPACITY)' // intellectualの色
    };

    const angles: Record<string, number> = {
        emotional: 0,
        physical: 60,
        social: 120,
        spiritual: 180,
        financial: 240,
        intellectual: 300
    };

    // ウェルネスオブジェクトの値に基づいて透明度を設定

    if (wellness === undefined) {
        return <Box sx={{ w: 200, h: 200 }}></Box>;
    }

    const gradArr = Object.entries(wellness).splice(0, 6).map(([key, value]) =>
        `${angles[key]}deg, ${colors[key].replace('OPACITY', '0')} ${25 * (1 - value) + 45}%, ${colors[key].replace('OPACITY', '1')} ${45 * (1 - value) + 55}%`);
    const gradient = gradArr.map(grad => `linear-gradient(${grad})`).join(',');
    console.log(gradArr);

    // インラインスタイルでウェルネスホイールを定義
    const wheelStyle = {
        borderRadius: '50%',
        backgroundImage: gradient,
        backgroundBlendMode: 'hard-light',
    };

    return <>
        <ul style={{ padding: 0 }}>
            {Object.entries(wellness || {}).map(([key, value]) => (
                <li key={key} style={{ listStyleType: 'none', margin: '8px 0' }}>
                    {`${key}: ${value}`}
                    <div style={{ background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                            background: colors[key].replace('OPACITY', '1   '),
                            width: `${value * 100}%`,
                            height: '10px',
                            borderRadius: '4px'
                        }} />
                    </div>
                </li>
            ))}
        </ul>
        <Box sx={{ width: 200, height: 200, mx: 'auto' }} style={wheelStyle}></Box>
    </>;
};

const BarChart = () => {
    const chartRef = useRef<null>(null);

    useEffect(() => {
        // コンポーネントのアンマウント時にチャートを破棄する
        return () => {
            if (chartRef.current) {
                (chartRef.current as any).destroy!();
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

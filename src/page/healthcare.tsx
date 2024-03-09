import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import Header from '../component/header';

type Wellness = {
    social: number,
    financial: number,
    emotional: number,
    physical: number,
    spiritual: number,
    intellectual: number,
};
type Output = {
    message: string;
    wellness: Wellness | undefined;
}
const OutputNull: Output = {
    message: '',
    wellness: undefined,
}
const HealthcarePage: React.FC = () => {
    const [input1, setInput1] = useState('');
    const [output, setOutput] = useState(OutputNull);

    const handleApiCall = async () => {
        const baseUrl = 'https://cykubbplcd.execute-api.us-west-2.amazonaws.com/Prod';
        try {
            const response = await axios.post(`${baseUrl}/healthcare-gpt/generic`, {
                message: input1,
                type: 'talk',
            });
            setOutput((prev: Output) => ({ ...prev, ...{ message: response.data.message } }));

            const response2 = await axios.post(`${baseUrl}/healthcare-gpt/generic`, {
                message: input1,
                type: 'wellness',
            });
            setOutput((prev: Output) => ({ ...prev, ...{ wellness: response2.data.wellness } }));
            setTimeout(() => console.log(output), 1000);
        } catch (error) {
            console.error('API call failed:', error);
            setOutput((prev: Output) => { prev.message = 'Error calling API'; return prev });
        }
    };

    return (
        <Box>
            <Header title="Wellness" />
            <Box sx={{ m: 2 }}>
                <Typography variant="h1">Try it out.</Typography>
                <Box sx={{ my: 2 }}>
                    <TextField
                        label="Input"
                        variant="outlined"
                        value={input1}
                        onChange={(e) => setInput1(e.target.value)}
                        fullWidth
                        multiline
                        rows={8}
                        maxRows={12}
                        margin="normal"
                    />
                    <Button variant="contained" onClick={handleApiCall} sx={{ my: 2 }}>
                        query
                    </Button>
                    <TextField
                        label="Output"
                        variant="outlined"
                        value={output.message}
                        fullWidth
                        multiline
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Box>
            </Box>
            <Box sx={{ m: 2 }}>
                <WellnessWheel wellness={output.wellness} />
            </Box>
        </Box>
    );
};

const WellnessWheel: React.FC<{ wellness: Wellness | undefined }> = ({ wellness }) => {
    // 各領域の色を定義
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
    const getOpacity = (value: number): number => (value - .5) * 2;;//1-value;
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

export default HealthcarePage;

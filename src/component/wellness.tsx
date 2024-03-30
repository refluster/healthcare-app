import * as React from 'react';
import { Box } from '@mui/material';
import { Wellness } from '../model';

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

    if (wellness === undefined) {
        return <Box sx={{ w: 200, h: 200 }}></Box>;
    }

    const gradArr = Object.entries(wellness).splice(0, 6).map(([key, value]) =>
        `${angles[key]}deg, ${colors[key].replace('OPACITY', '0')} ${25 * (1 - value) + 45}%, ${colors[key].replace('OPACITY', '1')} ${45 * (1 - value) + 55}%`);
    const gradient = gradArr.map(grad => `linear-gradient(${grad})`).join(',');
    console.log(gradArr);

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
                    <div style={{ background: '#eee', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{
                            background: colors[key].replace('OPACITY', '1   '),
                            width: `${value * 100}%`,
                            height: 6,
                            borderRadius: 3
                        }} />
                    </div>
                </li>
            ))}
        </ul>
        <Box sx={{ width: 140, height: 140, mx: 'auto' }} style={wheelStyle}></Box>
    </>;
};

export default WellnessWheel;

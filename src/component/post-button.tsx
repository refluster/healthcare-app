import * as React from 'react';
import { Box, IconButton, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
}

const PostButton: React.FC<MyComponentProps> = (props) => {
    const openPostScreen = () => {
        console.log('open screen');
    }

    return (<Paper elevation={4} {...props} sx={{
        display: 'inline-flex',
        borderRadius: '50%',
    }}>
        <IconButton size="large" aria-label="write" color="primary" onClick={openPostScreen} sx={{
            color: 'white',
            backgroundColor: 'primary.main',
            '&:hover': {
                backgroundColor: 'primary.dark',
            },
        }}>
            <AddIcon fontSize="inherit" />
        </IconButton>
    </Paper>)
}

export default PostButton;

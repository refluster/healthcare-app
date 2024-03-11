import * as React from 'react';
import { Drawer, IconButton, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PostPage from '../page/post';

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
}

const PostButton: React.FC<MyComponentProps> = (props) => {
    const [openPostUI, setOpenPostUI] = React.useState(false);

    const openPostScreen = () => {
        //navigate('/post');
        toggleDrawer(true);
        console.log('open screen -> post');
    }

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpenPostUI(newOpen);
    };

    return (
        <>
            <Paper elevation={4} {...props} sx={{
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
            </Paper>
        </>
    );
}

export default PostButton;

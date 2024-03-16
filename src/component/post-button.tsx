import * as React from 'react';
import { Drawer, IconButton, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PostPage from '../page/post';

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
    onPostClicked: (text: string) => void;
}

const PostButton: React.FC<MyComponentProps> = ({ onPostClicked, ...props }) => {
    const [openPostUI, setOpenPostUI] = React.useState(false);

    const openPostScreen = () => {
        setOpenPostUI(true);
    }

    const close = () => {
        setOpenPostUI(false);
    }

    const deliverPostAndClose = (text: string) => {
        setOpenPostUI(false);
        onPostClicked(text);
        console.log(text);
    }

    return (
        <>
            <Drawer open={openPostUI} anchor="bottom" onClose={close} sx={{
                width: '100vw',
                '& .MuiDrawer-paper': {
                    width: '100vw',
                    height: '100vh',
                },
            }}>
                <PostPage onCloseScreen={close} onPostClicked={deliverPostAndClose} />
            </Drawer>
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

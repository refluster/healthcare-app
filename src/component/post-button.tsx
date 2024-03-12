import * as React from 'react';
import { Drawer, IconButton, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PostPage from '../page/post';

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
    onPostClicked: (text: string) => void;
}

const PostButton: React.FC<MyComponentProps> = ({onPostClicked, ...props}) => {
    const [openPostUI, setOpenPostUI] = React.useState(false);

    const openPostScreen = () => {
        setOpenPostUI(true);
    }
    const togglePostScreen = (open: boolean) => () => {
        setOpenPostUI(open);
    }

    const getPostText = (text: string) => {
        onPostClicked(text);
        console.log(text);
        togglePostScreen(false);
    }

    return (
        <>
            <Drawer open={openPostUI} anchor="bottom" onClose={togglePostScreen(false)} sx={{
                width: '100vw',
                '& .MuiDrawer-paper': {
                    width: '100vw',
                    height: '100vh',
                },
            }}>
                <PostPage onCloseScreen={togglePostScreen(false)} onPostClicked={getPostText} />
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

import * as React from 'react';
import { Drawer, IconButton, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PostPage from '../page/post';

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
}

const PostButton: React.FC<MyComponentProps> = (props) => {
    const [openPostUI, setOpenPostUI] = React.useState(false);

    const openPostScreen = () => {
        setOpenPostUI(true);
    }
    const togglePostScreen = (open: boolean) => () => {
        setOpenPostUI(open);
    }

    return (
        <>
            <Drawer open={openPostUI} anchor="bottom" onClose={togglePostScreen(false)} sx={{
                width: '100vw', // 画面の幅全体にする
                '& .MuiDrawer-paper': {
                    width: '100vw', // ドロワーのPaperコンポーネントも画面幅全体にする
                    height: '100vh', // 画面の高さ全体にする
                },
            }}>
                <PostPage onCloseScreen={togglePostScreen(false)} />
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

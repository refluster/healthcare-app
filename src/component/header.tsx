import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Divider, Drawer, Link, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { grey } from '@mui/material/colors';
import HomeIcon from '@mui/icons-material/Home';
import TimelineIcon from '@mui/icons-material/Timeline';
//import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';

interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
}

function ListItemLink(props: ListItemLinkProps) {
    const { icon, primary, to } = props;
    return (
        <li>
            <ListItem component={Link} href={to}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

export default function Header(props: { title: string }) {
    const [user] = useAuthState(auth);
    const [drawerState, setDrawerState] = React.useState(false);
    //const [user, setUser] = React.useState(null) as any;
    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setDrawerState(open);
    };
    React.useEffect(() => {
        (async () => {
        })();
    }, []);
    const links = [
        { title: 'Home', url: '/', icon: <HomeIcon /> },
        { title: 'Stats', url: '/stats', icon: <TimelineIcon /> },
        { title: 'Profile', url: '/profile', icon: <PersonIcon /> },
    //    { title: 'Wellness', url: '/healthcare', icon: <ArticleIcon /> },
    ];
    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListSubheader>
                    wellness app
                </ListSubheader>
                {links.map((link) => (
                    <ListItemLink key={link.url} to={link.url} primary={link.title} icon={link.icon} />
                ))}
            </List>
            <Divider />
        </Box>
    );

    return (
        <Box sx={{ 
            maxWidth: 420,
            mx: 'auto',
            flexGrow: 1,
            width: '100%',
            position: 'fixed',
            borderBottom: '1px solid #eee',
            zIndex: 10,
        }}>
            <AppBar position="static" elevation={0} sx={{ color: grey[900], backgroundColor: grey[50] }}>
                <Toolbar>
                    <Box onClick={toggleDrawer(true)} sx={{
                        backgroundColor: '#888',
                        backgroundImage: `url(${user?.photoURL || ''})`,
                        backgroundSize: 'contain',
                        width: 40, height: 40,
                        borderRadius: '50%',
                        mr: 2,
                    }} />
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        {props.title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={drawerState}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </Box>
    );
}

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Divider, Drawer, Link, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { grey } from '@mui/material/colors';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, provider } from '../lib/firebase';
import { getAuth } from '@firebase/auth';

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
            /*
            const auth = getAuth();
            console.log(auth);
            setUser(auth?.currentUser);
            console.log(auth?.currentUser?.photoURL);
            */
        })();
    }, []);
    const links = [
        { title: 'Home', url: '/', icon: <HomeIcon /> },
        { title: 'Wellness', url: '/healthcare', icon: <ArticleIcon /> },
        { title: 'Setting', url: '/config', icon: <SettingsIcon /> },
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
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: grey[50] }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <img src={user?.photoURL || ''} style={{
                            width: 40, height: 40,
                            borderRadius: '50%'
                        }} />
                    </IconButton>
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

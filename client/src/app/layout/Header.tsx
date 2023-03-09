import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import Switch from "@mui/material/Switch/Switch";
import { NavLink } from "react-router-dom";
/*In this particular code example, the Props interface is defining the expected shape of the 
props object that will be passed to the Header component. Specifically, the Props interface 
defines that the props object should have two properties:

darkMode of type boolean
handleThemeChange of type () => void, 

which is a function that takes no arguments and returns void
By defining this interface, we can ensure that any code that uses the Header component 
is passing in the expected props with the correct types. This can help catch errors at compile 
time and make our code more reliable. */

const midLinks = [
    {title: 'catalog', path: '/catalog'},
    {title: 'about', path: '/about'},
    {title: 'contact', path: '/contact'}
]

const rightLinks = [
    {title: 'login', path: '/login'},
    {title: 'register', path: '/register'}
]

const navStyles = {
    color: 'inherit', 
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.400'
    },
    '&.active': {
    color: 'text.secondary'
    }
}

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

/*In this file, export default is used to export a single component as the default export 
of the module. Specifically, the Header component defined in this file is being exported as 
the default export.*/ 
export default function Header({darkMode, handleThemeChange}: Props) { //the function handleThemeChange() toggles the darkMode state between true and 
    return (                                                           //false every time it's called.
        <AppBar position='static' sx={{mb: 4}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            
            <Box display='flex' alignItems='center'>
                <Typography variant='h6' component={NavLink} 
                to='/'
                sx={navStyles}>
                RE-Store
                </Typography>
                
                <Switch checked={darkMode} onChange={handleThemeChange} />  {/*switch position depends on darkmode variable. i.e. if darkmode is true, switch will be in 'on' state */}
            
            </Box>
                
                
            <List sx={{display: 'flex'}}>
                {midLinks.map(({title, path}) => (
                    <ListItem
                        component={NavLink}
                        to={path}
                        key={path}
                        sx={navStyles}
                    >
                        {title.toUpperCase()}
                    </ListItem>
                ))}
            </List>
            
            <Box display='flex' alignItems='center'>
                <IconButton size='large' edge='start' color='inherit' sx={{mr: 2}}>
                    <Badge badgeContent='4' color="secondary">
                        <ShoppingCart />
                    </Badge>
                </IconButton>
                
                <List sx={{display: 'flex'}}>
                    {rightLinks.map(({title, path}) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List> 
            </Box>
            </Toolbar>                                                      
        </AppBar>
    )
}
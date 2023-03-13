import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import Switch from "@mui/material/Switch/Switch";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";

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


export default function Header({darkMode, handleThemeChange}: Props) { //the function handleThemeChange() toggles the darkMode state between true and false every time it's called.
    const {basket} = useStoreContext();
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)

    return (                                                           
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
                <IconButton  component ={Link} to='/basket' size='large' edge='start' color='inherit' sx={{mr: 2}}>
                    <Badge badgeContent={itemCount} color="secondary">
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

/*This is a component for the header of a React web client, and it contains links to different pages and a switch that toggles between light and dark mode. 
Here's a summary of what the code is doing:

The component accepts two props, darkMode and handleThemeChange, which are used to toggle the theme between light and dark mode.

midLinks and rightLinks are arrays of objects that contain the titles and paths for the links in the header. midLinks contains links to the Catalog, 
About, and Contact pages, while rightLinks contains links to the Login and Register pages.

navStyles is an object that contains styles for the links in the header.

The Header component returns an AppBar component from MUI that contains a Toolbar. The Toolbar contains three sections: 
the first section contains the logo and the switch for toggling the theme, 
the second section contains the links to the Catalog, About, and Contact pages, 
and the third section contains the links to the Login and Register pages and a shopping cart icon.

The logo is a Typography component from MUI that is also a NavLink to the home page. The switch is a Switch component from MUI that toggles the 
darkMode state between true and false every time it is clicked.

The links to the Catalog, About, and Contact pages are rendered as ListItem components from MUI that are also NavLinks. They are generated using the 
midLinks array of objects and the navStyles object for styling.

The links to the Login and Register pages are also rendered as ListItem components that are NavLinks. They are generated using the rightLinks array of 
objects and the navStyles object for styling.

Finally, the shopping cart icon is an IconButton component from MUI that contains a Badge component. The Badge component displays a number on top of 
the shopping cart icon to indicate the number of items in the cart. */
import { AppBar, Toolbar, Typography } from "@mui/material";
import Switch from "@mui/material/Switch/Switch";
/*In this particular code example, the Props interface is defining the expected shape of the 
props object that will be passed to the Header component. Specifically, the Props interface 
defines that the props object should have two properties:

darkMode of type boolean
handleThemeChange of type () => void, 

which is a function that takes no arguments and returns void
By defining this interface, we can ensure that any code that uses the Header component 
is passing in the expected props with the correct types. This can help catch errors at compile 
time and make our code more reliable. */

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
            <Toolbar>
                <Typography variant='h6'>
                    RE-Store
                </Typography>
                <Switch checked={darkMode} onChange={handleThemeChange} />  {/*switch position depends on darkmode variable. i.e. if darkmode is true, */}
            </Toolbar>                                                      {/*switch will be in 'on' state */}
        </AppBar>
    )
}
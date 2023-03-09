import { Container, CssBaseline } from "@mui/material";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

/* the createTheme() function is called to create a custom theme object for the application. This function is a part of the Material UI 
library for React and is used to generate a theme object that can be applied to the components of an application.

The createTheme() function takes an argument that is an object describing the properties of the theme. This object 
has two main properties: palette and background.

The palette property is used to specify the color palette for the application. The mode property within palette specifies the color mode for the 
application, which is set to paletteType variable based on the state of darkMode. The background property specifies the background color for the 
application, which is set to a light or dark color based on the paletteType variable.

Once the theme object is created, it can be passed down to the application's components using the ThemeProvider component, which is also 
provided by the Material UI library. By applying a custom theme object to the application's components, the appearance of the components can be 
customized to match the theme. */

function App() {
  const [darkMode, setDarkMode] = useState(false); //
  const paletteType = darkMode ? 'dark' : 'light'; //if darkmode true, paletteType = 'dark, else paletteType = 'light'
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })


  /*Overall, the function handleThemeChange() toggles the darkMode state between true and false every time it's called.
  
  First, it negates the current value of the darkMode state using the ! (not) operator. If darkMode is currently true, 
  it becomes false, and if it's false, it becomes true.

  Next, it sets the new value of darkMode by calling the setDarkMode function with the negated value of darkMode as its argument. */
  function handleThemeChange () { 
    setDarkMode(!darkMode);
  }

    /*header is passed two props, darkMode={darkMode} sets initial state 
      of header to either light or dark depending on the value of darkMode.
      handleThemeChange={handleThemeChange} passes down the handleThemeChange
      function as a prop to the <Header> component, so that the header update
      the 'darkMode' state variable when the user toggles the dark mode switch */
  return (
    <ThemeProvider theme={theme}> 
    <CssBaseline />  {/* In React, the <CssBaseline /> component is used to apply a consistent base style to the entire application. */}
    <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
    <Container>
        <Outlet />
    </Container>
    </ThemeProvider>
  );
}

export default App;

import { Container, CssBaseline } from "@mui/material";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from "../context/StoreContext";
import agent from "../api/agent";
import { getCookie } from "../util/util";
import LoadingComponent from "./LoadingComponent";

function App() {
  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [setBasket])

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
    function handleThemeChange () { 
      setDarkMode(!darkMode);
    }

    if (loading) return <LoadingComponent message='initialising app...' />

    return (
      <ThemeProvider theme={theme}> 
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline />  {/* In React, the <CssBaseline /> component is used to apply a consistent base style to the entire application. */}
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
          <Outlet />
      </Container>
      </ThemeProvider>
    );
}

export default App;


/*It imports various components and styles from external libraries like MUI and React Toastify.

It defines a function component called App, which returns a JSX layout for the application.

The App component defines a useState hook to manage the dark mode state of the application.

It also defines a handleThemeChange function that toggles the darkMode state.

The App component uses the createTheme function from MUI to create a theme for the application based on the current darkMode state.

The App component renders the ThemeProvider component from MUI to provide the created theme to the application.

It also renders the ToastContainer component from React Toastify to display notification messages.

The CssBaseline component is used to apply a consistent base style to the entire application.

The Header component is used to display the app's header and allow users to toggle between dark and light modes.

The Outlet component from react-router-dom is used to render the content of the current route.

The Container component from MUI is used to wrap the outlet content and add some padding.

Overall, this code sets up the basic layout and theme for the web application and includes some features like a header and toast notifications. */
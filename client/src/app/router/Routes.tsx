import { createBrowserRouter, Navigate } from "react-router-dom";
import ContactPage from "../../features/contact/ContactPage";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import HomePage from "../../features/home/HomePage";
import App from "../layout/App";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'catalog', element: <Catalog />},
            {path: 'catalog/:id', element: <ProductDetails />},
            {path: 'about', element: <AboutPage />},
            {path: 'contact', element: <ContactPage />},
            {path: 'server-error', element: <ServerError />},
            {path: 'not-found', element: <NotFound />},
            {path: 'basket', element: <BasketPage />},
            {path: 'checkout', element: <CheckoutPage />},
            {path: '*', element: <Navigate replace to='not-found' />}

        ]
    }
])

/*In this example, react-router-dom is used to create the routes for the application. The createBrowserRouter function is used to create a router instance, 
which is passed an array of route objects.

The route objects define the URL paths and corresponding components to be rendered when a user navigates to that path. 
The path property is used to specify the URL path, and the element property is used to specify the component to be rendered for that path.

In this example, the root path '/' is associated with the App component. The children property contains an array of child route objects, 
which correspond to the sub-paths of the root path.

For example, the path '/' has a child route object with an empty path, which corresponds to the home page and is associated with the HomePage component. 
Similarly, the path 'catalog' is associated with the Catalog component, and the path 'catalog/:id' is associated with the ProductDetails component, 
which will be rendered with the specific product ID passed in as a URL parameter.

The AboutPage, ContactPage, ServerError, and NotFound components are associated with their corresponding paths as well.

Lastly, the '*' path is a catch-all route that will be rendered when no other routes match the requested path. In this example, 
it is used to redirect to the NotFound component with the Navigate component from react-router-dom. 
The replace property is used to replace the current URL in the browser history instead of adding a new entry.

Overall, this router configuration allows the application to render different components based on the requested URL path. */
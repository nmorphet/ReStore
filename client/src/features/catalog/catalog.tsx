import { Fragment, useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/layout/models/product";
import ProductList from "./ProductList";

export default function Catalog() {  
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      agent.Catalog.list()
      .then(products => setProducts(products))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
    }, []) //adding an empty array of dependencies prevents a loop of getting data

    if (loading) return <LoadingComponent message='Loading products...' />
  

    return (
        <Fragment>
            <ProductList products={products} />
         </Fragment>
    )
}

/*This code defines a React functional component named Catalog.

It imports and uses a few other components and modules from the project, such as Fragment, useEffect, useState, LoadingComponent, Product, and ProductList.

The component has two state variables: products and loading, which are both initialized with default values.

In the useEffect hook, an API request is sent using the agent module to get a list of products from the server. When the response is returned, the list of 
products is saved in the products state variable using the setProducts function. If there is an error, the error is logged to the console. 
The finally block is executed regardless of whether the API request succeeds or fails, and it sets the loading state variable to false.

The component renders a LoadingComponent if the loading state variable is true. Otherwise, it renders a ProductList component with the products array passed 
as a prop */
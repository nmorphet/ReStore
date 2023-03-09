import { Fragment, useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/layout/models/product";
import ProductList from "./ProductList";

/*destructuring{products, addProduct}, specifying properties interested in from an object 
and naming them directly to avoid needing to name object.name.thing, products can be
specified directly and used directly */
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
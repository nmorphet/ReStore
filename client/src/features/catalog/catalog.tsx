import { Fragment, useEffect, useState } from "react";
import { Product } from "../../app/layout/models/product";
import ProductList from "./ProductList";

/*destructuring{products, addProduct}, specifying properties interested in from an object 
and naming them directly to avoid needing to name object.name.thing, products can be
specified directly and used directly */
export default function Catalog() {  
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
      fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
    }, []) //adding an empty array of dependencies prevents a loop of getting data
  

    return (
        <Fragment>
            <ProductList products={products} />
         </Fragment>
    )
}
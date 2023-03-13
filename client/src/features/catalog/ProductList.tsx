import { Grid } from "@mui/material";
import { Product } from "../../app/layout/models/product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

export default function ProductList({products}: Props) {
    return (
        <Grid container spacing={4}>
            {products.map(product  => (
                <Grid item xs={3}key={product.id}>
                    <ProductCard  product={product} />
                </Grid>
        ))}
        </Grid> 
    )
}

/*This is the ProductList component, which receives an array of Product objects as props and renders a grid of ProductCard components for each item in the array.

Here is a summary of what the code does:

Import the Grid component from the Material UI library and the Product type from the product model.
Import the ProductCard component from the ./ProductCard file.

Define the Props interface, which includes an array of Product objects.

Define the ProductList function component, which takes in the products prop and returns a Grid component with a grid of ProductCard components inside.
Inside the Grid component, products.map() is used to iterate over the products array and return a new array of Grid items, with each item containing a 
ProductCard component for each Product object in the array.

Each ProductCard component is passed the corresponding Product object from the products array as a prop, and a unique key prop is added to each Grid item 
to help React optimize rendering.

Overall, the ProductList component is responsible for rendering a grid of ProductCard components for an array of Product objects passed in as props. */
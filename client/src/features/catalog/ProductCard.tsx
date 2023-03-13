import { LoadingButton } from "@mui/lab";
import { Card, Avatar, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Product } from "../../app/layout/models/product";
import { currencyFormat } from "../../app/util/util";

interface Props {
    product: Product;
}

export default function ProductCard({product}: Props) {
    const [loading, setLoading] = useState(false);
    const {setBasket} = useStoreContext();

    function handleAddItem(productId: number) {
      setLoading(true);
      agent.Basket.addItem(productId)
        .then(basket => setBasket(basket))
        .catch(error => console.log())
        .finally(() => setLoading(false));
    }
    return (
    <Card>
      <CardHeader
          avatar={
            <Avatar sx={{bgcolor: 'secondary.main'}}>
                {product.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={product.name}
          titleTypographyProps={{
            sx: {fontWeight: 'bold', color: 'primary.main'}
          }}
      />
      <CardMedia
        sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color='secondary' variant="h5">
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton  
            loading={loading} 
            onClick={() => handleAddItem(product.id)}
            size="small">
              Add to cart
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>   {/*the (backticks allow text and code) `/catalog/${product.id}` uses the path set in Routes.tsx/react-router-dom */}
      </CardActions>
    </Card>
    )
}

/*The ProductCard component is a functional component that takes a single prop product of type Product. It returns a Card component from the @mui/material library, which displays details about the 
product such as its name, price, picture, brand, and type. The component also has two buttons: "Add to cart" and "View".

The CardHeader component displays the product name in bold and color-coded text. It also displays the first letter of the product name as an avatar.

The CardMedia component displays the product picture using the image prop, which is passed from the product prop.

The CardContent component displays the product price in dollars and cents and also shows the brand and type of the product.

The CardActions component displays two buttons. The first button is labeled "Add to cart" and the second button is labeled "View". The "Add to cart" button does not have any functionality attached 
to it yet, but the "View" button uses the Link component from react-router-dom to create a link to the product's details page. */
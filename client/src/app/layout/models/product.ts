/*The class is used on the backend to define the structure of the products table in the
 database and provide additional functionality, while the interface is used on the frontend 
 to specify the structure of the data object that is being sent or received from the backend API. */

export interface Product { //parent object
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    type?: string;
    brand: string;
    quantityInStock?: number;
}
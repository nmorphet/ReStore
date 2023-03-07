/*The class is used on the backend to define the structure of the products table in the
 database and provide additional functionality, while the interface is used on the frontend 
 to specify the structure of the data object that is being sent or received from the backend API. */

namespace API.Entities //entity classes need to be public to be able to get and set
{
    public class Product //contains properties related to a product
    {
        //each of these properties is going to represent a column in the products table (DbSet)
        public int Id { get; set; } //public means it can be accessed form any other class in application. if it was private, it could only be accessed from within this class
        //get/set enables getting and setting from other parts of application
        public string Name {get; set; }

        public string Description { get; set; }

        public long Price { get; set; }

        public string PictureUrl { get; set; }

        public string Type { get; set; }

        public string Brand { get; set; }

        public int QuantityInStock { get; set; }
    }
}
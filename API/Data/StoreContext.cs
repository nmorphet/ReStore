using API.Entities;
using Microsoft.EntityFrameworkCore;

// this StoreContext derives from entity framework DbContext. 

namespace API.Data
{
    public class StoreContext : DbContext
    {
        // this constructor allows us to pass options when we create an instance of StoreContext, these options get passed up to the base class (DbContext)
        // the options we need for this class are the database connection string
        public StoreContext(DbContextOptions options) : base(options)
        {
        }
        //for each of our entities we need to create a DbSet, products is the name of the table we are going to create.
        public DbSet<Product> Products { get; set; } //defines DbSet, represents product table with properties columns

        public DbSet<Basket> Baskets { get; set; }
    }
}
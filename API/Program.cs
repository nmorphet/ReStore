using API.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<StoreContext>(opt =>      //lambda expression, passing the service the following options
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")); /*using sqlite, pass config object, 
                                                                                    get the connection string which is 
                                                                                    default connection located in 
                                                                                    appsettingsDevelopment.json*/
});


var app = builder.Build();

// Configure the HTTP request pipeline.
/*as a request comes into the
API, is handled by API,
and response sent out of API
what is going between request
being received and response
being sent out is referred
to as HTTP request pipeline*/
if (app.Environment.IsDevelopment()) //check to see if running in dev mode
{
    app.UseSwagger(); //if so, make swagger available with this middleware
    app.UseSwaggerUI();
}

app.UseHttpsRedirection(); /*if a request does come in over http, can be redirected to https*/

app.UseAuthorization(); 

app.MapControllers(); /*API knows where to send request when comes in on API endpoint because it adds routing config for the controllers, using this method*/

var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    context.Database.Migrate();
    DbInitializer.Initialize(context);
}
catch (Exception ex)
{
    logger.LogError(ex, "A problem occured during migration");
}


app.Run();

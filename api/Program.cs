using Api.GraphQL.Shcema;

var builder = WebApplication.CreateBuilder(args);

// development cors
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "dev",
                      policy  =>
                      {
                          policy.AllowAnyHeader().WithOrigins("http://localhost:3000");
                      });
});

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddTransient<IApiKeyValidation, ApiKeyValidation>();

builder.Services.AddDbContext<ExpensesContext>();

// repositories
builder
    .Services.AddScoped<IUserRepository, UserRepository>()
    .AddScoped<IMovementRepository, MovementRepository>()
    // services
    .AddScoped<IMovementService, MovementService>()
    .AddScoped<IUserService, UserService>()
    .AddScoped<MovementService>()
    .AddScoped<UserService>();

builder
    .Services.AddGraphQLServer()
    .AddType<User>()
    .AddType<Movement>()
    .AddMutationType<Mutation>()
    .AddQueryType<Query>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseCors("dev");

app.UseRouting();

// app.UseMiddleware<ApiKeyMiddleware>();

app.UseAuthorization();

app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapGraphQL();

app.Run();

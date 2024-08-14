using System.Text;
using System.Text.Json.Serialization;
using Api.GraphQL.Shcema;
using DotNet8WebAPI.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ExpensesContext>();

// development cors
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: "dev",
        policy =>
        {
            policy.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
        }
    );
});

var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("secretsecretsecret"));

builder
    .Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false,
            ValidateIssuer = false,
            ValidateIssuerSigningKey = false,
            ValidAudience = "audience",
            ValidIssuer = "issuer",
            RequireSignedTokens = false,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("secretsecretsecretsecretsecretsecret")
            )
        };
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
    });

builder.Services.AddAuthorization();

// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(x =>
   x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);;

#region DI
builder
    // repositories
    .Services
    .AddScoped<ICategoryRepository, CategoryRepository>()
    .AddScoped<IMovementRepository, MovementRepository>()
    .AddScoped<IUserRepository, UserRepository>()
    // services
    .AddScoped<ICategoryService, CategoryService>()
    .AddScoped<IMovementService, MovementService>()
    .AddScoped<IUserService, UserService>()
    
    .AddScoped<CategoryService>()
    .AddScoped<MovementService>()
    .AddScoped<UserService>();
#endregion

builder.Services.AddHttpContextAccessor();

builder
    .Services.AddGraphQLServer()
    .AddAuthorization()
    .AddType<User>()
    .AddType<Movement>()
    .AddMutationType<Mutation>()
    .AddQueryType<Query>();

var app = builder.Build();

app.UseCors("dev");

// app.MapIdentityApi<User>();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");

    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    // app.UseHsts();
}

IdentityModelEventSource.ShowPII = true;

// app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<JwtMiddleware>();

app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");

app.UseEndpoints(endpoints =>
{
    endpoints.MapGraphQL();
});

app.Run();

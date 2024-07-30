using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ExpensesContext : IdentityDbContext<User>
{
    public DbSet<Movement> Movements { get; set; }
    public DbSet<User> Users { get; set; }

    public DbSet<ILog> Logs { get; set; }

    public string DbPath { get; }

    public ExpensesContext(IConfiguration configuration, DbContextOptions<ExpensesContext> options) : base(options){
        DbPath = configuration["SqlitePath"] ?? "";
    }

    // The following configures EF to create a Sqlite database file in the
    // special "local" folder for your platform.
    protected override void OnConfiguring(DbContextOptionsBuilder options){
        options.UseSqlite($"Data Source={DbPath}");

    }
}
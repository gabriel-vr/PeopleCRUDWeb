using Microsoft.EntityFrameworkCore;

namespace webapi.Models {
    public class Contexto : DbContext {
        public DbSet<Pessoa> Pessoas {get; set;}

        protected readonly IConfiguration Configuration;

        public Contexto(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sql server with connection string from app settings
            options.UseSqlServer(Configuration.GetConnectionString("ConexaoBD"));
        }

        }
}
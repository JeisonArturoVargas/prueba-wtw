using Microsoft.EntityFrameworkCore;
using prueba_wtw.Domain.AggregateModels.UserAggregate;

namespace prueba_wtw.Infrastructure.db
{
    public class DbAppContext : DbContext
    {
        public DbAppContext(DbContextOptions<DbAppContext> options)
            : base(options)
        {
        }

        public DbSet<Person> Personas { get; set; }
        public DbSet<User> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public async Task<List<Person>> GetPersonasAsync()
        {
            return await Personas.FromSqlRaw("CALL SP_GetPersonas").ToListAsync();
        }
    }
}

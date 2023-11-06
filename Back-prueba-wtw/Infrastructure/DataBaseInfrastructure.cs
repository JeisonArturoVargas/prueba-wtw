using Microsoft.EntityFrameworkCore;
using prueba_wtw.Domain.AggregateModels.UserAggregate;
using prueba_wtw.Infrastructure.db;
using prueba_wtw.Infrastructure.Repository;
using prueba_wtw.Infrastructure.Repository.User;

namespace prueba_wtw.Infrastructure
{
    public static class DataBaseInfrastructure
    {
        public static IServiceCollection AddDatabaseContext(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            return services
                .AddDbContext<DbAppContext>(options => options.UseMySQL(connectionString))
                .AddScoped<JWTAuthRepository>()
                .AddScoped<IUserRepositorio, UserRepositorio>()
                .AddScoped<IAuthrepository, AuthRepository>();
        }
    }
}

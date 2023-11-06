using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using prueba_wtw.Domain.AggregateModels.UserAggregate;
using prueba_wtw.Infrastructure.db;

namespace prueba_wtw.Infrastructure.Repository.User
{
    public class AuthRepository : IAuthrepository
    {
        private readonly DbAppContext _context;
        private readonly PasswordHasher<Domain.AggregateModels.UserAggregate.User> _passwordHasher;

        public AuthRepository(DbAppContext context)
        {
            _context = context;
            _passwordHasher = new PasswordHasher<Domain.AggregateModels.UserAggregate.User>();
        }
        public async Task<(bool Success, string ErrorMessage)> UserLoginAsync(UserAuth user)
        {
            try
            {
                var autenticacion = await _context.Usuarios
                    .FirstOrDefaultAsync(u => u.NombreUsuario == user.NombreUsuario);
                if (autenticacion == null)
                {
                    return (false, "Usuario no encontrado.");
                }

                var result = _passwordHasher.VerifyHashedPassword(autenticacion, autenticacion.Pass, user.Pass);
                if (result != PasswordVerificationResult.Success)
                {
                    return (false, "Contraseña incorrecta.");
                }

                return (true, null); 
            }
            catch (Exception ex)
            {
                throw new Exception( $"Error al iniciar sesion {ex}");
            }
        }
    }
}

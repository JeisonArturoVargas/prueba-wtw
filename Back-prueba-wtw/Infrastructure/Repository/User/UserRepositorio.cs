using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using prueba_wtw.Domain.AggregateModels.UserAggregate;
using prueba_wtw.Domain.Models;
using prueba_wtw.Infrastructure.db;

namespace prueba_wtw.Infrastructure.Repository.User
{
    public class UserRepositorio : IUserRepositorio
    {
        private readonly DbAppContext _context;
        private readonly PasswordHasher<Domain.AggregateModels.UserAggregate.User> _passwordHasher;

        public UserRepositorio(DbAppContext context)
        {
            _context = context;
            _passwordHasher = new PasswordHasher<Domain.AggregateModels.UserAggregate.User>();
        }


        public async Task RegisterAsync(PersonRegisterDto registroDto)
        {
            var usuarioExistente = await _context.Usuarios
                .AnyAsync(u => u.NombreUsuario == registroDto.NombreUsuario);
            if (usuarioExistente)
            {
                throw new Exception("El nombre de usuario ya está registrado.");
            }

            var identificacionExistente = await _context.Personas
                .AnyAsync(p => p.NumeroDeIdentificacion == registroDto.NumeroDeIdentificacion);
            if (identificacionExistente)
            {
                throw new Exception("El número de identificación ya está registrado.");
            }

            var emailExistente = await _context.Personas
                .AnyAsync(p => p.Email == registroDto.Email);
            if (emailExistente)
            {
                throw new Exception("El correo electrónico ya está registrado.");
            }

            var persona = new Person
            {
                Nombres = registroDto.Nombres,
                Apellidos = registroDto.Apellidos,
                NumeroDeIdentificacion = registroDto.NumeroDeIdentificacion,
                Email = registroDto.Email,
                TipoIdentificacion = registroDto.TipoIdentificacion,
            };

            var usuario = new Domain.AggregateModels.UserAggregate.User
            {
                NombreUsuario = registroDto.NombreUsuario,
            };

            usuario.Pass = _passwordHasher.HashPassword(usuario, registroDto.Pass);

            persona.Usuario = usuario;

            persona.UpdateCalculatedFields();
            _context.Personas.Add(persona);
            await _context.SaveChangesAsync();
        }
    }
}

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using prueba_wtw.Domain.AggregateModels.UserAggregate;

namespace prueba_wtw.Infrastructure.Repository
{
    public class JWTAuthRepository
    {
        private readonly IConfiguration _configuration;

        public JWTAuthRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public object GenerateToken(UserAuth usuario)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];
            var expiresInMinutes = double.Parse(_configuration["Jwt:ExpiresInMinutes"]);
            var expiration = DateTime.UtcNow.AddMinutes(expiresInMinutes);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
            new Claim(ClaimTypes.NameIdentifier, usuario.Pass.ToString()),
            new Claim(ClaimTypes.Name, usuario.NombreUsuario)
        }),
                Expires = expiration,
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            var expirationInSeconds = (int)((expiration - DateTime.UtcNow).TotalSeconds);

            return new
            {
                token = tokenString,
                expiration = expirationInSeconds
            };
        }
    }
}

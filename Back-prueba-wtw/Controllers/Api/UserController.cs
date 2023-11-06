using Microsoft.AspNetCore.Mvc;
using prueba_wtw.Controllers.Constants;
using prueba_wtw.Domain.AggregateModels.UserAggregate;
using prueba_wtw.Domain.Models;
using prueba_wtw.Infrastructure.Repository;

namespace prueba_wtw.Controllers.Api
{
    [ApiController]
    [Route($"{ApiConstants.ContextPath}/user/")]

    public class UserController : ControllerBase
    {
        private readonly IUserRepositorio _registroRepositorio;
        private readonly IAuthrepository _authrepository;
        private readonly JWTAuthRepository _tokenService;

        public UserController(IUserRepositorio registroRepositorio
            , IAuthrepository authrepository
            , JWTAuthRepository tokenRepository)
        {
            _registroRepositorio = registroRepositorio;
            _authrepository = authrepository;
            _tokenService = tokenRepository;

        }

        [HttpPost("sing-in")]
        public async Task<IActionResult> Register([FromBody] PersonRegisterDto register)
        {
            try
            {
                await _registroRepositorio.RegisterAsync(register);
                return Ok(new { mensaje = "Registro exitoso." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserAuth user)
        {
            try
            {
                var resultado = await _authrepository.UserLoginAsync(user);

                if (resultado.Success)
                {
                    var tokenInfo = _tokenService.GenerateToken(user);
                    return Ok(tokenInfo);
                }
                else
                {
                    return Unauthorized(new { mensaje = "Credenciales inválidas" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}

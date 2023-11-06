using prueba_wtw.Domain.Models;

namespace prueba_wtw.Domain.AggregateModels.UserAggregate
{
    public interface IUserRepositorio
    {
        Task RegisterAsync(PersonRegisterDto registroDto);
    }
}

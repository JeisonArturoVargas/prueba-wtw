namespace prueba_wtw.Domain.AggregateModels.UserAggregate
{
    public interface IAuthrepository
    {
        Task<(bool Success, string ErrorMessage)> UserLoginAsync(UserAuth usuario);
    }
}

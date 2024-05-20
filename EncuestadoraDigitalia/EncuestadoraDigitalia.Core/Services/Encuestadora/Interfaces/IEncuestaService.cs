// ---------------------------------------
// Email: quickapp@ebenmonney.com
// Templates: www.ebenmonney.com/templates
// (c) 2024 www.ebenmonney.com/mit-license
// ---------------------------------------

using EncuestadoraDigitalia.Core.Models.Encuestadora;

namespace EncuestadoraDigitalia.Core.Services.Encuestadora.Interfaces   
{
    public interface IEncuestaService
    {
        //Task<bool> CheckPasswordAsync(ApplicationUser user, string password);
        //Task<(bool Succeeded, string[] Errors)> CreateUserAsync(ApplicationUser user, IEnumerable<string> roles, string password);
        Task<(bool Succeeded, string[] Errors)> DeleteEncuestaAsync(Encuesta encuesta);
        //Task<(bool Succeeded, string[] Errors)> DeleteEncuestaAsync(int encuestaId);
        //Task<(ApplicationUser User, string[] Roles)?> GetUserAndRolesAsync(string userId);
        //Task<ApplicationUser?> GetUserByEmailAsync(string email);
        Task<Encuesta?> GetEncuestaByIdAsync(int encuestaId);
        //Task<ApplicationUser?> GetUserByUserNameAsync(string userName);
        //Task<IList<string>> GetUserRolesAsync(ApplicationUser user);
        Task<List<Encuesta>> GetEncuestasAsync(int page, int pageSize);
        //Task<(bool Succeeded, string[] Errors)> ResetPasswordAsync(ApplicationUser user, string newPassword);
        //Task<(bool Success, string[] Errors)> TestCanDeleteUserAsync(string userId);
        //Task<(bool Succeeded, string[] Errors)> UpdatePasswordAsync(ApplicationUser user, string currentPassword, string newPassword);
        //Task<(bool Succeeded, string[] Errors)> UpdateUserAsync(ApplicationUser user);
        //Task<(bool Succeeded, string[] Errors)> UpdateUserAsync(ApplicationUser user, IEnumerable<string>? roles);
    }
}

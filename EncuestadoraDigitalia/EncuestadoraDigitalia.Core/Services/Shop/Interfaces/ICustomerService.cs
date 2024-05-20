// ---------------------------------------
// Email: quickapp@ebenmonney.com
// Templates: www.ebenmonney.com/templates
// (c) 2024 www.ebenmonney.com/mit-license
// ---------------------------------------

using EncuestadoraDigitalia.Core.Models.Shop;

namespace EncuestadoraDigitalia.Core.Services.Shop
{
    public interface ICustomerService
    {
        IEnumerable<Customer> GetTopActiveCustomers(int count);
        IEnumerable<Customer> GetAllCustomersData();
    }
}

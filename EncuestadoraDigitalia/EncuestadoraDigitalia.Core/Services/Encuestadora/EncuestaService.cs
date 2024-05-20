// ---------------------------------------
// Email: quickapp@ebenmonney.com
// Templates: www.ebenmonney.com/templates
// (c) 2024 www.ebenmonney.com/mit-license
// ---------------------------------------

using EncuestadoraDigitalia.Core.Infrastructure;
using EncuestadoraDigitalia.Core.Models.Account;
using EncuestadoraDigitalia.Core.Models.Encuestadora;
using EncuestadoraDigitalia.Core.Services.Encuestadora.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EncuestadoraDigitalia.Core.Services.Encuestadora
{
    public class EncuestaService : IEncuestaService
    {
        private readonly ApplicationDbContext _context;

        public EncuestaService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Encuesta>> GetEncuestasAsync(int page, int pageSize)
        {
            IQueryable<Encuesta> encuestasQuery = _context.Encuestas
                .Include(u => u.Preguntas)
                .ThenInclude(u => u.Alternativas)
                .AsSingleQuery()
                .OrderBy(u => u.Descripcion);

            if (page != -1)
                encuestasQuery = encuestasQuery.Skip((page - 1) * pageSize);

            if (pageSize != -1)
                encuestasQuery = encuestasQuery.Take(pageSize);

            var encuestas = await encuestasQuery.ToListAsync();

            return encuestas;
        }

    }   
}

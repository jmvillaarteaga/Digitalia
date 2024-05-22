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

        public async Task<Encuesta?> GetEncuestaByIdAsync(int Id)
        {
            return await _context.Encuestas
                .FindAsync(new object[] { Id });
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

        public async Task<(bool Succeeded, string[] Errors)> DeleteEncuestaAsync(Encuesta encuesta)
        {
            var entity = await _context.Encuestas
                .FindAsync(new object[] { encuesta.Id });

            //Guard.Against.NotFound(request.Id, entity);
            if (entity != null)
                _context.Encuestas.Remove(entity);

            await _context.SaveChangesAsync();
            return (true, []);
        }

        public async Task<(bool Succeeded, string[] Errors)> CreateEncuestaAsync(Encuesta encuesta)
        {
            var entity = _context.Encuestas.AddAsync(encuesta);
                await _context.SaveChangesAsync();            
            return (true, []);
        }
    }   
}

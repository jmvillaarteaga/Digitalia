// ---------------------------------------
// Email: quickapp@ebenmonney.com
// Templates: www.ebenmonney.com/templates
// (c) 2024 www.ebenmonney.com/mit-license
// ---------------------------------------

namespace EncuestadoraDigitalia.Core.Models.Encuestadora
{
    public class Pregunta : BaseEntity
    {
        public required string Descripcion { get; set; }

        public ICollection<Alternativa> Alternativas { get; set; } = new List<Alternativa>();
    }
}

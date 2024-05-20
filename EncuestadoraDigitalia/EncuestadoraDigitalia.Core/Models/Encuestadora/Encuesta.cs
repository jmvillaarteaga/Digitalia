// ---------------------------------------
// Email: quickapp@ebenmonney.com
// Templates: www.ebenmonney.com/templates
// (c) 2024 www.ebenmonney.com/mit-license
// ---------------------------------------

using EncuestadoraDigitalia.Core.Models.Account;

namespace EncuestadoraDigitalia.Core.Models.Encuestadora
{
    public class Encuesta : BaseEntity
    {
        public required string Descripcion { get; set; }

        public ICollection<Pregunta> Preguntas { get; set; } = new List<Pregunta>();
    }
}

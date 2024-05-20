// ---------------------------------------
// Email: quickapp@ebenmonney.com
// Templates: www.ebenmonney.com/templates
// (c) 2024 www.ebenmonney.com/mit-license
// ---------------------------------------

using EncuestadoraDigitalia.Core.Models.Encuestadora;

namespace EncuestadoraDigitalia.Server.ViewModels.Encuestadora
{
    public class PreguntaVM
    {
        public int Id { get; set; }
        public string? Descripcion { get; set; }
        public Alternativa[] Alternativas { get; set; }
    }
}

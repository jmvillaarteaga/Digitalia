// ---------------------------------------
// Email: quickapp@ebenmonney.com
// Templates: www.ebenmonney.com/templates
// (c) 2024 www.ebenmonney.com/mit-license
// ---------------------------------------

using AutoMapper;
using EncuestadoraDigitalia.Core.Models.Account;
using EncuestadoraDigitalia.Core.Services.Account;
using EncuestadoraDigitalia.Core.Services.Encuestadora.Interfaces;
using EncuestadoraDigitalia.Server.Authorization;
using EncuestadoraDigitalia.Server.ViewModels.Account;
using EncuestadoraDigitalia.Server.ViewModels.Encuestadora;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace EncuestadoraDigitalia.Server.Controllers
{
    [Route("api/encuestadora")]
    [Authorize]
    public class EncuestadoraController : BaseApiController
    {
        private readonly IEncuestaService _encuestaService;
        private readonly IAuthorizationService _authorizationService;

        public EncuestadoraController(ILogger<UserAccountController> logger, IMapper mapper,
            IEncuestaService encuestaService, IAuthorizationService authorizationService) : base(logger, mapper)
        {
            _encuestaService = encuestaService;
            _authorizationService = authorizationService;
        }
        
        [HttpGet("encuestas/{pageNumber:int}/{pageSize:int}")]
        [Authorize(AuthPolicies.ViewAllUsersPolicy)]
        [ProducesResponseType(200, Type = typeof(List<UserVM>))]
        public async Task<IActionResult> GetEncuestas(int pageNumber, int pageSize)
        {
            var encuestas = await _encuestaService.GetEncuestasAsync(pageNumber, pageSize);

            return Ok(_mapper.Map<List<EncuestaVM>>(encuestas));
        }

    }
}

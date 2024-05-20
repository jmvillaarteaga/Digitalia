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

        [HttpGet("encuestas")]
        [Authorize(AuthPolicies.ViewAllRolesPolicy)]
        [ProducesResponseType(200, Type = typeof(List<EncuestaVM>))]
        public async Task<IActionResult> GetEncuestas()
        {
            return await GetEncuestas(-1, -1);
        }

        [HttpGet("encuestas/{pageNumber:int}/{pageSize:int}")]
        [Authorize(AuthPolicies.ViewAllUsersPolicy)]
        [ProducesResponseType(200, Type = typeof(List<EncuestaVM>))]
        public async Task<IActionResult> GetEncuestas(int pageNumber, int pageSize)
        {
            var encuestas = await _encuestaService.GetEncuestasAsync(pageNumber, pageSize);

            return Ok(_mapper.Map<List<EncuestaVM>>(encuestas));
        }

        [HttpDelete("encuestas/{id}")]
        [Authorize(AuthPolicies.ManageAllRolesPolicy)]
        [ProducesResponseType(200, Type = typeof(EncuestaVM))]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeletEncuesta(int id)
        {
            var encuesta = await _encuestaService.GetEncuestaByIdAsync(id);

            if (encuesta == null)
                return NotFound(id);

            //var canDelete = await _administrativoService.TestCanDeleteRoleAsync(id);
            //if (!canDelete.Success)
            //{
            //    AddModelError($"Role \"{administrativo.Name}\" cannot be deleted at this time. " +
            //        "Delete the associated records and try again");
            //    AddModelError(canDelete.Errors, "Records");
            //}

            if (ModelState.IsValid)
            {
                var result = await _encuestaService.DeleteEncuestaAsync(encuesta);

                if (!result.Succeeded)
                {
                    throw new UserRoleException($"The following errors occurred whilst deleting encuesta \"{id}\": " +
                    $"{string.Join(", ", result.Errors)}");
                }

                return Ok(_mapper.Map<EncuestaVM>(encuesta));
            }

            return BadRequest(ModelState);
        }
    }
}

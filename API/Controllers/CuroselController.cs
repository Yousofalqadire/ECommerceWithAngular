using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.InterFaces;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/Curosel")]
    [Authorize(Roles = "Admin")]
    public class CuroselController : ControllerBase
    {
        private readonly ICuroselRepository curosel;
        public CuroselController(ICuroselRepository _curosel)
        {
            curosel = _curosel;
        }
       [AllowAnonymous]
        [HttpGet("get-all")]
        public async Task<ActionResult<IEnumerable<Curosel>>> GetAllCurosels()
        {
           var result = await curosel.GetAllAsync();
           return Ok(result); 
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Curosel>> GetCurosel(int id)
        {
            var result = await curosel.GetByIdAsync(id);
            return Ok(result);
        }

        [HttpPost("creat-curosel")]
        public async Task<ActionResult<ClodinaryResponse>> CreatCurosel([FromForm]AddCuroselDto curoselDto)
        {
            var result = await curosel.CreatAsync(curoselDto);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        
        public async Task<ActionResult<ClodinaryResponse>> DeletCurosel([FromRoute]int id)
        {
            var result = await curosel.DeleteAsync(id);
            return Ok(result);
        }

        [HttpPut]
        public async Task<ActionResult<Curosel>> UpdateCurosel([FromForm] AddCuroselDto model)
        {
            var result= await curosel.UpdateAsync(model);
            return Ok(result);
        }

        
    }
}
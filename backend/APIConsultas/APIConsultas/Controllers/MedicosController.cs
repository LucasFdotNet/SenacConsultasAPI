using APIConsultas.Context;
using APIConsultas.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIConsultas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MedicoController(AppDbContext context)
        {
            _context = context;
        }

        // Método Get para todos os médicos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Medico>>> GetMedicos()
        {
            return await _context.Medicos.ToListAsync();
        }

        // Método Get para médicos por especialidade
        [HttpGet("especialidade/{especialidade}")]
        public async Task<ActionResult<IEnumerable<Medico>>> GetMedicosPorEspecialidade(string especialidade)
        {
            var medicos = await _context.Medicos
                .Where(m => m.Especialidade == especialidade)
                .ToListAsync();

            if (medicos == null || !medicos.Any())
            {
                return NotFound();
            }

            return medicos;
        }
    }
}

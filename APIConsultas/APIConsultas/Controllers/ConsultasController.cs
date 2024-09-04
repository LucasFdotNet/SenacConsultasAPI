using APIConsultas.Context;
using APIConsultas.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIConsultas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ConsultasController(AppDbContext context)
        {
            _context = context;
        }

        // DTO para criar consultas
        public class ConsultaCreateDTO
        {
            public int ConsultaId { get; set; }
            public int MedicoId { get; set; }
            public int PacienteId { get; set; }
            public string? Especialidade { get; set; }
            public DateTime DataHora { get; set; }
        }

        // GET: api/Consultas/paciente/{pacienteId}
        [Authorize]
        [HttpGet("paciente/{pacienteId}")]
        public async Task<ActionResult<IEnumerable<ConsultaCreateDTO>>> GetConsultasByPacienteId(int pacienteId)
        {
            var consultas = await _context.Consultas
                .Where(c => c.PacienteId == pacienteId)
                .Select(c => new ConsultaCreateDTO
                {
                    ConsultaId = c.ConsultaId,
                    MedicoId = c.MedicoId,
                    PacienteId = c.PacienteId,
                    Especialidade = c.Especialidade,
                    DataHora = c.DataHora
                })
                .ToListAsync();

            if (consultas == null || consultas.Count == 0)
                return NotFound();

            return Ok(consultas);
        }


        // GET: api/Consultas/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Consulta>> GetConsulta(int id)
        {
            var consulta = await _context.Consultas
                .Include(c => c.Medico)
                .Include(c => c.Paciente)
                .FirstOrDefaultAsync(c => c.ConsultaId == id);

            if (consulta == null)
                return NotFound();

            return Ok(consulta);
        }

        // DELETE: api/Consultas/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConsulta(int id)
        {
            var consulta = await _context.Consultas.FindAsync(id);
            if (consulta == null)
                return NotFound();

            _context.Consultas.Remove(consulta);
            await _context.SaveChangesAsync();

            return Ok(consulta);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutConsulta(int id, [FromBody] ConsultaCreateDTO consultaDTO)
        {
            if (id != consultaDTO.ConsultaId)
                return BadRequest();

            var consulta = await _context.Consultas.FindAsync(id);
            if (consulta == null)
                return NotFound();

            // Atualize os campos com os dados do DTO
            consulta.MedicoId = consultaDTO.MedicoId;
            consulta.PacienteId = consultaDTO.PacienteId;
            consulta.Especialidade = consultaDTO.Especialidade;
            consulta.DataHora = consultaDTO.DataHora;

            _context.Entry(consulta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConsultaExists(id))
                    return NotFound();
                else
                    throw;
            }

            return Ok(consulta);
        }


        // POST: api/Consultas
        [HttpPost]
        public async Task<ActionResult<Consulta>> PostConsulta([FromBody] ConsultaCreateDTO novaConsultaDTO)
        {
            var novaConsulta = new Consulta
            {
                MedicoId = novaConsultaDTO.MedicoId,
                PacienteId = novaConsultaDTO.PacienteId,
                Especialidade = novaConsultaDTO.Especialidade,
                DataHora = novaConsultaDTO.DataHora
            };

            _context.Consultas.Add(novaConsulta);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetConsulta), new { id = novaConsulta.ConsultaId }, novaConsulta);
        }

        private bool ConsultaExists(int id)
        {
            return _context.Consultas.Any(c => c.ConsultaId == id);
        }
    }
}

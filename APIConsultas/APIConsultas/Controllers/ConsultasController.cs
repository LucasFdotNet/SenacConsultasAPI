using APIConsultas.Context;
using APIConsultas.Models;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIConsultas.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ConsultasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ConsultasController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet("medicos")]
        public ActionResult<IEnumerable<Medico>> GetMedicos()
        {
            var medicos = _context.Medicos.ToList();
            if (medicos is null)
            {
                return NotFound("Não existem Médicos cadastrados...");
            }
            return medicos;
        }

        [HttpGet("{Paciente:int}", Name="ObterConsulta")]
        public ActionResult<Consulta> GetConsultasByPaciente(int pacienteId)
        {
            var consulta = _context.Consultas.FirstOrDefault(p => p.PacienteId == pacienteId);
            if(consulta is null)
            {
                return NotFound("Você não possui Consultas marcadas...");
            }
            return consulta;
        }

        [HttpPost("marcar")]
        public ActionResult Post(Consulta consulta)
        {

            if (consulta is null)
            {
                return BadRequest("Dados inválidos...");
            }
            _context.Consultas.Add(consulta);
            _context.SaveChanges();

            return new CreatedAtRouteResult("ObterConsulta",
                new { id = consulta.ConsultaId }, consulta);
        }

        [HttpPut("{id:int}", Name ="remarcar")]
        public ActionResult Put(int id, Consulta consulta)
        {
            if(id != consulta.ConsultaId)
            {
                return BadRequest("Consulta não encontrada...");
            }
            _context.Entry(consulta).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(consulta);
        }

        [HttpDelete("{id:int}", Name = "cancelar")]
        public ActionResult Delete(int id)
        {
            var consulta = _context.Consultas.FirstOrDefault(p => p.ConsultaId == id);

            if (consulta is null)
            {
                return NotFound("Consulta não encontrada...");
            }
            _context.Consultas.Remove(consulta);
            _context.SaveChanges();

            return Ok($"Consulta de protocolo Nº{consulta.ConsultaId} cancelada com sucesso!");
        }
    }
}

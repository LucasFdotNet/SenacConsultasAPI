using APIConsultas.Context;
using APIConsultas.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace APIConsultas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PacientesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public PacientesController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // Método de Cadastro de Paciente
        [HttpPost("register")]
        public async Task<IActionResult> Register(Paciente paciente)
        {
            // Verifique se o email ou CPF já existe no banco de dados
            var pacienteExistente = await _context.Pacientes
                .FirstOrDefaultAsync(p => p.Email == paciente.Email || p.CPF == paciente.CPF);

            if (pacienteExistente != null)
            {
                return Conflict("Paciente já cadastrado com este email ou CPF.");
            }

            // Adiciona o novo paciente ao banco de dados
            _context.Pacientes.Add(paciente);
            await _context.SaveChangesAsync();

            return Ok("Paciente cadastrado com sucesso.");
        }

        // Método de Login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            var paciente = await _context.Pacientes
                .FirstOrDefaultAsync(p => p.Email == loginDTO.Email && p.Senha == loginDTO.Senha);

            if (paciente == null)
            {
                return Unauthorized("Email ou senha incorretos.");
            }

            // Obtenha a chave do JWT
            var key = _configuration["JWT:SecretKey"];
            if (string.IsNullOrEmpty(key))
            {
                return Problem("JWT key is not configured properly.");
            }

            var keyBytes = Encoding.ASCII.GetBytes(key);

            // Crie as claims para o token
            if (paciente.PacienteId == 0 || string.IsNullOrEmpty(paciente.Email))
            {
                return Problem("PacienteId ou Email não podem ser nulos ou vazios.");
            }

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, paciente.PacienteId.ToString()),
                new Claim(ClaimTypes.Email, paciente.Email)
            };


            // Gerar o token JWT
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(Convert.ToInt32(_configuration["JWT:TokenValidityInMinutes"])),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(keyBytes), SecurityAlgorithms.HmacSha256Signature),
                Audience = _configuration["JWT:ValidAudience"],
                Issuer = _configuration["JWT:ValidIssuer"]
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { Token = tokenString });
        }
    }

    // DTO para o login
    public class LoginDTO
    {
        public string? Email { get; set; }
        public string? Senha { get; set; }
    }
}

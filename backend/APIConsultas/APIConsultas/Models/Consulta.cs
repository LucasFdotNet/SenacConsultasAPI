namespace APIConsultas.Models;

public class Consulta
{
    public int ConsultaId { get; set; }
    public int MedicoId { get; set; }
    public int PacienteId { get; set; }
    public string? Especialidade { get; set; }
    public DateTime DataHora { get; set; }

    // Relacionamentos
    public Medico? Medico { get; set; }
    public Paciente? Paciente { get; set; }
}
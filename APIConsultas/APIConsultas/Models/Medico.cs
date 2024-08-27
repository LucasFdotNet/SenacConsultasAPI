namespace APIConsultas.Models;

public class Medico
{
    public int MedicoId { get; set; }
    public string? Nome { get; set; }
    public string? Especialidade { get; set; }
    public string? Crm { get; set; }

    // Relacionamento com Consulta
    public ICollection<Consulta>? Consultas { get; set; }
}
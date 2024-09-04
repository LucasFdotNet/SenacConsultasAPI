namespace APIConsultas.Models;

public class Paciente
{
    public int PacienteId { get; set; }
    public string? Nome { get; set; }
    public string? Email { get; set; }
    public string? CPF { get; set; }
    public string? Telefone { get; set; }
    public string? Endereco { get; set; }
    public DateOnly DataNasc { get; set; }
    public string? Senha { get; set; }

}
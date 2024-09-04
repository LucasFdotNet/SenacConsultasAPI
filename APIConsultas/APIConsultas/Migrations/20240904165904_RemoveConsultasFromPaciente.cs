using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APIConsultas.Migrations
{
    /// <inheritdoc />
    public partial class RemoveConsultasFromPaciente : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Horario",
                table: "Consultas");

            migrationBuilder.RenameColumn(
                name: "Dia",
                table: "Consultas",
                newName: "DataHora");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DataHora",
                table: "Consultas",
                newName: "Dia");

            migrationBuilder.AddColumn<TimeOnly>(
                name: "Horario",
                table: "Consultas",
                type: "time(6)",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0));
        }
    }
}

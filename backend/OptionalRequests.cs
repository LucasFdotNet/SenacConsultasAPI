        // Requisição para todas as Consultas
        [HttpGet("consultas")]
        public ActionResult<IEnumerable<Consulta>> GetConsultas(int Paciente)
        {
            var consultas = _context.Consultas.ToList();
            if(consultas is null)
            {
                return NotFound();
            }
                return consultas;           
        }
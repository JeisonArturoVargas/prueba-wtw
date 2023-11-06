namespace prueba_wtw.Domain.Models
{
    public class PersonRegisterDto
    {
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string NumeroDeIdentificacion { get; set; }
        public string Email { get; set; }
        public string TipoIdentificacion { get; set; }

        public string NombreUsuario { get; set; }
        public string Pass { get; set; }
    }
}

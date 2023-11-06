using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace prueba_wtw.Domain.AggregateModels.UserAggregate
{
    public class Person
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Nombres { get; set; }

        [Required]
        public string Apellidos { get; set; }

        [Required]
        [Column("NumeroIdentificacion")]
        public string NumeroDeIdentificacion { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string TipoIdentificacion { get; set; }
        public DateTime FechaCreacion { get; set; } = DateTime.Now;
        public string IdentificacionCompleta { get; set; }
        public string NombreCompleto { get; set; }
        public virtual User Usuario { get; set; }

        public void UpdateCalculatedFields()
        {
            IdentificacionCompleta = $"{TipoIdentificacion}-{NumeroDeIdentificacion}";
            NombreCompleto = $"{Nombres} {Apellidos}";
        }
    }
}

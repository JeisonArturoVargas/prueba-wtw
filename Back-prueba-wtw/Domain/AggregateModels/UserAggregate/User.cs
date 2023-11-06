using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace prueba_wtw.Domain.AggregateModels.UserAggregate
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string NombreUsuario { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Pass { get; set; }
        public DateTime FechaCreacion { get; set; } = DateTime.Now;
        public int PersonaId { get; set; }
        [ForeignKey("PersonaId")]
        public virtual Person Persona { get; set; }
    }
}

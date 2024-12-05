using System.ComponentModel.DataAnnotations;

namespace Game.Models.Entities;
public class Save{
    [Key]
    public string SaveName { get; set; }
    public string SaveLocation { get; set; }
    public string Username { get; set; }
    public User User { get; set; }
}
using System.ComponentModel.DataAnnotations;

namespace Game.Models.Entities;
public class User {
    [Key]
    public string Username { get; set; }
    public int DiceRoll { get; set; }
    public bool BagCheck { get; set; } = false;
    public int Looping { get; set; }
    public ICollection<Save> Saves { get; set; } = [];
}
namespace Game.Models.DTO;

public class UserDTO {
    public string Username { get; set; }
    public int DiceRoll { get; set; }
    public bool BagCheck { get; set; } = false;
    public int Looping { get; set; }
    public ICollection<SaveDTO> Saves { get; set; } = [];
}
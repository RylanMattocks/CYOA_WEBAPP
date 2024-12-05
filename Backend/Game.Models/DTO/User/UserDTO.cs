namespace Game.Models.DTO;

public class UserDTO {
    public string Username { get; set; }
    public ICollection<SaveDTO> Saves { get; set; } = [];
}
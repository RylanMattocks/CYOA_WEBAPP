using Game.Models.DTO;
namespace Game.API.Services;
public interface IUserService {
    public Task<UserDTO> GetUserByUsername(string username);
    public Task AddUser(AddUserDTO addUserDTO);
    public Task AddSave(AddSaveDTO addSaveDTO);
    public Task UpdateUser(UpdateUserDTO updateUserDTO);
    public Task UpdateSave(UpdateSaveDTO updateSaveDTO);
    public Task DeleteUser(string username);
    public Task DeleteSave(string saveName);
}
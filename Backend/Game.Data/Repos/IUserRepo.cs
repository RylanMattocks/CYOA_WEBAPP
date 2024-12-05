using Game.Models.Entities;
namespace Game.Data.Repos;
public interface IUserRepo {
    public Task<User> GetUserByUsername(string username);
    public Task<Save> GetSaveBySaveName(string saveName);
    public Task AddUser(User user);
    public Task AddSave(Save save);
    public Task UpdateUser(User user);
    public Task UpdateSave(Save save);
    public Task DeleteUser(User user);
    public Task DeleteSave(Save save);
}
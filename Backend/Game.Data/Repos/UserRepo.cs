using Game.Models.Entities;
using Microsoft.EntityFrameworkCore;
namespace Game.Data.Repos;
public class UserRepo(GameContext context) : IUserRepo {
    private readonly GameContext _context = context;

    public async Task<User> GetUserByUsername(string username) {
        return await _context.Users
            .Include(u => u.Saves)
            .FirstOrDefaultAsync(u => u.Username == username);
    }
    public async Task<Save> GetSaveBySaveName(string saveName) {
        return await _context.Saves.FirstOrDefaultAsync(s => s.SaveName == saveName);
    }
    public async Task AddUser(User user) {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
    }
    public async Task AddSave(Save save) {
        await _context.Saves.AddAsync(save);
        await _context.SaveChangesAsync();
    }
    public async Task UpdateUser(User user) {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
    }
    public async Task UpdateSave(Save save) {
        _context.Saves.Update(save);
        await _context.SaveChangesAsync();
    }
    public async Task DeleteUser(User user) {
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
    }
    public async Task DeleteSave(Save save) {
        _context.Saves.Remove(save);
        await _context.SaveChangesAsync();
    }
}
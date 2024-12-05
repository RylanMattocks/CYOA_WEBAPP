using Game.Models.Entities;
using Game.Models.DTO;
using Game.Data.Repos;
using AutoMapper;

namespace Game.API.Services;
public class UserService(IUserRepo repo, IMapper mapper) : IUserService {
    private readonly IUserRepo _repo = repo;
    private readonly IMapper _mapper = mapper;
    public async Task<UserDTO> GetUserByUsername(string username) {
        User user = await _repo.GetUserByUsername(username);
        UserDTO userDTO = _mapper.Map<UserDTO>(user);
        return userDTO;
    }
    public async Task AddUser(AddUserDTO addUserDTO) {
        if (await _repo.GetUserByUsername(addUserDTO.Username) is not null) throw new InvalidOperationException("User already exists");
        User user = _mapper.Map<User>(addUserDTO);
        await _repo.AddUser(user);
    }
    public async Task AddSave(AddSaveDTO addSaveDTO) {
        if (await _repo.GetUserByUsername(addSaveDTO.Username) is null) throw new NullReferenceException("User does not exist");
        if (await _repo.GetSaveBySaveName(addSaveDTO.SaveName) is not null) throw new InvalidOperationException("Save already exists");
        Save save = _mapper.Map<Save>(addSaveDTO);
        await _repo.AddSave(save);
    }
    public async Task UpdateUser(UpdateUserDTO updateUserDTO) {
        User user = await _repo.GetUserByUsername(updateUserDTO.Username) ?? throw new NullReferenceException("User does not exist");
        _mapper.Map(updateUserDTO, user);
        await _repo.UpdateUser(user);
    }
    public async Task UpdateSave(UpdateSaveDTO updateSaveDTO) {
        if(await _repo.GetUserByUsername(updateSaveDTO.Username) is null) throw new NullReferenceException("User does not exist");
        Save save = await _repo.GetSaveBySaveName(updateSaveDTO.SaveName) ?? throw new NullReferenceException("Save does not exist");
        _mapper.Map(updateSaveDTO, save);
        await _repo.UpdateSave(save); 
    }
    public async Task DeleteUser(string username) {
        User existingUser = await _repo.GetUserByUsername(username) ?? throw new NullReferenceException("User not found");
        await _repo.DeleteUser(existingUser);
    }
    public async Task DeleteSave(string saveName) {
        Save existingSave = await _repo.GetSaveBySaveName(saveName) ?? throw new NullReferenceException("Save not found");
        await _repo.DeleteSave(existingSave);
    }
}
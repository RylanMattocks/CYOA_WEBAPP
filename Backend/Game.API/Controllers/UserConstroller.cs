using Microsoft.AspNetCore.Mvc;
using Game.API.Services;
using Game.Models.DTO;

namespace Game.API.Controllers;


[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase {
    private readonly IUserService _service;
    public UserController(IUserService userService) {
        _service = userService;
    }

    [HttpGet("{username}")]
    public async Task<IActionResult> GetUserByUsername(string username) {
        try {
            return Ok(await _service.GetUserByUsername(username));
        }
        catch {
            return BadRequest("User not found");
        }
    }

    [HttpPost]
    public async Task<IActionResult> AddUser([FromBody] AddUserDTO addUserDTO) {
        try {
            await _service.AddUser(addUserDTO);
            return Created();
        }
        catch {
            return BadRequest("Could not add user");
        }
    }

    [HttpPost("save")]
    public async Task<IActionResult> AddSave([FromBody] AddSaveDTO addSaveDTO) {
        try {
            await _service.AddSave(addSaveDTO);
            return Created();
        }
        catch {
            return BadRequest("Could not add save");
        }
    }

    [HttpPut]
    public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDTO updateUserDTO) {
        try {
            await _service.UpdateUser(updateUserDTO);
            return NoContent();
        }
        catch {
            return BadRequest("Could not update user");
        }
    }

    [HttpPut("save")]
    public async Task<IActionResult> UpdateSave([FromBody] UpdateSaveDTO updateSaveDTO) {
        try {
            await _service.UpdateSave(updateSaveDTO);
            return NoContent();
        }
        catch {
            return BadRequest("Could not update save");
        }
    }

    [HttpDelete("{identifier}")]
    public async Task<IActionResult> DeleteResource(string identifier, [FromQuery] string type) {
        try {
            if (type.ToLower().Equals("user")) await _service.DeleteUser(identifier);
            else if (type.ToLower().Equals("save")) await _service.DeleteSave(identifier);
            else return BadRequest("Invalid type. Must be 'user' or 'save'");
            return NoContent();
        }
        catch {
            return BadRequest($"Could not delete {type}");
        }
    }
}
using Microsoft.AspNetCore.Mvc;
using Game.API.Services;
using Game.Models.DTO;

namespace Game.API.Controllers;


[ApiController]
[Route("api/[controller]")]
public class GameController : ControllerBase {
    private readonly IGameService _service;
    public GameController(IGameService gameService) {
        _service = gameService;
    }

    [HttpGet("{node}")]
    public IActionResult GetDialogueNode(string node) {
        try {
            return Ok(_service.GetDialogueNode(node));
        }
        catch {
            return BadRequest("Node not found");
        }
    }
}

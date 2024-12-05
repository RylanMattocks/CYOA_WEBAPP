using Game.Utils.Dialogue.Tree;

namespace Game.API.Services;

public interface IGameService {
    public DialogueNode GetDialogueNode(string nodeId);
}
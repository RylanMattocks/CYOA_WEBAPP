using Game.Utils.Dialogue.Tree;

namespace Game.API.Services;

public class GameService : IGameService {
    private readonly DialogueGraph _dialogueGraph;

    public GameService(string dialogueFilePath) {
        _dialogueGraph = DialogueGraph.LoadDialogueGraph(dialogueFilePath).Result;
    }
    public DialogueNode GetDialogueNode(string nodeId) {
        DialogueNode? currentNode = _dialogueGraph.GetNode(nodeId);
        return currentNode is not null ? currentNode : throw new NullReferenceException("Node does not exist");
    }
}
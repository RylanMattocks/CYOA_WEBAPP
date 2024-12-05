using System.Text.Json;

namespace Game.Utils.Dialogue.Tree;

public class DialogueGraph {
    public Dictionary<string, DialogueNode> Graph { get; set; }

    public DialogueGraph() {
        Graph = [];
    }

    public void AddNode(string id, DialogueNode dialogNode) {
        if (!Graph.ContainsKey(id)) {
            Graph.TryAdd(id, dialogNode);
        }
    }

    public DialogueNode? GetNode(string id) {
        if (Graph.TryGetValue(id, out DialogueNode? node)) {
            return node;
        }
        return null;
    }

    public List<string> GetNextDialogIds(string id) {
        DialogueNode dialogNode = GetNode(id);

        if (dialogNode is null) {
            Console.WriteLine($"Dialog ID '{id}' not found.");
            return [];
        }

        return dialogNode.Options.Select(option => option.Next).ToList();
    }

    public void DisplayDialogText(string id) {
        DialogueNode dialogNode = GetNode(id);
        if (dialogNode is not null) {
            Console.WriteLine(dialogNode.Text);
        }
        else Console.WriteLine($"Dialog ID '{id}' not found.");
    }

    public static async Task<DialogueGraph> LoadDialogueGraph(string filePath) {
        DialogueGraph dialogueGraph = new();
        using (FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read))
        {
            var nodes = await JsonSerializer.DeserializeAsync<Dictionary<string, DialogueNode>>(fs);
            foreach (var node in nodes)
            {
                dialogueGraph.AddNode(node.Key, node.Value);
            }
        }
        return dialogueGraph;
    }
}
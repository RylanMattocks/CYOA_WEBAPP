namespace Game.Utils.Dialogue.Tree;

public class DialogueNode{
    public string Text { get; set; }
    public List<DialogueData> Options { get; set; } = [];
    public bool RollDice { get; set; } = false;
    public bool BagCheck { get; set; } = false;
    public bool IsBagChecked { get; set; } = false;
}
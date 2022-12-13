package DatabasePackage;

import java.util.Stack;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public interface SessionStagesManager_IF {
	
	public void updateStages(Object newStage);
	public void refreshSession();
	public Object undo();
	public Object redo();
	public JSONParser getParser();
	public JSONObject getCurrentSessionStage();
	public Stack<JSONObject> getRedoSessionStages();
	public Stack<JSONObject> getUndoSessionStages();
	public void setCurrentSessionStage(JSONObject currentSessionStage);
	public void setRedoSessionStages(Stack<JSONObject> redoSessionStages);
	public void setUndoSessionStages(Stack<JSONObject> undoSessionStages);
	public void setParser(JSONParser parser);

}

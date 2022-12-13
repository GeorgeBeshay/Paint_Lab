package DatabasePackage;

import java.util.Stack;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class SessionStagesManager implements SessionStagesManager_IF{
	
	private JSONParser parser;
	private Stack<JSONObject> undoSessionStages;
	private Stack<JSONObject> redoSessionStages;
	private JSONObject currentSessionStage;
	
	public SessionStagesManager() {
		this.parser = new JSONParser();
		this.undoSessionStages = new Stack<JSONObject>();
		this.redoSessionStages = new Stack<JSONObject>();
		this.currentSessionStage = null;
	}

	public void updateStages(Object newStage) {
		try {
			if(this.currentSessionStage == null) {
				this.currentSessionStage = (JSONObject) this.parser.parse((String) newStage);
			} else {				
				this.undoSessionStages.push(this.currentSessionStage);
				this.currentSessionStage = (JSONObject) this.parser.parse((String) newStage);
			}
		} catch (ParseException e) {
			e.printStackTrace();
			System.out.println("Error in Session Stages Manager >> updateStages()");			
		}
	}

	public void refreshSession() {
		this.currentSessionStage = null;
		this.undoSessionStages.clear();
		this.redoSessionStages.clear();
	}

	public Object undo() {
		if(this.undoSessionStages.size() > 0) {
			this.redoSessionStages.push(this.currentSessionStage);
			this.currentSessionStage = this.undoSessionStages.pop();
		} else {
			System.out.println("User Error: No Stages To Undo.");
		}
		return this.currentSessionStage;
	}

	public Object redo() {
		if(this.redoSessionStages.size() > 0) {
			this.undoSessionStages.push(this.currentSessionStage);
			this.currentSessionStage = this.redoSessionStages.pop();
		} else {
			System.out.println("User Error: No Stages To Redo.");
		}
		return this.currentSessionStage;
	}

	public Stack<JSONObject> getUndoSessionStages() {
		return undoSessionStages;
	}

	public Stack<JSONObject> getRedoSessionStages() {
		return redoSessionStages;
	}

	public JSONObject getCurrentSessionStage() {
		return currentSessionStage;
	}

	public JSONParser getParser() {
		return parser;
	}

	public void setParser(JSONParser parser) {
		this.parser = parser;
	}

	public void setUndoSessionStages(Stack<JSONObject> undoSessionStages) {
		this.undoSessionStages = undoSessionStages;
	}

	public void setRedoSessionStages(Stack<JSONObject> redoSessionStages) {
		this.redoSessionStages = redoSessionStages;
	}

	public void setCurrentSessionStage(JSONObject currentSessionStage) {
		this.currentSessionStage = currentSessionStage;
	}
	

}

package DatabasePackage;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Stack;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class SaveLoadManager implements SaveLoadManager_IF{
	
	private String location;
	
	public SaveLoadManager() {
	}

	@Override
	public void save(SessionStagesManager_IF sessionStagesManager, String filePath, boolean jsonFormat)
			throws IOException {
		File undo=new File(filePath + "UNDO.json");
		File redo=new File(filePath + "REDO.json");
		FileWriter fileWriterUNDO = new FileWriter(undo);
		FileWriter fileWriterREDO = new FileWriter(redo);
		// ------------------ Separator ------------------
		JSONObject currentSessionStage = sessionStagesManager.getCurrentSessionStage();
		Stack<JSONObject> undoSessionStages = sessionStagesManager.getUndoSessionStages();
		Stack<JSONObject> redoSessionStages = sessionStagesManager.getRedoSessionStages();
		
		File undox=new File(filePath + "UNDOx.json");
		File redox=new File(filePath + "REDOx.json");
		FileWriter fileWriterUNDOx = new FileWriter(undox);
		FileWriter fileWriterREDOx = new FileWriter(redox);
		
		// ------------------ Separator ------------------
		fileWriterUNDO.write("[\n");
		fileWriterUNDO.write(currentSessionStage.toJSONString());
		
		if(!jsonFormat) {
		fileWriterUNDOx.write(currentSessionStage.toJSONString());
		fileWriterUNDOx.write("\n");
		}
		
		if(undoSessionStages.size() > 0)
			fileWriterUNDO.write("\n, ");
		else
			fileWriterUNDO.write("\n");
		while(undoSessionStages.size() > 0) {
			String jsonString=undoSessionStages.pop().toJSONString();
			fileWriterUNDO.write(jsonString);
			
			if(!jsonFormat) {
			fileWriterUNDOx.write(jsonString);
			fileWriterUNDOx.write("\n");
			}
			
			if(undoSessionStages.size() >= 1)
				fileWriterUNDO.write("\n, ");
			else
				fileWriterUNDO.write("\n");
		}
		fileWriterUNDO.write("]\n");
		// ------------------ Separator ------------------
		fileWriterREDO.write("[\n");
		while(redoSessionStages.size() > 0) {
			String jsonString=redoSessionStages.pop().toJSONString();
			fileWriterREDO.write(jsonString);
			
			if(!jsonFormat) {
			fileWriterREDOx.write(jsonString);
			fileWriterREDOx.write("\n");
			}
			
			if(redoSessionStages.size() >= 1)
				fileWriterREDO.write("\n, ");
			else
				fileWriterREDO.write("\n");
		}
		fileWriterREDO.write("]\n");
		// ------------------ Separator ------------------
		fileWriterUNDO.close();
		fileWriterREDO.close();

		
		fileWriterUNDOx.close();
		fileWriterREDOx.close();

		
		if(!jsonFormat) {
			System.out.println("---else save---");
			xmlSaveLoad xmlsaveload=new xmlSaveLoad();
			xmlsaveload.xmlSave(filePath, this.location);
			
		}

		undox.delete();
		redox.delete();	
	}

	@Override
	public Object load(SessionStagesManager_IF sessionStagesManager, String filePath)
			throws IOException, ParseException {
		// ------------------ Separator ------------------
		Stack<JSONObject> undoSessionStages = sessionStagesManager.getUndoSessionStages();
		Stack<JSONObject> redoSessionStages = sessionStagesManager.getRedoSessionStages();
		JSONParser parser = sessionStagesManager.getParser();
		// ------------------ Separator ------------------
		undoSessionStages.clear();
		redoSessionStages.clear();
		// ------------------ Separator ------------------
		
		FileReader undoSessionStagesReader = new FileReader(filePath + "UNDO.json");
		FileReader redoSessionStagesReader = new FileReader(filePath + "REDO.json");
		JSONArray UNDOdata = (JSONArray) parser.parse(undoSessionStagesReader);
		JSONArray REDOdata = (JSONArray) parser.parse(redoSessionStagesReader);
		// ------------------ Separator ------------------
		for(int i = UNDOdata.size() - 1 ; i >= 1 ; i--) {
			undoSessionStages.push((JSONObject)UNDOdata.get(i));
		}
		sessionStagesManager.setCurrentSessionStage((JSONObject)(UNDOdata.get(0)));
		for(int i = REDOdata.size() - 1 ; i >= 0 ; i--) {
			redoSessionStages.push((JSONObject)REDOdata.get(i));
		}
		// ------------------ Separator ------------------
		return sessionStagesManager.getCurrentSessionStage();
	}
}

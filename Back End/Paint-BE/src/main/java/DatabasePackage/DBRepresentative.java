package DatabasePackage;

import java.io.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import java.util.*;

public class DBRepresentative implements DBRepresentativeI{
	
	private String location;
	private JSONParser parser;
	private Stack<JSONObject> undoSessionStages;
	private Stack<JSONObject> redoSessionStages;
	private static DBRepresentative dbRepresentative;
	private JSONObject currentSessionStage;
	
	
	private DBRepresentative() {
		this.location = "src\\\\main\\\\java\\\\DatabasePackage\\\\Database\\\\";
		this.parser = new JSONParser();
		this.undoSessionStages = new Stack<JSONObject>();
		this.redoSessionStages = new Stack<JSONObject>();
		this.currentSessionStage = null;
	}
	
	public static DBRepresentative getInstance() {
		if(dbRepresentative == null) 
			dbRepresentative = new DBRepresentative();
		return dbRepresentative;
	}
	
	public void refreshSession() {
		this.currentSessionStage = null;
		this.undoSessionStages.clear();
		this.redoSessionStages.clear();
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
			System.out.println("Error in DBRepresentative >> updateSessions()");			
		}
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
	
	public void save(String fileName) throws IOException {
		FileWriter fileWriterUNDO = new FileWriter(this.location + fileName + "UNDO.json");
		FileWriter fileWriterREDO = new FileWriter(this.location + fileName + "REDO.json");
		// ------------------ Separator ------------------
		fileWriterUNDO.write("[\n");
		fileWriterUNDO.write(this.currentSessionStage.toJSONString());
		if(this.undoSessionStages.size() > 0)
			fileWriterUNDO.write("\n, ");
		else
			fileWriterUNDO.write("\n");
		while(this.undoSessionStages.size() > 0) {
			fileWriterUNDO.write(this.undoSessionStages.pop().toJSONString());
			if(this.undoSessionStages.size() >= 1)
				fileWriterUNDO.write("\n, ");
			else
				fileWriterUNDO.write("\n");
		}
		fileWriterUNDO.write("]\n");
		// ------------------ Separator ------------------
		fileWriterREDO.write("[\n");
		while(this.redoSessionStages.size() > 0) {
			fileWriterREDO.write(this.redoSessionStages.pop().toJSONString());
			if(this.redoSessionStages.size() >= 1)
				fileWriterREDO.write("\n, ");
			else
				fileWriterREDO.write("\n");
		}
		fileWriterREDO.write("]\n");
		// ------------------ Separator ------------------
		fileWriterUNDO.close();
		fileWriterREDO.close();
	}
	
	public Object load(String fileName) throws IOException, ParseException {
		this.undoSessionStages.clear();
		this.redoSessionStages.clear();
		// ------------------ Separator ------------------
		FileReader undoSessionStagesReader = new FileReader(this.location + fileName + "UNDO.json");
		FileReader redoSessionStagesReader = new FileReader(this.location + fileName + "REDO.json");
		JSONArray UNDOdata = (JSONArray) this.parser.parse(undoSessionStagesReader);
		JSONArray REDOdata = (JSONArray) this.parser.parse(redoSessionStagesReader);
		// ------------------ Separator ------------------
		for(int i = UNDOdata.size() - 1 ; i >= 1 ; i--) {
			this.undoSessionStages.push((JSONObject)UNDOdata.get(i));
		}
		this.currentSessionStage = (JSONObject)(UNDOdata.get(0));
		for(int i = REDOdata.size() - 1 ; i >= 0 ; i--) {
			this.redoSessionStages.push((JSONObject)REDOdata.get(i));
		}
		// ------------------ Separator ------------------
		return this.currentSessionStage;
	}


}

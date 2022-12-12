package DatabasePackage;

import org.json.simple.*;
import java.io.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import java.util.*;

public class DBRepresentative implements DBRepresentativeI{
	
	String location;
	JSONParser parser;
	Stack<JSONObject> undoSessionStages;
	Stack<JSONObject> redoSessionStages;
	private static DBRepresentative dbRepresentative;
	
	private DBRepresentative() {
		this.location = "src\\\\main\\\\java\\\\DatabasePackage\\\\Database\\\\";
		this.parser = new JSONParser();
		this.undoSessionStages = new Stack<JSONObject>();
		this.redoSessionStages = new Stack<JSONObject>();
	}
	
	public static DBRepresentative getInstance() {
		if(dbRepresentative == null) 
			dbRepresentative = new DBRepresentative();
		return dbRepresentative;
	}
	
	public void updateStages(Object newStage) {
		try {
			this.undoSessionStages.push((JSONObject) this.parser.parse((String) newStage));
		} catch (ParseException e) {
			e.printStackTrace();
			System.out.println("Error in DBRepresentative >> updateSessions()");			
		}
	}
	
	public Object undo() {
		if(this.undoSessionStages.size() > 0) {
			JSONObject tempStage = this.undoSessionStages.pop();
			this.redoSessionStages.push(tempStage);
			return (Object)tempStage;
		}
		System.out.println("No Stages To Undo.");
		return null;
	}
	
	public Object redo() {
		if(this.redoSessionStages.size() > 0) {
			JSONObject tempStage = this.redoSessionStages.pop();
			this.undoSessionStages.push(tempStage);
			return tempStage;
		}
		System.out.println("No Stages To Redo.");
		return null;
	}
	
	public void save(String fileName) throws IOException {
		FileWriter fileWriterUNDO = new FileWriter(this.location + fileName + "UNDO.json");
		FileWriter fileWriterREDO = new FileWriter(this.location + fileName + "REDO.json");
		fileWriterUNDO.write("[\n");
		while(this.undoSessionStages.size() > 0) {
			fileWriterUNDO.write(this.undoSessionStages.pop().toJSONString());
			if(this.undoSessionStages.size() >= 1)
				fileWriterUNDO.write("\n, ");
			else
				fileWriterUNDO.write("\n");
		}
		fileWriterUNDO.write("]\n");
		fileWriterREDO.write("[\n");
		while(this.redoSessionStages.size() > 0) {
			fileWriterREDO.write(this.redoSessionStages.pop().toJSONString());
			if(this.redoSessionStages.size() >= 1)
				fileWriterREDO.write("\n, ");
			else
				fileWriterREDO.write("\n");
		}
		fileWriterREDO.write("]\n");
		fileWriterUNDO.close();
		fileWriterREDO.close();
//		try {
//			JSONObject dataToBeSavedJSON = (JSONObject) parser.parse((String)dataToBeSaved);
//			FileWriter fileWriter = new FileWriter(this.location + fileName + ".json");
//			fileWriter.write(dataToBeSavedJSON.toJSONString());
//			fileWriter.close();
//		} catch (ParseException e) {
//			e.printStackTrace();
//			System.out.println("Error in DBRepresentative >> save");
//		}
	}
	
	public Object load(String fileName) throws IOException, ParseException {
		this.undoSessionStages.clear();
		this.redoSessionStages.clear();
		FileReader undoSessionStagesReader = new FileReader(this.location + fileName + "UNDO.json");
		FileReader redoSessionStagesReader = new FileReader(this.location + fileName + "REDO.json");
		JSONArray UNDOdata = (JSONArray) this.parser.parse(undoSessionStagesReader);
		JSONArray REDOdata = (JSONArray) this.parser.parse(redoSessionStagesReader);
		for(int i = UNDOdata.size() - 1 ; i >= 0 ; i--) {
			this.undoSessionStages.push((JSONObject)UNDOdata.get(i));
		}
		for(int i = REDOdata.size() - 1 ; i >= 0 ; i--) {
			this.redoSessionStages.push((JSONObject)REDOdata.get(i));
		}
//		System.out.println(data);
//		System.out.println(data.get(0));
//		Scanner S1 = new Scanner(undoSessionStagesReader);
//		Scanner S2 = new Scanner(redoSessionStagesReader);
//		while(S1.hasNextLine()) {
//			this.undoSessionStages.push((JSONObject) this.parser.parse(S1.nextLine()));
//		}
//		while(S2.hasNextLine()) {
//			this.redoSessionStages.push((JSONObject) this.parser.parse(S2.nextLine()));
//		}
//		undoSessionStagesReader.close();
//		redoSessionStagesReader.close();
//		S1.close();
//		S2.close();
//		if(this.undoSessionStages.size() > 0) {
//			JSONObject tempStage = this.undoSessionStages.pop();
//			this.undoSessionStages.push(tempStage);
//			return tempStage;
//		}
		return null;
//		try {
//			FileReader reader = new FileReader(this.location + fileName + ".json");
//			return parser.parse(reader);
//		} catch (FileNotFoundException e) {
//			e.printStackTrace();
//			System.out.println("Error in DBRepresentative >> load");
//		}
//		return null;
	}


}

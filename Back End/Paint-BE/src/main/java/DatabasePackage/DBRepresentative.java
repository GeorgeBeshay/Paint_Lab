package DatabasePackage;

import java.io.*;
import org.json.simple.parser.ParseException;

public class DBRepresentative implements DBRepresentativeI{
	
	private SessionStagesManager_IF sessionStagesManager;
	private SaveLoadManager_IF saveLoadManager;
	private static DBRepresentative dbRepresentative;
	
	private DBRepresentative() {
		this.sessionStagesManager = new SessionStagesManager();
		this.saveLoadManager = new SaveLoadManager();
	}
	
	public static DBRepresentative getInstance() {
		if(dbRepresentative == null) 
			dbRepresentative = new DBRepresentative();
		return dbRepresentative;
	}
	
	public void refreshSession() {
		this.sessionStagesManager.refreshSession();
	}
	public void updateStages(Object newStage) {
		this.sessionStagesManager.updateStages(newStage);
	}
	public Object undo() {
		return this.sessionStagesManager.undo();
	}
	public Object redo() {
		return this.sessionStagesManager.redo();
	}
	public void save(String filePath, boolean jsonFormat) throws IOException {
		this.saveLoadManager.save(this.sessionStagesManager, filePath, jsonFormat);
	}
	public Object load(String filePath) throws IOException, ParseException {
		return this.saveLoadManager.load(this.sessionStagesManager, filePath);
	}

}

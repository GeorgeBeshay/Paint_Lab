package DatabasePackage;

import java.io.IOException;

import org.json.simple.parser.ParseException;

public interface SaveLoadManager_IF {
	
	public void save(SessionStagesManager_IF sessionStagesManager, String fileName, boolean jsonFormat) throws IOException;
	public Object load(SessionStagesManager_IF sessionStagesManager, String fileName) throws IOException, ParseException ;

}

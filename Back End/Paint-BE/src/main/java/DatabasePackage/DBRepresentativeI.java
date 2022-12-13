package DatabasePackage;

import java.io.IOException;

import org.json.simple.parser.ParseException;

public interface DBRepresentativeI {
	
	public void save(String fileName, boolean jsonFormat) throws IOException;
	public Object load(String fileName) throws IOException, ParseException; 
	public Object redo();
	public Object undo();

}

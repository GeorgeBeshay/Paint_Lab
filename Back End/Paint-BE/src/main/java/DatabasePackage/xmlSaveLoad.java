package DatabasePackage;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.json.XML;
import org.json.JSONObject;

public class xmlSaveLoad {
	public void xmlSave(String fileName,String location) throws IOException {
		//read JSON fills
		Path pathUndo = Paths.get(location + fileName + "UNDO.json");
		Path pathRedo = Paths.get(location + fileName + "REDO.json");
		String undoString = Files.readAllLines(pathUndo).get(1);
		String redoString = Files.readAllLines(pathRedo).get(1);
		JSONObject undojson = new JSONObject(undoString);
		JSONObject redojson = new JSONObject(redoString);
		
		File xmlUndo=new File(location + fileName + "UNDO.xml");
		File xmlRedo=new File(location + fileName + "REDO.xml");
		
	    FileWriter fileWriterUNDO = new FileWriter(xmlUndo);
	    fileWriterUNDO.write(XML.toString(undojson));
	    
	    FileWriter fileWriterREDO = new FileWriter(xmlRedo);
	    fileWriterREDO.write(XML.toString(redojson));
	    
	    fileWriterREDO.close();
	    fileWriterUNDO.close();
		
	}

}

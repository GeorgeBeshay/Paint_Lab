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

	
	public void xmlSave(String filePath,String location) throws IOException {
		
		Path pathUndo = Paths.get(filePath + "UNDOx.json");
		Path pathRedo = Paths.get(filePath + "REDOx.json");
		int lengthUndo=(int) Files.lines(pathUndo).count();
		
		File xmlUndo=new File(filePath + "UNDO.xml");
		FileWriter fileWriterUNDO = new FileWriter(xmlUndo);
		
		for(int i=0;i<lengthUndo;i++) {
			String undoString = Files.readAllLines(pathUndo).get(i);
			JSONObject undojson = new JSONObject(undoString);
			fileWriterUNDO.write(XML.toString(undojson));
			fileWriterUNDO.write("\n");
		}		
		int lengthRedo=(int) Files.lines(pathRedo).count();
		File xmlRedo=new File(filePath + "REDO.xml");
		FileWriter fileWriterREDO = new FileWriter(xmlRedo);
		for(int i=0;i<lengthRedo;i++) {
			String redoString = Files.readAllLines(pathRedo).get(i);
			JSONObject redojson = new JSONObject(redoString);
			fileWriterREDO.write(XML.toString(redojson));
			fileWriterREDO.write("\n");
		}
		
		fileWriterUNDO.close();
	    fileWriterREDO.close();	
		
	}
}

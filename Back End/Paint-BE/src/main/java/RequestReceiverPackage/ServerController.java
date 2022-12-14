package RequestReceiverPackage;

import java.io.File;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import ShapesPackage.*;
import junit.framework.Test;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/callBackEndServer")
public class ServerController {
	
	@Autowired
	private ServerCore myServerCore = ServerCore.getServerCoreInstance();
	
	@PostMapping(value = {"/refreshSession/"})
	public void refreshSession() {
		System.out.println("Front End Server Requested to refresh the session " + 
				"\nBack End Server is refreshing the session \n") ;
		System.out.println("------------------------------------------------");
		 this.myServerCore.refreshSession();
	}
	
	@PostMapping(value = {"/shapeCreation/{shapeName}"})
	public Shape createShape(@PathVariable String shapeName) {
		Shape shapeToBeReturned = myServerCore.createShapeCore(shapeName);
		System.out.println("Front End Server Requested a " + shapeName + 
				"\nBack End Server is Sending: \n" + shapeToBeReturned.toString());
		System.out.println("------------------------------------------------");
		return shapeToBeReturned;
	}
	
	@PostMapping(value = {"/shapeClone/{shapeName}"})
	public Object createShapeClone(@RequestBody Object shape, @PathVariable String shapeName) {
		System.out.println(shape.toString());
		Shape shapeToBeReturned=null;
		JSONParser parser= new JSONParser();
			try {
				JSONObject shape3 = (JSONObject) parser.parse((String)shape);
				shape3=(JSONObject) shape3.get("attrs");
				ObjectMapper mapper=new ObjectMapper();
				Shape shape4 = null;
					try {
						if(shapeName.equalsIgnoreCase("Rect")) {
							shape4 = mapper.readValue(shape3.toJSONString(), Rectangle.class);
						}else if(shapeName.equalsIgnoreCase("Circle")) {
							shape4 = mapper.readValue(shape3.toJSONString(), Circle.class);	
						}else if(shapeName.equalsIgnoreCase("Triangle")) {
							shape4 = mapper.readValue(shape3.toJSONString(), Triangle.class);	
						}else if(shapeName.equalsIgnoreCase("Pentagon")) {
							shape4 = mapper.readValue(shape3.toJSONString(), Pentagon.class);	
						}else if(shapeName.equalsIgnoreCase("Hexagon")) {
							shape4 = mapper.readValue(shape3.toJSONString(), Hexagon.class);	
						}else if(shapeName.equalsIgnoreCase("Ellipse")) {
							shape4 = mapper.readValue(shape3.toJSONString(), Ellipse.class);	
						}else if(shapeName.equalsIgnoreCase("Line")) {
							shape4 = mapper.readValue(shape3.toJSONString(), Line.class);
							}
					} catch (JsonMappingException e) {
						e.printStackTrace();
					} catch (JsonProcessingException e) {
						e.printStackTrace();
					}
				    shapeToBeReturned = myServerCore.createShapeCloneCore(shape4);
			} catch (org.json.simple.parser.ParseException e1) {
				e1.printStackTrace();
			}
			
		System.out.println("Front End Server Requested a clone " + 
				"\nBack End Server is Sending: \n" );
		System.out.println("------------------------------------------------");
		return shapeToBeReturned;
	}
	
	@PostMapping(value = {"/saveStage/"})
	public void saveStage(@RequestBody Object stage) {
		myServerCore.updateStages(stage);
		System.out.println("Front End Server Requested to update session stages:" + stage + 
				"\nBack End Server updated session stages: \n");
		System.out.println("------------------------------------------------");
	}
	
	@PostMapping(value = {"/loadSession/{jsonFormat}"})
	public Object loadSession(@RequestBody String loadPath , @PathVariable boolean jsonFormat) {
		try {
			File test =new File(loadPath + "UNDO.json");
		}catch(Exception e){
			loadPath = "src\\main\\java\\DatabasePackage\\Database\\";
			System.out.println("Path not found");
		}
		Object tempStage = myServerCore.load(jsonFormat, loadPath);
		System.out.println("Front End Server Requested to load:" + 
				"\nBack End Server loaded: \n" + tempStage);
		System.out.println("------------------------------------------------");
		return tempStage;
	}
	
	@PostMapping(value = {"/saveSession/{jsonFormat}"})
	public void saveSession(@RequestBody String savePath, @PathVariable boolean jsonFormat) {
		try {
			File test =new File(savePath + "UNDO.json");
		}catch(Exception e){
			savePath = "src\\main\\java\\DatabasePackage\\Database\\";
			System.out.println("Path not found");
		}
		myServerCore.save(jsonFormat, savePath);
		System.out.println("Front End Server Requested to save session " + 
				"\nBack End Server saved the session: \n");
		System.out.println("------------------------------------------------");
	}
	
	@PostMapping(value = {"/undo/"})
	public Object undoStage() {
		Object tempStage = myServerCore.undo();
		System.out.println("Front End Server Requested to undo:" + 
				"\nBack End Server did the undo: \n" + tempStage);
		System.out.println("------------------------------------------------");
		return tempStage;
	}
	
	@PostMapping(value = {"/redo/"})
	public Object redoStage() {
		Object tempStage = myServerCore.redo();
		System.out.println("Front End Server Requested to redo:" + 
				"\nBack End Server did the redo: \n" + tempStage);
		System.out.println("------------------------------------------------");
		return tempStage;
	}

}

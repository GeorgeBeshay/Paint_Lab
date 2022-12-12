package RequestReceiverPackage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ShapesPackage.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/callBackEndServer")
public class ServerController {
	
	@Autowired
	private ServerCore myServerCore = ServerCore.getServerCoreInstance();
	
	@PostMapping(value = {"/shapeCreation/{shapeName}"})
	public Shape createShape(@PathVariable String shapeName) {
		Shape shapeToBeReturned = myServerCore.createShapeCore(shapeName);
		System.out.println("------------------------------------------------");
		System.out.println("Front End Server Requested a " + shapeName + 
				"\nBack End Server is Sending: \n" + shapeToBeReturned.toString());
		return shapeToBeReturned;
	}
	
	@PostMapping(value = {"/saveStage/"})
	public void saveStage(@RequestBody Object stage) {
		myServerCore.updateStages(stage);
		System.out.println("------------------------------------------------");
		System.out.println("Front End Server Requested to update session stages:" + stage + 
				"\nBack End Server updated session stages: \n");
//		return stage;
	}
	
	@PostMapping(value = {"/loadSession/"})
	public Object loadSession() {
		Object tempStage = myServerCore.load();
		System.out.println("------------------------------------------------");
		System.out.println("Front End Server Requested to load:" + 
				"\nBack End Server loaded: \n" + tempStage);
		return tempStage;
	}
	
	@PostMapping(value = {"/saveSession/"})
	public void saveSession() {
		myServerCore.save();
		System.out.println("------------------------------------------------");
		System.out.println("Front End Server Requested to save session " + 
				"\nBack End Server saved the session: \n");
	}
	
	@PostMapping(value = {"/undo/"})
	public Object undoStage() {
		Object tempStage = myServerCore.undo();
		System.out.println("------------------------------------------------");
		System.out.println("Front End Server Requested to undo:" + 
				"\nBack End Server did the undo: \n" + tempStage);
		return tempStage;
	}
	
	@PostMapping(value = {"/redo/"})
	public Object redoStage() {
		Object tempStage = myServerCore.redo();
		System.out.println("------------------------------------------------");
		System.out.println("Front End Server Requested to redo:" + 
				"\nBack End Server did the redo: \n" + tempStage);
		return tempStage;
	}

}

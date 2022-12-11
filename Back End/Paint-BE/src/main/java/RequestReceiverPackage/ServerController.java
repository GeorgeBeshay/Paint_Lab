package RequestReceiverPackage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
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

}

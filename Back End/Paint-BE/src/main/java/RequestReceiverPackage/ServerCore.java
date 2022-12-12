package RequestReceiverPackage;

import java.io.IOException;

import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import ShapesPackage.*;
import DatabasePackage.*;

@Service
public class ServerCore {
	
	private  ShapeFactory shapeFactory = ShapeFactory.getInstance();
	private  DBRepresentative dbRepresentative = DBRepresentative.getInstance();
	private static ServerCore serverCore;
	
	private ServerCore() {}
	
	public Shape createShapeCore(String shapeName) {
		Shape shapeToReturn = shapeFactory.getShape(shapeName);
		shapeToReturn.draw();
		return shapeToReturn;
	}
	
	public static ServerCore getServerCoreInstance() {
		if(ServerCore.serverCore == null) 
			serverCore = new ServerCore();
		return ServerCore.serverCore;
	}
	
	public void updateStages(Object stage) {
		this.dbRepresentative.updateStages(stage);
	}
	
	public Object undo() {
		return this.dbRepresentative.undo();
	}
	
	public Object redo() {
		return this.dbRepresentative.redo();
	}
	
	public void save() {
		try {
			this.dbRepresentative.save("testing2");
		} catch (IOException e) {
			System.out.println("Error in ServerCore >> save()");
			e.printStackTrace();
		}
	}
	
	public Object load() {
		try {
			return this.dbRepresentative.load("testing2");
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		}
		System.out.println("Error in ServerCore >> load()");
		return null;
	}
	
	public void refreshSession() {
		this.dbRepresentative.refreshSession();
	}
}

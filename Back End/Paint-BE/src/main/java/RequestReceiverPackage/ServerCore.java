package RequestReceiverPackage;

import org.springframework.stereotype.Service;

import ShapesPackage.*;

@Service
public class ServerCore {
	
	private static ShapeFactory shapeFactory = ShapeFactory.getInstance();
	private static ServerCore serverCore;
	
	private ServerCore() {}
	
	public Shape createShapeCore(String shapeName) {
		Shape shapeToReturn = ServerCore.shapeFactory.getShape(shapeName);
		shapeToReturn.draw();
		return shapeToReturn;
	}
	
	public static ServerCore getServerCoreInstance() {
		if(ServerCore.serverCore == null) 
			return new ServerCore();
		return ServerCore.serverCore;
	}

}

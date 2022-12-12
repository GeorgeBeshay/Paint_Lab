package ShapesPackage;

import java.util.*;

public class ShapesProxy implements ShapesRepresentative{
	
	private HashMap<String, Shape> shapesCreated;
	private ShapeFactory shapeFactory;
	
	public ShapesProxy() {
		this.shapesCreated = new HashMap<String, Shape>(8);
		this.shapeFactory = ShapeFactory.getInstance();
	}
	
	public Shape getShape(String shapeName) {
		if(this.shapesCreated.get(shapeName) == null) 
			this.shapesCreated.put(shapeName, this.shapeFactory.getShape(shapeName));
		return this.shapesCreated.get(shapeName);
	}

}

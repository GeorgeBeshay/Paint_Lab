package ShapesPackage;

public class ShapeFactory implements ShapesRepresentative {
	
	private static ShapeFactory shapeFactory;
	
	private ShapeFactory() {}
	
	public static ShapeFactory getInstance() {
		if (shapeFactory == null) {
			shapeFactory = new ShapeFactory();
		}
		return shapeFactory;
	}
	
	public Shape getShape(String shapeName) {
		if(shapeName == null) 
			return null;
		else if (shapeName.equalsIgnoreCase("Rectangle")) 
			return new Rectangle();
		else if(shapeName.equalsIgnoreCase("Circle")) 
			return new Circle();
		else if(shapeName.equalsIgnoreCase("Triangle")) 
			return new Triangle();
		else if(shapeName.equalsIgnoreCase("Square")) 
			return new Square();
		else if(shapeName.equalsIgnoreCase("Line"))
			return new Line();
		else if(shapeName.equalsIgnoreCase("Pentagon"))
			return new Pentagon();
		else if(shapeName.equalsIgnoreCase("Hexagon"))
			return new Hexagon();
		else if(shapeName.equalsIgnoreCase("Ellipse"))
			return new Ellipse();
		else 
			return null;
		
	}

}

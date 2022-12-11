package ShapesPackage;

public class Triangle extends Shape{
	
	private int sides;
	private double radius;
	
	public Triangle() {
		super();
	}
	
	public Triangle(Triangle triangle) {
		super(triangle);
		this.sides = triangle.getSides();
		this.radius = triangle.getRadius();
	}

	public void draw() {
		this.setRadius(100);
		this.setSides(3);
	}

	@Override
	public Shape clone() {
		return new Triangle(this);
	}

	@Override
	public String toString() {
		return "Triangle [sides=" + sides + ", radius=" + radius + "]\n" + super.toString();
	}

	public int getSides() {
		return sides;
	}

	public void setSides(int sides) {
		this.sides = sides;
	}

	public double getRadius() {
		return radius;
	}

	public void setRadius(double radius) {
		this.radius = radius;
	}

	
	

}

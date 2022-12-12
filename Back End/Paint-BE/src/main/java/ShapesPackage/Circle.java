package ShapesPackage;

public class Circle extends Shape {
	
	private double radius;

	public Circle() {
		super();
	}
	
	public Circle(Circle circle) {
		super(circle);
		this.radius = circle.getRadius();
	}
	
	public void draw() {
		this.setRadius(40);
	}

	@Override
	public String toString() {
		return "Circle [radius=" + radius + "]\n" + super.toString();
	}

	@Override
	public Shape clone() {
		return new Circle(this);
	}

	public double getRadius() {
		return radius;
	}

	public void setRadius(double radius) {
		this.radius = radius;
	}
	
	

}

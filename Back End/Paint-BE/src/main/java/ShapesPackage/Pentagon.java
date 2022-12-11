package ShapesPackage;

public class Pentagon extends Shape{
	
	private int sides;
	private double radius;
	
	public Pentagon() {
		super();
	}
	
	public Pentagon(Pentagon pentagon) {
		super(pentagon);
		this.sides = pentagon.getSides();
		this.radius = pentagon.getRadius();
	}
	

	@Override
	public void draw() {
		this.setRadius(100);
		this.setSides(5);	
	}

	@Override
	public String toString() {
		return "Pentagon [sides=" + sides + ", radius=" + radius + "]\n" + super.toString();
	}

	@Override
	public Shape clone() {
		return new Pentagon(this);
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

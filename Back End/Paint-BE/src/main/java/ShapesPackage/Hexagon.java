package ShapesPackage;

public class Hexagon extends Shape{
	
	private int sides;
	private double radius;
	
	public Hexagon() {
		super();
	}
	
	public Hexagon(Hexagon hexagon) {
		super(hexagon);
		this.sides = hexagon.getSides();
		this.radius = hexagon.getRadius();
	}

	@Override
	public void draw() {
		this.setRadius(100);
		this.setSides(6);	
	}

	@Override
	public Shape clone() {
		return new Hexagon(this);
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

	@Override
	public String toString() {
		return "Hexagon [sides=" + sides + ", radius=" + radius + "]\n" + super.toString();
	}
	
	

}

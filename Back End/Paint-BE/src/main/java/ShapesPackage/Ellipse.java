package ShapesPackage;

public class Ellipse extends Shape{
	
	private double radiusX;
	private double radiusY;
	
	public Ellipse() {
		super();
	}
	
	public Ellipse(Ellipse ellipse) {
		super(ellipse);
		this.radiusX = ellipse.getRadiusX();
		this.radiusY = ellipse.getRadiusY();
	}
	
	@Override
	public void draw() {
		this.setRadiusX(100);
		this.setRadiusY(50);
	}

	@Override
	public Shape clone() {
		return new Ellipse(this);
	}

	public double getRadiusX() {
		return radiusX;
	}

	public void setRadiusX(double radiusX) {
		this.radiusX = radiusX;
	}

	public double getRadiusY() {
		return radiusY;
	}

	public void setRadiusY(double radiusY) {
		this.radiusY = radiusY;
	}

	@Override
	public String toString() {
		return "Ellipse [radiusX=" + radiusX + ", radiusY=" + radiusY + "]\n" + super.toString();
	}
	
	

}

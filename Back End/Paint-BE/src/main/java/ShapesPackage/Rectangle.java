package ShapesPackage;

public class Rectangle extends Shape{
	
	private double width;
	private double height;
	
	public Rectangle() {
		super();
	}
	
	public Rectangle(Rectangle rectangle) {
		super(rectangle);
		this.width = rectangle.getWidth();
		this.height = rectangle.getHeight();
	}

	public void draw() {
		this.width = 100;
		this.height = 50;
	}

	@Override
	public String toString() {
		return "Rectangle [width=" + width + ", height=" + height + "]\n" + super.toString();
	}

	@Override
	public Shape clone() {
		return new Rectangle(this);
	}

	public double getWidth() {
		return width;
	}

	public void setWidth(double width) {
		this.width = width;
	}

	public double getHeight() {
		return height;
	}

	public void setHeight(double height) {
		this.height = height;
	}
	
	
	
}

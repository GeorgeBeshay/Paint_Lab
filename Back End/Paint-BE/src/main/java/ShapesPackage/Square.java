package ShapesPackage;

public class Square extends Shape{
	
	private double width;
	private double height;
	
	public Square() {
		super();
	}
	
	public Square(Square square) {
		super(square);
		this.width = square.width;
		this.height = square.height;
	}

	public void draw() {
		this.width = 80;
		this.height = 80;
	}

	@Override
	public String toString() {
		return "Square [width=" + width + ", height=" + height + "]\n" + super.toString();
	}

	@Override
	public Shape clone() {
		return new Square(this);
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

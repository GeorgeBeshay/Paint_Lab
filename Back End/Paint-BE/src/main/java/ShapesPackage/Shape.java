package ShapesPackage;

public abstract class Shape implements Cloneable{
	
	private double x;
	private double y;
	private boolean draggable;
	private String id;
	private double strokeWidth;
	private String stroke;
	private String fill;
	private double rotation;
	private double skewX;
	private double skeyY;
	
	public Shape() {
		this.x = 150;
		this.y = 150;
		this.draggable = false;
		this.stroke = "black";
		this.strokeWidth = 5;
		this.id = "1";
//		this.rotation = 0;
	}
	
	public Shape(Shape shape) {
		this.x = shape.getX();
		this.y = shape.getY();
		this.draggable = shape.isDraggable();
		this.id = shape.getId();
		this.strokeWidth = shape.getStrokeWidth();
		this.stroke = shape.getStroke();
		this.fill=shape.getFill();
		this.rotation = shape.getRotation();
		this.skewX = shape.getSkewX();
		this.skeyY = shape.getSkeyY();
	}
	
	public abstract void draw();
	
	@Override
	public abstract Shape clone();
	
	@Override
	public String toString() {
		return "Shape [x=" + x + ", y=" + y + ", draggable=" + draggable + ", id=" + id
				+ ", strokeWidth=" + strokeWidth + ", stroke=" + stroke + "]";
	};
	

	public String getId() {
		return this.id;
	}
	public void setId(String id) {
		this.id = id;
	}

	public double getX() {
		return x;
	}

	public void setX(double x) {
		this.x = x;
	}

	public double getY() {
		return y;
	}

	public void setY(double y) {
		this.y = y;
	}

	public boolean isDraggable() {
		return draggable;
	}

	public void setDraggable(boolean draggable) {
		this.draggable = draggable;
	}

	public double getStrokeWidth() {
		return strokeWidth;
	}

	public void setStrokeWidth(double strokeWidth) {
		this.strokeWidth = strokeWidth;
	}

	public String getStroke() {
		return stroke;
	}

	public void setStroke(String stroke) {
		this.stroke = stroke;
	}

	public String getFill() {
		return fill;
	}

	public void setFill(String fill) {
		this.fill = fill;
	}

	public double getRotation() {
		return rotation;
	}

	public void setRotation(double rotation) {
		this.rotation = rotation;
	}

	public double getSkewX() {
		return skewX;
	}

	public void setSkewX(double skewX) {
		this.skewX = skewX;
	}

	public double getSkeyY() {
		return skeyY;
	}

	public void setSkeyY(double skeyY) {
		this.skeyY = skeyY;
	}
	
	
	
}

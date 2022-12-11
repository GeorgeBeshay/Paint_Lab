package ShapesPackage;

import java.util.Arrays;

public class Line extends Shape{
	
	double Points[];
	
	public Line() {
		super();
	}
	
	public Line(Line line) {
		super(line);
		this.Points = line.getPoints();
	}

	@Override
	public void draw() {
		this.Points = new double[4];
		this.Points[0] = 0; this.Points[1] = 0; this.Points [2] = 200; this.Points[3] = 0; 
	}

	@Override
	public Shape clone() {
		return new Line(this);
	}

	@Override
	public String toString() {
		return "Line [Points=" + Arrays.toString(Points) + "]\n" + super.toString();
	}

	public double[] getPoints() {
		return Points;
	}

	public void setPoints(double[] points) {
		Points = points;
	}
	
	

}

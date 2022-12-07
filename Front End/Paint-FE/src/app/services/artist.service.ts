// This is Service Should Be Used To Implement All The Drawing Methods

import { Injectable } from '@angular/core';
import Konva from 'konva';
import { Stage } from 'konva/lib/Stage';
import { Shape } from 'konva/lib/Shape';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  constructor() {}
  // transformer: any;
  // getTransformer(transformer: any){
  //   this.transformer = transformer;
  // }

  drawRect() {
    let shapeToBeReturned = new Konva.Rect({
      x: 100,
      y: 100,
      stroke: 'blue',
      strokeWidth: 12,
      cornerRadius: 12,
      fill: 'orange',
      width: 200,
      height: 100,
    });
    // shapeToBeReturned.on('click', () => {
    //   this.transformer.nodes([shapeToBeReturned]);
    // });
    return shapeToBeReturned;
  }

  drawSquare() {
    return new Konva.Rect({
      x: 100,
      y: 100,
      stroke: 'blue',
      strokeWidth: 12,
      cornerRadius: 12,
      fill: 'orange',
      width: 100,
      height: 100,
    });
  }

  drawCirc() {
    let shapeToBeReturned = new Konva.Circle({
      x: 100,
      y: 100,
      stroke: 'black',
      radius: 100,
    });
    shapeToBeReturned.on('click', () => {
      console.log(shapeToBeReturned.getAttrs());
    });
    return shapeToBeReturned;
  }

  drawRing() {
    return new Konva.Ring({
      x: 100,
      y: 100,
      fill: 'red',
      outerRadius: 50,
      innerRadius: 30,
    });
  }

  drawStar() {
    return new Konva.Star({
      x: 100,
      y: 100,
      fill: 'pink',
      stroke: 'orange',
      outerRadius: 50,
      innerRadius: 30,
      numPoints: 9,
    });
  }

  drawLine() {
    let shapeToBeReturned = new Konva.Line({
      x: 100,
      y: 100,
      stroke: 'orange',
      strokeWidth: 2,
      points: [0, 0, 200, 0],
    });
    return shapeToBeReturned;
  }

  drawTriangle() {
    return new Konva.Line({
      x: 100,
      y: 100,
      stroke: 'orange',
      points: [0, 0, 200, 0, 100, -150],
      closed: true,
      lineJoin: 'round',
    });
  }

  drawEllipse(){
    return new Konva.Ellipse({
      x: 50,
      y: 50,
      radiusX: 100,
      radiusY: 50,
      fill: 'pink',
      stroke: 'black',
      strokeWidth: 4,
    });
  }

  move(myStage: Stage){
    let i=0;
    let object!: Stage | Shape;
    console.log("in move");
    myStage.listening(true);
    myStage.on('click touchdown',function(e){
      i++;
      object = e.target;
      if(i>1){
        myStage.listening(false);
      }
      else {
        myStage.listening(true);
        object.setAttr("draggable" , true);
        myStage.on('mouseup' , function(e){
          object.setAttr("draggable" , false);
        })
      }
    })
  }
}

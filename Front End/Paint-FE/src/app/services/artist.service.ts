// This is Service Should Be Used To Implement All The Drawing Methods

import { Injectable } from '@angular/core';
import Konva from 'konva';

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
      draggable: true,
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
      draggable: true,
    });
  }

  drawCirc() {
    let shapeToBeReturned = new Konva.Circle({
      x: 100,
      y: 100,
      stroke: 'black',
      draggable: true,
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
      draggable: true,
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
      draggable: true,
      numPoints: 9,
    });
  }

  drawLine() {
    let shapeToBeReturned = new Konva.Line({
      x: 100,
      y: 100,
      stroke: 'orange',
      strokeWidth: 2,
      draggable: true,
      points: [0, 0, 200, 0],
    });
    return shapeToBeReturned;
  }

  drawTriangle() {
    return new Konva.Line({
      x: 100,
      y: 100,
      stroke: 'orange',
      draggable: true,
      points: [0, 0, 200, 0, 100, -150],
      closed: true,
      lineJoin: 'round',
    });
  }
}

// This is Service Should Be Used To Implement All The Drawing Methods

import { Injectable } from '@angular/core';
import Konva from 'konva';
import { Stage } from 'konva/lib/Stage';
import { Shape } from 'konva/lib/Shape';
import { SharedService } from 'src/app/services/shared.service';
import { Layer } from 'konva/lib/Layer';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  //private sharedService: SharedService = new SharedService();
  constructor(private sharedService: SharedService) {}
  // transformer: any;
  // getTransformer(transformer: any){
  //   this.transformer = transformer;
  // }

  drawRect() {
    let shapeToBeReturned = new Konva.Rect({
      x: 100,
      y: 100,
      stroke: 'black',
      strokeWidth: this.sharedService.getBrushWidth(),
      cornerRadius: 12,
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
      stroke: 'black',
      strokeWidth: this.sharedService.getBrushWidth(),
      cornerRadius: 12,
      width: 100,
      height: 100,
    });
  }

  drawCirc() {
    let shapeToBeReturned = new Konva.Circle({
      x: 150,
      y: 150,
      stroke: 'black',
      strokeWidth: this.sharedService.getBrushWidth(),
      radius: 100,
    });
    shapeToBeReturned.on('click', () => {
      console.log(shapeToBeReturned.getAttrs());
    });
    return shapeToBeReturned;
  }

  // drawRing() {
  //   return new Konva.Ring({
  //     x: 100,
  //     y: 100,
  //     fill: 'red',
  //     outerRadius: 50,
  //     innerRadius: 30,
  //   });
  // }

  // drawStar() {
  //   return new Konva.Star({
  //     x: 100,
  //     y: 100,
  //     stroke: 'blaack',
  //     outerRadius: 50,
  //     innerRadius: 30,
  //     numPoints: 9,
  //   });
  // }

  drawLine() {
    let shapeToBeReturned = new Konva.Line({
      name: 'line',
      x: 100,
      y: 100,
      stroke: 'black',
      strokeWidth: this.sharedService.getBrushWidth(),
      points: [0, 0, 200, 0],
    });
    return shapeToBeReturned;
  }

  drawTriangle() {
    return new Konva.RegularPolygon({
      sides: 3,
      radius: 100,
      x: 150,
      y: 150,
      strokeWidth: this.sharedService.getBrushWidth(),
      stroke: 'black',
    });

    // new Konva.Line({
    //   x: 90,
    //   y: 200,
    //   stroke: 'black',
    //   points: [0, 0, 200, 0, 100, -150],
    //   closed: true,
    //   lineJoin: 'round',
    // });
  }

  drawEllipse() {
    return new Konva.Ellipse({
      x: 150,
      y: 150,
      radiusX: 100,
      radiusY: 50,
      stroke: 'black',
      strokeWidth: this.sharedService.getBrushWidth(),
    });
  }

  drawHexagon() {
    return new Konva.RegularPolygon({
      sides: 6,
      radius: 100,
      x: 150,
      y: 150,
      stroke: 'black',
      strokeWidth: this.sharedService.getBrushWidth(),
    });
  }

  drawPentagon() {
    return new Konva.RegularPolygon({
      sides: 5,
      radius: 100,
      x: 150,
      y: 150,
      stroke: 'black',
      strokeWidth: this.sharedService.getBrushWidth(),
    });
  }

  move(myStage: Stage) {
    let i = 0;
    let object!: Stage | Shape;
    let thisExtender = this;
    console.log('in move');
    myStage.listening(true);
    myStage.on('click touchdown', function (e) {
      i++;
      object = e.target;
      if (i <= 1) {
        myStage.listening(true);
        myStage.container().style.cursor = 'move';
        object.setAttr('draggable', true);

        myStage.on('mouseup', function (e) {
          myStage.container().style.cursor = 'default';
          object.setAttr('draggable', false);
        });
        thisExtender.sharedService.setClickedButtonFalse(0);
      } else {
        if(!thisExtender.sharedService.getIsSelected()){
          myStage.listening(false);
        }
      }
    });
  }

  color(myStage: Stage) {
    let i = 0;
    myStage.listening(true);
    let color = this.sharedService.getColor();
    let thisExtender = this;
    myStage.on('click', function (e) {
      thisExtender.sharedService.setClickedButtonFalse(6);
      i++;
      let object = e.target;
      if (i > 1) {
        if(!thisExtender.sharedService.getIsSelected()){
          myStage.listening(false);
        }
      } else {
        myStage.listening(true);
        object.setAttr('fill', color);
      }
    });
  }
  resize(myStage: Stage, board: Layer) {
    let transformer = new Konva.Transformer();
    board.add(transformer);
    let object!: Stage | Shape;
    let thisExtender = this;
    console.log('in resize');
    myStage.listening(true);
    myStage.on('click touchdown', function (e) {
      thisExtender.sharedService.setClickedButtonFalse(1);
      object = e.target;
      if (object.name() === 'line') {
        transformer.enabledAnchors(['middle-left', 'middle-right']);
      }

      if (object !== myStage) {
        myStage.listening(true);
        transformer.nodes([object]);
        object.on('transformend', function () {
          if (object.name() === 'line') {
          } else {
            object.setAttrs({
              width: object.width() * object.scaleX(),
              height: object.height() * object.scaleY(),
              scaleX: 1,
              scaleY: 1,
            });
          }
        });
        console.log('resize attr after: ', object.getAttrs());
      } else {
        transformer.nodes([]);
        transformer.remove();
        return;
      }
    });
  }

  copy(myStage: Stage, board: Layer) {
    let i = 0;
    myStage.listening(true);
    let thisExtender = this;
    myStage.on('click', function (e) {
      thisExtender.sharedService.setClickedButtonFalse(2);
      i++;
      let object = e.target;
      if (i > 1) {
        if(!thisExtender.sharedService.getIsSelected()){
          myStage.listening(false);
        }
      } else {
        myStage.listening(true);
        let objectClone = object.clone();
        objectClone.setAttr('x', 100);
        objectClone.setAttr('y', 100);
        board.add(objectClone);
      }
    });
  }

  select(myStage: Stage, board: Layer) {
    let transformer = new Konva.Transformer();
    board.add(transformer);
    let object!: Stage | Shape;
    let thisExtender = this;
    if (this.sharedService.getIsSelected()) {
      myStage.listening(true);
      myStage.on('click touchdown', function (e) {
        object = e.target;
        object.setAttr('draggable', true);
        if (object !== myStage && thisExtender.sharedService.getIsSelected()) {
          board.add(transformer);
          transformer.nodes([object]);
          object.on('transformend', function () {
            object.setAttrs({
              width: object.width() * object.scaleX(),
              height: object.height() * object.scaleY(),
              scaleX: 1,
              scaleY: 1,
            });
          });
        } else {
          transformer.nodes([]);
          transformer.remove();
        }
        myStage.on('mouseup', function (e) {
          object.setAttr('draggable', false);
        });
      });
    } else {
      transformer.nodes([]);
      transformer.remove();
      myStage.listening(false);
    }
  }

  erase(
    myStage: Stage,
    board: Layer,
    shapesHolder: any[],
    redoShapesHolder: any[]
  ) {
    let i = 0;
    myStage.listening(true);
    let thisExtender = this;
    myStage.on('click', function (e) {
      thisExtender.sharedService.setClickedButtonFalse(3);
      i++;
      let object = e.target;
      shapesHolder.splice(<any>object);
      redoShapesHolder.push(object);
      if (i > 1) {
        if(!thisExtender.sharedService.getIsSelected()){
          myStage.listening(false);
        }
      } else {
        myStage.listening(true);
        object.remove();
      }
    });
  }
}

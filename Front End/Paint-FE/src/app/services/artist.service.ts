// This is Service Should Be Used To Implement All The Drawing Methods

import { Injectable } from '@angular/core';
import Konva from 'konva';
import { Stage } from 'konva/lib/Stage';
import { Shape } from 'konva/lib/Shape';
import { SharedService } from 'src/app/services/shared.service';
import { Layer } from 'konva/lib/Layer';
import { HttpClient } from '@angular/common/http';
import { BackEndCallerService } from './back-end-caller.service';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private backEndCaller = new BackEndCallerService(this.http);

  constructor(public sharedService: SharedService, private http: HttpClient) {}

  async drawRect() {
    return new Konva.Rect(
      await this.backEndCaller.requestShapeFromBE('Rectangle')
    );
  }

  async drawCirc() {
    return new Konva.Circle(
      await this.backEndCaller.requestShapeFromBE('Circle')
    );
  }

  async drawTriangle() {
    return new Konva.RegularPolygon(
      await (<any>this.backEndCaller.requestShapeFromBE('Triangle'))
    );
  }

  async drawSquare() {
    return new Konva.Rect(
      await this.backEndCaller.requestShapeFromBE('Square')
    );
  }

  async drawLine() {
    return new Konva.Line(await this.backEndCaller.requestShapeFromBE('Line'));
  }

  async drawPentagon() {
    return new Konva.RegularPolygon(
      await (<any>this.backEndCaller.requestShapeFromBE('Pentagon'))
    );
  }

  async drawHexagon() {
    return new Konva.RegularPolygon(
      await (<any>this.backEndCaller.requestShapeFromBE('Hexagon'))
    );
  }

  async drawEllipse() {
    return new Konva.Ellipse(
      await (<any>this.backEndCaller.requestShapeFromBE('Ellipse'))
    );
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
        if (!thisExtender.sharedService.getIsSelected()) {
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
        if (!thisExtender.sharedService.getIsSelected()) {
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
        if (!thisExtender.sharedService.getIsSelected()) {
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
        if (!thisExtender.sharedService.getIsSelected()) {
          myStage.listening(false);
        }
      } else {
        myStage.listening(true);
        object.remove();
      }
    });
  }

  async save() {
    // let dataComing = await this.backEndCaller.sendStage(myStage);
    // console.log('In save in atrist');
    // console.log(dataComing);
    return await this.backEndCaller.save();
  }

  async load() {
    return await this.backEndCaller.load();
  }

  async saveStage(myStage: Stage) {
    return await this.backEndCaller.sendStage(myStage);
  }

  async undoStage() {
    return await this.backEndCaller.undo();
  }

  async redoStage() {
    return await this.backEndCaller.redo();
  }
}

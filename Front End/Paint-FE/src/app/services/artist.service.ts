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

  async freeHand(myStage: Stage, board: Layer) {
    let i = 0;
    let isPaint = false;
    let drawLine: any;
    let color = this.sharedService.getColor();
    let thisExtender = this;
    myStage.listening(true);
    await myStage.on('mousedown', async function (e) {
      i++;
      if (i <= 1) {
        thisExtender.sharedService.setClickedButtonFalse(4);
        isPaint = true;
        let pos = myStage.getPointerPosition();
        if (pos == null) {
          return;
        }
        drawLine = new Konva.Line({
          stroke: color,
          strokeWidth: thisExtender.sharedService.getBrushWidth(),
          lineCap: 'round',
          lineJoin: 'round',
          points: [pos.x, pos.y, pos.x, pos.y],
        });
        board.add(drawLine);
      }
    });
    await myStage.on('mousemove', async function (e) {
      if (i <= 1) {
        if (!isPaint) {
          return;
        }
        // prevent scrolling on touch devices
        e.evt.preventDefault();
        let pos = myStage.getPointerPosition();
        if (pos == null) {
          return;
        }
        var newPoints = drawLine.points().concat([pos.x, pos.y]);
        drawLine.points(newPoints);
      }
    });
    await myStage.on('mouseup', async function () {
      if (i <= 1) {
        isPaint = false;
        myStage.listening(false);
        await thisExtender.saveStage(myStage);
        return;
      }
    });
  }

  async move(myStage: Stage) {
    let i = 0;
    let object!: Stage | Shape;
    let thisExtender = this;
    myStage.listening(true);
    await myStage.on('click touchdown', async function (e) {
      i++;
      object = e.target;
      if (i <= 1) {
        myStage.listening(true);
        myStage.container().style.cursor = 'move';
        object.setAttr('draggable', true);
        await myStage.on('mouseup', async function (e) {
          i++;
          myStage.container().style.cursor = 'default';
          object.setAttr('draggable', false);
          if (i == 2) await thisExtender.saveStage(myStage);
        });
        thisExtender.sharedService.setClickedButtonFalse(0);
      } else {
        if (!thisExtender.sharedService.getIsSelected()) {
          myStage.listening(false);
        }
      }
    });
  }

  async color(myStage: Stage) {
    let i = 0;
    myStage.listening(true);
    let color = this.sharedService.getColor();
    let thisExtender = this;
    await myStage.on('click', async function (e) {
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
        await thisExtender.saveStage(myStage);
      }
    });
  }

  async resize(myStage: Stage, board: Layer) {
    let transformer = new Konva.Transformer();
    board.add(transformer);
    let object!: Stage | Shape;
    let thisExtender = this;
    console.log('in resize');
    myStage.listening(true);
    await myStage.on('click touchdown', async function (e) {
      thisExtender.sharedService.setClickedButtonFalse(1);
      object = e.target;
      if (object.name() === 'line') {
        transformer.enabledAnchors(['middle-left', 'middle-right']);
      }
      if (object !== myStage) {
        myStage.listening(true);
        transformer.nodes([object]);
        await object.on('transformend', async function () {
          if (object.name() === 'line') {
          } else {
            object.setAttrs({
              width: object.width() * object.scaleX(),
              height: object.height() * object.scaleY(),
              scaleX: 1,
              scaleY: 1,
            });
          }
          await thisExtender.saveStage(myStage);
        });
        console.log('resize attr after: ', object.getAttrs());
      } else {
        transformer.nodes([]);
        transformer.remove();
        return;
      }
    });
  }

  async copy(myStage: Stage, board: Layer) {
    let i = 0;
    myStage.listening(true);
    let thisExtender = this;
    await myStage.on('click', async function (e) {
      thisExtender.sharedService.setClickedButtonFalse(2);
      i++;
      let object = e.target;
      if (i > 1) {
        if (!thisExtender.sharedService.getIsSelected()) {
          myStage.listening(false);
        }
      } else {
        myStage.listening(true);
        let objectClone: any;
        if (object.getClassName() === 'Rect') {
          objectClone = new Konva.Rect(
            await thisExtender.backEndCaller.requestShapeCloneFromBE(
              object,
              'Rect'
            )
          );
        } else if (object.getClassName() === 'Circle') {
          objectClone = new Konva.Circle(
            await thisExtender.backEndCaller.requestShapeCloneFromBE(
              object,
              'Circle'
            )
          );
        } else if (
          object.getClassName() === 'RegularPolygon' &&
          object.getAttr('sides') == 3
        ) {
          objectClone = new Konva.RegularPolygon(
            <any>(
              await thisExtender.backEndCaller.requestShapeCloneFromBE(
                object,
                'Triangle'
              )
            )
          );
        } else if (
          object.getClassName() === 'RegularPolygon' &&
          object.getAttr('sides') == 5
        ) {
          objectClone = new Konva.RegularPolygon(
            <any>(
              await thisExtender.backEndCaller.requestShapeCloneFromBE(
                object,
                'Pentagon'
              )
            )
          );
        } else if (
          object.getClassName() === 'RegularPolygon' &&
          object.getAttr('sides') == 6
        ) {
          objectClone = new Konva.RegularPolygon(
            <any>(
              await thisExtender.backEndCaller.requestShapeCloneFromBE(
                object,
                'Hexagon'
              )
            )
          );
        } else if (object.getClassName() === 'Ellipse') {
          objectClone = new Konva.Ellipse(
            <any>(
              await thisExtender.backEndCaller.requestShapeCloneFromBE(
                object,
                'Ellipse'
              )
            )
          );
        } else if (object.getClassName() === 'Line') {
          objectClone = new Konva.Line(
            await thisExtender.backEndCaller.requestShapeCloneFromBE(
              object,
              'Line'
            )
          );
        }
        board.add(objectClone);
        await thisExtender.saveStage(myStage);
      }
    });
  }

  async select(myStage: Stage, board: Layer) {
    let transformer = new Konva.Transformer();
    board.add(transformer);
    let object!: Stage | Shape;
    let thisExtender = this;
    if (this.sharedService.getIsSelected()) {
      myStage.listening(true);
      let i = 0,
        j = 0;
      await myStage.on('click touchdown', async function (e) {
        i = 0;
        j = 0;
        object = e.target;
        object.setAttr('draggable', true);
        if (object !== myStage && thisExtender.sharedService.getIsSelected()) {
          board.add(transformer);
          transformer.nodes([object]);
          await object.on('transformend', async function () {
            j++;
            object.setAttrs({
              width: object.width() * object.scaleX(),
              height: object.height() * object.scaleY(),
              scaleX: 1,
              scaleY: 1,
            });
            if (j == 1) {
              await thisExtender.saveStage(myStage);
            }
          });
        } else {
          transformer.nodes([]);
          transformer.remove();
        }
        await object.on('dragend', async function (e) {
          i++;
          object.setAttr('draggable', false);
          if (i == 1) await thisExtender.saveStage(myStage);
          object.off('click');
        });
      });
    } else {
      transformer.nodes([]);
      transformer.remove();
      myStage.listening(false);
    }
  }

  async erase(myStage: Stage, board: Layer) {
    let i = 0;
    myStage.listening(true);
    let thisExtender = this;
    await myStage.on('click', async function (e) {
      thisExtender.sharedService.setClickedButtonFalse(3);
      i++;
      let object = e.target;
      if (i > 1) {
        if (!thisExtender.sharedService.getIsSelected()) {
          myStage.listening(false);
        }
      } else {
        myStage.listening(true);
        object.remove();
        await thisExtender.saveStage(myStage);
      }
    });
  }

  async save() {
    console.log('<< Session Save >> is requested ');
    return await this.backEndCaller.save();
  }

  async load() {
    console.log('<< Session Load >> is requested ');
    return await this.backEndCaller.load();
  }

  async saveStage(myStage: Stage) {
    console.log('<< Stage Update >> is requested ');
    return await this.backEndCaller.sendStage(myStage);
  }

  async undoStage() {
    console.log('<< Stage Undo >> is requested ');
    return await this.backEndCaller.undo();
  }

  async redoStage() {
    console.log('<< Stage Redo >> is requested ');
    return await this.backEndCaller.redo();
  }

  async refreshStage() {
    console.log('<< Stage Refresh >> is requested ');
    return await this.backEndCaller.refresh();
  }
}

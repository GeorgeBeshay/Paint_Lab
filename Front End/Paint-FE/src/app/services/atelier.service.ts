import { Injectable } from '@angular/core';
import { ArtistService } from './artist.service';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';

@Injectable({
  providedIn: 'root',
})
export class AtelierService {
  // ------------ Separator ------------
  private shapesHolder: any[] = [];
  private redoShapesHolder: any[] = [];
  // ------------ Separator ------------
  constructor(private myArtist: ArtistService) {}
  // ------------ Separator ------------
  async requestAnUpdate(
    myStage: Stage,
    board: Layer,
    request: string | undefined,
    transformer: any
  ) {
    console.log(myStage);
    let tempShape: any = null;
    let correctInputFlag = false;
    switch (request) {
      case 'rectangle': {
        correctInputFlag = true;
        tempShape = await this.myArtist.drawRect();
        break;
      }
      case 'square': {
        correctInputFlag = true;
        tempShape = await this.myArtist.drawSquare();
        break;
      }
      case 'circle': {
        correctInputFlag = true;
        tempShape = await this.myArtist.drawCirc();
        break;
      }
      case 'line': {
        correctInputFlag = true;
        tempShape = await this.myArtist.drawLine();
        break;
      }
      case 'triangle': {
        correctInputFlag = true;
        tempShape = await this.myArtist.drawTriangle();
        break;
      }
      case 'pentagon': {
        correctInputFlag = true;
        tempShape = await this.myArtist.drawPentagon();
        break;
      }
      case 'hexagon': {
        correctInputFlag = true;
        tempShape = await this.myArtist.drawHexagon();
        break;
      }
      case 'ellipse': {
        correctInputFlag = true;
        tempShape = await this.myArtist.drawEllipse();
        break;
      }
      case 'undo': {
        if (this.shapesHolder.length > 0) {
          // this.redoShapesHolder.push(this.shapesHolder.pop());
          // this.reDraw(board);
          myStage = Konva.Node.create(
            await (<any>this.myArtist.undoStage()),
            'konva-holder'
          );
          this.myArtist.sharedService.setSharedStage(myStage);
        }
        break;
      }
      case 'redo': {
        // if (this.redoShapesHolder.length > 0) {
        // this.shapesHolder.push(this.redoShapesHolder.pop());
        // this.reDraw(board);
        myStage = Konva.Node.create(
          await (<any>this.myArtist.redoStage()),
          'konva-holder'
        );
        this.myArtist.sharedService.setSharedStage(myStage);
        // }
        break;
      }
      case 'clear': {
        correctInputFlag = true;
        board.removeChildren();
        this.shapesHolder = [];
        this.redoShapesHolder = [];
        break;
      }
      case 'move': {
        correctInputFlag = true;
        this.myArtist.move(myStage);
        break;
      }
      case 'colorFill': {
        correctInputFlag = true;
        this.myArtist.color(myStage);
        break;
      }
      case 'resize': {
        correctInputFlag = true;
        this.myArtist.resize(myStage, board);
        break;
      }
      case 'copy': {
        correctInputFlag = true;
        this.myArtist.copy(myStage, board);
        break;
      }
      case 'cursor': {
        correctInputFlag = true;
        this.myArtist.select(myStage, board);
        break;
      }
      case 'eraser': {
        correctInputFlag = true;
        this.myArtist.erase(
          myStage,
          board,
          this.shapesHolder,
          this.redoShapesHolder
        );
        break;
      }
      case 'save': {
        // correctInputFlag = true;
        await this.myArtist.save();
        break;
      }
      case 'load': {
        // correctInputFlag = true;
        myStage = Konva.Node.create(
          await (<any>this.myArtist.load()),
          'konva-holder'
        );
        this.myArtist.sharedService.setSharedStage(myStage);
        break;
      }
      default: {
        break;
      }
    }
    if (correctInputFlag) {
      await this.myArtist.saveStage(myStage);
    }
    if (tempShape != null) {
      board.add(tempShape);
      this.shapesHolder.push(tempShape);
    }
    // this.reDraw(board);
  }
  reDraw(board: Layer) {
    board.removeChildren();
    // board.add(transformer);
    let i = 0;
    for (; i < this.shapesHolder.length; i++) {
      board.add(this.shapesHolder[i]);
    }
    board.draw();
  }
  // ------------ Separator ------------
}

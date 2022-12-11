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
    let tempShape: any = null;
    switch (request) {
      case 'rectangle': {
        tempShape = await this.myArtist.drawRect();
        break;
      }
      case 'square': {
        tempShape = await this.myArtist.drawSquare();
        break;
      }
      case 'circle': {
        tempShape = await this.myArtist.drawCirc();
        break;
      }
      case 'line': {
        tempShape = await this.myArtist.drawLine();
        break;
      }
      case 'triangle': {
        tempShape = await this.myArtist.drawTriangle();
        break;
      }
      case 'pentagon': {
        tempShape = await this.myArtist.drawPentagon();
        break;
      }
      case 'hexagon': {
        tempShape = await this.myArtist.drawHexagon();
        break;
      }
      case 'ellipse': {
        tempShape = await this.myArtist.drawEllipse();
        break;
      }
      case 'undo': {
        if (this.shapesHolder.length > 0) {
          this.redoShapesHolder.push(this.shapesHolder.pop());
          // this.reDraw(board, transformer);
          this.reDraw(board);
        }
        break;
      }
      case 'redo': {
        if (this.redoShapesHolder.length > 0) {
          this.shapesHolder.push(this.redoShapesHolder.pop());
          // this.reDraw(board, transformer);
          this.reDraw(board);
        }
        break;
      }
      case 'clear': {
        board.removeChildren();
        this.shapesHolder = [];
        this.redoShapesHolder = [];
        break;
      }
      case 'move': {
        this.myArtist.move(myStage);
        break;
      }
      case 'colorFill': {
        this.myArtist.color(myStage);
        break;
      }
      case 'resize': {
        this.myArtist.resize(myStage, board);
        break;
      }
      case 'copy': {
        this.myArtist.copy(myStage, board);
        break;
      }
      case 'cursor': {
        this.myArtist.select(myStage, board);
        break;
      }
      case 'eraser': {
        this.myArtist.erase(
          myStage,
          board,
          this.shapesHolder,
          this.redoShapesHolder
        );
        break;
      }
      case 'save': {
        await this.myArtist.save(myStage);
        break;
      }
      case 'load': {
        myStage = Konva.Node.create(
          await (<any>this.myArtist.load(myStage, board)),
          'konva-holder'
        );
        myStage.listening(true);
        // myStage.draw();
        // myStage = new Konva.Stage({
        //   container: 'konva-holder',
        //   width: 500,
        //   height: 500,
        // });
        // myStage.listening(true);
        // myStage.add(new Konva.Layer());
        //myStage = await <any>this.myArtist.load(myStage , board);
        // this.tempStage = myStage;
        this.myArtist.sharedService.sharedStage = myStage;
        break;
      }
      default: {
        break;
      }
    }
    if (tempShape != null) {
      console.log("doesn't equal null");
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

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
  //private myArtist: ArtistService = new ArtistService();
  // ------------ Separator ------------
  constructor(private myArtist: ArtistService) {}
  // ------------ Separator ------------
  requestAnUpdate(
    myStage: Stage,
    board: Layer,
    request: string | undefined,
    transformer: any
  ) {
    // this.myArtist.getTransformer(transformer);
    let tempShape: any = null;
    switch (request) {
      case 'rectangle': {
        tempShape = this.myArtist.drawRect();
        break;
      }
      case 'square': {
        tempShape = this.myArtist.drawSquare();
        break;
      }
      case 'circle': {
        tempShape = this.myArtist.drawCirc();
        break;
      }
      case 'line': {
        tempShape = this.myArtist.drawLine();
        break;
      }
      case 'triangle': {
        tempShape = this.myArtist.drawTriangle();
        break;
      }
      case 'pentagon': {
        tempShape = this.myArtist.drawPentagon();
        break;
      }
      case 'hexagon': {
        tempShape = this.myArtist.drawHexagon();
        break;
      }
      case 'ellipse': {
        tempShape = this.myArtist.drawEllipse();
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
      default: {
        break;
      }
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

import { Injectable } from '@angular/core';
import { ArtistService } from './artist.service';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';

@Injectable({
  providedIn: 'root',
})
export class AtelierService {
  // ------------ Separator ------------
  private shapesHolder: any[] = [];
  private redoShapesHolder: any[] = [];
  private myArtist: ArtistService = new ArtistService();
  // ------------ Separator ------------
  constructor() {}
  // ------------ Separator ------------
  requestAnUpdate(board: Layer, request: string | undefined, transformer: any) {
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
        break;
      }
      case 'hexagon': {
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

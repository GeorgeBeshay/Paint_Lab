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
  constructor(private myArtist: ArtistService) {}
  // ------------ Separator ------------
  async requestAnUpdate(
    myStage: Stage,
    board: Layer,
    request: string | undefined
  ) {
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
      case 'brush': {
        await this.myArtist.freeHand(myStage, board);
        break;
      }
      case 'clear': {
        correctInputFlag = true;
        board.removeChildren();
        break;
      }
      case 'move': {
        await this.myArtist.move(myStage);
        break;
      }
      case 'colorFill': {
        await this.myArtist.color(myStage);
        break;
      }
      case 'resize': {
        await this.myArtist.resize(myStage, board);
        break;
      }
      case 'copy': {
        await this.myArtist.copy(myStage, board);
        break;
      }
      case 'cursor': {
        await this.myArtist.select(myStage, board);
        break;
      }
      case 'eraser': {
        await this.myArtist.erase(myStage, board);
        break;
      }
      case 'undo': {
        myStage = Konva.Node.create(
          await (<any>this.myArtist.undoStage()),
          'konva-holder'
        );
        this.myArtist.sharedService.setSharedStage(myStage);
        break;
      }
      case 'redo': {
        myStage = Konva.Node.create(
          await (<any>this.myArtist.redoStage()),
          'konva-holder'
        );
        this.myArtist.sharedService.setSharedStage(myStage);
        break;
      }
      case 'save': {
        await this.myArtist.save();
        break;
      }
      case 'load': {
        myStage = Konva.Node.create(
          await (<any>this.myArtist.load()),
          'konva-holder'
        );
        this.myArtist.sharedService.setSharedStage(myStage);
        break;
      }
      case 'refresh': {
        await this.myArtist.refreshStage();
        break;
      }
      default: {
        break;
      }
    }
    // ------------ Separator ------------
    if (tempShape != null) {
      tempShape.setAttrs({
        stroke: this.myArtist.sharedService.getColor(),
        strokeWidth: this.myArtist.sharedService.getBrushWidth(),
      });
      let tempX = this.myArtist.sharedService.getUserX();
      let tempY = this.myArtist.sharedService.getUserY();
      if (tempX >= 1 && tempX <= 1000 && tempY >= 1 && tempY <= 500) {
        tempShape.setAttrs({
          x: tempX,
          y: tempY,
        });
      }
      board.add(tempShape);
    }
    if (correctInputFlag) {
      await this.myArtist.saveStage(myStage);
    }
    // ------------ Separator ------------
  }
}

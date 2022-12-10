import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private subject = new Subject<any>();
  public content: string[] = [];
  private currentBrushWidth: number = 5;
  private currentColor: string = '#7fffd4';
  private clickedButtons: boolean[] = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  // [move, resize, copy, erase, brush, select, fill]

  sendClickEvent(a: string) {
    this.updateButtonsStates(a);
    this.content.push(a);
    this.subject.next(void 0);
  }
  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
  setBrushWidth(newVal: number) {
    this.currentBrushWidth = newVal;
  }
  getBrushWidth() {
    return this.currentBrushWidth;
  }
  setColor(newVal: string) {
    this.currentColor = newVal;
  }
  getColor() {
    return this.currentColor;
  }
  setClickedButtonFalse(index: number) {
    this.clickedButtons[index] = false;
  }
  getClickedButtons() {
    return this.clickedButtons;
  }
  clearButtonsStates() {
    for (let i = 0; i < this.clickedButtons.length; i++) {
      this.clickedButtons[i] = false;
    }
  }
  updateButtonsStates(buttonName: string) {
    console.log(buttonName);
    switch (buttonName) {
      case 'move': {
        this.clickedButtons[0] = true;
        break;
      }
      case 'resize': {
        this.clickedButtons[1] = true;
        break;
      }
      case 'copy': {
        this.clickedButtons[2] = true;
        break;
      }
      case 'eraser': {
        this.clickedButtons[3] = true;
        break;
      }
      case 'brush': {
        this.clickedButtons[4] = true;
        break;
      }
      case 'cursor': {
        this.clickedButtons[5] = true;
        break;
      }
      case 'colorFill': {
        this.clickedButtons[6] = true;
        break;
      }
      default: {
        break;
      }
    }
  }
}

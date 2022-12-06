import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private subject = new Subject<any>();
  public content: string[] = [];
  private currentBrushWidth: number = 50;
  private currentColor: string = '#000000';

  sendClickEvent(a: string) {
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
}

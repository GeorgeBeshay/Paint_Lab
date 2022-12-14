import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-right-tb',
  templateUrl: './right-tb.component.html',
  styleUrls: ['./right-tb.component.css'],
})
export class RightTBComponent implements OnInit {
  private xInput!: HTMLInputElement;
  private yInput!: HTMLInputElement;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.xInput = document.getElementById('inputX') as HTMLInputElement;
    this.yInput = document.getElementById('inputY') as HTMLInputElement;
    this.sharedService.setUserX(Number(this.xInput.value));
    this.sharedService.setUserY(Number(this.yInput.value));
  }

  setUserX() {
    this.sharedService.setUserX(Number(this.xInput.value));
  }
  setUserY() {
    this.sharedService.setUserY(Number(this.yInput.value));
  }

  clickOn(buttonName: string) {
    this.sharedService.sendClickEvent(buttonName);
  }

  changeBrushWidth(brushWid: number) {
    console.log(brushWid);
    this.sharedService.setBrushWidth(brushWid);
  }

  changeColorValue(colVal: string) {
    this.sharedService.setColor(colVal);
  }

  getSharedService() {
    return this.sharedService;
  }
}

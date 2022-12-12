import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-right-tb',
  templateUrl: './right-tb.component.html',
  styleUrls: ['./right-tb.component.css'],
})
export class RightTBComponent implements OnInit {
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {}

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

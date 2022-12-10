import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-left-tb',
  templateUrl: './left-tb.component.html',
  styleUrls: ['./left-tb.component.css'],
})
export class LeftTBComponent implements OnInit {
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {}

  clickOn(buttonName: string){
    this.sharedService.sendClickEvent(buttonName);
  }
  getSharedService(){
    return this.sharedService;
  }
}

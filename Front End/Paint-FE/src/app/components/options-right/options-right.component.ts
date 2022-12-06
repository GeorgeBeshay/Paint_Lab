import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-options-right',
  templateUrl: './options-right.component.html',
  styleUrls: ['./options-right.component.css'],
})
export class OptionsRightComponent implements OnInit {
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {}

  clickOn(buttonName: string) {
    this.sharedService.sendClickEvent(buttonName);
  }
}

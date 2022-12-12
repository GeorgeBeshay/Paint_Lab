import { Component, OnInit } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { SharedService } from 'src/app/services/shared.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-options-left',
  templateUrl: './options-left.component.html',
  styleUrls: ['./options-left.component.css'],
})
export class OptionsLeftComponent implements OnInit {
  constructor(private sharedService: SharedService) {}
  private xInput!: HTMLInputElement;
  private yInput!: HTMLInputElement;
  private pathInput!: HTMLInputElement;

  ngOnInit(): void {
    this.sharedService.setFileFormat('json');
    this.xInput = document.getElementById('inputX') as HTMLInputElement;
    this.yInput = document.getElementById('inputY') as HTMLInputElement;
    this.pathInput = document.getElementById('path') as HTMLInputElement;
  }
  setSaveFormat(newFormat: string) {
    this.sharedService.setFileFormat(newFormat);
  }
  setPath() {
    this.sharedService.setPath(this.pathInput.value);
  }
  setUserX() {
    this.sharedService.setUserX(Number(this.xInput.value));
  }
  setUserY() {
    this.sharedService.setUserY(Number(this.yInput.value));
  }
}

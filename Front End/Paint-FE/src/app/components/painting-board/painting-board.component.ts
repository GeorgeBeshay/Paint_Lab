import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Subscription } from 'rxjs';
import { HttpClient, HttpContextToken } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import Konva from 'konva';
import { ArtistService } from 'src/app/services/artist.service';
import { AtelierService } from 'src/app/services/atelier.service';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';

@Component({
  selector: 'app-painting-board',
  templateUrl: './painting-board.component.html',
  styleUrls: ['./painting-board.component.css'],
})
export class PaintingBoardComponent implements OnInit {
  clickEventSubscription: Subscription;
  private myStage!: Stage;
  private board!: Layer;
  private myArtist: ArtistService = new ArtistService(
    this.sharedService,
    this.http
  );
  private myAtelier: AtelierService = new AtelierService(this.myArtist);
  // ---------- Separator ----------
  constructor(private sharedService: SharedService, private http: HttpClient) {
    this.clickEventSubscription = this.sharedService
      .getClickEvent()
      .subscribe(() => {
        this.myAtelier.requestAnUpdate(
          this.myStage,
          this.board,
          this.sharedService.content.pop()
        );
        this.myStage = this.sharedService.getSharedStage();
        this.board = this.myStage.getLayers()[0];
      });
  }
  // ---------- Separator ----------
  ngOnInit(): void {
    var stageHolder = document.querySelector('#holder');
    if (stageHolder != null) {
      this.myStage = new Konva.Stage({
        width: stageHolder?.clientWidth - 10,
        height: stageHolder?.clientHeight - 20,
        container: 'konva-holder',
      });
    }
    this.board = new Konva.Layer();
    this.myStage.add(this.board);
    this.sharedService.setSharedStage(this.myStage);
    this.myAtelier.requestAnUpdate(this.myStage, this.board, 'refresh');
    this.myAtelier.requestAnUpdate(this.myStage, this.board, 'clear');
  }
}

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Subscription } from 'rxjs';
import { HttpContextToken } from '@angular/common/http';
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
  private myAtelier: AtelierService = new AtelierService();
  private transformer: any;
  // ---------- Separator ----------
  constructor(private sharedService: SharedService) {
    this.clickEventSubscription = this.sharedService
      .getClickEvent()
      .subscribe(() => {
        this.myAtelier.requestAnUpdate(
          this.myStage,
          this.board,
          this.sharedService.content.pop(),
          this.transformer
        );
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
    this.transformer = new Konva.Transformer();
    this.board.add(this.transformer);
    this.myStage.add(this.board);
  }
  // ---------- Separator ----------
  // private dataHolder: any[] = [];
  // private redoDataHolder: any[] = [];
  // display(msg: string | undefined) {
  //   console.log('Hello from the painting Board');
  //   console.log(msg);
  //   let temp: any = null;
  //   if (msg == 'rectangle') {
  //     temp = this.myArtist.drawRect();
  //   } else if (msg == 'circle') {
  //     temp = this.myArtist.drawCirc();
  //   } else if (msg == 'line') {
  //     temp = this.myArtist.drawLine();
  //   } else if (msg == 'triangle') {
  //     temp = this.myArtist.drawTriangle();
  //   } else if (msg == 'undo') {
  //     this.redoDataHolder.push(this.dataHolder.pop());
  //   } else if (msg == 'redo') {
  //     this.dataHolder.push(this.redoDataHolder.pop());
  //   }
  //   if (temp != null) {
  //     this.board.add(temp);
  //     this.dataHolder.push(temp);
  //   }
  //   this.Tempdraw();
  // }
  // Tempdraw() {
  //   this.board.removeChildren();
  //   let i = 0;
  //   for (; i < this.dataHolder.length; i++)
  //     this.board.add(this.dataHolder[i]);
  //   this.board.draw();
  // }
  // ---------- Separator ----------
}

// export class PaintingBoardComponent implements OnInit {
//   @ViewChild('canvas', { static: true }) myCanvas!: ElementRef;

//   clickEventSubscription: Subscription;

//   constructor(private sharedService: SharedService) {
//     this.clickEventSubscription = this.sharedService
//       .getClickEvent()
//       .subscribe(() => {
//         this.display(this.sharedService.content.pop());
//       });
//   }

//   ngOnInit(): void {
//     const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
//     const context = canvas.getContext('2d');
//     canvas.width = 890; // 897
//     canvas.height = 495; // 513
//     if (context) {
//       context.strokeStyle = 'red';
//       context.fillStyle = 'blue';
//       // this.drawRectangle(context);
//       this.drawTriangle(context);
//       this.drawArc(context);
//       this.drawLine(context);
//     }
//     function getContext() {
//       return context;
//     }
//   }

//   drawRectangle(context: CanvasRenderingContext2D) {
//     context.fillRect(20, 20, 100, 100);
//     // context.clearRect(40, 40, 40, 40);
//     // context.strokeRect(300, 300, 50, 50);
//   }

//   drawTriangle(context: CanvasRenderingContext2D) {
//     context.beginPath();
//     context.moveTo(150, 70);
//     context.lineTo(200, 20);
//     context.lineTo(200, 120);
//     // context.fill();
//     context.closePath();
//     context.stroke();
//   }

//   drawArc(context: CanvasRenderingContext2D) {
//     context.beginPath();
//     context.arc(300, 100, 110, (Math.PI / 180) * 0, (Math.PI / 180) * 90, true);
//     context.closePath();
//     context.stroke();
//     // context.fill();
//   }

//   drawLine(context: CanvasRenderingContext2D) {
//     context.strokeStyle = 'green';
//     context.lineWidth = 5;
//     // context.lineCap = 'round';
//     context.setLineDash([10, 1]);
//     context.beginPath();
//     context.moveTo(600, 200);
//     context.lineTo(303, 300);
//     context.stroke();
//   }

//   display(msg: string | undefined) {
//     console.log('Hello from the painting Board');
//     console.log(msg);
//     if (msg == 'rectangle') {
//       this.drawRectangle(this.myCanvas.nativeElement.getContext('2d'));
//     }
//   }
// }

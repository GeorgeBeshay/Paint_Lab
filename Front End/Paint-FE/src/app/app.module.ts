import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaintViewComponent } from './components/paint-view/paint-view.component';
import { PaintingBoardComponent } from './components/painting-board/painting-board.component';
import { LeftTBComponent } from './components/left-tb/left-tb.component';
import { RightTBComponent } from './components/right-tb/right-tb.component';
import { FooterComponent } from './components/footer/footer.component';
import { OptionsLeftComponent } from './components/options-left/options-left.component';
import { OptionsRightComponent } from './components/options-right/options-right.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { KonvaModule } from 'ng2-konva';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PaintViewComponent,
    PaintingBoardComponent,
    LeftTBComponent,
    RightTBComponent,
    FooterComponent,
    OptionsLeftComponent,
    OptionsRightComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    KonvaModule,
    MatSliderModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

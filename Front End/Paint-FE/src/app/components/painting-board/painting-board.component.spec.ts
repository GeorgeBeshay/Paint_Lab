import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingBoardComponent } from './painting-board.component';

describe('PaintingBoardComponent', () => {
  let component: PaintingBoardComponent;
  let fixture: ComponentFixture<PaintingBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintingBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaintingBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

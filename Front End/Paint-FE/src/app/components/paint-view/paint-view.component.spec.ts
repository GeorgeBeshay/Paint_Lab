import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintViewComponent } from './paint-view.component';

describe('PaintViewComponent', () => {
  let component: PaintViewComponent;
  let fixture: ComponentFixture<PaintViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaintViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

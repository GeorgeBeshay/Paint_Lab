import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftTBComponent } from './left-tb.component';

describe('LeftTBComponent', () => {
  let component: LeftTBComponent;
  let fixture: ComponentFixture<LeftTBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftTBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftTBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightTBComponent } from './right-tb.component';

describe('RightTBComponent', () => {
  let component: RightTBComponent;
  let fixture: ComponentFixture<RightTBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightTBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightTBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

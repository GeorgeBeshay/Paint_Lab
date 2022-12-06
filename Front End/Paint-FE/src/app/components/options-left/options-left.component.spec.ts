import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsLeftComponent } from './options-left.component';

describe('OptionsLeftComponent', () => {
  let component: OptionsLeftComponent;
  let fixture: ComponentFixture<OptionsLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsLeftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

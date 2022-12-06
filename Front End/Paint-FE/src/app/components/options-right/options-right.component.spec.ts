import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsRightComponent } from './options-right.component';

describe('OptionsRightComponent', () => {
  let component: OptionsRightComponent;
  let fixture: ComponentFixture<OptionsRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsRightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ENumbersComponent } from './e-numbers.component';

describe('ENumbersComponent', () => {
  let component: ENumbersComponent;
  let fixture: ComponentFixture<ENumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ENumbersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ENumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

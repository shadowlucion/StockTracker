import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensexComponent } from './sensex.component';

describe('SensexComponent', () => {
  let component: SensexComponent;
  let fixture: ComponentFixture<SensexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

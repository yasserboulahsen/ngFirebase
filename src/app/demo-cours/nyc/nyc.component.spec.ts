import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NycComponent } from './nyc.component';

describe('NycComponent', () => {
  let component: NycComponent;
  let fixture: ComponentFixture<NycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NycComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

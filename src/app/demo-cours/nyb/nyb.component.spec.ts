import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NybComponent } from './nyb.component';

describe('NybComponent', () => {
  let component: NybComponent;
  let fixture: ComponentFixture<NybComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NybComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NybComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

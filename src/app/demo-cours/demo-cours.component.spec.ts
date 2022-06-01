import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoCoursComponent } from './demo-cours.component';

describe('DemoCoursComponent', () => {
  let component: DemoCoursComponent;
  let fixture: ComponentFixture<DemoCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoCoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

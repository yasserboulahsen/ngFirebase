import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NyaComponent } from './nya.component';

describe('NyaComponent', () => {
  let component: NyaComponent;
  let fixture: ComponentFixture<NyaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NyaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImToPdfComponent } from './im-to-pd.component';

describe('AnimatorFaceComponent', () => {
  let component: ImToPdfComponent;
  let fixture: ComponentFixture<ImToPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImToPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImToPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReagenteComponent } from './reagente.component';

describe('ReagenteComponent', () => {
  let component: ReagenteComponent;
  let fixture: ComponentFixture<ReagenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReagenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReagenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReagentesComponent } from './reagentes.component';

describe('ReagentesComponent', () => {
  let component: ReagentesComponent;
  let fixture: ComponentFixture<ReagentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReagentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReagentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

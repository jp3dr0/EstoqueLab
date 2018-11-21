import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VidrariasComponent } from './vidrarias.component';

describe('VidrariasComponent', () => {
  let component: VidrariasComponent;
  let fixture: ComponentFixture<VidrariasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VidrariasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VidrariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VidrariaComponent } from './vidraria.component';

describe('VidrariaComponent', () => {
  let component: VidrariaComponent;
  let fixture: ComponentFixture<VidrariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VidrariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VidrariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

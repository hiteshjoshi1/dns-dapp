import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DidEventsComponent } from './did-events.component';

describe('DidEventsComponent', () => {
  let component: DidEventsComponent;
  let fixture: ComponentFixture<DidEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DidEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DidEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

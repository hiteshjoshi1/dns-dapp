import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameHighestBidComponent } from './name-highest-bid.component';

describe('NameHighestBidComponent', () => {
  let component: NameHighestBidComponent;
  let fixture: ComponentFixture<NameHighestBidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameHighestBidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameHighestBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

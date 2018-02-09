import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameAcceptBidComponent } from './name-accept-bid.component';

describe('NameAcceptBidComponent', () => {
  let component: NameAcceptBidComponent;
  let fixture: ComponentFixture<NameAcceptBidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameAcceptBidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameAcceptBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

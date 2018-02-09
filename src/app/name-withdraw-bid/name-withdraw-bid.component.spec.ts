import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameWithdrawBidComponent } from './name-withdraw-bid.component';

describe('NameWithdrawBidComponent', () => {
  let component: NameWithdrawBidComponent;
  let fixture: ComponentFixture<NameWithdrawBidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameWithdrawBidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameWithdrawBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

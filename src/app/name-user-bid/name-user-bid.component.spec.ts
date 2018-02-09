import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameUserBidComponent } from './name-user-bid.component';

describe('NameUserBidComponent', () => {
  let component: NameUserBidComponent;
  let fixture: ComponentFixture<NameUserBidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameUserBidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameUserBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

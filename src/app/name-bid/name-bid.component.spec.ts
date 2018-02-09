import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameBidComponent } from './name-bid.component';

describe('NameBidComponent', () => {
  let component: NameBidComponent;
  let fixture: ComponentFixture<NameBidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameBidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

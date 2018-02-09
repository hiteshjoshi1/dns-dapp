import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameBidNewComponent } from './name-bid-new.component';

describe('NameBidNewComponent', () => {
  let component: NameBidNewComponent;
  let fixture: ComponentFixture<NameBidNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameBidNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameBidNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

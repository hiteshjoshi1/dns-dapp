import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameSendEtherComponent } from './name-send-ether.component';

describe('NameSendEtherComponent', () => {
  let component: NameSendEtherComponent;
  let fixture: ComponentFixture<NameSendEtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameSendEtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameSendEtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

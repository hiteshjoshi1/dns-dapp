import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameDnsComponent } from './name-dns.component';

describe('NameDnsComponent', () => {
  let component: NameDnsComponent;
  let fixture: ComponentFixture<NameDnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameDnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameDnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

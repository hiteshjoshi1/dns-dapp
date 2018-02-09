import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameReserveComponent } from './name-reserve.component';

describe('NameReserveComponent', () => {
  let component: NameReserveComponent;
  let fixture: ComponentFixture<NameReserveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameReserveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamePriceComponent } from './name-price.component';

describe('NamePriceComponent', () => {
  let component: NamePriceComponent;
  let fixture: ComponentFixture<NamePriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamePriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

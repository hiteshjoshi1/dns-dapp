import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameHomeComponent } from './name-home.component';

describe('NameHomeComponent', () => {
  let component: NameHomeComponent;
  let fixture: ComponentFixture<NameHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

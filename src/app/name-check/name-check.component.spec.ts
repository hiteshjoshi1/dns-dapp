import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameCheckComponent } from './name-check.component';

describe('NameCheckComponent', () => {
  let component: NameCheckComponent;
  let fixture: ComponentFixture<NameCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

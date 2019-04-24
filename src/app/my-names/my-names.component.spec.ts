import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNamesComponent } from './my-names.component';

describe('MyNamesComponent', () => {
  let component: MyNamesComponent;
  let fixture: ComponentFixture<MyNamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyNamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyNamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

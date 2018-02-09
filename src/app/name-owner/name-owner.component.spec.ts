import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameOwnerComponent } from './name-owner.component';

describe('NameOwnerComponent', () => {
  let component: NameOwnerComponent;
  let fixture: ComponentFixture<NameOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

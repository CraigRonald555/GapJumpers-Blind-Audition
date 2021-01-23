import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedComponent } from './expanded.component';

describe('ExpandedComponent', () => {
  let component: ExpandedComponent;
  let fixture: ComponentFixture<ExpandedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

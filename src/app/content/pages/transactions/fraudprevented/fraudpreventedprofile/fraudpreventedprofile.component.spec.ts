import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FraudpreventedprofileComponent } from './fraudpreventedprofile.component';

describe('FraudpreventedprofileComponent', () => {
  let component: FraudpreventedprofileComponent;
  let fixture: ComponentFixture<FraudpreventedprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FraudpreventedprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FraudpreventedprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

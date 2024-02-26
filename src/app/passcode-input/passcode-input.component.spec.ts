import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasscodeInputComponent } from './passcode-input.component';

describe('PasscodeInputComponent', () => {
  let component: PasscodeInputComponent;
  let fixture: ComponentFixture<PasscodeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasscodeInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasscodeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

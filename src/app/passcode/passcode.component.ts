import { CommonModule } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { PasscodeInputComponent } from '../passcode-input/passcode-input.component';
import passcode from '../passcode.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passcode',
  standalone: true,
  imports: [CommonModule, PasscodeInputComponent],
  templateUrl: './passcode.component.html',
  styleUrl: './passcode.component.scss'
})
export class PasscodeComponent {
  PASSCODE: string[] = Array.from(passcode["passcode"]);

  @ViewChildren(PasscodeInputComponent) children!: QueryList<PasscodeInputComponent>;

  constructor(private router: Router) { }

  private focusNext(event: Event): void {
    let element: Element = (event.currentTarget as Element);
    if (element.nextElementSibling) {
      (element.nextElementSibling as HTMLElement).getElementsByTagName("input")[0].focus();
    }
  }

  private focusPrevious(event: Event): void {
    let element: Element = (event.currentTarget as Element);
    if (element.previousElementSibling) {
      (element.previousElementSibling as HTMLElement).getElementsByTagName("input")[0].focus();
    }
  }

  private isAllTrue(): boolean {
    return Array.from(this.children).every(child => child.isTrue());
  }

  private isNumberCode(event: KeyboardEvent): boolean {
    return ["Digit0", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9"].includes(event.code);
  }

  public onKeyup(event: KeyboardEvent): void {
    if (event.code === "Tab") {
      event.shiftKey ? this.focusPrevious(event) : this.focusNext(event);
    } else if (this.isNumberCode(event)) {
      this.focusNext(event);
    }
    
    if (this.isAllTrue()) {
      this.router.navigate(['/reason'])
    }
  }
}

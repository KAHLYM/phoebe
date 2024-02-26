import { CommonModule } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { PasscodeInputComponent } from '../passcode-input/passcode-input.component';
import passcode from '../passcode.json';

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

  private focusNext(event: Event): void {
    let element: Element = (event.currentTarget as Element);
    if (element.nextElementSibling) {
      (element.nextElementSibling as HTMLElement).getElementsByTagName("input")[0].focus();
    }
  }

  private isAllTrue(): boolean {
    return Array.from(this.children).every(child => child.isTrue());
  }

  public onKeyup(event: KeyboardEvent): void {
    this.focusNext(event);
    if (this.isAllTrue()) {
      // passcode is valid
    }
  }
}

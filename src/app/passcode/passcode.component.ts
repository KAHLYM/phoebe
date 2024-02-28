import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, QueryList, ViewChildren } from '@angular/core';
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

  constructor(private router: Router, @Inject(DOCUMENT) private _document: HTMLDocument) {
    this._document.getElementById('appIcon')?.setAttribute('href', 'assets/heart-empty.svg');
    this._document.getElementById('appThemeColor')?.setAttribute('content', '#F5F5F5');
  }

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

  private isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent);
  }

  private isNumberCode(event: KeyboardEvent): boolean {
    return /^(Digit|Numpad)?\d$/.test(this.isMobile() ? event.key : event.code);
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

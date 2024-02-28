import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NumericOnlyDirective } from '../numeric-only.directive';
import passcode from '../passcode.json';

@Component({
  selector: 'app-passcode-input',
  standalone: true,
  imports: [],
  templateUrl: './passcode-input.component.html',
  styleUrl: './passcode-input.component.scss',
  hostDirectives: [NumericOnlyDirective],
})
export class PasscodeInputComponent {
  @ViewChild('pi') elementRef!: ElementRef;
  @Input() index!: number;
  value?: string;

  private clear(): void {
    this.elementRef.nativeElement.value = "";
  }

  private isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent);
  }

  private isNumberCode(event: KeyboardEvent): boolean {
    return /^(Digit|Numpad)?\d$/.test(this.isMobile() ? event.key : event.code);
  }

  public isTrue(): boolean {
    return this.value === Array.from(passcode["passcode"])[this.index];
  }

  public onKeydown(event: KeyboardEvent): void {
    if (this.isNumberCode(event)) {
      this.clear();
    }
  }

  public onKeyup(event: KeyboardEvent): void {
    if (this.isNumberCode(event)) {
      this.value = this.isMobile() ? event.key : (<HTMLTextAreaElement>event.target).value;
      this.elementRef.nativeElement.value = this.value;
    }
  }
}

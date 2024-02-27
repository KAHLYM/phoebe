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

  private isNumberCode(event: KeyboardEvent): boolean {
    return ["Digit0", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9"].includes(event.code);
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
      this.value = (<HTMLTextAreaElement>event.target).value;
      this.elementRef.nativeElement.value = this.value;
    }
  }
}

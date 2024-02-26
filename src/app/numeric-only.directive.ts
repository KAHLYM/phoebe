import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumericOnly]',
  standalone: true
})
export class NumericOnlyDirective {

  constructor() { }

  @HostListener('keydown', ['$event']) onDigitDown(event: KeyboardEvent) {
    if (!this.isNumberKey(event)) {
      event.preventDefault();
    }
  }

  isNumberKey(event: KeyboardEvent) {
    return ["Digit0", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9"].includes(event.code);
  }
}

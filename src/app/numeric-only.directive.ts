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
    return /^(Digit|Numpad)\d$/.test(event.code);
  }
}

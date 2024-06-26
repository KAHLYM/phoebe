import { Component, Inject } from '@angular/core';
import reasons from '../reasons.json';
import { DOCUMENT } from '@angular/common';
import { PasscodeService } from '../passcode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reason',
  standalone: true,
  imports: [],
  templateUrl: './reason.component.html',
  styleUrl: './reason.component.scss'
})
export class ReasonComponent {

  reason?: string;
  static?: string;

  constructor(private router: Router, @Inject(DOCUMENT) private document: HTMLDocument, private passcodeService: PasscodeService) {
    if (!this.passcodeService.isTrue) {
      this.router.navigate(['/passcode'])
    }

    const DATE: Date = new Date();

    const REASONS: string[] = reasons["reasons"];
    this.reason = REASONS[this.getIndex(`${DATE.getFullYear()}${DATE.getMonth()}${DATE.getDate()}`, REASONS.length)];
    this.document.getElementById('appIcon')?.setAttribute('href', 'assets/heart-full.svg');
    this.document.getElementById('appThemeColor')?.setAttribute('content', '#E91E63');

    const OVERRIDES: { date: string, reasons: string[], static: string }[] = reasons["overrides"];
    OVERRIDES.forEach(override => {
      if (override.date === `${DATE.getMonth() + 1}`.padStart(2, "0") + `${DATE.getDate()}`.padStart(2, "0")) {
        this.reason = override.reasons[this.getIndex(`${DATE.getHours()}`, override.reasons.length)];
        this.static = override.static;
      }
    });  
  }

  ngAfterViewInit() {
    document.querySelector('body')?.classList.add('reason');
  }

  ngOnDestroy() {
    document.querySelector('body')?.classList.remove('reason');
  }

  // Adapted from https://stackoverflow.com/a/47593316
  private cyrb128(seed: string): number[] {
    let h1 = 1779033703, h2 = 3144134277,
      h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < seed.length; i++) {
      k = seed.charCodeAt(i);
      h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
      h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
      h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
      h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
    return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0];
  }

  // Adapted from https://stackoverflow.com/a/47593316
  private sfc32(a: number, b: number, c: number, d: number): any {
    return function () {
      a |= 0; b |= 0; c |= 0; d |= 0;
      var t = (a + b | 0) + d | 0;
      d = d + 1 | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = (c << 21 | c >>> 11);
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
    }
  }

  private getIndex(seed: string, entries: number): number {
    const seeded = this.cyrb128(seed);
    const rand = this.sfc32(seeded[0], seeded[1], seeded[2], seeded[3]);
    return Math.floor(entries * rand());
  }
}

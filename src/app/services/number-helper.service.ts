/*
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberHelperService {

  constructor() { }

  public toStringOfDigits(n: number, length?: number): string {
    const normalizedN = Math.floor(n);
    let stringOfDigits = normalizedN.toString();
    if (length && stringOfDigits.length < length) {
      const leadingZeroes = '0' * (length - stringOfDigits.length);
      stringOfDigits = leadingZeroes + stringOfDigits;
    }
    return  stringOfDigits;
  }
}
 */

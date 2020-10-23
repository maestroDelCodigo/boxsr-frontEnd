// Version 2

import {
  Directive,
  ElementRef,
  HostListener,
  Input
} from '@angular/core';

@Directive({
  selector: '[appNumeric]'
})
export class NumericDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event): void{
    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue.replace(/(?!^-)[^0-9\.]/g, '');

    if (initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}

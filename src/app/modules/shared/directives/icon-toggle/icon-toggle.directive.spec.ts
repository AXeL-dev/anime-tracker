import { IconToggleDirective } from './icon-toggle.directive';
import { ElementRef } from '@angular/core';

describe('IconToggleDirective', () => {
  it('should create an instance', () => {
    const element = document.createElement('div');
    const elementRef = new ElementRef<HTMLElement>(element);
    const directive = new IconToggleDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});

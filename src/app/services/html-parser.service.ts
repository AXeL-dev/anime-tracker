import { Injectable } from '@angular/core';
import { isString } from '../helpers/string.helper';

@Injectable({
  providedIn: 'root',
})
export class HTMLParserService {

  private parser: DOMParser;

  constructor() {
    this.parser = new DOMParser();
  }

  private fromString(html: string) {
    return this.parser.parseFromString(html, 'text/html');
  }

  private find(element: any, selector: string, filters?: any) {
    const firstSplit = selector.split('|');
    const secondSplit = firstSplit[0].split('@');
    const data = {
      selector: secondSplit[0]?.trim(),
      attribute: secondSplit[1]?.trim(),
      filter: firstSplit[1]?.trim()
    };
    let results = null;
    let output = '';
    try {
      if (data.selector?.length) {
        if (data.selector.startsWith(':prev ')) {
          results = this.getPreviousSibling(element, data.selector.replace(':prev ', ''));
        } else if (data.selector.startsWith(':next ')) {
          results = this.getNextSibling(element, data.selector.replace(':next ', ''));
        } else {
          results = element.querySelector(data.selector);
        }
      }
    } catch(e) {
      console.error(e.message);
    }
    if (results) {
      // get element
      if (data.attribute?.length) {
        output = results.getAttribute(data.attribute);
      } else {
        output = results.innerHTML;
      }
    }
    // filter element
    if (data.filter?.length && filters?.[data.filter]) {
      output = filters[data.filter](output);
    }

    return output;
  }

  private getPreviousSibling(elem: any, selector: string) {
    let sibling = elem.previousElementSibling;

    if (!selector) return sibling;

    // If the sibling matches our selector, use it
    // If not, jump to the previous sibling and continue the loop
    while (sibling) {
      const matches = sibling.querySelector(selector);
      if (matches) return matches;
      sibling = sibling.previousElementSibling;
    }
  }

  private getNextSibling(elem: any, selector: string) {
    let sibling = elem.nextElementSibling;

    if (!selector) return sibling;

    // If the sibling matches our selector, use it
    // If not, jump to the next sibling and continue the loop
    while (sibling) {
      const matches = sibling.querySelector(selector);
      if (matches) return matches;
      sibling = sibling.nextElementSibling
    }
  }

  parse(html: string, scope: string, selector: any, filters?: any) {
    const dom = this.fromString(html);
    const isStringSelector = isString(selector);
    let results = [];
    dom.querySelectorAll(scope).forEach((item) => {
      if (isStringSelector) {
        results.push(this.find(item, selector, filters));
      } else {
        let data = {};
        Object.keys(selector).forEach((key: string) => {
          if (isString(selector[key])) {
            data[key] = this.find(item, selector[key], filters);
          } else {
            data[key] = {};
            Object.keys(selector[key]).forEach((subkey: string) => {
              data[key][subkey] = this.find(item, selector[key][subkey], filters);
            });
          }
        });
        results.push(data);
      }
    });

    return results;
  }

}

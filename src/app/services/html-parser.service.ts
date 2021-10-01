import { Injectable } from '@angular/core';
import { isString } from '../helpers/string.helper';
import { isArray } from '../helpers/array.helper';

@Injectable({
  providedIn: 'root',
})
export class HTMLParserService {
  private parser: DOMParser;

  constructor() {
    this.parser = new DOMParser();
  }

  fromString(html: string) {
    return this.parser.parseFromString(html, 'text/html');
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
          // String
          if (isString(selector[key])) {
            data[key] = this.find(item, selector[key], filters);
          }
          // Array
          else if (isArray(selector[key])) {
            data[key] = [];
            selector[key].forEach((element: any) => {
              if (isString(element)) {
                data[key].push(this.find(item, element, filters));
              } else {
                let obj = {};
                Object.keys(element).forEach((subkey: string) => {
                  obj[subkey] = this.parseSelector(
                    item,
                    element[subkey],
                    filters
                  );
                });
                data[key].push(obj);
              }
            });
          }
          // Object
          else {
            data[key] = {};
            Object.keys(selector[key]).forEach((subkey: string) => {
              data[key][subkey] = this.parseSelector(
                item,
                selector[key][subkey],
                filters
              );
            });
          }
        });
        results.push(data);
      }
    });

    return results;
  }

  parseSelector(element: any, selector: string | string[], filters?: any) {
    if (isArray(selector)) {
      for (const sel of selector) {
        const result = this.find(element, sel, filters);
        if (result) {
          return result;
        }
      }
    } else {
      return this.find(element, selector as string, filters);
    }
  }

  find(element: any, selector: string, filters?: any) {
    const firstSplit = selector.split('|');
    const secondSplit = firstSplit[0].split('@');
    const data = {
      selector: secondSplit[0]?.trim(),
      attributes: secondSplit[1]?.trim().split(','),
      filter: firstSplit[1]?.trim(),
    };
    let results = null;
    let output = '';
    try {
      if (data.selector?.length) {
        if (data.selector.startsWith(':prev ')) {
          results = this.getPreviousSibling(
            element,
            data.selector.replace(':prev ', '')
          );
        } else if (data.selector.startsWith(':next ')) {
          results = this.getNextSibling(
            element,
            data.selector.replace(':next ', '')
          );
        } else if (data.selector.startsWith(':self')) {
          results = element;
        } else {
          results = element.querySelector(data.selector);
        }
      }
    } catch (e) {
      console.error(e.message);
    }
    if (results) {
      // get element
      if (data.attributes?.length) {
        data.attributes.forEach((attribute: string) => {
          if (output?.length) return;
          output = results.getAttribute(attribute);
        });
      } else {
        output = results.innerHTML;
      }
    }
    // filter element
    if (data.filter?.length && filters?.[data.filter]) {
      output = filters[data.filter](output, element);
    }

    return output;
  }

  private getPreviousSibling(elem: any, selector: string) {
    let sibling = elem.previousElementSibling;

    if (!selector) return sibling;

    // If the sibling matches our selector, use it
    // If not, jump to the previous sibling and continue the loop
    while (sibling) {
      if (sibling.matches(selector)) return sibling;
      const matches = sibling.querySelector(selector);
      if (matches) return matches;
      sibling = sibling.previousElementSibling;
    }

    return null;
  }

  private getNextSibling(elem: any, selector: string) {
    let sibling = elem.nextElementSibling;

    if (!selector) return sibling;

    // If the sibling matches our selector, use it
    // If not, jump to the next sibling and continue the loop
    while (sibling) {
      if (sibling.matches(selector)) return sibling;
      const matches = sibling.querySelector(selector);
      if (matches) return matches;
      sibling = sibling.nextElementSibling;
    }

    return null;
  }
}

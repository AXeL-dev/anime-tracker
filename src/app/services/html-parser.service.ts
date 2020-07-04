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
    const results = element.querySelector(data.selector);
    let output = '';
    if (results) {
      // get element
      if (data.attribute?.length) {
        output = results.getAttribute(data.attribute);
      } else {
        output = results.innerHTML;
      }
      // filter element
      if (filters && data.filter?.length) {
        output = filters[data.filter](output);
      }
    }

    return output;
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
          data[key] = this.find(item, selector[key], filters);
        });
        results.push(data);
      }
    });

    return results;
  }

}

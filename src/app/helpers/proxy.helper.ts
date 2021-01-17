import { Proxy } from '../models/proxy';

export const CORSProxies: Proxy[] = [
  {
    name: 'allOrigins',
    url: 'https://api.allorigins.win/raw?url='
  },
  {
    name: 'cors-anywhere',
    url: 'https://cors-anywhere.herokuapp.com/'
  },
  {
    name: 'JSONProxy',
    url: 'https://jsonp.afeld.me/?url='
  },
  // {
  //   name: 'YaCDN',
  //   url: 'https://yacdn.org/proxy/'
  // },
  // {
  //   name: 'WhateverOrigin',
  //   url: 'http://www.whateverorigin.org/get?url='
  // },
];

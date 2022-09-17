import { Proxy } from '../models/proxy';

export const CORSProxies: Proxy[] = [
  {
    name: 'allOrigins',
    url: 'https://api.allorigins.win/raw',
    params: {
      url: '$url',
    },
  },
  {
    name: 'Whatever Origin',
    url: 'http://www.whateverorigin.org/get',
    params: {
      url: '$url',
    },
    options: {
      responseType: 'json',
      responseParser: (data) => data.contents,
    },
  },
  {
    name: 'cors-anywhere',
    url: 'https://cors-anywhere.herokuapp.com/',
    headers: {
      origin: 'https://cors-anywhere.herokuapp.com',
      'x-requested-with': 'XMLHttpRequest',
    },
  },
  // {
  //   name: 'JSONProxy',
  //   url: 'https://jsonp.afeld.me/',
  //   params: {
  //     url: '$url',
  //   },
  // },
  {
    name: 'thingproxy',
    url: 'https://thingproxy.freeboard.io/fetch/',
  },
  {
    name: 'codetabs',
    url: 'https://api.codetabs.com/v1/proxy/',
    params: {
      quest: '$url',
    },
  },
  {
    name: 'bridged (grida)',
    url: 'https://cors.bridged.cc/',
    headers: {
      origin: 'https://bridged.xyz',
      'x-requested-with': 'XMLHttpRequest',
      'x-cors-grida-api-key': '$apiKey',
    },
    options: {
      apiKey: {
        required: true,
        hint: 'x-cors-grida-api-key',
      },
    },
  },
  {
    name: 'rapidapi',
    url: 'https://http-cors-proxy.p.rapidapi.com/',
    headers: {
      origin: 'https://rapidapi.com',
      'x-requested-with': 'XMLHttpRequest',
      'x-rapidapi-host': 'http-cors-proxy.p.rapidapi.com',
      'x-rapidapi-key': '$apiKey',
    },
    options: {
      apiKey: {
        required: true,
        hint: 'x-rapidapi-key',
      },
    },
  },
  {
    name: 'zenrows',
    url: 'https://api.zenrows.com/v1/',
    params: {
      apikey: '$apiKey',
      url: '$url',
    },
    options: {
      apiKey: {
        required: true,
      },
    },
  },
];

export const CORSProxiesByName: { [key: string]: Omit<Proxy, 'name'> } =
  CORSProxies.reduce(
    (acc, { name, ...proxyData }) => ({ ...acc, [name]: proxyData }),
    {}
  );

import { Proxy } from '../models/proxy';

export const CORSProxies: Proxy[] = [
  {
    name: 'allOrigins',
    url: 'https://api.allorigins.win/raw?url=',
  },
  {
    name: 'Whatever Origin',
    url: 'http://www.whateverorigin.org/get?url=',
    options: {
      responseType: 'json',
      responseParser: (data) => data.contents,
    },
  },
  {
    name: 'cors-anywhere',
    url: 'https://cors-anywhere.herokuapp.com/',
  },
  // {
  //   name: 'JSONProxy',
  //   url: 'https://jsonp.afeld.me/?url=',
  // },
  {
    name: 'thingproxy',
    url: 'https://thingproxy.freeboard.io/fetch/',
  },
  {
    name: 'codetabs',
    url: 'https://api.codetabs.com/v1/proxy/?quest=',
  },
  {
    name: 'bridged (grida)',
    url: 'https://cors.bridged.cc/',
    headers: {
      origin: 'bridged.xyz',
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
      origin: 'rapidapi.com',
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
];

export const CORSProxiesByName: { [key: string]: Omit<Proxy, 'name'> } =
  CORSProxies.reduce(
    (acc, { name, ...proxyData }) => ({ ...acc, [name]: proxyData }),
    {}
  );

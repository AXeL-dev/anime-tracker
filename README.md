# <img src="src/assets/icons/128.png" alt="icon" width="38"/> Anime Tracker

A web extension to keep tracking your favorite animes & get notified about new released episodes.

![screenshot](screenshots/popup.png)

## Motivation

I watch animes almost daily or at least once or twice a week, & i wanted something like [youtube-viewer](https://github.com/AXeL-dev/youtube-viewer) to notify me of new released episodes, so instead of checking anime websites one by one & trying to remember which was the last episode i've watched, i thought that scraping those websites would be a great idea and would save me a significant time & effort (maybe i'm just super lazy :grin:).

<details>
  <summary>Expand to continue reading</summary>

  <br>
  Unfortunately, i didn't find a browser/client side web scraper available out there, so i just created a simplified one by my own composed of Angular's Http client service & a crafted HTML parser. I also, used some proxies to bypass [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) limitations on browsers. In other words, this project is just a bunch of workarounds with some :sparkles: but it's surprisingly working well.
  <br><br>
  Okay, so why Angular? why not React or Vue?
  I mainly choosed Angular for its robust structure & advanced features, like: Pipes, directives, lazy loading, dependency injection & many others. Otherwise, any other library or framework with typescript support would do the job for me.

</details>

## Installation

:warning: Due to [DCMA](https://en.wikipedia.org/wiki/Digital_Millennium_Copyright_Act) law, this web extension will be available as a zip file on github [releases](https://github.com/AXeL-dev/anime-tracker/releases), use it on your own risk.

<details>
  <summary>How to install?</summary>

  ### Chrome
  1. Unzip the downloaded file.
  2. Activate the developer mode under your extensions settings to be able to load the extension.
  ![load-in-chrome](screenshots/load-in-chrome.gif)

  ### Firefox
  1. Go to `about:config` (enter it into address bar).
  2. Set `xpinstall.signatures.required` to `false`.
  3. Go to `about:addons`.
  4. Drag & drop the extension zip file or click on the ![cog](screenshots/cog.png) & choose install add-on from file.

</details>

## ToDo

- [x] Scrape anime data from several websites.
- [x] Replace promises with observables for better performance?
- [ ] Replace blox UI with [ng-zorro](https://ng.ant.design/) (keep the dark theme?).
- [ ] Auto-check & notify for new posted anime episodes.
- [ ] Memorize last watched/clicked episodes.
- [ ] Implement missing/empty crawlers functions.
- [ ] Translations.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Package

Make sure you have the following package installed `npm install -g web-ext`. Then run:

```
npm run build && npm run package
```

## Credits

Icon made by [scaredofadulthood](https://www.reddit.com/user/scaredofadulthood/).

Some ideas were inspired by [manga-provider](https://github.com/adrianonrails/manga-provider) & [x-ray](https://github.com/matthewmueller/x-ray).

## License

This project is licensed under the [MPL2](LICENSE) license.

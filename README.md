hey, be lazy
=====
bLazy is a lightweight script for lazy loading and multi-serving images, iframes, videos and more (less than 1.4KB minified and gzipped). It’s written in pure JavaScript why it doesn’t depend on 3rd-party libraries such as jQuery. It lets you lazy load and multi-serve your images so you can save bandwidth and server requests. The user will have faster load times and save data usage if he/she doesn't browse the whole page.

**Table of Contents**<br>
1. [Demo](https://github.com/dinbror/blazy#demo)<br>
2. [Usage & API](https://github.com/dinbror/blazy#how-to--api)<br>
3. [Why be lazy?](https://github.com/dinbror/blazy#why-be-lazy)<br>
4. [Changelog](https://github.com/dinbror/blazy#changelog)<br>
5. [License](https://github.com/dinbror/blazy#license)<br>

## DEMO ##
[http://dinbror.dk/blazy/](http://dinbror.dk/blazy/?ref=github)

More examples:
[http://dinbror.dk/blazy/examples/](http://dinbror.dk/blazy/examples/?ref=github)

Codepen playground:
http://codepen.io/dinbror/pen/HzCAJ

## USAGE & API ##
[http://dinbror.dk/blog/blazy/](http://dinbror.dk/blog/blazy/?ref=github)

### INSTALL
You can install blazy.js with npm:
``` npm
npm install blazy --save
```
or bower:
``` bower
bower install blazy --save
```

### CDN
If you don't want to host the script yourself you can link to the latest minified file:  
`//cdn.jsdelivr.net/blazy/latest/blazy.min.js` on [jsDelivr](http://www.jsdelivr.com/#!blazy).
Exchange `latest` with the specific version number if you want to lock it in.

## WHY BE LAZY? ##
* bLazy is used on big sites with millions of monthly visitors so it has been tested out in the real world.
* bLazy is written in pure JavaScript why it doesn’t depend on 3rd-party libraries such as jQuery.
* bLazy is lightweight, less than 1.4KB and less than 1.25KB if you don't need IE7- support.
* bLazy is very fast. It has focus on performance why it also auto-destroys when it's done lazy loading.
* bLazy can lazy load all types of images including background images.
* bLazy is future-proof. It supports srcset and the picture element.
* bLazy can serve retina images on retina devices.
* bLazy can lazy load everything with a src like iframes, HTML5 videos, scripts, unity games etc.
* bLazy supports all browsers used today including legacy browsers like IE7 and 8.
* bLazy supports all main module formats like AMD, CommonJS and globals.  

## CHANGELOG
### v 1.6.2 (2016/05/09) ###
* Fixed bug introduced in v.1.6.0, not using retina/breakpoint src [#90](https://github.com/dinbror/blazy/issues/90).

### v 1.6.1 (2016/05/02) ###
* Implemented a workaround for onload/onerror bug introduced in chrome v50, [LINK](https://productforums.google.com/forum/#!topic/chrome/p51Lk7vnP2o). Fixed [#85](https://github.com/dinbror/blazy/issues/85).

### v 1.6.0 (2016/04/30) ###
* Added support for srcset and the picture element. Fixed [#69](https://github.com/dinbror/blazy/issues/69), [#75](https://github.com/dinbror/blazy/issues/75), [#77](https://github.com/dinbror/blazy/issues/77) and [#82](https://github.com/dinbror/blazy/issues/82).
* Added support for lazy load of videos with sources. Fixed [#81](https://github.com/dinbror/blazy/issues/81).
* Bugfix. Ensuring that error and success classes won't be added multiple times. Fixed [#84](https://github.com/dinbror/blazy/issues/84).
* Marked `breakpoints` as obsolete. Will be removed in upcoming version. Use srcset and/or the picture element instead.

### v 1.5.4 (2016/03/06) ###
* Fixed two Safari bugs: [#66](https://github.com/dinbror/blazy/issues/66) and [#78](https://github.com/dinbror/blazy/issues/78). Ensuring "DOM ready".

### v 1.5.3 (2016/03/01) ###
* Implemented [#30](https://github.com/dinbror/blazy/pull/30). Keeping data source until success.
* Fixed [#47](https://github.com/dinbror/blazy/pull/47). After implementing #30 you can now get the image src and more information in the error/success callbacks.
* Added example page to repo `/example/index.html`.

### v 1.5.2 (2015/12/01) ###
* Fixed minor bug where the error class was added when calling `revalidate()`.
* Minor refactoring

### v 1.5.1 (2015/11/14) ###
* Fixed toArray function so it now works in IE7 + 8 again. Bug introduced in 1.4.0. Thanks for reporting [@imcotton](https://github.com/imcotton).
* Fixed [#41](https://github.com/dinbror/blazy/pull/41). Added options for validate and saveViewportOffset delay.

### v 1.5.0 (2015/10/30) ###
* Added new feature. Now you can lazy load everything with a src attribute like iframes, unity games etc.
* Fixed [#45](https://github.com/dinbror/blazy/issues/45). Now you can pass an option if you always want to load invisible images/elements.
* Fixed [#49](https://github.com/dinbror/blazy/issues/49). Expanded the `load` function so it's now possible to pass a list of elements instead of only one element. Tested with getElementById, getElementsByClassName, querySelectorAll, querySelector and jQuery selector.
* Fixed [#63](https://github.com/dinbror/blazy/issues/63). 

### v 1.4.1 (2015/10/12) ###
* Fixed [#60](https://github.com/dinbror/blazy/issues/60). An "Uncaught TypeError" when options is null introduced in the refactoring in version 1.4.0.

### v 1.4.0 (2015/09/28) ###
* Fixed [#56](https://github.com/dinbror/blazy/issues/56). Now it's possible to create multiple versions of blazy without overriding options.

### v 1.3.1 (2015/02/01) ###
* Added support for CommonJS-like environments that support module.exports like [node](http://nodejs.org/).

### v 1.3.0 (2015/01/23) ###
* Fixed [#34](https://github.com/dinbror/blazy/issues/34). Expanded public `load` function with force attribute, so you can force hidden images to be loaded.
* Fixed [#24](https://github.com/dinbror/blazy/issues/24), [#32](https://github.com/dinbror/blazy/issues/32) and [#35](https://github.com/dinbror/blazy/issues/35). Updated "elementInView" function with intersection check. Thanks @teohhanhui.  

### v 1.2.2 (2014/05/04) ###
* Fixed [#15](https://github.com/dinbror/blazy/issues/15), when you resize the browser window in another tab bLazy didn't trigger new images in view. Thanks joshribakoff.

### v 1.2.1 (2014/03/23) ###
* When lazy loading background images it now only updates the background-image css attribute. Thanks Saku.

### v 1.2.0 (2014/02/15) ###
* Important note: renamed option multi to `breakpoints` because it's much more descriptive.
* Added [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) support.
* Minor refactoring.

### v 1.1.3 (2014/01/21) ###
* Fixed hardcoded retina check (isRetina = true).
* Fixed "Uncaught TypeError" when data-src is null. Instead it'll trigger the `error` callback.

### v 1.1.2 (2014/01/03) ###
* New feature: After many requests I added the possibility to handle retina images (if you’re not doing retina-first).
* New feature: Now you can also lazy load background images.
* Added new option, `separator`. Used if you want to pass retina images, default separator is ‘|’. (data-src=“image.jpg|image&#64;2x.jpg”).

### v 1.1.1 (2013/12/27) ###
* Fixed #1, resize/scroll events may be detached when adding elements by ajax.
* Added new option, `errorClass`. Classname an image will get if something goes wrong, default is ‘b-error’.
* Renamed option loadedClass to `successClass` so naming is aligned. Default is still ‘b-loaded’.

### v 1.1.0 (2013/11/22) ###
* Renamed success callback from onLoaded to `success`.
* Added onerror callback; `error`.
* Added the possibility to pass multiple containers instead of one.

### v 1.0.5 (2013/10/7) ###
* Fixed "Uncaught TypeError" when container isn't default (window).

### v 1.0.4 (2013/8/29) ###
* Added null check so we won't try to load an image if it's missing a data source.

### v 1.0.3 (2013/8/27) ###
* Added new option, `loadedClass`. Classname an image will get when loaded.
* Added support for horizontal lazy loading.
* Reduced throttle time for validate.

### v 1.0.2 (2013/8/7) ###
* Fixed typo in unbindEvent function.
* Added support for IE7 as promised (fallback for querySelectorAll).

### v 1.0.1 (2013/8/6) ###
* Performance improvements.
* Added throttle function to ensure that we don't call resize/scroll functions too often.
* Cleaning image markup when image has loaded.

##LICENSE: 
Copyright (c) 2013-16 Bjørn Klinggaard. Licensed under the [The MIT License (MIT)](http://opensource.org/licenses/MIT).

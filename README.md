hey, be lazy
=====
bLazy is a lightweight script for lazy loading and multi-serving images (less than 1.2KB minified and gzipped). It’s written in pure JavaScript why it doesn’t depend on 3rd-party libraries such as jQuery. It lets you lazy load and multi-serve your images so you can save bandwidth and server requests. The user will have faster load times and save data usage if he/she doesn't browse the whole page.

**Table of Contents**<br>
1. [Demo](https://github.com/dinbror/blazy#demo)<br>
2. [Howto & API](https://github.com/dinbror/blazy#how-to--api)<br>
3. [Why be lazy?](https://github.com/dinbror/blazy#why-be-lazy)<br>
4. [Changelog](https://github.com/dinbror/blazy#changelog)<br>
5. [License](https://github.com/dinbror/blazy#license)<br>

## DEMO ##
http://dinbror.dk/blazy

More examples will come. In the meantime you can play with a basic example at codepen:
http://codepen.io/dinbror/pen/HzCAJ

## HOW TO & API ##
http://dinbror.dk/blog/blazy

### CDN
If you don't want to host the script yourself you can link to the latest minified file:  
`//cdn.jsdelivr.net/blazy/latest/blazy.min.js` on [jsDelivr](http://www.jsdelivr.com/#!blazy).
Exchange `latest` with the specific version number if you want to lock it in.

## WHY BE LAZY? ##
* bLazy is used on big sites with millions of monthly visitors so it has been tested out in the real world.
* bLazy is written in pure JavaScript why it doesn’t depend on 3rd-party libraries such as jQuery.
* bLazy can lazy load all types of images including background images.
* bLazy can lazy load images depending on screensize (multi-serve images).
* bLazy can serve retina images on retina devices.
* bLazy is lightweight, less than 1.2KB and less than 1.05KB if you don't need IE7- support.
* bLazy is AMD, CommonJS and Browser globals compatible.

## CHANGELOG
### v 1.3.1 (2015/02/01) ###
* Added support for CommonJS-like environments that support module.exports like [node](http://nodejs.org/). 

### v 1.3.0 (2015/01/23) ###
* Fixed [#34](https://github.com/dinbror/blazy/issues/34). Expanded public `load` function with force attribute, so you can force hidden images to be loaded.
* Fixed [#24](https://github.com/dinbror/blazy/issues/24), [#32](https://github.com/dinbror/blazy/issues/32) and [#35](https://github.com/dinbror/blazy/issues/35). Updated "elementInView" function with intersection check. Thanks a lot @teohhanhui.  

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

##LICENSE:##
MIT

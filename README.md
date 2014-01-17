hey, bLazy.js
=====

### DEMO: ###
http://dinbror.dk/blazy
More examples will come. In the meantime you can play with a basic example at codepen:
http://codepen.io/dinbror/pen/HzCAJ

### API: ###
http://dinbror.dk/blog/blazy

### DESCRIPTION: ###
bLazy is a lightweight script for lazy loading and multi-serving images (less than 1KB minified and gzipped). It lets you lazy load and multi-serve your images so you can save bandwidth and server requests. The user will have faster load times and save data loaded if he/she doesn't browse the whole page. 

## CHANGELOG
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

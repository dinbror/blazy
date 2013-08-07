bLazy.js
=====

### DEMO: ###
http://dinbror.dk/blazy

### API: ###
http://dinbror.dk/blog/blazy

### DESCRIPTION: ###
bLazy is a lightweight lazy loading image script (less than 1KB minified and gzipped). It lets you lazy load and multi-serve your images so you can save bandwidth and server requests. The user will have faster load times and save data loaded if he/she doesn't browse the whole page. 

## CHANGELOG
### v 1.0.2 (2013/8/7) ###
* Fixed typo in unbindEvent function.
* Added support for IE7 as promised (fallback for querySelectorAll).

### v 1.0.1 (2013/8/6) ###
* Performance improvements.
* Added throttle function to ensure that we don't call resize/scroll functions too often.
* Cleaning image markup when image has loaded.
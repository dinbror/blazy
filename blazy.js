/*!
  [be]Lazy.js - v1.1.2 - 2014.01.03
  A lazy loading and multi-serving image script
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/
var Blazy = (function(window, document) {
	'use strict';
	
	//vars
	var source, options, winWidth, winHeight, isRetina;
	var destroyed = true;
	var count = 0;
	var images = [];
	
	//throttle vars
	var validateT;
	var saveWinOffsetT;
	
	// constructor
	function Blazy(settings) {
		//IE7- fallback for missing querySelectorAll support
		if (!document.querySelectorAll) {
			var s=document.createStyleSheet();
			document.querySelectorAll = function(r, c, i, j, a) {
				a=document.all, c=[], r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
				for (i=r.length; i--;) {
					s.addRule(r[i], 'k:v');
					for (j=a.length; j--;) a[j].currentStyle.k && c.push(a[j]);
					s.removeRule(0);
				}
				return c;
			};
		}
		
		//options
		options 				= settings 				|| {};
		options.src				= options.src			|| 'data-src';
		options.multi	 		= options.multi			|| false;
		options.error	 		= options.error 		|| false;
		options.offset			= options.offset 		|| 100;
		options.success		 	= options.success 		|| false;
	  	options.selector 		= options.selector 		|| '.b-lazy';
		options.separator 		= options.separator 	|| '|';
		options.container		= options.container 	?  document.querySelectorAll(options.container) : false;
		options.errorClass 		= options.errorClass 	|| 'b-error';
		options.successClass 	= options.successClass 	|| 'b-loaded';
		source 					= options.src;
		isRetina				= true;//window.devicePixelRatio > 1;
		//throttle, ensures that we don't call the functions too often
		validateT				= throttle(validate, 20); 
		saveWinOffsetT			= throttle(saveWinOffset, 50);
		
		saveWinOffset();		
		
		//handle multi-served image src
		each(options.multi, function(object){
			if(object.width >= window.screen.width) {
				source = object.src;
				return false;
			}
		});
		
		// start lazy load
		initialize();	
  	}
	
	// public functions
	Blazy.prototype.revalidate = function() {
 		initialize();
   	};
	Blazy.prototype.load = function(element){
		if(!isElementLoaded(element)) loadImage(element);
	};
	Blazy.prototype.destroy = function(){
		if(options.container){
			each(options.container, function(object){
				unbindEvent(object, 'scroll', validateT);
			});
		}
		unbindEvent(window, 'scroll', validateT);
		unbindEvent(window, 'resize', validateT);
		unbindEvent(window, 'resize', saveWinOffsetT);
		count = 0;
		images.length = 0;
		destroyed = true;
	};
	
	// private helper functions
	function validate() {
		for(var i = 0; i<count; i++){
			var image = images[i];
			var alreadyLoaded = isElementLoaded(image);
 			if(elementInView(image) || alreadyLoaded) {
				// If an image has already been loaded we won't do it again
				if(!alreadyLoaded) loadImage(image);
 				images.splice(i, 1);
 				count--;
 				i--;
 			} 
 		}
		if(count === 0) {
			Blazy.prototype.destroy();
		}
	}
	
	function loadImage(ele){
		// if element is visible
		if(ele.offsetWidth > 0 && ele.offsetHeight > 0) {
			var dataSrc = ele.getAttribute(source) || ele.getAttribute(options.src); // fallback to default data-src
			var dataSrcSplitted = dataSrc.split(options.separator);
			var src = dataSrcSplitted[isRetina && dataSrcSplitted.length > 1 ? 1 : 0];
			if(src) {
				var img = new Image();
				// cleanup markup, remove data source attributes
				each(options.multi, function(object){
					ele.removeAttribute(object.src);
				});
				ele.removeAttribute(options.src);
				img.onerror = function() {
					if(options.error) options.error(ele, "invalid");
					ele.className = ele.className + ' ' + options.errorClass;
				} 
				img.onload = function() {
					// Is element an image or should we add the src as a background image?
			      	ele.nodeName.toLowerCase() === 'img' ? ele.src = src : ele.setAttribute('style', 'background-image: url("' + src + '");');	
					ele.className = ele.className + ' ' + options.successClass;	
					if(options.success) options.success(ele);
				}
				img.src = src; //preload image
			} else {
				if(options.error) options.error(ele, "missing");
				ele.className = ele.className + ' ' + options.errorClass;
			}
		}
	 }
			
	function elementInView(ele) {
		var offset = ele.getBoundingClientRect();
		var bottomline = winHeight + options.offset;
	
	    return (
		 // inside horizontal view
			offset.left >= 0
		 && offset.left <= winWidth + options.offset	 
		 && (
		 // from top to bottom
			offset.top  >= 0
		 	&& offset.top  <= bottomline
		 // from bottom to top
		 || offset.bottom <= bottomline
	 	    && offset.bottom >= 0 - options.offset
			)
	 	);
	 }
	 
	 function isElementLoaded(ele) {
		 return (' ' + ele.className + ' ').indexOf(' ' + options.successClass + ' ') !== -1;
	 }
	 
	 function createImageArray(selector) {
 		var nodelist 	= document.querySelectorAll(selector);
 		count 			= nodelist.length;
 		//converting nodelist to array
 		for(var i = count; i--; images.unshift(nodelist[i])){};
	 }
	 
	 function saveWinOffset(){
		 winHeight = window.innerHeight || document.documentElement.clientHeight;
		 winWidth = window.innerWidth || document.documentElement.clientWidth;
	 }
	 
	 function initialize(){
		// First we create an array of images to lazy load
		createImageArray(options.selector);
		// Then we bind events if not already binded
		if(destroyed) {
			destroyed = false;
			if(options.container) {
	 			each(options.container, function(object){
	 				bindEvent(object, 'scroll', validateT);
	 			});
	 		}
	 		bindEvent(window, 'scroll', validateT);
	 		bindEvent(window, 'resize', validateT);
	 		bindEvent(window, 'resize', saveWinOffsetT);
		}
		// And finally, we start to lazy load. Should bLazy ensure domready?
		validate();	
	 }
	 
	 function bindEvent(ele, type, fn) {
       if (ele.attachEvent) {
         ele.attachEvent && ele.attachEvent('on' + type, fn);
       } else {
         ele.addEventListener(type, fn, false);
       }
     }
	 
	 function unbindEvent(ele, type, fn) {
       if (ele.detachEvent) {
         ele.detachEvent && ele.detachEvent('on' + type, fn);
       } else {
         ele.removeEventListener(type, fn, false);
       }
     }
	 
	 function each(object, fn){
 		if(object && fn) {
 			var _count = object.length;
 			for(var i = 0; i<_count && fn(object[i], i) !== false; i++){}
 		}
	 }
	 
	 function throttle(fn, minDelay) {
     	var lastCall = 0;
       	return function() {
        	var now = +new Date();
         	if (now - lastCall < minDelay) {
           		return;
         	}
         	lastCall = now;
         	fn.apply(this, arguments);
       	};
	 }
  	
	 return Blazy;
			  
})(window, document);

/*!
  [be]Lazy.js - v1.1.1 - 2013.12.27
  A lazy loading and multi-serving image script
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/
;var Blazy = (function(window, document) {
	'use strict';
	
	//vars
	var source;
	var opt = {};
	var winWidth;
	var winHeight;
	var destroyed = true;
	var count = 0;
	var images = [];
	
	//throttle vars
	var validateT;
	var saveWinOffsetT;
	
	// constructor
	function Blazy(options) {
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
		options 			= options 				|| {};
		opt.src				= options.src			|| 'data-src';
		opt.multi	 		= options.multi			|| false;
		opt.error	 		= options.error 		|| false;
		opt.offset			= options.offset 		|| 100;
		opt.success		 	= options.success 		|| false;
	  	opt.selector 		= options.selector 		|| '.b-lazy';
		opt.container		= options.container 	?  document.querySelectorAll(options.container) : false;
		opt.errorClass 		= options.errorClass 	|| 'b-error';
		opt.successClass 	= options.successClass 	|| 'b-loaded';
		source 				= opt.src;
		//throttle, ensures that we don't call the functions too often
		validateT			= throttle(validate, 20); 
		saveWinOffsetT		= throttle(saveWinOffset, 50);
		
		saveWinOffset();		
		
		//handle multi-served image src
		each(opt.multi, function(object){
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
		loadImage(element);
	};
	Blazy.prototype.destroy = function(){
		destroyed = true;
		if(opt.container){
			each(opt.container, function(object){
				unbindEvent(object, 'scroll', validateT);
			});
		}
		unbindEvent(window, 'scroll', validateT);
		unbindEvent(window, 'resize', validateT);
		unbindEvent(window, 'resize', saveWinOffsetT);
		count = 0;
		images.length = 0;
	};
	
	// private helper functions
	function validate() {
		for(var i = 0; i<count; i++){
			var image = images[i];
			var isImageLoaded = (' ' + image.className + ' ').indexOf(' ' + opt.successClass + ' ') !== -1;
 			if(elementInView(image) || isImageLoaded) {
				// If an image has already been loaded we won't do it again
				if(!isImageLoaded) loadImage(images[i]);
 				images.splice(i, 1);
 				count = count-1;
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
			var src = ele.getAttribute(source) || ele.getAttribute(opt.src);
			if(src) {
				var img = new Image();
				// clean markup, remove data source attributes
				each(opt.multi, function(object){
					ele.removeAttribute(object.src);
				});
				ele.removeAttribute(opt.src);
				img.onerror = function() {
					if(opt.error) opt.error(ele, "invalid");
					ele.className = ele.className + ' ' + opt.errorClass;
				} 
				img.onload = function() {
			      	!!ele.parent ? ele.parent.replaceChild(img, ele) : ele.src = src;	
					ele.className = ele.className + ' ' + opt.successClass;	
					if(opt.success) opt.success(ele);
				}
				img.src = src; //preload image
			} else {
				if(opt.error) opt.error(ele, "missing");
				ele.className = ele.className + ' ' + opt.errorClass;
			}
		}
	 }
			
	function elementInView(ele) {
		var offset = ele.getBoundingClientRect();
		var bottomline = winHeight + opt.offset;
	
	    return (
		 // inside horizontal view
			offset.left >= 0
		 && offset.left <= winWidth + opt.offset	 
		 && (
		 // from top to bottom
			offset.top  >= 0
		 	&& offset.top  <= bottomline
		 // from bottom to top
		 || offset.bottom <= bottomline
	 	    && offset.bottom >= 0 - opt.offset
			)
	 	);
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
		createImageArray(opt.selector);
		// Then we bind events if not already binded
		if(destroyed) {
			destroyed = false;
			if(opt.container) {
	 			each(opt.container, function(object){
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
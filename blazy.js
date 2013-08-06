/*===================================================================================================================
 * @name: [be]lazy
 * @type: javascript
 * @author: (c) Bjoern Klinggaard - @bklinggaard
 * @demo: http://dinbror.dk/blazy
 * @version: 1.0.1
 *==================================================================================================================*/
;var Blazy = (function(window, document) {
	'use strict';
	
	//vars
	var source;
	var opt = {}
	var count = 0;
	var winHeight;
	var images = [];
	
	//throttle vars
	var validateT;
	var saveWinHeightT;
	
	// constructor
	function Blazy(options) {
		options 		= options 			|| {};
		opt.src			= options.src		|| 'data-src';
		opt.multi	 	= options.multi		|| false;
		opt.offset		= options.offset 	|| 100;
	  	opt.selector 	= options.selector 	|| '.b-lazy';
		opt.onLoaded 	= options.onLoaded 	|| false;
		opt.container	= document.querySelector(
							options.container
						) 					|| window;
		source 			= opt.src;
		//throttle, ensures that we don't call the functions too often
		validateT		= throttle(validate, 50); 
		saveWinHeightT	= throttle(saveWinHeight, 50);
		
		saveWinHeight();		
		createImageArray(opt.selector);
		
		//handle multi-served image src
		each(opt.multi, function(object){
			if(object.width >= window.screen.width) {
				source = object.src;
				return false;
			}
		});
		
		//binding events
		bindEvent(opt.container, 'scroll', validateT);
		bindEvent(opt.container, 'resize', validateT);
		bindEvent(opt.container, 'resize', saveWinHeightT);
		
		//start, should blazy ensure domready?
		validate();		
  	};
	
	// public functions
	Blazy.prototype.revalidate = function() {
 		createImageArray(opt.selector);
		validate();
   	};
	Blazy.prototype.load = function(element){
		loadImage(element);
	};
	Blazy.prototype.destroy = function(){
		unbindEvent(opt.container, 'scroll', validateT);
		unbindEvent(opt.container, 'resize', validateT);
		unbindEvent(opt.container, 'resize', saveWinHeightT);
		count = 0;
		images = [];
	};
	
	// private helper functions
	function validate() {
		for(var i = 0; i<count; i++){
 			if(elementInView(images[i])) {
 				loadImage(images[i]);
 				images.splice(i, 1);
 				count = count-1;
 				i--;
 			} 	
 		}
		if(count === 0) {
			Blazy.prototype.destroy();
		}
	};
	
	function loadImage(ele){
		// if element is visible and not already loaded
		// use classList.contains instead of indexOf and ignore missing support in IE9-?
		if(ele.offsetWidth > 0 && ele.offsetHeight > 0 && (' ' + ele.className + ' ').indexOf(' loaded ') === -1) {
			var img = new Image();
			var src = ele.getAttribute(ele.getAttribute(source) ? source : opt.src);
			// clean markup, remove data source attributes
			each(opt.multi, function(object){
				ele.removeAttribute(object.src);
			});
			ele.removeAttribute(opt.src);
			img.onload = function() {
		      	!!ele.parent ? ele.parent.replaceChild(img, ele) : ele.src = src;	
				ele.className = ele.className + ' loaded';	
				opt.onLoaded(ele);
			}
			img.src = src; //preload image
		}
	 };
			
	function elementInView(ele) {
		var offset = ele.getBoundingClientRect();
		var bottomline = winHeight + opt.offset;
	    return (
			offset.top  >= 0
		 && offset.left >= 0 
		 && offset.top  <= bottomline
		 || (offset.bottom <= bottomline
	 	    && offset.bottom >= 0 - opt.offset)
	 	);
	 };
	 
	 function createImageArray(selector) {
 		var nodelist 	= document.querySelectorAll(selector);
 		count 			= nodelist.length;
 		//converting nodelist to array
 		for(var i = count; i--; images.unshift(nodelist[i])){};
	 };
	 
	 function saveWinHeight(){
		 winHeight = window.innerHeight || document.documentElement.clientHeight;
	 };
	 
	 function bindEvent(ele, type, fn) {
       if (ele.attachEvent) {
         ele.attachEvent && ele.attachEvent('on' + type, fn);
       } else {
         ele.addEventListener(type, fn, false);
       }
     };
	 
	 function unbindEvent(ele, type, fn) {
       if (ele.detachEvent) {
         ele.detachEvent && el.detachEvent('on' + type, fn);
       } else {
         ele.removeEventListener(type, fn, false);
       }
     };
	 
	 function each(object, fn){
 		if(object && fn) {
 			var _count = object.length;
 			for(var i = 0; i<_count && fn(object[i], i) !== false; i++){}
 		}
	 };
	 
	 function throttle(fn, minDelay) {
     	var lastCall = 0;
       	return function() {
        	var now = +new Date();
         	if (now - lastCall < minDelay) {
           		return;
         	}
         	lastCall = now;
         	fn.apply(this, arguments);
       	}
	 };
  	
	 return Blazy;
			  
})(window, document);


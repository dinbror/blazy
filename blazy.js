/*===================================================================================================================
 * @name: [be]lazy
 * @type: javascript
 * @author: (c) Bjoern Klinggaard - @bklinggaard
 * @demo: http://dinbror.dk/blazy
 * @version: 1.0.0
 *==================================================================================================================*/
;var Blazy = (function(window, document) {
	'use strict';
	
	//vars
	var source;
	var opt = {}
	var count = 0;
	var images = [];
	
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
				
		createImageArray(opt.selector);
		
		if(opt.multi) {
			var multiCount = opt.multi.length;
			for(var i = 0; i<multiCount; i++){
				if(opt.multi[i].width >= window.screen.width) {
					source = opt.multi[i].src;
					break;
				}
			}
		}
		
		//binding events
		bindEvent(opt.container, 'scroll', validate);
		bindEvent(opt.container, 'resize', validate);
		
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
		unbindEvent(opt.container, 'scroll', validate);
		unbindEvent(opt.container, 'resize', validate);
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
	};
	
	function loadImage(ele){
		// if element is visible and not already loaded
		// use classList.contains instead of indexOf and ignore missing support in IE9-?
		if(ele.offsetWidth > 0 && ele.offsetHeight > 0 && (' ' + ele.className + ' ').indexOf(' loaded ') === -1) {
			var img = new Image();
			var src = ele.getAttribute(ele.getAttribute(source) ? source : opt.src);
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
		var bottomline = (window.innerHeight || document.documentElement.clientHeight) + opt.offset;
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
 		for(var i = count; i--; images.unshift(nodelist[i]));
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
  	
	 return Blazy;
			  
})(window, document);


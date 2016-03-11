"use strict";

var image = {};

image.init = function() {
	image.cache = {};
	image.loading = {};
	image.readyCalls = [];

	image.load(image.urls);
};

//Asset classes will call this at load time and define all the textures we will need at runtime.
//Then when image.init is called it will load everything collected by this method.
image.urls = [];
image.collect = function(url) {
	for(var i=0;i<image.urls.length;i++) {
		if(image.urls[i] === url) {
			return;
		}
	}
	image.urls.push(url);
};

image.load = function (urlOrArr) {
	if (urlOrArr instanceof Array) {
		urlOrArr.forEach(function(url) {
			image._load(url);
		});
	}
	else {
		image._load(urlOrArr);
	}
};

image._load = function(url) {
	if (image.cache[url]) {
		return image.cache[url];
	}
	else {
		var img = new Image();
		img.onload = function() {
			image.cache[url] = img;

			if (image.isReady()) {
				image.readyCalls.forEach(function(func) {
					func();
				});
			}
		};
		image.cache[url] = false;
		img.src = url;
	}
};

image.get = function(url) {
	return image.cache[url];
};

image.isReady = function() {
	var ready = true;
	for (var k in image.cache) {
		if (image.cache.hasOwnProperty(k) && !image.cache[k]) {
			ready = false;
		}
	}
	return ready;
};

image.onReady = function(func) {
	image.readyCalls.push(func);
};

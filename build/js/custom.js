$(document).ready(function(){
	//var hash = window.location.hash;
    //load.loadPages();
});

$(window).on('hashchange', function(e) {
  	var hash = window.location.hash.slice(1);
    load.loadPages();
});

var Load = function(){
	this.currentUrl = '';
	this.config = {
		"header": {	
			"wrap": "header",
			"css": false,
			"lang": false
		},
		"footer": {	
			"wrap": "footer",
			"css": false,
			"lang": false
		},
		"pages":{
			"inplay":{
				"hot-news": { 
					"wrap": "#inplay-forMainHotNews",
					"css": false,
					"lang": false
				},
				"slider": { 
					"css": false,
					"lang": false
				},
				"search": {
					"wrap": "#inplay-forSearch",
					"css": false,
					"lang": false
				},
				"betslip": {
					"wrap": "#inplay-forBetslip",
					"css": false,
					"lang": false
				}
			},
			"sports":{
				"hot-news": { 
					"wrap": "#sports-forMainHotNews",
					"css": false,
					"lang": false
				},
				"favourite": { 
					"wrap": "#sports-forMainFavourite",
					"css": false,
					"lang": false
				},
				"classification": { 
					"wrap": "#sports-forMainClassification",
					"css": false,
					"lang": false
				},
				"search": {
					"wrap": "#sports-forSearch",
					"css": false,
					"lang": false
				},
				"betslip": {
					"wrap": "#sports-forBetslip",
					"css": false,
					"lang": false
				}
			}
		}
	};
}


Load.prototype.checkActiveMenuItem = function(self){
	$(".menu a").each(function(index) {
	  	if ($(this).attr("href") == `/#/${self.getCurrentUrl()}/`)
	  		$(this).addClass('active');
	  	else
	  		$(this).removeClass('active');
	});
}

Load.prototype.getCurrentUrl = function(){
	var self = this;
	var hash = window.location.hash.slice(1);
	var regex = new RegExp('/', 'g');	
	if (!hash) {
		window.location.hash = '/sports/';
		return 'sports';
	}
	else if(!self.checkUrl(hash.replace(regex, ""))){
		window.location.hash = '/sports/';
		return 'sports';
	}
	return hash.replace(regex, "");
}

Load.prototype.checkUrl = function(value) {
	if (value in this.config.pages) {
		return true;
	}
	else{
		return false;
	}
};

Load.prototype.loadHtml = function(path, wrapper){
	$(wrapper).load(path);
}

Load.prototype.loadCss = function(path){
	$.get(path, function(content){
		$('<style type="text/css"></style>')
			.html(content)
			.appendTo("head");
	});
}

Load.prototype.loadScripts = function(path){
	$.getScript(path, function() {});
}

Load.prototype.loadParts = function(data) {
	var self = this;
	if (data in this.config){
		var path = `../modules/${this.config[data].wrap}/${this.config[data].wrap}`,
			css = `${path}.css`,
			js = `${path}.js`;

		self.loadScripts(js);
		if (this.config[data].css)
			self.loadCss(css);
	}
	else{
		console.log(`Error, ${data} not found`)
	}
};


Load.prototype.loadModules = function(data, parts){
	var self = this;
	$.each(data, function(index, item){
		var path = `../modules/${parts}/${index}/${index}`,
			html = `${path}.html`,
			css = `${path}.css`,
			js = `${path}.js`;

		self.loadHtml(html, item.wrap)
		self.loadScripts(js)
		if (item.css)
			self.loadCss(css);
	});
}

Load.prototype.loadPages = function() {
	$('.loader').show();
	var self = this;
	var path = self.getCurrentUrl();
	$.ajax({
		type: "GET",
		url: `../modules/pages/${path}/${path}.html`,
		data: "navigate=ajax",
		success: function(data){
			$(".main").html(data);
			self.currentUrl = self.getCurrentUrl();
			self.loadScripts(`../modules/pages/${path}/${path}.js`);
			self.loadModules(self.config['pages'][self.currentUrl], "main");
			self.checkActiveMenuItem(self);
			$('.loader').hide();
		},
		error: function(){
            console.log("Error")
        }
	});
}

var load = new Load();
load.loadPages();
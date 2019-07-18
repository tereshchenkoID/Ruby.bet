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
			},
			"event":{
				"hot-news": { 
					"wrap": "#event-forMainHotNews",
					"css": false,
					"lang": false
				},
				"favourite": { 
					"wrap": "#event-forMainFavourite",
					"css": false,
					"lang": false
				},
				"classification": { 
					"wrap": "#event-forMainClassification",
					"css": false,
					"lang": false
				},
				"search": {
					"wrap": "#event-forSearch",
					"css": false,
					"lang": false
				},
				"betslip": {
					"wrap": "#event-forBetslip",
					"css": false,
					"lang": false
				},
				"scoreboard": {
					"wrap": "#event-forScoreboard",
					"css": false,
					"lang": false
				}
			},
			"prematch":{
				"hot-news": { 
					"wrap": "#prematch-forMainHotNews",
					"css": false,
					"lang": false
				},
				"favourite": { 
					"wrap": "#prematch-forMainFavourite",
					"css": false,
					"lang": false
				},
				"classification": { 
					"wrap": "#prematch-forMainClassification",
					"css": false,
					"lang": false
				},
				"search": {
					"wrap": "#prematch-forSearch",
					"css": false,
					"lang": false
				},
				"betslip": {
					"wrap": "#prematch-forBetslip",
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
			self.loadModules(self.config['pages'][self.currentUrl], "main");
			self.loadScripts(`../modules/pages/${path}/${path}.js`);
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




var Base = function (){}

Base.prototype.s_NA= function(data){
	var team = data.split('vs')
	return team;
}

Base.prototype.s_SS = function(data, separate){
	if (data) {
		return data.split('-');
	}
	else{
		return [0, 0];
	}
}

Base.prototype.s_SS_set  = function(data, count){
	var scoreFirst = [];
	var scoreSecond = [];
	var res = data.split(',');
	if (res.length > 0) {
		for (var i = 0; i < res.length; i++) {
			var a = res[i].split('-');
			scoreFirst.push(a[0]);
			scoreSecond.push(a[1]);
		}
	}
	if (count == 1)
		return scoreFirst;
	else
		return scoreSecond;
}


Base.prototype.getCookie = function(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


Base.prototype.checkValue = function(obj, value){
	return obj.hasOwnProperty(value)
}

Base.prototype.g_TU = function(etu) {
	etu = etu.toString();
	years = etu.substring(0,4); 
	month = etu.substring(4,6); 
	day = etu.substring(6,8);
	hours = etu.substring (8,10);
	minute = etu.substring(10,12);
	second = etu.substring(12,14);
	date = years+'-'+month+'-'+day+' '+hours+':'+minute+':'+second;
	return date;
}


var base = new Base();
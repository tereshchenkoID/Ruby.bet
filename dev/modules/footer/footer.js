var Footer = function(){
	this.modules = {
		"partner": {	
			"wrap": "#footer-forPartner",
			"css": false,
			"lang": false
		},
		"about": {
			"wrap": "#footer-forAbout",
			"css": false,
			"lang": false
		},
		"info": {	
			"wrap": "#footer-forInfo",
			"css": false,
			"lang": false
		},
		"copyright": {	
			"wrap": "#footer-forCopyright",
			"css": false,
			"lang": false
		}
	};
}

Footer.prototype = Object.create(Load.prototype);
Footer.prototype.constructor = Footer;

Footer.prototype.init = function() {
	this.loadModules(this.modules, "footer");
};

var footer = new Footer();
footer.init();
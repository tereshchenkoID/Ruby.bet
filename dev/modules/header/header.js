var Header = function(){
	this.connect = false;
	this.modules = {
		"logo": {	
			"wrap": "#header-forLogo",
			"css": false,
			"lang": false
		},
		"menu": {
			"wrap": "#header-forMenu",
			"css": false,
			"lang": false
		},
		"menu-bottom": {
			"wrap": "#header-forMenuBottom",
			"css": false,
			"lang": false
		},
		"login": {	
			"wrap": "#header-forLogin",
			"css": true,
			"lang": false
		}
	};
}

Header.prototype = Object.create(Load.prototype);
Header.prototype.constructor = Header;

Header.prototype.init = function() {
	/*if (this.connect) {
        this.modules = JSON.parse(JSON.stringify(this.modules).split('"login":').join('"login-in":'));
    }*/
	this.loadModules(this.modules, "header");
};


var header = new Header();
header.init();
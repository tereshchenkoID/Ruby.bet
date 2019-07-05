var Inplay = function(){
	this.link = "http://bestline.bet/inplay/";
	this.html = '';
	this.date;
	this.active;
}

Inplay.prototype.buttonCoefficientTemplate = function(name, coefficient, it){
	return `<button class="button coefficient" data-it="${it}">
				<p class="star"></p>
				<p class="font ellipsis mra">${name}</p>
				<p class="font down blick">${coefficient}</p>
			</button>`;
}


Inplay.prototype.forSliderTemplate = function(data){
	return `<a class="slider__item" data-it="${data.IT}">
				<p class="sports-${data.ID} icon"></p>
				<p class="font ellipsis text">${data.NA}</p>
			</a>`;
}

Inplay.prototype.submenuTemplate = function(name, it, id){
	return `<div class="inplayCategory" data-it="${it}">
				<div class="flex-container align-middle">
					<p class="sports-${id}"></p>
					<p class="font primary ml text-transform">${name}:</p>
				</div>
				<div class="flex-container align-middle inplayMenu">
					<a class="font text-uppercase inplayMenu__item inplayMenu__item--border">Main Bets</a>
					<a class="font text-uppercase inplayMenu__item inplayMenu__item--border">Number of goals</a>
					<a class="font text-uppercase inplayMenu__item inplayMenu__item--border">Next goal</a>
				</div>
			</div>`;
}

Inplay.prototype.subcategoryTemplate = function(name, it, catIt){
	return `<div class="play-subcategory closed" data-catit="${catIt}" data-it="${it}">
				<img src="./img/img/icon_country/Ukraine.ico" class="play-subcategory-icon">
				<p class="play-subcategory-text font">${name}</p>	
			</div>`;
}

Inplay.prototype.timeTemplate = function(half, data){
	return 	`<div class="inplayTeamTime">
				<p class="font team-period">${half}</p>
				<p class="font bold team-time">${data}</p>
			</div>`;
}

Inplay.prototype.optionsTemplate = function(play){
	return 	`<div class="flex-container align-center-middle inplayTeamOptions">
				<button class="sport-icon ${play.toLowerCase()} team-button"></button>
				<button class="sport-icon play team-button"></button>
			</div>`;
}
				
Inplay.prototype.forFootballTemplate = function(data, self, play){
	return  `${self.checkTime(data, self)}
				<div class="flex-container align-center-middle inplayTeamScoreInfo">
					<p class="font ellipsis text-right team-name">${self.separateTeam(data.NA)[0]}</p>
					<p class="font text-center team-score">${self.separateScore(data.SS)[0]}:${self.separateScore(data.SS)[1]}</p>
					<p class="font ellipsis text-left team-name">${self.separateTeam(data.NA)[1]}</p>
			 	</div>
			${self.optionsTemplate(play)}`;
}

Inplay.prototype.forTennisTemplate = function(data, self, play){
	return `<div class="inplayTeamScoreInfo">
				<p class="font ellipsis text-left team-name">${self.separateTeam(data.NA)[0]}</p>
				<p class="font ellipsis text-left team-name">${self.separateTeam(data.NA)[1]}</p>
			</div>
			<table class="inplayTeamScoreTableInfo">
				<tr>
					<td></td>
					<td><p class="font small primary">${self.separateScoreTennis(data.SS)[0].slice(0, -1)}</p></td>
				</tr>
				<tr>
					<td><div class="circle"></div></td>
					<td><p class="font small primary">${self.separateScoreTennis(data.SS)[1].slice(0, -1)}</p></td>
				</tr>
			</table>
			${self.optionsTemplate(play)}`;
}

Inplay.prototype.forBasketballTemplate = function(data, self, play){
	return  `${self.checkTime(data, self)}
				<div class="flex-container align-center-middle inplayTeamScoreInfo">
					<p class="font ellipsis text-right team-name">${self.separateTeam(data.NA)[0]}</p>
					<p class="font text-center team-score">${self.separateScore(data.SS)[0]}:${self.separateScore(data.SS)[1]}</p>
					<p class="font ellipsis text-left team-name">${self.separateTeam(data.NA)[1]}</p>
				</div>
			${self.optionsTemplate(play)}`;
}

Inplay.prototype.forBaseballTemplate = function(data, self, play){
	return  `<div class="flex-container align-center-middle inplayTeamScoreInfo">
				<p class="font ellipsis text-right team-name">${self.separateTeam(data.NA)[0]}</p>
				<p class="font text-center team-score">${self.separateScore(data.SS)[0]}:${self.separateScore(data.SS)[1]}</p>
				<p class="font ellipsis text-left team-name">${self.separateTeam(data.NA)[1]}</p>
			</div>
			${self.optionsTemplate(play)}`;
}

Inplay.prototype.forTableTennisTemplate = function(data, self, play){
	return  `<div class="flex-container align-center-middle inplayTeamScoreInfo">
				<p class="font ellipsis text-right team-name">${self.separateTeam(data.NA)[0]}</p>
				<p class="font text-center team-score">${self.separateScore(data.SS)[0]}:${self.separateScore(data.SS)[1]}</p>
				<p class="font ellipsis text-left team-name">${self.separateTeam(data.NA)[1]}</p>
			</div>
			${self.optionsTemplate(play)}`;
}

Inplay.prototype.forVolleyballTemplate = function(data, self, play){
	return  `<div class="flex-container align-center-middle inplayTeamScoreInfo">
				<p class="font ellipsis text-right team-name">${self.separateTeam(data.NA)[0]}</p>
				<p class="font text-center team-score">${self.separateScore(data.SS)[0]}:${self.separateScore(data.SS)[1]}</p>
				<p class="font ellipsis text-left team-name">${self.separateTeam(data.NA)[1]}</p>
			</div>
			${self.optionsTemplate(play)}`;
}

Inplay.prototype.forBeachVolleyballTemplate = function(data, self, play){
	return  `<div class="flex-container align-center-middle inplayTeamScoreInfo">
				<p class="font ellipsis text-right team-name">${self.separateTeam(data.NA)[0]}</p>
				<p class="font text-center team-score">${self.separateScore(data.SS)[0]}:${self.separateScore(data.SS)[1]}</p>
				<p class="font ellipsis text-left team-name">${self.separateTeam(data.NA)[1]}</p>
			</div>
			${self.optionsTemplate(play)}`;
}

Inplay.prototype.forBadmintonTemplate = function(data, self, play){
	return  `<div class="flex-container align-center-middle inplayTeamScoreInfo">
				<p class="font ellipsis text-right team-name">${self.separateTeam(data.NA)[0]}</p>
				<p class="font text-center team-score">${self.separateScore(data.SS)[0]}:${self.separateScore(data.SS)[1]}</p>
				<p class="font ellipsis text-left team-name">${self.separateTeam(data.NA)[1]}</p>
			</div>
			${self.optionsTemplate(play)}`;
}

Inplay.prototype.forCricketTemplate = function(data, self, play){
	return  `<div class="inplayTeamScoreInfo">
				<p class="font ellipsis text-left team-name">${self.separateTeam(data.NA)[0]}</p>
				<p class="font ellipsis text-left team-name">${self.separateTeam(data.NA)[1]}</p>
			</div>
			<table class="inplayTeamScoreTableInfo">
				<tr>
					<td><p class="font small primary">${self.separateScoreCricket(data.SS)[0]}</p></td>
				</tr>
				<tr>
					<td><p class="font small primary">${self.separateScoreCricket(data.SS)[1]}</p></td>
				</tr>
			</table>
			${self.optionsTemplate(play)}`;
}

Inplay.prototype.forGreyhoundsTemplate = function(data, self, play){
	return  `<div class="flex-container align-center-middle inplayTeamScoreInfo">
				<p class="font ellipsis text-left team-name">${data.NA}</p>
			</div>`;
}

Inplay.prototype.forDartsTemplate = function(data, self, play){
	return  `<div class="flex-container align-center-middle inplayTeamScoreInfo">
				<p class="font ellipsis text-right team-name">${self.separateTeam(data.NA)[0]}</p>
				<p class="font text-center team-score">${self.separateScore(data.SS)[0]}:${self.separateScore(data.SS)[1]}</p>
				<p class="font ellipsis text-left team-name">${self.separateTeam(data.NA)[1]}</p>
			</div>
			${self.optionsTemplate(play)}`;
}


Inplay.prototype.resultsInplayTemplate = function(data, play, catIt){
	var self = this;
	var html = `<div class="flex-container align-middle inplayTable ${play.toLowerCase()}"
					data-catit="${catIt}"
					data-fi="${data.FI}" 
					data-it="${data.IT}">
					<div class="flex-container align-middle inplayTable__left">`
					switch (play) {
						case "Soccer":
							html += self.forFootballTemplate(data, self, play);
						break;
						case "Tennis":
							html += self.forTennisTemplate(data, self, play);
						break;
						case "Baseball":
							html += self.forBaseballTemplate(data, self, play);
						break;
						case "Basketball":
							html += self.forBasketballTemplate(data, self, play);
						break;
						case "Volleyball":
							html += self.forBeachVolleyballTemplate(data, self, play);
						break;
						case "Beach Volleyball":
							html += self.forBeachVolleyballTemplate(data, self, play);
						break;
						case "Table Tennis":
							html += self.forTableTennisTemplate(data, self, play);
						break;
						case "Badminton":
							html += self.forBadmintonTemplate(data, self, play);
						break;
						case "Greyhounds":
							html += self.forGreyhoundsTemplate(data, self, play);
						break;
						case "Cricket":
							html += self.forCricketTemplate(data, self, play);
						break;
						case "Darts":
							html += self.forDartsTemplate(data, self, play);
						break;
						default:
							html += self.forFootballTemplate(data, self, play);
					}
			html += `</div>`;
					if (data.MA[0]) {
			  html +=	`<div class="inplayTable__right" data-it="${data.MA[0].IT}">
							<div class="flex-container align-middle">
								<p class="font white ml">${data.MA[0].NA}</p>
							</div>
							
							<div class="flex-container align-middle">
								<button class="button reload">
									<i class="fa fa-angle-left"></i>
								</button>
								<div class="flex-container align-middle inplayTeamButtons">`;


								$.each(data.MA[0].PA, function(index, item){
								html += `<button class="button coefficient" data-it="${item.IT}">`;
									console.log(data.MA[0].PA.length)
										if (index != 1 && data.MA[0].PA.length <= 3) {
											html += `<p class="star"></p>`;
										}
									html +=	`<p class="font ellipsis mra">${item.NA}</p>
											<p class="font down blick">${item.OD.D}</p>
										</button>`;



									//self.buttonCoefficientTemplate(item.NA, item.OD.D, item.IT)
								});
					html += `</div>
								<button class="button reload">
									<i class="fa fa-angle-right"></i>
								</button>
								 <button class="button coefficient last">
									<p class="font ellipsis">+${data.LM}</p>
								</button>
							</div>
						</div>`;
					}
			html += `</div>`;

	return html;
}

Inplay.prototype.checkTime = function(data, self){
	var timer = '';
	var half  = '';                
	if (data.DC == 1) {
	  if (data.TT == 1 || data.TM > 0) timer = self.timer (data.TU, data.TM, data.TS); else timer = '00:00';
	  if (data.TM >= 45) {
	    half = '2nd Half';
	  } else {
	    half = '1st Half';
	  }
	  if (data.TM == 45 && data.TT == 0) {
	    half = 'Half Time';
	    timer = '45:00'
	  }
	}
	return self.timeTemplate(half, timer);
}

Inplay.prototype.timer = function(etu, etm, ets) {
	etu = etu.toString();
	etm = etm.toString();
	ets = ets.toString();      

	y = etu.substring(0,4); ho = etu.substring (8,10);
	m = etu.substring(4,6); mi = etu.substring(10,12);
	d = etu.substring(6,8); si = etu.substring(12,14);
		val = y+'-'+m+'-'+d+' '+ho+':'+mi+':'+si;
	var ts = new Date(val).getTime()/1000;
	var tn = new Date().getTime()/1000;

	dt = Math.floor(tn - ts + etm*60 + ets - 120*60);

	min = Math.floor(dt / 60);
	sec = dt - min * 60;

	if (min<10) min = '0'+min; 
	if (sec<10) sec = '0'+sec; 

	timer = min+':'+sec;

	return timer;
}


Inplay.prototype.checkValue = function(obj, value){
	return obj.hasOwnProperty(value)
}

Inplay.prototype.separateTeam = function(data){
	var team = data.split('vs')
	return team;
}

Inplay.prototype.separateScore = function(data, separate){
	var score = data.split('-')
	return score;
}

Inplay.prototype.separateScoreCricket = function(data){
	var score = data.split(',');
	return score;
}

Inplay.prototype.separateScoreTennis  = function(data){
	var score = [];
	score[0] = '';
	score[1] = '';
	var res = data.split(',');
	if (res.length > 0) {
		for (var i = 0; i < res.length; i++) {
			var a = res[i].split('-');
			score[0] += a[0]+',';
			score[1] += a[1]+',';
		}
	}
	return score;
}


Inplay.prototype.loadData = function(data){
	var self = this;
	$.getJSON(this.link, function(data) {
		self.setData(data);
	});
}

Inplay.prototype.setData = function(data){
	this.date = JSON.parse(JSON.stringify(data));
	this.initSlider();
	this.drawData();
};

Inplay.prototype.initSlider = function(){
	var self = this;
	this.html = '';
	this.active = this.date.DATA[0].IT;
	$('#inplay-forSlider .slider__track').html('');
	$.each(self.date.DATA, function (index, item) {
		self.html += self.forSliderTemplate(item);
	});
	$('#inplay-forSlider .slider__track').html(this.html);
	slider.set('.inplaySlider');
}

Inplay.prototype.drawData = function(){
	var self = this;
	$('#inplay-forTable').html('');
	this.html = '';
	$.each(this.date.DATA, function (index, item) {
		if (item.IT == self.active) {
			self.html += '<div class="wrapper__item">'
			self.html += self.submenuTemplate(item.NA, item.IT, item.ID)
			var catIt = item.IT;
			var play = item.NA
			$.each(item.CT, function (index, item) {
				if (self.checkValue(item, 'NA')) {
					self.html += self.subcategoryTemplate(item.NA, item.IT, catIt)
					$.each(item.EV, function(index, item){
						if (self.checkValue(item, 'NA')) {
							self.html += self.resultsInplayTemplate(item, play, catIt)
						}
					});
				}
				else{
					$.each(item.EV, function(index, item){
						if (self.checkValue(item, 'NA')) {
							self.html += self.resultsInplayTemplate(item, play)
						}
					});
				}
			});
			self.html += '</div>';
		}

	});
	$('#inplay-forTable').html(this.html);
};

var inplay = new Inplay();
inplay.loadData();


$(document).on('click',"#inplay-forSlider .slider__item",function(){ 
	var attr = $(this).attr('data-it');
	inplay.active = attr;
	inplay.drawData();
});
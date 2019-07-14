var Inplay = function(){
	this.link = "http://bestline.bet/inplay/";
	this.menu = 'MB';
	this.html = '';
	this.date;
	this.active;
}


Inplay.prototype.forSliderTemplate = function(data){
	return `<a class="slider__item" data-it="${data.IT}">
				<p class="sports-${data.ID} icon"></p>
				<p class="font ellipsis text">${data.NA}</p>
			</a>`;
}

Inplay.prototype.inplayCategoryTemplate = function(name, it, id){
	return `<div class="inplayCategory" data-it="${it}">
				<div class="flex-container align-middle">
					<p class="sports-${id}"></p>
					<p class="font primary ml text-transform">${name}:</p>
				</div>
				<div class="flex-container align-middle inplayMenu">
					<a class="font text-uppercase inplayMenu__item border" data-menu="MB">Main Bets</a>
					<a class="font text-uppercase inplayMenu__item border" data-menu="NOG">Number of goals</a>
					<a class="font text-uppercase inplayMenu__item border" data-menu="NG">Next goal</a>
				</div>
			</div>`;
}

Inplay.prototype.inplaySubCategoryTemplate = function(name, it, catIt){
	return `<div class="inplaySubcategory closed" data-catit="${catIt}" data-it="${it}">
				<img src="./img/icon-country/Ukraine.ico" class="icon">
				<p class="font">${name}</p>	
			</div>`;
}

Inplay.prototype.timeTemplate = function(half, timer, data){
	return 	`<div class="inplayTeamTime" data-tt="${data.TT}" data-tu="${data.TU}" data-tm="${data.TM}" data-ts="${data.TS}">
				<p class="font team-period">${half}</p>
				<p class="font bold team-time">${timer}</p>
			</div>`;
}

Inplay.prototype.optionsTemplate = function(play){
	return 	`<div class="flex-container align-center-middle inplayTeamOptions">
				<button class="sport-icon ${play.toLowerCase()} team-button"></button>
				<button class="sport-icon play team-button"></button>
			</div>`;
}
		
Inplay.prototype.forPeriodTemplate = function(data, self, play){
	return  `${self.checkTime(data, self)}
				<a class="flex-container align-center-middle inplayTeamScoreInfo" data-fi="${data.FI}" href="/#/event/">
					<p class="font ellipsis text-right team-name">${base.s_NA(data.NA)[0]}</p>
					<p class="font text-center team-score">${base.s_SS(data.SS)[0]}:${base.s_SS(data.SS)[1]}</p>
					<p class="font ellipsis text-left team-name">${base.s_NA(data.NA)[1]}</p>
			 	</a>
			${self.optionsTemplate(play)}`;
}

Inplay.prototype.forSetTemplate = function(data, self, play){
	var html = '';
	html = `<div class="inplayTeamTime">
				<div class="text-center">
					<p class="font team-period">${self.separateScoreTennis(data.SS, 1).length} Set</p>
				</div>
			</div>
			<div class="inplayTeamScoreInfo">
				<p class="font ellipsis text-left team-name">${self.separateTeam(data.NA)[0]}</p>
				<p class="font ellipsis text-left team-name">${self.separateTeam(data.NA)[1]}</p>
			</div>
			<table class="inplayTeamScoreTableInfo">
				<tr>
					<td>`;
						if (data.PI[0] == 1)
							html += '<div class="circle"></div>';
			html += `</td>`;
					$.each(self.separateScoreTennis(data.SS, 1), function (index, item) {
						html += `<td>
									<p class="font primary">${item}</p>
								</td>`;
					});
			html += `<td>
						<p class="font">${self.separateScore(data.XP)[0]}</p>
					</td>
				</tr>
				<tr>
					<td>`;
						if (data.PI[1] == 1)
							html += '<div class="circle"></div>';
			html +=	`</td>`;
					$.each(self.separateScoreTennis(data.SS, 2), function (index, item) {
						html += `<td>
									<p class="font primary">${item}</p>
								</td>`;
					});

			html += `<td>
						<p class="font">${self.separateScore(data.XP)[1]}</p>
					</td>
				</tr>
			</table>
			${self.optionsTemplate(play)}`;
	return html;
}

Inplay.prototype.numberOfGoals = function(self){
	var html = `<div class="number-of-goals ${(self.menu == 'NOG') ? 'active' : ''}" data-menu-wrap="NOG">
					<p class="font white">Number Of Goals</p>
				</div>`;
	return html;
}

Inplay.prototype.nextGoal = function(self){
	var html = `<div class="next-goal ${(self.menu == 'NG') ? 'active' : ''}" data-menu-wrap="NG">
					<p class="font white">Next Goal</p>
				</div>`;
	return html;
}

Inplay.prototype.mainBets = function(data, self){
	var html = '';
	if (data.MA[0]) {
		var suBlock,
			suButton;
		suBlock = (data.MA[0].SU == 1) ? 'disabled' : '';
		html +=	`<div class="main-bets ${suBlock} ${(self.menu == 'MB') ? 'active' : ''}" 
					data-it="${data.MA[0].IT}" 
					data-menu-wrap="MB">

					<div class="flex-container align-middle">
						<p class="font white ml">${data.MA[0].NA}</p>
					</div>
					<div class="flex-container align-middle">
						<button class="button reload reload--left">
							<i class="fa fa-angle-left"></i>
						</button>
						<div class="flex-container align-middle inplayTeamButtons">`;
						$.each(data.MA[0].PA, function(index, item){
							suButton = (item.SU == 1 && suBlock == 1) ? 'disabled' : '';
							html += `<button class="button coefficient ${suButton}" data-it="${item.IT}">`;				
									if (index != 1 && data.MA[0].PA.length <= 3 && item.SU == 0) {
										html += `<p class="star"></p>
												 <p class="font ellipsis mra">${item.NA}</p>
												 <p class="font down blick">${item.OD.D}</p>`;
									}
									else if(data.MA[0].PA.length == 2 && item.SU == 0){
										html += `<p class="star"></p>
												 <p class="font ellipsis mra">${item.NA}</p>
												 <p class="font down blick">${item.OD.D}</p>`;
									}
									else if(item.SU == 1){
										html += `<p class="font ellipsis mra">${item.NA}</p>
												 <span class="fa fa-lock lock"></span>`;
									}
									else{
										html += `<p class="font ellipsis mra">${item.NA}</p>
												 <p class="font down blick">${item.OD.D}</p>`;
									}
							html +=	`</button>`;
						});
			html += `	</div>
						<button class="button reload reload--right">
							<i class="fa fa-angle-right"></i>
						</button>
						<a class="button coefficient last inplayLM" data-fi="${data.FI}" href="/#/event/">
							<p class="font ellipsis">+${data.LM}</p>
						</a>
					</div>
				</div>`;
	}
	return html;
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
							html += self.forPeriodTemplate(data, self, play);
						break;
						case "Tennis":
							html += self.forSetTemplate(data, self, play);
						break;
						case "Table Tennis":
							html += self.forSetTemplate(data, self, play);
						break;
						case "Badminton":
							html += self.forSetTemplate(data, self, play);
						break;
						case "Volleyball":
							html += self.forSetTemplate(data, self, play);
						break;
						case "Beach Volleyball":
							html += self.forSetTemplate(data, self, play);
						break;
					/*						
						case "Baseball":
							html += self.forBaseballTemplate(data, self, play);
						break;
						case "Basketball":
							html += self.forBasketballTemplate(data, self, play);
						break;
						case "Boxing/MMA":
							html += self.forBoxingMMATemplate(data, self, play);
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
						case "Australian Rules":
							html += self.forAustralianRulesTemplate(data, self, play);
						break;
						case "Motorbikes":
							html += self.forMotorbikesTemplate(data, self, play);
						break;
					*/
						default:
							html += self.forPeriodTemplate(data, self, play);
					}
			html += `</div>
					<div class="inplayTable__right">
						${self.mainBets(data, self)}
						${self.numberOfGoals(self)}
						${self.nextGoal(self)}
					</div>
				</div>`;
	return html;
}

Inplay.prototype.clickInplayMenu = function(){
	var self = this;
	$(`[data-menu-wrap=${self.menu}]`).each(function(i, elem){
		$(this).siblings("div").removeClass('active')
		$(this).addClass('active');
	});
}

Inplay.prototype.clickReload = function(el, direction){
	$(el).removeClass('active');
	if (direction == 'prev') {
		if ($(el).prev().length == 0) {
			$(el).parent().find("[data-menu-wrap]").last().addClass('active');
		}
		else{
			$(el).prev().addClass('active');
		}
	}
	else{
		if ($(el).next().length == 0) {
			$(el).parent().find("[data-menu-wrap]").first().addClass('active');
		}
		else{
			$(el).next().addClass('active');
		}
	}
}

Inplay.prototype.checkTime = function(data, self){
	var timer = '';
	var half  = '';
	if (data.DC == 1) {
		if (data.TT == 1 || data.TM > 0){
			timer = self.timer (data.TU, data.TM, data.TS);
		}
		else
			timer = '00:00';

		if (data.TM >= 45)
		  half = '2nd Half';
		else
		  half = '1st Half';

		if (data.TM == 45 && data.TT == 0) {
		  half = 'Half Time';
		  timer = '45:00'
		}

		if (data.TT == 0 && data.TU == '') {
			half = '1st Half';
			timer = self.timerTT(data.TU, data.TM, data.TS);
		}
	}
	return self.timeTemplate(half, timer, data);
}

Inplay.prototype.timer = function(etu, etm, ets) {
	etu = etu.toString();
	etm = etm.toString();
	ets = ets.toString();
	years = etu.substring(0,4); 
	month = etu.substring(4,6); 
	day = etu.substring(6,8);
	hours = etu.substring (8,10);
	minute = etu.substring(10,12);
	second = etu.substring(12,14);
	date = years+'-'+month+'-'+day+' '+hours+':'+minute+':'+second;
	var ts = new Date(date).getTime()/1000;
	var tn = new Date().getTime()/1000;
	dt = Math.floor(tn - ts + etm*60 + ets - 120*60);
	min = Math.floor(dt / 60);
	sec = dt - min * 60;
	if (min<10) min = '0'+min; 
	if (sec<10) sec = '0'+sec; 
	timer = min+':'+sec;
	return timer;
}

Inplay.prototype.timerTT = function(etm, ets) {
	if (etm<10) etm = '0'+etm; 
	if (ets<10) ets = '0'+ets; 
	timer = etm+':'+ets;
	return timer;
}

Inplay.prototype.startTimer = function(){
	var self = this;
	$('[data-tt=0]').each(function(i, elem){
		var tm = $(this).data("tm");
		var ts = $(this).data("ts");
		var timer = self.timerTT(tm, ts);
		$(this).find('.team-time').text(timer);
	});

	setInterval(function(){
		$('[data-tt=1]').each(function(i, elem){
			var tu = $(this).data("tu");
			var tm = $(this).data("tm");
			var ts = $(this).data("ts");
			var timer = self.timer(tu, tm, ts);
			$(this).find('.team-time').text(timer);
		});
	}, 500);
};

Inplay.prototype.checkValue = function(obj, value){
	return obj.hasOwnProperty(value)
}

Inplay.prototype.separateScoreCricket = function(data){
	var score = data.split(',');
	return score;
}

Inplay.prototype.separateScoreTennis  = function(data, count){
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
		if (item.ID != 75 && item.ID != 4 && item.ID != 24) {
			self.html += self.forSliderTemplate(item);
		}
	});
	$('#inplay-forSlider .slider__track').html(this.html);
	slider.set('.inplaySlider');
	self.activeSlide();
}

Inplay.prototype.activeSlide = function(){
	$('#inplay-forSlider .slider__item').removeClass('active');
	$(`[data-it="${this.active}"]`).addClass('active');
}

Inplay.prototype.drawData = function(){
	var self = this;
	$('#inplay-forTable').html('');
	this.html = '';
	$.each(this.date.DATA, function (index, item) {
		if (item.IT == self.active) {
			self.html += '<div class="wrapper__item">'
			self.html += self.inplayCategoryTemplate(item.NA, item.IT, item.ID)
			var catIt = item.IT;
			var play = item.NA
			$.each(item.CT, function (index, item) {
				if (self.checkValue(item, 'NA')) {
					self.html += self.inplaySubCategoryTemplate(item.NA, item.IT, catIt)
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
	self.startTimer();
};

var inplay = new Inplay();
inplay.loadData();


$(document).on('click',".inplaySlider .slider__item",function(){
	var attr = $(this).attr('data-it');
	inplay.active = attr;
	inplay.activeSlide();
	inplay.menu = 'MB';
	inplay.drawData();
});

$(document).on('click','.inplayMenu .inplayMenu__item',function(){
	var attr = $(this).attr('data-menu');
	inplay.menu = attr;
	inplay.clickInplayMenu();
});

$(document).on('click','.reload--left',function(){
	var parent = $(this).closest('[data-menu-wrap]');
	inplay.clickReload(parent, 'prev')
});

$(document).on('click','.reload--right',function(){
	var parent = $(this).closest('[data-menu-wrap]');
	inplay.clickReload(parent, 'next')
});

$(document).on('click','.inplayTeamScoreInfo',function(){
	var attr = $(this).attr('data-fi');
	document.cookie = `eventFi=${attr}`;
});

$(document).on('click','.inplayLM',function(){
	var attr = $(this).attr('data-fi');
	document.cookie = `eventFi=${attr}`;
});
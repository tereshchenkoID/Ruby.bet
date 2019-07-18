var Event = function(){
	this.link;
	this.html = '';
	this.date;
}
Event.prototype.loadData = function(data){
	this.link = `http://bestline.bet/event/?FI=${base.getCookie("eventFi")}`;
	var self = this;
	$.getJSON(this.link, function(data) {
		self.setData(data);
	});
}

Event.prototype.forEventCategoryTemplate = function(){
	return `<div class="maTable__row">
				<div class="maTable__cell">
					<div class="maTable__category closed">
						<p class="icon fa fa-usd"></p>
						<p class="text font">MAIN BETS</p>
					</div>
				</div>
			</div>`;
}

Event.prototype.forEventSubCategoryTemplate = function(data){
	return `<div class="maTable__cell full">
				<div class="flex-container align-middle maInfo">
					<span class="star maInfo__icon"></span>
					<span class="font white ellipsis maInfo__text">${data.NA}</span>
					<hr class="maInfo__separate">
					<a class="maInfo__inform"></a>
				</div>
			</div>`;
}

Event.prototype.forEventDataTemplate = function(data){
	var html = '', SU;
	SU = (data.SU == 1) ? 'disabled' : '';
	$.each(data.PA, function (index, item) {
		html += `<div class="maTable__cell">
					<button class="button coefficient ${SU}" data-it="${item.IT}">
						<p class="font ellipsis mra">${item.NA}</p>`;
				if(item.SU == 1)
					html += `<span class="fa fa-lock lock"></span>`;
				else
					html += `<p class="font down blick">${item.OD.D}</p>`;
		html +=			`</button>
				</div>`;
	});
	return html;
}

Event.prototype.setData = function(data){
	this.date = JSON.parse(JSON.stringify(data));
	this.drawData();
};

Event.prototype.drawData = function(){
	var self = this;
	this.html = ``;
	$('#event-forScoreboard').html(scoreboard.drawData(self.date.RESULT[0].EV, self.date.RESULT[0].TE));
	this.html += self.forEventCategoryTemplate();
	$.each(self.date.RESULT, function (index, item) {
		$.each(item.MA, function (index, item) {
			var SU;
			SU = (item.SU == 1) ? 'disabled' : '';
			self.html += `<div class="maTable__row ${SU}" data-it="${item.IT}">`;
			self.html += self.forEventSubCategoryTemplate(item);
			self.html += self.forEventDataTemplate(item)
			self.html += `</div>`;
		});
	});
	$('#event-forTable').html(this.html);
};

var event = new Event();
event.loadData();
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

Event.prototype.forEventCategoryTemplate = function(data){
	return `<div class="eventTable__row">
				<div class="eventTable__cell">
					<div class="table-category closed">
						<p class="table-category-icon fa fa-usd"></p>
						<p class="table-category-text font">MAIN BETS</p>
					</div>
				</div>
			</div>`;
}

Event.prototype.forEventSubCategoryTemplate = function(data){
	return `<div class="eventTable__row">
				<div class="eventTable__cell">
					<div class="flex-container align-middle eventInformation">
						<span class="star eventInformation__icon"></span>
						<span class="font white ellipsis eventInformation__text">${data.NA}</span>
						<hr class="eventInformation__separate">
						<a class="eventInformation__inform"></a>
					</div>
				</div>
			</div>`;
}

Event.prototype.forEventDataTemplate = function(data){
	var html = '';
	html += `<div class="eventTable__row" data-it="${data.IT}">`;
				$.each(data.PA, function (index, item) {
					html += `<div class="eventTable__cell">
								<button class="button coefficient">
									<span class="font ellipsis">${item.NA}</span>
									<span class="font up blick">${item.OD.D}</span>
								</button>
							</div>`;
				});
	html += `</div>`;
	return html;
}

Event.prototype.setData = function(data){
	this.date = JSON.parse(JSON.stringify(data));
	this.drawData();
};

Event.prototype.drawData = function(){
	var self = this;
	this.html = ``;
	$.each(self.date.RESULT, function (index, item) {
		$('#event-forScoreboard').html(scoreboard.drawData(item));
		$.each(item.MA, function (index, item) {
			self.html += self.forEventSubCategoryTemplate(item);
			self.html += self.forEventDataTemplate(item)
		});
	});
	$('#event-forTable').html(this.html);
};

var event = new Event();
event.loadData();
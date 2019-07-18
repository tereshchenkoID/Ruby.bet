var Prematch = function(){
	this.link;
	this.date;
	this.html = '';
}

Prematch.prototype.loadData = function(data){
	//this.link = `http://localhost:8080/event.json`;
	this.link = `http://bestline.bet/prematch_ev/?FI=81156992`;
	var self = this;
	$.getJSON(this.link, function(data) {
		self.setData(data);
	});
}

Prematch.prototype.forPrematchBanner = function(si, sn){
	return `<div class="flex-container align-middle background banner small shadow" style="background-image:url('./img/banner/big/1.png');">
				<div class="flex-container align-center-middle banner__title">
					<p class="sports-${si} icon"></p>
				</div>
				<p class="font banner__text">${sn}</p>
			</div>`;
}


Prematch.prototype.fotPrematchTable = function(self){
	return	`<div class="prematchTable">
				<div class="prematchTable__row margin">
					<div class="prematchTable__cell margin">
						<div class="flex-container align-middle align-justify prematchCategory">
							<p class="font">${self.date.RESULT.EV[0].CT}</p>
							<div class="flex-container align-middle">
								<a class="fa fa-bar-chart prematchLink"></a>
								<a class="fa fa-refresh prematchLink"></a>
							</div>
						</div>
					</div>
				</div>
				<div class="prematchTable__row">
					<div class="prematchTable__cell">
						<p class="font title prematchTitle">${self.date.RESULT.EV[0].TE[0].NA} - ${self.date.RESULT.EV[0].TE[1].NA}</p>
						<p class="font prematchText">${base.g_TU(self.date.RESULT.EV[0].TU)}</p>
					</div>
				</div>
				<div class="prematchTable__row">
					<div class="prematchTable__cell">
						<p class="font">5.</p>
					</div>
					<div class="prematchTable__cell">
						<p class="font">Table position</p>
					</div>
					<div class="prematchTable__cell">
						<p class="font">16.</p>
					</div>
				</div>
				<div class="prematchTable__row">
					<div class="prematchTable__cell">
						<span class="font green">W</span>
						<span class="font red">L</span>
						<span class="font">D</span>
						<span class="font green">W</span>
						<span class="font red">L</span>
					</div>
					<div class="prematchTable__cell">
						<p class="font">Last 5 games</p>
					</div>
					<div class="prematchTable__cell">
						<span class="font green">W</span>
						<span class="font red">L</span>
						<span class="font">D</span>
						<span class="font green">W</span>
						<span class="font red">L</span>
					</div>
				</div>
				<div class="prematchTable__row">
					<div class="prematchTable__cell">
						<span class="font green">W</span>
						<span class="font red">L</span>
						<span class="font">D</span>
						<span class="font green">W</span>
						<span class="font red">L</span>
					</div>
					<div class="prematchTable__cell">
						<p class="font">Head-to-Head</p>
					</div>
					<div class="prematchTable__cell">
						<span class="font green">W</span>
						<span class="font red">L</span>
						<span class="font">D</span>
						<span class="font green">W</span>
						<span class="font red">L</span>
					</div>
				</div>
				<div class="prematchTable__row">
					<div class="prematchTable__cell">
						<p class="font">2.20</p>
					</div>
					<div class="prematchTable__cell">
						<p class="font">Goals/Points(5 games)</p>
					</div>
					<div class="prematchTable__cell">
						<p class="font">0.80</p>
					</div>
				</div>
			</div>`;
}




Prematch.prototype.forPrematchCategoryTemplate = function(){
	return `<div class="maTable__row">
				<div class="maTable__cell">
					<div class="maTable__category closed">
						<p class="icon fa fa-usd"></p>
						<p class="text font">MAIN BETS</p>
					</div>
				</div>
			</div>`;
}

Prematch.prototype.forPrematchSubCategoryTemplate = function(data){
	return `<div class="maTable__cell full">
				<div class="flex-container align-middle maInfo">
					<span class="star maInfo__icon"></span>
					<span class="font white ellipsis maInfo__text">${data.NA}</span>
					<hr class="maInfo__separate">
					<a class="maInfo__inform"></a>
				</div>
			</div>`;
}

Prematch.prototype.forPrematchDataTemplate = function(data){
	var html = '', SU;
		$.each(data.PA, function (index, item) {
			SU = (item.SU == 1) ? 'disabled' : '';
			html += `<div class="maTable__cell">
						<button class="button coefficient ${SU}" data-it="${item.IT}">
							<p class="font ellipsis mra">${item.NA}</p>`;
					if(item.SU == 1)
						html += `<span class="fa fa-lock lock"></span>`;
					else
						html += `<p class="font down blick">${item.OD.D}</p>`;
			html +=		`</button>
					</div>`;
		});
	return html;
}

Prematch.prototype.setData = function(data){
	this.date = JSON.parse(JSON.stringify(data));
	this.drawData();
};

Prematch.prototype.drawData = function(){
	var self = this;
	this.html = '';
	$('#prematch-forStat').html(self.fotPrematchTable(self))
	$('#prematch-forBanner').html(self.forPrematchBanner(self.date.RESULT.EV[0].SI, self.date.RESULT.EV[0].SN))
	this.html += self.forPrematchCategoryTemplate();
	$.each(self.date.RESULT, function (index, item) {
		$.each(item[0].MA, function (index, item) {
			var SU;
			SU = (item.SU == 1) ? 'disabled' : '';
			self.html += `<div class="maTable__row ${SU}" data-it="${item.IT}">`;
			self.html += self.forPrematchSubCategoryTemplate(item);
			self.html += self.forPrematchDataTemplate(item)
			self.html += `</div>`;
		});
	});
	$('#prematch-forTable').html(this.html);
};

var prematch = new Prematch();
prematch.loadData();
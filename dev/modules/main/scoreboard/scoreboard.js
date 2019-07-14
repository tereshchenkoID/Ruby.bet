var Scoreboard = function(){
	this.html = '';
}

Scoreboard.prototype.forScoreboardTemplate = function(data){
	return `<div class="scorebordImg" style="background-image: url(../img/scoreboard/1.png)"></div>

			<div class="scoreboardMenu">
				<div class="flex-container align-middle scoreboardMenu__wrapper big">
					<p class="sports-${data.EV.SI}"></p>
					<p class="font primary ml text-transform">${data.EV.SN}:</p>
					<p class="font ellipsis ml">${data.EV.CT}</p>
				</div>
				<p class="font text-nowrap">2nd Half 68:02</p>
			</div>

			<div class="scoreboardScreen">
				<div class="font scoreboardHide">Hide</div>
				<div class="scoreboardCount flex-container align-center-middle">
					<p class="font scoreboardCount__item small">${data.TE[0].NA}</p>
					<p class="font bold scoreboardCount__item big">${data.EV.SS}</p>
					<p class="font scoreboardCount__item small">${data.TE[1].NA}</p>
				</div>
				<div class="table">
					<div class="table__row title">
						<div class="table__cell"><p class="font text-left ml scoreboard-text primary">45:42</p></div>
						<div class="table__cell"><div class="scoreboardIcon corner"></div></div>
						<div class="table__cell"><div class="scoreboardIcon yellow-card"></div></div>
						<div class="table__cell"><div class="scoreboardIcon red-card"></div></div>
						<div class="table__cell"><div class="scoreboardIcon arrow"></div></div>
						<div class="table__cell"><div class="scoreboardIcon free-kick"></div></div>
						<div class="table__cell"><div class="scoreboardIcon goalkeeper-kick"></div></div>
						<div class="table__cell"><div class="scoreboardIcon goal"></div></div>
						<div class="table__cell"><div class="scoreboardIcon penalty"></div></div>
					</div>
					<div class="table__row">
						<div class="table__cell">
							<div class="flex-container align-middle">
								<p class="scoreboardBadge primary"></p>
								<p class="font text-left scoreboardText primary">${data.TE[0].NA}</p>
							</div>
						</div>
						<div class="table__cell"><p class="font scoreboardText primary">20</p></div>
						<div class="table__cell"><p class="font scoreboardText primary">1</p></div>
						<div class="table__cell"><p class="font scoreboardText primary">1</p></div>
						<div class="table__cell"><p class="font scoreboardText primary">1</p></div>
						<div class="table__cell"><p class="font scoreboardText primary">1</p></div>
						<div class="table__cell"><p class="font scoreboardText primary">1</p></div>
						<div class="table__cell"><p class="font scoreboardText primary">1</p></div>
						<div class="table__cell"><p class="font scoreboardText second">1</p></div>
					</div>
					<div class="table__row">
						<div class="table__cell">
							<div class="flex-container align-middle">
								<p class="scoreboardBadge second"></p>
								<p class="font text-left scoreboardText primary">${data.TE[1].NA}</p>
							</div>
						</div>
						<div class="table__cell"><p class="font scoreboardText primary">11</p></div>
						<div class="table__cell"><p class="font scoreboardText primary">11</p></div>
						<div class="table__cell"><p class="font scoreboardText primary">11</p></div>
						<div class="table__cell"><p class="font scoreboardText primary">11</p></div>
						<div class="table__cell"><p class="font scoreboardText primary">1</p></div>
						<div class="table__cell"><p class="font scoreboardText primary">1</p></div>
						<div class="table__cell"><p class="font scoreboardText primary">1</p></div>
						<div class="table__cell"><p class="font scoreboardText second">1</p></div>
					</div>
				</div>
			</div>

			<div class="scoreboardMenu">
				<div class="flex-container align-middle align-left scoreboardMenu__wrapper">
					<p class="font mr">61:13</p>
					<div class="scoreboardIcon corner"></div>
					<p class="font ellipsis ml">2nd Corner to FC Rouen</p>
				</div>
				<div class="flex-container align-middle align-right scoreboardMenu__wrapper">
					<a class="fa fa-sort scoreboardMenu__link"></a>
					<a class="fa fa-signal scoreboardMenu__link"></a>
					<a class="fa fa-angle-down scoreboardMenu__link"></a>
				</div>
				<div class="scoreboardToggle block scroll">
					<div class="flex-container align-middle scoreboardToggle__item">
						<div class="scoreboardIcon corner"></div>
						<p class="font ellipsis">Game - 1 Feliciano</p>
					</div>
					<div class="flex-container align-middle scoreboardToggle__item">
						<div class="scoreboardIcon yellow-card"></div>
						<p class="font ellipsis">Game - 1 Feliciano Lopez - holds to love</p>
					</div>
				</div>
			</div>`;
}

Scoreboard.prototype.drawData = function(data){
	this.html += this.forScoreboardTemplate(data);
	return this.html;
};
var scoreboard = new Scoreboard();
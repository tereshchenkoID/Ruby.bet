var Slider = function(){
	this.slider;
	this.html = '';
	this.sliderWidth;
	this.slideCount;
	this.slideLength;
	this.sliderStep;
	this.sliderTrack;
	this.sliderMl = 0;
	this.sliderMaxMl;
}


Slider.prototype.set = function(slider){
	var self = this;
	this.slider = slider;
	this.sliderWidth = $(this.slider).outerWidth();
	this.slideCount = $(this.slider).find('.slider__item').length;
	this.slideLength = 90;
	this.sliderStep = this.slideLength;
	this.sliderTrack = this.slideLength * this.slideCount;
	this.sliderMaxMl = this.slideCount * this.sliderStep;

	$(this.slider).find('.slider__item').outerWidth(this.slideLength);
	$(this.slider).find('.slider__track').outerWidth(this.sliderTrack);

	if (this.sliderTrack > this.sliderWidth) {
		$(this.slider).find('.slider__prev').hide();
	}
	else{
		$(this.slider).find('.slider__prev').hide();
		$(this.slider).find('.slider__next').hide();
	}
}

Slider.prototype.init = function(){
	this.html = `<div class="slider__wrapper">
					<button class="button slider__prev"><span class="fa fa-angle-left"></span></button>
					<button class="button slider__next"><span class="fa fa-angle-right"></span></button>
					<div class="slider__track"></div>
				</div>`;
	$('.slider').html(this.html);
}


Slider.prototype.translate = function(){
	$(this.slider).find('.slider__track').css({
	  '-webkit-transform' : 'translateX(' + this.sliderMl + 'px)',
	  '-moz-transform'    : 'translateX(' + this.sliderMl + 'px)',
	  '-ms-transform'     : 'translateX(' + this.sliderMl + 'px)',
	  '-o-transform'      : 'translateX(' + this.sliderMl + 'px)',
	  'transform'         : 'translateX(' + this.sliderMl + 'px)'
	});
}

Slider.prototype.left_carusel = function(carusel){
	this.sliderMl += this.sliderStep;
	if (this.sliderMl >= 0) {
		$(this.slider).find('.slider__prev').hide();
		$(this.slider).find('.slider__next').show();
		this.sliderMl = 0;
	}
	else{
		$(this.slider).find('.slider__next').show();
	}
	this.translate();
}


Slider.prototype.right_carusel = function(carusel){
	this.sliderMl -= this.sliderStep;
	if ((this.sliderWidth - this.sliderMl) >= this.sliderTrack) {
		$(this.slider).find('.slider__next').hide();
		$(this.slider).find('.slider__prev').show();
	}
	else{
		$(this.slider).find('.slider__prev').show();
	}
	this.translate();
}


var slider = new Slider();
slider.init();

$(document).on('click', ".slider__next",function(){
	var carusel = $(this).parents('.slider');
	slider.right_carusel(carusel);
	return false;
});
$(document).on('click',".slider__prev",function(){ 
	var carusel = $(this).parents('.slider');
	slider.left_carusel(carusel);
	return false;
});


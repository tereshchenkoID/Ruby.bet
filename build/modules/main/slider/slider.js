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

	this.offset = 0;
}


Slider.prototype.set = function(slider){
	this.slider = slider;
	this.sliderWidth = Math.round($(this.slider).outerWidth());
	this.slideCount = $(this.slider).find('.slider__item').length;
	this.slideLength = 90;
	this.sliderStep = this.slideLength;

	this.sliderTrack = Math.round(this.slideLength * this.slideCount);
	this.sliderMaxMl = this.slideCount * this.sliderStep;



	$(this.slider).find('.slider__item').outerWidth(this.slideLength);
	$(this.slider).find('.slider__track').outerWidth(this.sliderTrack);

	this.offset = Math.ceil(this.sliderWidth / this.slideLength) * this.slideLength - this.sliderWidth;
	console.log(this.offset)



	if (this.sliderTrack > this.sliderWidth) {
		$(this.slider).find('.slider__prev').hide();
	}
	else{
		$(this.slider).find('.slider__prev').hide();
		$(this.slider).find('.slider__next').hide();
	}


	/*
	if (linkLength * count > sliderLenght) {
		$(this.slider).find('.slider__next').show();
		$(this.slider).find('.slider__prev').show();
	}
	else{
		$(this.slider).find('.slider__next').hide();
		$(this.slider).find('.slider__prev').hide();
	}
	*/
}

Slider.prototype.init = function(){
	this.html = `<div class="slider__wrapper">
					<button class="button slider__prev"><span class="fa fa-angle-left"></span></button>
					<button class="button slider__next"><span class="fa fa-angle-right"></span></button>
					<div class="slider__track"></div>
				</div>`;
	$('.slider').html(this.html);
}


/*
Slider.prototype.left_carusel = function(carusel){
   var block_width = $(carusel).find('.slider__item').outerWidth();
   $(carusel).find(".slider__track .slider__item").eq(-1).clone().prependTo($(carusel).find(".slider__track")); 
   $(carusel).find(".slider__track").css({"left":"-"+block_width+"px"});
   $(carusel).find(".slider__track .slider__item").eq(-1).remove();    
   $(carusel).find(".slider__track").animate({left: "0px"}, 200); 
}
Slider.prototype.right_carusel = function(carusel){
   var block_width = $(carusel).find('.slider-link').outerWidth();
	$(carusel).find(".slider__track").animate({left: "-"+ block_width +"px"}, 200, function(){
	  $(carusel).find(".sliderl__track .slider__item").eq(0).clone().appendTo($(carusel).find(".slider__track")); 
      $(carusel).find(".sliderl__track .slider__item").eq(0).remove(); 
      $(carusel).find(".sliderl__track").css({"left":"0px"}); 
   }); 
}
*/

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
	if (this.sliderMl >= 0) {
		$(this.slider).find('.slider__prev').hide();
		this.sliderMl = 0;
	}
	else{
		this.sliderMl += this.sliderWidth - this.offset;
		//this.sliderMl += this.sliderStep;
		$(this.slider).find('.slider__next').show();
	}
	this.translate();
}


Slider.prototype.right_carusel = function(carusel){
	this.sliderMl -= this.sliderWidth - this.offset;
	
	console.log(this.sliderTrack - this.sliderWidth)
	console.log(this.sliderMl)
	
	/*if (-this.sliderMl >= this.sliderTrack - this.sliderMl) {
		$(this.slider).find('.slider__next').hide();
	}
	else{
		//this.sliderMl -= this.sliderStep;
		$(this.slider).find('.slider__prev').show();
	}*/
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
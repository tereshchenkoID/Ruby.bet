/*function InplaySlider(){
	this.html = '';
}

InplaySlider.prototype.InplaySliderTemplate = function(data){
	return `<a class="slider-link" data-it="${data.IT}">
				<p class="sports-${data.ID} slider-icon"></p>
				<p class="font ellipsis slider-text">${data.NA}</p>
			</a>`;
}



InplaySlider.prototype.set = function(){
	
	var sliderLenght = $('.slider').outerWidth(),
		count = $('.slider .slider-link').length,
		linkLength = $('.slider .slider-link').outerWidth();
	if (linkLength * count > sliderLenght) {
		$('.slider-next').show();
		$('.slider-prev').show();
	}
	else{
		$('.slider-next').hide();
		$('.slider-prev').hide();
	}
}

InplaySlider.prototype.left_carusel = function(carusel){
   var block_width = $(carusel).find('.slider-link').outerWidth();
   $(carusel).find(".slider__items .slider-link").eq(-1).clone().prependTo($(carusel).find(".slider__items")); 
   $(carusel).find(".slider__items").css({"left":"-"+block_width+"px"});
   $(carusel).find(".slider__items .slider-link").eq(-1).remove();    
   $(carusel).find(".slider__items").animate({left: "0px"}, 200); 
}
InplaySlider.prototype.right_carusel = function(carusel){
   var block_width = $(carusel).find('.slider-link').outerWidth();
	$(carusel).find(".slider__items").animate({left: "-"+ block_width +"px"}, 200, function(){
	  $(carusel).find(".sliderl__items .slider-link").eq(0).clone().appendTo($(carusel).find(".slider__items")); 
      $(carusel).find(".sliderl__items .slider-link").eq(0).remove(); 
      $(carusel).find(".sliderl__items").css({"left":"0px"}); 
   }); 
}



InplaySlider.prototype.init = function(data) {
	var self = this;
	$.each(data.DATA, function (index, item) {
		self.html += self.InplaySliderTemplate(item);
	});
	$('#inplay-slider .slider__items').html(this.html);
};

var inplaySlider = new InplaySlider();

$(document).on('click', ".slider-next",function(){
	var carusel = $(this).parents('.slider');
	inplaySlider.right_carusel(carusel);
	return false;
});
$(document).on('click',".slider-prev",function(){ 
	var carusel = $(this).parents('.slider');
	inplaySlider.left_carusel(carusel);
	return false;
});

$(document).on('click',".slider-link",function(){ 
	var attr = $(this).attr('data-it');
	Inplay.active = attr;
});*/
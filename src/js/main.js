// Show and hide aside menu.
	$('.aside-btn-open').on('click', function(){
		$('.main').addClass('main-full');
		$('.aside').addClass('aside-visible');
		$(this).fadeOut(500);
	});
	
	$('.aside-btn').on('click', function(){
		$('.main').removeClass('main-full');
		$('.aside').removeClass('aside-visible');
		$('.aside-btn-open').fadeIn(400);
	});

// Show and hide submenu.
$('.nav-list-item').on('click', function(){
	$(this).find('.nav-sublist').toggleClass('active');
});

// Custom select.
$('.pseudo-select-list').on('click', 'li', function(){
	var $this 		= $(this),
		list_index  = $this.index();
		
	// Set index for invisible option from pseudo select.
	$('select option').eq(list_index).filter(function(){
		var $option = $(this);
			
		$option.prop('selected', true);
	});
	
	// Choose pseudo item.
	$('.pseudo-choosed-item').html($this.text());
});




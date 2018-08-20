// Show and hide aside menu.
$('.aside-btn-open').on('click', function () {
	$('.main').addClass('main-full');
	$('.aside').addClass('aside-visible');
	$(this).fadeOut(500);
});

$('.aside-btn').on('click', function () {
	$('.main').removeClass('main-full');
	$('.aside').removeClass('aside-visible');
	$('.aside-btn-open').fadeIn(400);
});

// Show and hide submenu.
$('.nav-list-item').on('click', function () {
	$(this).find('.nav-sublist').toggleClass('active');
});

// Get custom select.
$('body').on('click', '.pseudo-choosed-item', function(e){
    var $this       = $(this),
        select_list = $this.siblings('.pseudo-select-list'),
        label_attr  = $this.attr('label'),
        label       = $this.parent().find('.label');

        label.text(label_attr); 

        $this.toggleClass('active');
        select_list.toggleClass('active');
});

// Custom select.
$('body').on('click', '.pseudo-select-list li', function(){
    var $this 		 = $(this),
        text         = $this.text(),
        list_index   = $this.index(),
        select       = $this.parent().siblings('select'),
        choosed_item = $this.parent().siblings('.pseudo-choosed-item');

    // Close select.
    $('.pseudo-choosed-item, .pseudo-select-list').removeClass('active');

    // Set index for invisible option from pseudo select.
    select.find('option').eq($this.index()).prop('selected', true).trigger('change');

    // Paste text to main label select.
    choosed_item.text($this.text());
});

// Close pseudo select list if click wasn't on it.
$(document).mouseup(function (e) {
    var block = $(".select-wrapper");

    if (!block.is(e.target) &&
        block.has(e.target).length === 0) {
        $('.pseudo-select-list').removeClass('active');
    }
});

// Follow mouse.
$(document).mousemove(function(e){
	console.log(e.pageX);
    $('.circle').css({left:e.pageX, top:e.pageY});
});



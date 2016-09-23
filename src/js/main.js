$(document).ready(function() {

    var viewPortWidth = $(window).width();
    var viewPortHeight = $(window).height();

    /**** Navigation ****/

    var first = false;
    toggleNavigation(false);
       
    $(window).scroll(function() {
        $('.navigation-ul').removeClass('delay1 animated fadeIn');
        var scrollHeight = $(window).scrollTop();
        var navbar = $('.navigation-ul');
        if (navbar.hasClass('nav-open')){
            toggleNavigation(true);
            first = true;
        } else {
            if(first === false) {
                toggleNavigation(true);
                first = true;
            }
        }

        /*
         * Adjusts active menu item based on scrollHeight from top
         */  
        $('.nav-bar-item').each(function(event) {
            if (scrollHeight >= $($(this).children().attr('href')).offset().top - 70) {
                $('.nav-bar-item').not(this).removeClass('nav-active');
                $(this).addClass('nav-active');
            }
        });
    });

    $(window).resize(function() {
        if($('.navigation-ul').hasClass('nav-open'))
            $('.nav-circle').css('left', $('.nav-active').position().left + $('.nav-active').width() / 2 + 15)
        else 
            $('.nav-circle').css('left', $(window).width() - 70);
    });

    /*
     * Clicking on circle opens or closes navigation based on original state
     */
    $('#circle').click(function(e) {
        if($('.navigation-ul').hasClass('nav-open'))
            toggleNavigation(true);
        else 
            toggleNavigation(false);
    });

    /*
     * Clicking on a navigation item scrolls to the corresponding section on the page
     */
    $('.nav-bar-item').click(function(e) {
        $('.nav-bar-item').each(function() {
            $(this).removeClass('nav-active');
        })
        $(this).addClass('nav-active');

        event.preventDefault();
        var target = ""+ $(this).children('a').attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 700);

        toggleNavigation(false);
    });

    /*
     * Toggles overlay off whenever circle is clicked
     */
    $('#closecircle').click(function(e) {
        fadeOverlay();
    });

    $('.overlay').click(function(e) {
        
    });

    /*
     * Toggles overlay off whenever 'esc' key is clicked
     */
    $(document).keyup(function(e) {
        if(e.which == 27 && $('.overlay-fade').hasClass('active'))
            fadeOverlay();
    });  

    /*
     * Toggles project overlays on page from each link
     */
    $('.project-card').find('.overlay-toggle').click(function(e){
        e.preventDefault();
        toggleOverlay(this);
    });

    /*
     * Vertically centers a child element to its parent elements
     * Passed child + parent must be jQuery elements
     */
    function verticalCenter($child, $parent) {
        $child.css('margin-top', $parent.height() / 2 - $child.height() / 2);
    }

    verticalCenter($('.cover'), $('.cover-wrapper'));

    if(viewPortWidth > 768)
        verticalCenter($('.header-left'),$('.project-header'));

    /* 
     * Toggles on an Overlay of the matching type
     * Obj: Javascript element of the section you want active
     */
    function toggleOverlay(obj) {
        var href = $(obj).attr('href');
        $('.project-overlay-row').each(function() {
            if($(this).attr('href') != href)
                $(this).addClass('hidden');
        })

        toggleNavigation(true);

        $('body').css({'overflow':'hidden', 'position': 'relative'});
        $('.overlay-fade').css({'visibility':'visible',})
        $(href)
            .removeClass('hidden fadeOutDown animated')
            .addClass('active fadeInUp animatedFast');
        $(href).find('.project-content')
                .addClass('fadeInDown animated delay1');
        $('.overlay')
            .removeClass('hidden')
            .addClass('active');
        $('.overlay-fade')
            .removeClass('hidden fadeOutDown animatedFast')
            .addClass('active');
        window.scrollTop = 0;
        $('.nav-bar').addClass('hidden');
        $('#circle')
            .removeClass('fadeIn delay1')
            .addClass('flipInY delay');
    }

    /*
     * Fades project detial overlay on page 
     */
    function fadeOverlay() {
        var href = '#' + $('.overlay').find('.active').attr('id');
        $(href).removeClass('fadeInUp animatedFast').addClass('fadeOutDown animatedFast');
        $('.overlay-fade').addClass('fadeOutDown animatedFast')
            .delay(490)
            .queue(function(next){
                removeOverlay(href);
                next();
            });     
    }

    /*
     * Removes project detial overlay on page 
     */
    function removeOverlay(href) {
        $(href)
            .removeClass('active')
            .addClass('hidden');
        $('.overlay')
            .removeClass('active')
            .addClass('hidden');
        $('.overlay-fade').scrollTop(0);
        $('.overlay-fade')
            .removeClass('active')
            .addClass('hidden');

        $('.nav-bar')
            .removeClass('hidden');
        $('body')
            .css({
                'overflow':'auto',
                'position':'static',
            });
    }

    /* 
     * Opens or Closes navigation bar based on passed state
     * TRUE: Navigation bar is closed (because User is navigating page)
     * FALSE: Navigation bar is open 
     */
    function toggleNavigation(navigationState) {
        var navbar = $('.navigation-ul');
        if(navigationState) {
            navbar.removeClass('nav-open');
            navbar.fadeOut('fast');

            // Adjust circle location + size
            $('#circle').css({
               'border-radius': '25px',
               'width': '50px',
               'height': '50px',
               '-webkit-border-radius': '50px',
               '-moz-border-radius': '50px'
            });
            $('.nav-circle').css('left', $(window).width() - 70);
            $('.nav-bar').css('background-color', 'rgba(255, 255, 255, 0.0)');
        } else {
            navbar.addClass('nav-open');
            navbar.fadeIn('fast').css('display','inline-block');

            // Adjust circle location + size
            $('#circle').css({
               'border-radius': '5px',
               'width': '10px',
               'height': '10px',
               '-webkit-border-radius': '5x',
               '-moz-border-radius': '5px'
            });
            $('.nav-circle').css('left', $('.nav-active').position().left + $('.nav-active').width() / 2 + 15)
            
            // opaque background if not at top
            if($(document).scrollTop() <= 20) 
                $('.nav-bar').css('background-color', 'rgba(255, 255, 255, 0.9)');
            else 
                $('.nav-bar').css('background-color', 'rgba(255, 255, 255, 0.9)');
        }
    }

});

$(window).load(function() {
    toggleNavigation(false);    
});
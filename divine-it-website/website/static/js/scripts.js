jQuery(function ($) {

    'use strict';

    var settings = window.settings
    if (settings == undefined) {
        settings = {
            easyScroll: true
        }
    }

    if(settings.easyScroll) {
        //easeScroll
        $("html").easeScroll({
            animationTime: 1200,
            stepSize: 150,
            pulseAlgorithm: 1,
            pulseScale: 8,
            pulseNormalize: 1,
            accelerationDelta: 20,
            accelerationMax: 1,
            keyboardSupport: true,
            arrowScroll: 50,
            touchpadSupport: true,
            fixedBackground: true
        });
    }

    //jQuery for page scrolling feature for one page scrolling - requires jQuery Easing plugin
    $(function() {
        $(document).on('click', 'a.page-scroll', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top -70
            }, 900, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    //hero slider

     $('.slider-bg-image').owlCarousel({
        loop: true,
        items: 1,
        autoplay: true,
        autoplaySpeed : 1500,
        dots: true,
        nav: false,
    });
     $('.fullscreen_slider').owlCarousel({
        loop: true,
        margin: 0,
        slideSpeed: 1400,
         autoplaySpeed : 1500,
        paginationSpeed: 1600,
        autoplay: true,
        // autoplayHoverPause:true,
        items: 1,
        animateIn: 'fadeIn', // add this
        animateOut: 'fadeOut', // and this
        responsiveClass: true,
        dots: false,
        nav: true
    });



     $('.autoplay-off').owlCarousel({
        loop: true,
        items: 1,
        autoplay:true,
        autoplayHoverPause:true,
        autoplaySpeed : 2000,
        dots: true,
        nav: false,
    });


     //   success-story-slider
     $('.success-story-slider').owlCarousel({
         responsiveClass:true,
        margin:30,
        dots: false,
        loop: false,
        autoWidth:false,
        nav:true,
        autoplay: true,
        smartSpeed: 3000,
        navText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            800:{
                items:2
            },
            1200:{
                items:3
            }

        }

    });

     //   testimonial slider
     $('.testimonial-slider').owlCarousel({
        responsiveClass:true,
       margin:30,
       dots: false,
       loop: false,
       autoWidth:false,
       nav:true,
       autoplay: true,
       smartSpeed: 3000,
       navText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
       responsive:{
           0:{
               items:1
           },
           600:{
               items:1
           },
           800:{
               items:1
           },
           1200:{
               items:2
           }

       }

   });

     //   blog style with link
     $('.blog-style-with-link').owlCarousel({
        responsiveClass:true,
        margin:30,
        dots: true,
        loop: true,
        autoWidth:false,
        nav:false,
        autoplay: true,
        smartSpeed: 3000,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            800:{
                items:2
            },
            1200:{
                items:3
            }

        }

    });

     //   blog style with link arrow indicator
     $('.blog-style-with-link-arrow').owlCarousel({
        responsiveClass:true,
        margin:30,
        dots: false,
        loop: true,
        autoWidth:false,
        nav:true,
        navText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
        autoplay: true,
        smartSpeed: 3000,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            800:{
                items:2
            },
            1200:{
                items:3
            }

        }

    });



    // image and content slider

    $('.image-content-slider').owlCarousel({
        responsiveClass:true,
        loop: true,
        items: 1,
        margin: 0,
        autoplay: true,
        autoplaySpeed : 1500,
        dots: true,
        nav: false,
        autoplayTimeout : 6000,
    });

     //company overview slider

     $('.overview-slider').owlCarousel({
        responsiveClass:true,
        margin:30,
        dots: true,
        loop: false,
        autoWidth:false,
        nav:false,
        autoplay: true,
        slideTransition: 'linear',
        autoplayTimeout : 4500,
        autoplayHoverPause : true,
        autoplaySpeed : 4500,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            800:{
                items:3
            },
            1200:{
                items:4
            }

        }

    });

     //lightbox
    $('.zoom-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
            titleSrc: function(item) {
                return item.el.attr('title') + '<a class="image-source-link" href="'+item.el.attr('data-source')+'></a>';
            }
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function(element) {
                return element.find('img');
            }
        }

    });


    //magnificPopup
    $('.popup-with-move-anim').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });


    /* ---------------------------------------------- /*
     * Preloader
     /* ---------------------------------------------- */

    // $(window).ready(function() {
    //     $('#status').fadeOut();
    //     $('#preloader').delay(200).fadeOut('slow');
    //
    // });



    // ------------------------------------------------------------------
    // jQuery for back to Top
    // ------------------------------------------------------------------

    // (function(){
    //
    //     $('body').append('<div id="toTop"><span><i class="fa fa-angle-down"></i></span></div>');
    //
    //     $(window).scroll(function () {
    //         if ($(this).scrollTop() != 0) {
    //             $('#toTop').fadeIn();
    //         } else {
    //             $('#toTop').fadeOut();
    //         }
    //     });
    //
    //     $('#toTop').on('click',function(){
    //         $("html, body").animate({ scrollTop: 0 }, 600);
    //         return false;
    //     });
    //
    // }());

    var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
        // ... more custom settings?
    });
    if (lazyLoadInstance) {
        // lazyLoadInstance.update();
    }

    //parallax js
    // $('.parallax-window').parallax({
	 //  speed: 0.2
    // });

    $('.remote-menu').each(function() {
        var remote_menu = this;
        var url = $(remote_menu).data('url')
        $.get(url, function (resp) {
            if(resp.status === 'success') {
                var items = resp.items.map(function (item) {
                    return `<a href="${item.url}">${item.name}</a>`
                })
                $(remote_menu).html(items.join(""))
            }
            console.log(resp)
        })
    })



    // Menu alignment
    fixMenuPosition()


    // mobile menu

    // $('.dropdown').map(viewMegaMenu)
    $('.dropdown-mobile').map(function (i, item) {
        var rootElem = this;
        $(this).children('.dropdown-link').click(function (e) {
            e.stopPropagation()
            e.preventDefault()
            var dropdown = $(rootElem).children('.dropdown-menu')
            if ($(dropdown).hasClass('d-block')) {
                $('.dropdown-mobile .dropdown-menu').removeClass('d-block')
            } else {
                $('.dropdown-mobile .dropdown-menu').removeClass('d-block')
                $(dropdown).addClass('d-block')
            }
        })
    })

    $('.closeMobileNav').click(function () {
        $('#mobileNavWrap').css("right", "-600px")
        $('#darkness').css("display", "none")
    })
    $('.openMobileNav').click(function () {
        $('#mobileNavWrap').css("right", "0")
        $('#darkness').css("display", "block")
    })
    $('#darkness').click(function () {
        $('#mobileNavWrap').css("right", "-600px")
        $('#darkness').css("display", "none")
    })
}); // JQuery end

(function($)
{
    $.fn.removeStyle = function(style)
    {
        var search = new RegExp(style + '[^;]+;?', 'g');

        return this.each(function()
        {
            $(this).attr('style', function(i, style)
            {
                return style && style.replace(search, '');
            });
        });
    };
}(jQuery));
//
// function fix_menu_alignment(menu) {
//
//
//     var megamenuItems = $(menu).children('.megaMenuItem')
//
//     function getPos(el) {
//         // yay readability
//         for (var lx = 0, ly = 0;
//              el != null;
//              lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent) ;
//         return {x: lx, y: ly};
//     }
//
//     function get_siblings_width(item, left=false) {
//         var aggregatedWidth = 0
//
//         $(item).nextAll().each(function (i, it) {
//             aggregatedWidth += $(it).width()
//         })
//
//         return aggregatedWidth
//     }
//
//     function resize_single_dropdown(i, item) {
//         var dropdownItem = $(item).children('.fixItem')
//
//         if (dropdownItem.length > 0) dropdownItem = dropdownItem[0]
//         else return // no dropdown so return
//
//         var menuItemWidth = $(item).width()
//         var dropdownWidth = $(dropdownItem).width()
//
//         // go right half of dropdown width - half of menu item width px
//         var calcMiddle = (dropdownWidth / 2) - (menuItemWidth / 2)
//         // console.log(item, calcMiddle)
//         // if on right side small width then half of dropdown width
//         // then shift menu to left half of dropdown width - sum of all item right to the current menu item
//         var maxRightWidth = get_siblings_width(item) + (menuItemWidth / 2)
//         if (dropdownWidth / 2 > maxRightWidth) {
//             calcMiddle -= (dropdownWidth / 2 - maxRightWidth)
//         }
//         $(dropdownItem).css('right', '-' + Math.round(calcMiddle) + 'px')
//         $(dropdownItem).css('display', 'block')
//         var pos = getPos(dropdownItem);
//         $(dropdownItem).removeStyle('display')
//         if (pos.x < 20) {
//             calcMiddle -= pos.x - $('.header_bottom .container').offset().left - 20
//             $(dropdownItem).css('right', '-' + Math.round(calcMiddle) + 'px')
//         }
//     }
//     megamenuItems.each(resize_single_dropdown)
//
// }





function fixMenuPosition() {
    $('.fixMenuAlignment').map(function(i, item) {
        $(item).children('.megaMenuItem.dropdown').map(function(i, menuItem) {
            var dropdownItem = $(menuItem).children('.dropdown-menu')
            var useAsOffsetSelector = $(dropdownItem).find('.useAsOffset')
            var toShift = null;
            if(useAsOffsetSelector.length > 0) {
                $(dropdownItem).attr('style', 'top:-99999px !important; display:block');
                toShift = $(useAsOffsetSelector[0]).outerWidth()
                console.log($(useAsOffsetSelector[0]).width(), $(menuItem).width()/2)
                $(dropdownItem).attr('style', 'left: -' + toShift + 'px');
                $(menuItem).children('.dropdown-link').attr('data-display',  'static');

            }
            $(menuItem).on('show.bs.dropdown', function () {

            })


        });
    })
}

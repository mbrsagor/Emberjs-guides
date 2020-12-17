


(function ($) {

    $(document).ready(function() {

         window.onscroll = function() {myFunction()};

        var header = document.getElementById("headerWrap");
        var sticky = header.offsetTop;

        function myFunction() {
          if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
          } else {
            header.classList.remove("sticky");
          }
        }


    })



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

    $('#dismiss, .overlay').on('click', function () {
        // hide sidebar
        $('#sidebar').removeClass('active');
        // hide overlay
        $('.overlay').removeClass('active');
    });

    $('#sidebarCollapse').on('click', function (e) {
        e.preventDefault();
        // open or close navbar
        $('#sidebar').toggleClass('active');
        // close dropdowns
        $('.collapse.in').toggleClass('in');
        // and also adjust aria-expanded attributes we use for the open/closed arrows
        // in our CSS
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');

        $('.overlay').addClass('active');
    });


    var getNav = $("nav.navbar.bootsnav");
    var navSticky = getNav.hasClass("navbar-sticky");
    if (navSticky) {
        getNav.wrap("<div class='wrap-sticky'></div>");
    };

    // ------------------------------------------------------------------------------ //
    // Navbar Fixed
    // ------------------------------------------------------------------------------ //
    if (getNav.hasClass("no-background")) {
        $(window).on("scroll", function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > 34) {
                console.log('scroll');
                $(".navbar-fixed").removeClass("no-background");
            } else {
                $(".navbar-fixed").addClass("no-background");
            }
        });
    }


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

    // Menu alignment
    fixMenuPosition()
})(jQuery)



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




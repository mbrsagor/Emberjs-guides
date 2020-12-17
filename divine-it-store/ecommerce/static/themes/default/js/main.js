/*================
 Template Name: ProLanding - Product Landing Page Template
 Description: ProLanding is a powerful 100% Responsive Product landing page template.
 Version: 1.0
 Author: https://themeforest.net/user/htmllover/portfolio
 =======================*/

// TABLE OF CONTENTS


jQuery(function ($) {

    'use strict';

    //hero slider
    $('.hero-slider-1').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        items: 1
    })

    //features products
    $('.feature-products-slider').owlCarousel({
        loop:false,
        margin:10,
        dots: false,
        nav:true,
        navText : ["<span class='ti-angle-left'></span>","<span class='ti-angle-right'></span>"],
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    })

    //features products
    $('.our-partner-slider').owlCarousel({
        loop:true,
        margin:10,
        dots: true,
        nav:false,
        responsive:{
            0:{
                items:2
            },
            600:{
                items:4
            },
            1000:{
                items:7
            }
        }
    })

    // //product details
    // $('.product-detail-slider').owlCarousel({
    //     loop:true,
    //     margin:10,
    //     dot: false,
    //     nav:true,
    //     navText : ["<span class='ti-angle-left'></span>","<span class='ti-angle-right'></span>"],
    //     items: 1
    // })

    //tooltip
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    //Scripts for dynamic menu (menu_builder)
    $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
      if (!$(this).next().hasClass('show')) {
        $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
      }
      var $subMenu = $(this).next(".dropdown-menu");
      if($subMenu.children("li").length) {
          $subMenu.toggleClass('show');
      }

      $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
        $('.dropdown-submenu .show').removeClass("show");
      });

      return false;
    });




}); // JQuery end
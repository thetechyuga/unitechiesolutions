;(function ($) {

    "use strict";
    
    var pxl_scroll_top;
    var pxl_window_height;
    var pxl_window_width;
    var pxl_scroll_status = '';
    var pxl_last_scroll_top = 0;
    var pxl_post_slip = false;
    var pxl_image_slip = false;

    $(window).on('load', function () {
        $(".pxl-loader").addClass("is-loaded");
        $('.pxl-swiper-slider, .pxl-header-mobile-elementor').css('opacity', '1');
        $('.pxl-gallery-scroll').parents('body').addClass('body-overflow').addClass('body-visible-sm');
        pxl_window_width = $(window).width();
        pxl_window_height = $(window).height();
        agenzio_header_sticky();
        agenzio_header_mobile();
        agenzio_scroll_to_top();
        agenzio_footer_fixed();
        agenzio_shop_quantity();
        agenzio_submenu_responsive();
        agenzio_panel_anchor_toggle();
        agenzio_post_grid();
        agenzio_slider_column_offset();
    });

    $(window).on('scroll', function () {
        pxl_scroll_top = $(window).scrollTop();
        pxl_window_height = $(window).height();
        pxl_window_width = $(window).width();
        if (pxl_scroll_top < pxl_last_scroll_top) {
            pxl_scroll_status = 'up';
        } else {
            pxl_scroll_status = 'down';
        }
        pxl_last_scroll_top = pxl_scroll_top;
        agenzio_header_sticky();
        agenzio_scroll_to_top();
        agenzio_footer_fixed();
        agenzio_ptitle_scroll_opacity();
        agenzio_post_slip();
        if (pxl_scroll_top < 100) {
            $('.elementor > .pin-spacer').removeClass('scroll-top-active');
        }
    });

    $(window).on('resize', function () {
        pxl_window_height = $(window).height();
        pxl_window_width = $(window).width();
        agenzio_submenu_responsive();
        agenzio_header_mobile();
        agenzio_post_grid();
        agenzio_slider_column_offset();
    });

    $(document).ready(function () {
        agenzio_button_parallax();
        agenzio_backtotop_progess_bar();
        agenzio_type_file_upload();
        agenzio_zoom_point();
        agenzio_post_slip();
        agenzio_text_scroll_bar();
        agenzio_text_scroll_progress_bar();

        $('.pxl-portfolio-click1 .pxl-swiper-single:first-child').addClass('swiper-slide-active');

        $('.pxl-portfolio-click1 .pxl-swiper-single').on('click', function() {
            $('.pxl-portfolio-click1 .pxl-swiper-single').removeClass('swiper-slide-active');
            $(this).addClass('swiper-slide-active');
        });

        /* Start Menu Mobile */
        $('.pxl-header-menu li.menu-item-has-children').append('<span class="pxl-menu-toggle"></span>');
        $('.pxl-menu-toggle').on('click', function () {
            if( $(this).hasClass('active')){
                $(this).closest('ul').find('.pxl-menu-toggle.active').toggleClass('active');
                $(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();    
            }else{
                $(this).closest('ul').find('.pxl-menu-toggle.active').toggleClass('active');
                $(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();
                $(this).toggleClass('active');
                $(this).parent().find('> .sub-menu').toggleClass('active');
                $(this).parent().find('> .sub-menu').slideToggle();
            }      
        });
    
        $("#pxl-nav-mobile, .pxl-anchor-mobile-menu").on('click', function () {
            $(this).toggleClass('active');
            $('body').toggleClass('body-overflow');
            $('.pxl-header-menu').toggleClass('active');
        });

        $(".pxl-menu-close, .pxl-header-menu-backdrop, #pxl-header-mobile .pxl-menu-primary a.is-one-page").on('click', function () {
            $(this).parents('.pxl-header-main').find('.pxl-header-menu').removeClass('active');
            $('#pxl-nav-mobile').removeClass('active');
            $('body').toggleClass('body-overflow');
        });
        /* End Menu Mobile */

        /* Button Onepage */
        if($('.pxl-atc-onepage').length) {
            $('.pxl-atc-onepage .btn').on('click', function (e) {
                var _this = $(this);
                var _link = $(this).attr('href');
                var _id_data = e.currentTarget.hash;
                var _offset;
                var _data_offset = $(this).attr('data-onepage-offset');
                if(_data_offset) {
                    _offset = _data_offset;
                } else {
                    _offset = 0;
                }
                if ($(_id_data).length === 1) {
                    var _target = $(_id_data);
                    $('.pxl-onepage-active').removeClass('pxl-onepage-active');
                    _this.addClass('pxl-onepage-active');
                    $('html, body').stop().animate({ scrollTop: _target.offset().top - _offset }, 1000);   
                    return false;
                } else {
                    window.location.href = _link;
                }
                return false;
            });
        }
        
        /* Menu Vertical */
        $('.pxl-nav-vertical li.menu-item-has-children > a').append('<span class="pxl-arrow-toggle"><i class="flaticon-right-arrow"></i></span>');
        $('.pxl-nav-vertical li.menu-item-has-children > a').on('click', function () {
            if( $(this).hasClass('active')){
                $(this).next().toggleClass('active').slideToggle(); 
            }else{
                $(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();
                $(this).closest('ul').find('a.active').toggleClass('active');
                $(this).find('.pxl-menu-toggle.active').toggleClass('active');
                $(this).toggleClass('active');
                $(this).next().toggleClass('active').slideToggle();
            }   
        });


        /* Mega Menu Max Height */
        var m_h_mega = $('li.pxl-megamenu > .sub-menu > .pxl-mega-menu-elementor').outerHeight();
        var w_h_mega = $(window).height();
        var w_h_mega_css = w_h_mega - 120;
        if(m_h_mega > w_h_mega) {
            $('li.pxl-megamenu > .sub-menu > .pxl-mega-menu-elementor').css('max-height', w_h_mega_css + 'px');
            $('li.pxl-megamenu > .sub-menu > .pxl-mega-menu-elementor').css('overflow-x', 'scroll');
        }
        /* End Mega Menu Max Height */

        /* Scroll To Top */
        $('.pxl-scroll-top').on('click', function() {
            $('html, body').animate({scrollTop: 0}, 1200);
            $(this).parents('.pxl-wapper').find('.elementor > .pin-spacer').addClass('scroll-top-active');
            return false;
        });

        /* Animate Time Delay */
        $('.pxl-grid-masonry').each(function () {
            var eltime = 80;
            var elt_inner = $(this).children().length;
            var _elt = elt_inner - 1;
            $(this).find('> .pxl-grid-item > .wow').each(function (index, obj) {
                $(this).css('animation-delay', eltime + 'ms');
                if (_elt === index) {
                    eltime = 80;
                    _elt = _elt + elt_inner;
                } else {
                    eltime = eltime + 80;
                }
            });
        });

        $('.btn-text-nina').each(function () {
            var eltime = 0.045;
            var elt_inner = $(this).children().length;
            var _elt = elt_inner - 1;
            $(this).find('> .pxl--btn-text > span').each(function (index, obj) {
                $(this).css('transition-delay', eltime + 's');
                eltime = eltime + 0.045;
            });
        });

        $('.btn-text-nanuk').each(function () {
            var eltime = 0.05;
            var elt_inner = $(this).children().length;
            var _elt = elt_inner - 1;
            $(this).find('> .pxl--btn-text > span').each(function (index, obj) {
                $(this).css('animation-delay', eltime + 's');
                eltime = eltime + 0.05;
            });
        });

        $('.btn-text-smoke').each(function () {
            var eltime = 0.05;
            var elt_inner = $(this).children().length;
            var _elt = elt_inner - 1;
            $(this).find('> .pxl--btn-text > span > span > span').each(function (index, obj) {
                $(this).css('--d', eltime + 's');
                eltime = eltime + 0.05;
            });
        });

        $('.btn-text-reverse .pxl-text--front, .btn-text-reverse .pxl-text--back').each(function () {
            var eltime = 0.05;
            var elt_inner = $(this).children().length;
            var _elt = elt_inner - 1;
            $(this).find('.pxl-text--inner > span').each(function (index, obj) {
                $(this).css('transition-delay', eltime + 's');
                eltime = eltime + 0.05;
            });
        });

        $('.pxl-text-carousel1, .pxl-meta1').each(function () {
            const container = this; // Use the current container in the loop
            const button = container.querySelector('.pxl-item-button'); // Find the button inside the current container

            if (button) { // Ensure the button exists
                container.addEventListener("mousemove", (event) => {
                    const rect = container.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;

                    gsap.to(button, {
                        duration: 0.2,
                        top: `${y}px`,
                        left: `${x}px`,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                });
            }
        });

        $('.pxl-services-list .pxl--item .pxl-item-title').each(function () {
            const container = this;
            const image = container.querySelector('.pxl-image');

            if (image) {
                container.addEventListener("mousemove", (event) => {
                    const rect = container.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;

                    gsap.to(image, {
                        duration: 0.1,
                        top: `${y}px`,
                        left: `${x}px`,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                });
            }
        });

        $('.pxl-parent-transition').each(function() {
            $(this).find('.pxl-transtion').addClass('pxl-hover-transition');
            $(this).hover(function() {
                $(this).find('.pxl-transtion').addClass('pxl-hover-transition');
            });
            $('.pxl-switch-button').on('mouseover', function() {
                $(this).find('.pxl-transtion').removeClass('pxl-hover-transition');
            });
        });

        $('.pxl-parent-transition').each(function() {
            $(this).find('.pxl-transtion').addClass('pxl-hover-transition');
            $(this).hover(function() {
                $(this).find('.pxl-transtion').addClass('pxl-hover-transition');
            });
            $('.pxl-switch-button').on('mouseover', function() {
                $(this).find('.pxl-transtion').removeClass('pxl-hover-transition');
            });
        });

        /* End Animate Time Delay */

        /* Lightbox Popup */
        $('.pxl-action-popup').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        $('.pxl-gallery-lightbox').each(function () {
            $(this).magnificPopup({
                delegate: 'a.lightbox',
                type: 'image',
                gallery: {
                    enabled: true
                },
                mainClass: 'mfp-fade',
            });
        });

        /* Page Title Parallax */
        if($('#pxl-page-title-default').hasClass('pxl--parallax')) {
            $(this).stellar();
        }

        /* Cart Sidebar Popup */
        $(".pxl-cart-sidebar-button").on('click', function () {
            $('body').addClass('body-overflow');
            $('#pxl-cart-sidebar').addClass('active');
        });
        $("#pxl-cart-sidebar .pxl-popup--overlay, #pxl-cart-sidebar .pxl-item--close").on('click', function () {
            $('body').removeClass('body-overflow');
            $('#pxl-cart-sidebar').removeClass('active');
        });

        /* Search Popup */
        $(".pxl-search-popup-button").on('click', function () {
            $('body').addClass('body-overflow');
            $('#pxl-search-popup').addClass('active');
            setTimeout(function(){
                $('#pxl-search-popup .search-field').focus();
            },1000);
        });
        $("#pxl-search-popup .pxl-item--overlay, #pxl-search-popup .pxl-item--close").on('click', function () {
            $('body').removeClass('body-overflow');
            $('#pxl-search-popup').removeClass('active');
        });

        /* Hidden Panel */
        $(".pxl-hidden-panel-button").on('click', function () {
            $('body').addClass('body-overflow');
            $('#pxl-hidden-panel-popup').addClass('active');
        });
        $("#pxl-hidden-panel-popup .pxl-item--overlay, #pxl-hidden-panel-popup .pxl-item--close").on('click', function () {
            $('body').removeClass('body-overflow');
            $('#pxl-hidden-panel-popup').removeClass('active');
        });

        /* Popup */
        $(".pxl-popup-button").on('click', function () {
            $('body').addClass('body-overflow');
            $('#pxl-popup-elementor').addClass('active');
            $('#pxl-popup-elementor').removeClass('deactivation');
        });
        $("#pxl-popup-elementor .pxl-item--overlay, #pxl-popup-elementor .pxl-item--close, .pxl-menu-primary a.is-one-page").on('click', function () {
            $('body').removeClass('body-overflow');
            $('#pxl-popup-elementor').removeClass('active');
            $('#pxl-popup-elementor').addClass('deactivation');
        });

        /* Hover Active Item */
        $('.pxl--widget-hover').each(function () {
            $(this).on('mouseover', function () {
                $(this).parents('.elementor-row').find('.pxl--widget-hover').removeClass('pxl--item-active');
                $(this).parents('.elementor-container').find('.pxl--widget-hover').removeClass('pxl--item-active');
                $(this).addClass('pxl--item-active');
            });
        });

        /* Item Hover Active */
        $('.pxl-hover-item').each(function () {
            $(this).hover(function () {
                $(this).parent('.pxl-hover-wrap').find('.pxl-hover-item').removeClass('pxl-active');
                $(this).addClass('pxl-active');
            });
        });

        $(".pxl-portfolio-modern1 .pxl-portfolio--content .pxl-portfolio--item")
        .on("mouseenter", function() {
            $(this).addClass("active permanent-active");          
            $(".pxl-portfolio-modern1 .pxl-portfolio--images .pxl-portfolio--featured").removeClass('active');       
            var selected_item = $(this).find(".pxl-content--inner").attr("data-image");
            $(selected_item).addClass('active').removeClass('non-active');
        })
        .on("mouseleave", function() {
            $(this).removeClass('active');
            $(".pxl-portfolio-modern1 .pxl-portfolio--images .pxl-portfolio--featured").removeClass('non-active');
            var selected_item = $(this).find(".pxl-content--inner").attr("data-image");
            $(selected_item).removeClass('active').addClass('non-active');
        });

        // CSS transition for smooth effect
        $(".pxl-portfolio-modern1 .pxl-portfolio--item, .pxl-portfolio-modern1 .pxl-list--images .pxl-list--featured")
            .css("transition", "all 0.3s ease");

        // Active Mega Menu Hover
        $('li.pxl-megamenu').hover(function(){
                $(this).parents('.elementor-section').addClass('section-mega-active');
            },function(){
                $(this).parents('.elementor-section').removeClass('section-mega-active');
        });

        /* Start Icon Bounce */
        var boxEls = $('.el-bounce, .pxl-image-effect1, .el-effect-zigzag');
        $.each(boxEls, function(boxIndex, boxEl) {
            loopToggleClass(boxEl, 'active');
        });

        function loopToggleClass(el, toggleClass) {
            el = $(el);
            let counter = 0;
            if (el.hasClass(toggleClass)) {
                waitFor(function () {
                    counter++;
                    return counter == 2;
                }, function () {
                    counter = 0;
                    el.removeClass(toggleClass);
                    loopToggleClass(el, toggleClass);
                }, 'Deactivate', 1000);
            } else {
                waitFor(function () {
                    counter++;
                    return counter == 3;
                }, function () {
                    counter = 0;
                    el.addClass(toggleClass);
                    loopToggleClass(el, toggleClass);
                }, 'Activate', 1000);
            }
        }

        function waitFor(condition, callback, message, time) {
            if (message == null || message == '' || typeof message == 'undefined') {
                message = 'Timeout';
            }
            if (time == null || time == '' || typeof time == 'undefined') {
                time = 100;
            }
            var cond = condition();
            if (cond) {
                callback();
            } else {
                setTimeout(function() {
                    waitFor(condition, callback, message, time);
                }, time);
            }
        }
        /* End Icon Bounce */

        /* Image Effect */
        if($('.pxl-image-tilt').length){
            $('.pxl-image-tilt').parents('.elementor-top-section').addClass('pxl-image-tilt-active');
            $('.pxl-image-tilt').each(function () {
                var pxl_maxtilt = $(this).data('maxtilt'),
                    pxl_speedtilt = $(this).data('speedtilt'),
                    pxl_perspectivetilt = $(this).data('perspectivetilt');
                VanillaTilt.init(this, {
                    max: pxl_maxtilt,
                    speed: pxl_speedtilt,
                    perspective: pxl_perspectivetilt
                });
            });
        }

        /* Text Hover Silde */
        $('.pxl-blog-style1 .pxl-post--inner .pxl-post--title a, .pxl-team-layout1 .pxl-item--inner .pxl-item--position, .pxl-post-carousel .pxl-post--inner .pxl-post--title a, .pxl-blog-list .pxl-item--title a').each(function () {
            var text = $(this).text().trim();
            var html = text.split('').map(function(char, index) {
                return '<span class="char" style="--char-index:' + index + ';">' + char + '</span>';
            }).join('');
            $(this).html(html);
        });

        /* Select Theme Style */
        $('.wpcf7-select').each(function(){
            var $this = $(this), numberOfOptions = $(this).children('option').length;
          
            $this.addClass('pxl-select-hidden'); 
            $this.wrap('<div class="pxl-select"></div>');
            $this.after('<div class="pxl-select-higthlight"></div>');

            var $styledSelect = $this.next('div.pxl-select-higthlight');
            $styledSelect.text($this.children('option').eq(0).text());
          
            var $list = $('<ul />', {
                'class': 'pxl-select-options'
            }).insertAfter($styledSelect);
          
            for (var i = 0; i < numberOfOptions; i++) {
                $('<li />', {
                    text: $this.children('option').eq(i).text(),
                    rel: $this.children('option').eq(i).val()
                }).appendTo($list);
            }
          
            var $listItems = $list.children('li');
          
            $styledSelect.on('click', function(e) {
                e.stopPropagation();
                $('div.pxl-select-higthlight.active').not(this).each(function(){
                    $(this).removeClass('active').next('ul.pxl-select-options').addClass('pxl-select-lists-hide');
                });
                $(this).toggleClass('active');
            });
          
            $listItems.on('click', function(e) {
                e.stopPropagation();
                $styledSelect.text($(this).text()).removeClass('active');
                $this.val($(this).attr('rel'));
            });
          
            $(document).on('click', function() {
                $styledSelect.removeClass('active');
            });

        });

        $('.wpcf7-select_custom').each(function(){
            var $this = $(this), numberOfOptions = $(this).children('option').length;

            // Ẩn select gốc và tạo ra giao diện tùy chỉnh
            $this.addClass('pxl-select-hidden');
            $this.wrap('<div class="pxl-select"></div>');
            $this.after('<div class="pxl-select-higthlight"></div>');

            var $styledSelect = $this.next('div.pxl-select-higthlight');
            $styledSelect.text($this.children('option').eq(0).text());

            var $list = $('<ul />', {
                'class': 'pxl-select-options'
            }).insertAfter($styledSelect);

            // Tạo danh sách các lựa chọn từ phần tử select
            for (var i = 0; i < numberOfOptions; i++) {
                $('<li />', {
                    text: $this.children('option').eq(i).text(),
                    rel: $this.children('option').eq(i).val()
                }).appendTo($list);
            }

            var $listItems = $list.children('li');

            // Khi người dùng nhấp vào styledSelect
            $styledSelect.on('click', function(e) {
                e.stopPropagation();
                $('div.pxl-select-higthlight.active').not(this).each(function(){
                    $(this).removeClass('active').next('ul.pxl-select-options').addClass('pxl-select-lists-hide');
                });
                $(this).toggleClass('active');
            });

            // Khi người dùng nhấp vào một mục trong danh sách tùy chỉnh
            $listItems.on('click', function(e) {
                e.stopPropagation();
                $styledSelect.text($(this).text()).removeClass('active');
                $this.val($(this).attr('rel'));  // Cập nhật giá trị cho select gốc

                // Kích hoạt sự kiện change trên phần tử select gốc để plugin tính toán lại
                $this.trigger('change');
            });

            $(document).on('click', function() {
                $styledSelect.removeClass('active');
            });
        });


        /* Nice Select */
        $('.woocommerce-ordering .orderby, #pxl-sidebar-area select, .variations_form.cart .variations select, .pxl-open-table select, .pxl-nice-select').each(function () {
            $(this).niceSelect();
        });

        /* Text Scroll */
        
        //End//


        /* Typewriter */
        if($('.pxl-title--typewriter').length) {
            function typewriterOut(elements, callback)
            {
                if (elements.length){
                    elements.eq(0).addClass('is-active');
                    elements.eq(0).delay( 3000 );
                    elements.eq(0).removeClass('is-active');
                    typewriterOut(elements.slice(1), callback);
                }
                else {
                    callback();
                }
            }

            function typewriterIn(elements, callback)
            {
                if (elements.length){
                    elements.eq(0).addClass('is-active');
                    elements.eq(0).delay( 3000 ).slideDown(3000, function(){
                        elements.eq(0).removeClass('is-active');
                        typewriterIn(elements.slice(1), callback);
                    });
                }
                else {
                    callback();
                }
            }

            function typewriterInfinite(){
                typewriterOut($('.pxl-title--typewriter .pxl-item--text'), function(){ 
                    typewriterIn($('.pxl-title--typewriter .pxl-item--text'), function(){
                        typewriterInfinite();
                    });
                });
            }
            $(function(){
                typewriterInfinite();
            });
        }
        /* End Typewriter */

        /* Section Particles */      
        setTimeout(function() {
            $(".pxl-row-particles").each(function() {
                particlesJS($(this).attr('id'), {
                  "particles": {
                    "number": {
                        "value": $(this).data('number'),
                    },
                    "color": {
                        "value": $(this).data('color')
                    },
                    "shape": {
                        "type": "circle",
                    },
                    "size": {
                        "value": $(this).data('size'),
                        "random": $(this).data('size-random'),
                    },
                    "line_linked": {
                        "enable": false,
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": $(this).data('move-direction'),
                        "random": true,
                        "out_mode": "out",
                    }
                  },
                  "retina_detect": true
                });
            });
        }, 400);

        /* Get checked input - Mailchimpp */
        $('.mc4wp-form input:checkbox').change(function(){
            if($(this).is(":checked")) {
                $('.mc4wp-form').addClass("pxl-input-checked");
            } else {
                $('.mc4wp-form').removeClass("pxl-input-checked");
            }
        });

        /* Pricing */
        $('.pxl-pricing2 .pxl-pricing--body').each(function () {
            $(this).find('.pxl-item--first').on('mouseenter', function () {
                $(this).parent().addClass('pxl-item--first-active');
            }).on('mouseleave', function () {
                $(this).parent().removeClass('pxl-item--first-active');
            });
            $(this).find('.pxl-item--last').on('mouseenter', function () {
                $(this).parent().addClass('pxl-item--last-active');
            }).on('mouseleave', function () {
                $(this).parent().removeClass('pxl-item--last-active');
            });
        });

        $(".pxl-pricing2 .pxl-item--nav").on('click', function () {
            $(this).parent().toggleClass('active');
            $(this).parents('.pxl-pricing2').find('.pxl-pricing--monthly').toggleClass('pr-hide');
            $(this).parents('.pxl-pricing2').find('.pxl-pricing--year').toggleClass('pr-active');
        });

        /* Language */
        $(".pxl-language .pxl-meta-inner ").parent().addClass('active');

        // Xử lý sự kiện click để toggle class 'active'
        $(".pxl-language .pxl-meta-inner ").on('click', function () {
            $(this).parent().toggleClass('active');
        });

        /* Scroll to content */
        $('.pxl-link-to-section .btn').on('click', function(e) {
            var id_scroll = $(this).attr('href');
            var offsetScroll = $('.pxl-header-elementor-sticky').outerHeight();
            e.preventDefault();
            $("html, body").animate({ scrollTop: $(id_scroll).offset().top - offsetScroll }, 600);
        });

        // Hover Overlay Effect
        $('.pxl-overlay-shake').mousemove(function(event){ 
            var offset = $(this).offset();
            var W = $(this).outerWidth();
            var X = (event.pageX - offset.left);
            var Y = (event.pageY - offset.top);
            $(this).find('.pxl-overlay--color').css({
                'top' : + Y + 'px',
                'left' : + X + 'px'
            });
        });

        // Hover Portfolio Effect
        $(".pxl-portfolio-style1 .pxl-post--inner").on({
            mouseenter: function () {
                $(this).addClass("active-hover");
                $(this).removeClass("none-hover");
            },
            mouseleave: function () {
                $(this).removeClass("active-hover");
                $(this).addClass("none-hover");
            }
        });
    });
    
    jQuery(document).ajaxComplete(function(event, xhr, settings){
        agenzio_shop_quantity();
    });

    jQuery( document ).on( 'updated_wc_div', function() {
        agenzio_shop_quantity();
    } );
     
    /* Header Sticky */
    function agenzio_header_sticky() {
        if($('#pxl-header-elementor').hasClass('is-sticky')) {
            if (pxl_scroll_top > 100) {
                $('.pxl-header-elementor-sticky.pxl-sticky-stb').addClass('pxl-header-fixed');
                $('#pxl-header-mobile').addClass('pxl-header-mobile-fixed');
            } else {
                $('.pxl-header-elementor-sticky.pxl-sticky-stb').removeClass('pxl-header-fixed');
                $('#pxl-header-mobile').removeClass('pxl-header-mobile-fixed');
            }

            if (pxl_scroll_status == 'up' && pxl_scroll_top > 100) {
                $('.pxl-header-elementor-sticky.pxl-sticky-stt').addClass('pxl-header-fixed');
            } else {
                $('.pxl-header-elementor-sticky.pxl-sticky-stt').removeClass('pxl-header-fixed');
            }
        }

        $('.pxl-header-elementor-sticky').parents('body').addClass('pxl-header-sticky');
    }

    /* Header Mobile */
    function agenzio_header_mobile() {
        var h_header_mobile = $('#pxl-header-elementor').outerHeight();
        if(pxl_window_width < 1199) {
            $('#pxl-header-elementor').css('min-height', h_header_mobile + 'px');
        }
    }

    /* Scroll To Top */
    function agenzio_scroll_to_top() {
        if (pxl_scroll_top < pxl_window_height) {
            $('.pxl-scroll-top').addClass('pxl-off').removeClass('pxl-on');
        }
        if (pxl_scroll_top > pxl_window_height) {
            $('.pxl-scroll-top').addClass('pxl-on').removeClass('pxl-off');
        }
    }

    /* Footer Fixed */
    function agenzio_footer_fixed() {
        setTimeout(function(){
            var h_footer = $('.pxl-footer-fixed #pxl-footer-elementor').outerHeight() - 1;
            $('.pxl-footer-fixed #pxl-main').css('margin-bottom', h_footer + 'px');
        }, 600);
    }

    /* Image Slip */
    function agenzio_post_slip() {
        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;
        var scrollTop = $(window).scrollTop();

        jQuery('.pxl-post-image--track').each(function () {
            var topLimit = parseFloat(jQuery('.pxl-post-image--block').first().css('top'));
            var bottomLimit = parseFloat(jQuery('.pxl-post-image--block').first().outerHeight())
                + parseFloat(jQuery('.pxl-post-block_2').css('margin-top'));

            jQuery('.pxl-post-image--block').removeClass('end').each(function (is) {
                var currentTop = jQuery(this).offset().top - scrollTop - topLimit;

                var c = parseFloat(currentTop / bottomLimit);
                if (c < 0) c = 0;
                else if (c > 1) c = 1;

                if (c == 0 || is == 0){
                    jQuery(this).addClass('active');

                } else jQuery(this).removeClass('active');

                if (c < .5 || is == 0) jQuery(this).addClass('preactive');
                else jQuery(this).removeClass('preactive');
            });

            jQuery('.pxl-post-image--block.preactive').slice(0, -1).removeClass('active').addClass('end');
        });

        if ($('.pxl-image-slip, .pxl-post-slip').length) {
            var offsetTop = $('.pxl-image-slip, .pxl-post-slip').offset().top + (windowWidth >= 1200 ? 500 : 100) - windowHeight;
            if ((scrollTop >= offsetTop) && !pxl_image_slip) {
                for (var i = 1; i <= 20; i++) {
                    setTimeout(function(index) {
                        $(".pxl-post-block_" + index).addClass("slip-active");
                    }, 100 * i, i);
                }

                pxl_image_slip = true;
            }
        }
    }

    /* WooComerce Quantity */
    function agenzio_shop_quantity() {
        "use strict";
        $('#pxl-wapper .quantity').append('<span class="quantity-icon quantity-down pxl-icon--caretdown"></span><span class="quantity-icon quantity-up pxl-icon--caretup"></span>');
        $('.quantity-up').on('click', function () {
            $(this).parents('.quantity').find('input[type="number"]').get(0).stepUp();
            $(this).parents('.woocommerce-cart-form').find('.actions .button').removeAttr('disabled');
        });
        $('.quantity-down').on('click', function () {
            $(this).parents('.quantity').find('input[type="number"]').get(0).stepDown();
            $(this).parents('.woocommerce-cart-form').find('.actions .button').removeAttr('disabled');
        });
        $('.quantity-icon').on('click', function () {
            var quantity_number = $(this).parents('.quantity').find('input[type="number"]').val();
            var add_to_cart_button = $(this).parents( ".product, .woocommerce-product-inner" ).find(".add_to_cart_button");
            add_to_cart_button.attr('data-quantity', quantity_number);
            add_to_cart_button.attr("href", "?add-to-cart=" + add_to_cart_button.attr("data-product_id") + "&quantity=" + quantity_number);
        });
        $('.woocommerce-cart-form .actions .button').removeAttr('disabled');
    }

    /* Menu Responsive Dropdown */
    function agenzio_submenu_responsive() {
        var $agenzio_menu = $('.pxl-header-elementor-main, .pxl-header-elementor-sticky');
        $agenzio_menu.find('.pxl-menu-primary li').each(function () {
            var $agenzio_submenu = $(this).find('> ul.sub-menu');
            if ($agenzio_submenu.length == 1) {
                if ( ($agenzio_submenu.offset().left + $agenzio_submenu.width() + 0 ) > $(window).width()) {
                    $agenzio_submenu.addClass('pxl-sub-reverse');
                }
            }
        });
    }

    function agenzio_panel_anchor_toggle(){
        'use strict';
        $(document).on('click','.pxl-anchor-button',function(e){
            e.preventDefault();
            e.stopPropagation();
            var target = $(this).attr('data-target');
            $(target).toggleClass('active');
            $('body').addClass('body-overflow');
            $('.pxl-popup--conent .wow').addClass('animated').removeClass('aniOut');
            $('.pxl-popup--conent .fadeInPopup').removeClass('aniOut');
            if($(target).find('.pxl-search-form').length > 0){
                setTimeout(function(){
                    $(target).find('.pxl-search-form .pxl-search-field').focus();
                },1000);
            }
        });

        $('.pxl-anchor-button').each(function () {
            var t_target = $(this).attr('data-target');
            var t_delay = $(this).attr('data-delay-hover');
            $(t_target).find('.pxl-popup--conent').css('transition-delay', t_delay + 'ms');
            $(t_target).find('.pxl-popup--overlay').css('transition-delay', t_delay + 'ms');
        });

        $(".pxl-hidden-panel-popup .pxl-popup--overlay, .pxl-hidden-panel-popup .pxl-close-popup").on('click', function () {
            $('body').removeClass('body-overflow');
            $('.pxl-hidden-panel-popup').removeClass('active');
            $('.pxl-popup--conent .wow').addClass('aniOut').removeClass('animated');
            $('.pxl-popup--conent .fadeInPopup').addClass('aniOut');
        });

        $(".pxl-button.pxl-atc-popup").on('click', function () {
            $('body').addClass('body-overflow');
            $(this).parents('.pxl-wapper').find('.pxl-page-popup').addClass('active');
        });
        $(".pxl-popup--close").on('click', function () {
            $('body').removeClass('body-overflow');
            $(this).parent().removeClass('active');
        });
    }

    /* Post Grid */
    function agenzio_post_grid() {
        setTimeout(function(){
            $('.pxl-item--inner').each(function () {
                var item_w = $(this).outerWidth();
                var item_h = $(this).outerHeight();
                $(this).find('.pxl-item--imgfilter').css('width', item_w + 'px');
                $(this).find('.pxl-item--imgfilter').css('height', item_h + 'px');
            });
        }, 300);
    }

    /* Page Title Scroll Opacity */
    function agenzio_ptitle_scroll_opacity() {
        var divs = $('#pxl-page-title-elementor.pxl-scroll-opacity .elementor-widget'),
            limit = $('#pxl-page-title-elementor.pxl-scroll-opacity').outerHeight();
        if (pxl_scroll_top <= limit) {
            divs.css({ 'opacity' : (1 - pxl_scroll_top/limit)});
        }
    }

    /* Slider Column Offset */
    function agenzio_slider_column_offset() {
        var content_w = ($('#pxl-main').width() - 1200) / 2;
        if (pxl_window_width > 1200) {
            $('.pxl-slider2 .pxl-item--left').css('padding-left', content_w + 'px');
        }
    }

    /* Preloader Default */
    $.fn.extend({
        jQueryImagesLoaded: function () {
          var $imgs = this.find('img[src!=""]')

          if (!$imgs.length) {
            return $.Deferred()
              .resolve()
              .promise()
          }

          var dfds = []

          $imgs.each(function () {
            var dfd = $.Deferred()
            dfds.push(dfd)
            var img = new Image()
            img.onload = function () {
              dfd.resolve()
            }
            img.onerror = function () {
              dfd.resolve()
            }
            img.src = this.src
          })

          return $.when.apply($, dfds)
        }
    })

    $(document).ready(function () {
        const stars = $(".star-rating label");
        
        const defaultRating = 5;

        function setStarRating(value) {
            stars.removeClass('selected');
            stars.each(function () {
                const starValue = parseInt($(this).data('value'), 10);
                if (starValue <= value) {
                    $(this).addClass('selected');
                }
            });
        }

        setStarRating(defaultRating);

        stars.on('click', function () {
            const value = parseInt($(this).data('value'), 10);
            console.log('Star clicked:', value);
            
            setStarRating(value);
        });
    });

     /* Number Active */
    $(document).ready(function () {
        const items = document.querySelectorAll('.pxl-number .pxl-item');

        items.forEach((item, index) => {
            // Sự kiện khi di chuột vào phần tử
            item.addEventListener('mouseenter', () => {
                // Bỏ trạng thái `active` cho tất cả các phần tử
                items.forEach(el => el.classList.remove('active'));

                // Thêm trạng thái `active` cho các phần tử từ đầu danh sách đến phần tử hiện tại
                for (let i = 0; i <= index; i++) {
                    items[i].classList.add('active');
                }
            });
        });
    });
    /* End Number Active */

    /* Button Parallax */
    function agenzio_button_parallax() {
        $('.btn-text-parallax').each(function () {
            $(this).on('mouseenter', function() {
                $(this).addClass('hovered');
            });

            $(this).on('mouseleave', function() { 
                $(this).removeClass('hovered');
            });

            $(this).on('mousemove', function(e) {
                const bounds = this.getBoundingClientRect();
                const centerX = bounds.left + bounds.width / 2;
                const centerY = bounds.top + bounds.height;
                const deltaX = Math.floor((centerX - e.clientX)) * 0.222;
                const deltaY = Math.floor((centerY - e.clientY)) * 0.333;
                $(this).find('.pxl--btn-text').css({
                    transform: 'translate3d('+ deltaX * 0.32 +'px, '+ deltaY * 0.32 +'px, 0px)'
                });
            });
        })
    }

    /* Back To Top Progress Bar */
    function agenzio_backtotop_progess_bar() {
        if($('.pxl-scroll-top').length > 0) {
            var progressPath = document.querySelector('.pxl-scroll-top path');
            var pathLength = progressPath.getTotalLength();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
            progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';      
            var updateProgress = function () {
                var scroll = $(window).scrollTop();
                var height = $(document).height() - $(window).height();
                var progress = pathLength - (scroll * pathLength / height);
                progressPath.style.strokeDashoffset = progress;
            }
            updateProgress();
            $(window).scroll(updateProgress);   
            var offset = 50;
            var duration = 550;
            $(window).on('scroll', function() {
                if ($(this).scrollTop() > offset) {
                    $('.pxl-scroll-top').addClass('active-progress');
                } else {
                    $('.pxl-scroll-top').removeClass('active-progress');
                }
            });
        }
    }

    function agenzio_text_scroll_bar() {
        if ($('.pxl-text-scroll2 .pxl-list').length > 0) {
            var progressPath = document.querySelector('.barContainer .bar');
            var listContainer = $('.pxl-text-scroll2 .pxl-list');
            var listItems = $('.pxl-text-scroll2 .pxl-list .pxl-item');

            var totalHeight = listContainer[0].scrollHeight - listContainer.outerHeight();

            progressPath.style.transition = 'height 10ms linear';
            progressPath.style.height = '0%';

            var updateProgress = function () {
                var scroll = listContainer.scrollTop();
                var progress = (scroll / totalHeight) * 100;
                progressPath.style.height = progress + '%';
            };

            updateProgress();

            listContainer.on('scroll', updateProgress);

            var offset = 50;
            var duration = 550;
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > offset) {
                    $('.pxl-scroll-top').addClass('active-progress');
                } else {
                    $('.pxl-scroll-top').removeClass('active-progress');
                }
            });
        }
    }

    function agenzio_text_scroll_progress_bar() {
        if ($('.pxl-text-scroll2 .pxl-list').length > 0) {
            var progressPath = document.querySelector('.load path');
            var listContainer = $('.pxl-text-scroll2 .pxl-list');
            var listItems = $('.pxl-text-scroll2 .pxl-list .pxl-item');

            var totalHeight = listContainer[0].scrollHeight - listContainer.outerHeight();

            var pathLength = progressPath.getTotalLength();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
            progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;

            var startOffset = pathLength * 0.7;
            var endOffset = 0;

            progressPath.style.strokeDashoffset = startOffset;
            progressPath.getBoundingClientRect();

            progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

            var updateProgress = function () {
                var scroll = listContainer.scrollTop();
                var progress = startOffset - (scroll * (startOffset - endOffset) / totalHeight);
                progressPath.style.strokeDashoffset = Math.max(progress, endOffset);
            };

            updateProgress();

            listContainer.on('scroll', updateProgress);

            var offset = 50;
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > offset) {
                    $('.pxl-scroll-top').addClass('active-progress');
                } else {
                    $('.pxl-scroll-top').removeClass('active-progress');
                }
            });
        }
    }

    /* Custom Type File Upload*/
    function agenzio_type_file_upload() {

        var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined',
        isIE = /msie/i.test( navigator.userAgent );

        $.fn.pxl_custom_type_file = function() {

            return this.each(function() {

            var $file = $(this).addClass('pxl-file-upload-hidden'),
            $wrap = $('<div class="pxl-file-upload-wrapper">'),
            $button = $('<button type="button" class="pxl-file-upload-button">Choose File</button>'),
            $input = $('<input type="text" class="pxl-file-upload-input" placeholder="No File Choose" />'),
            $label = $('<label class="pxl-file-upload-button" for="'+ $file[0].id +'">Choose File</label>');
            $file.css({
                position: 'absolute',
                opacity: '0',
                visibility: 'hidden'
            });

            $wrap.insertAfter( $file )
            .append( $file, $input, ( isIE ? $label : $button ) );

            $file.attr('tabIndex', -1);
            $button.attr('tabIndex', -1);

            $button.on('click', function() {
                $file.focus();
            });

            $file.change(function() {

            var files = [], fileArr, filename;

            if ( multipleSupport ) {
                fileArr = $file[0].files;
                for ( var i = 0, len = fileArr.length; i < len; i++ ) {
                files.push( fileArr[i].name );
                }
                filename = files.join(', ');
            } else {
                filename = $file.val().split('\\').pop();
            }

            $input.val( filename )
                .attr('title', filename)
                .focus();
            });

            $input.on({
                blur: function() { $file.trigger('blur'); },
                keydown: function( e ) {
                if ( e.which === 13 ) {
                    if ( !isIE ) { 
                        $file.trigger('click'); 
                    }
                } else if ( e.which === 8 || e.which === 46 ) {
                    $file.replaceWith( $file = $file.clone( true ) );
                    $file.trigger('change');
                    $input.val('');
                } else if ( e.which === 9 ){
                    return;
                } else {
                        return false;
                    }
                }
            });

            });

        };
        $('.wpcf7-file[type=file]').pxl_custom_type_file();
    }

    // Zoom Point
    function agenzio_zoom_point() {
        $(".pxl-zoom-point").each(function () {

            let scaleOffset = $(this).data('offset');
            let scaleAmount = $(this).data('scale-mount');

            function scrollZoom() {
                const images = document.querySelectorAll("[data-scroll-zoom]");
                let scrollPosY = 0;
                scaleAmount = scaleAmount / 100;

                const observerConfig = {
                    rootMargin: "0% 0% 0% 0%",
                    threshold: 0
                };

                images.forEach(image => {
                    let isVisible = false;
                    const observer = new IntersectionObserver((elements, self) => {
                        elements.forEach(element => {
                            isVisible = element.isIntersecting;
                        });
                    }, observerConfig);

                    observer.observe(image);

                    image.style.transform = `scale(${1 + scaleAmount * percentageSeen(image)})`;

                    window.addEventListener("scroll", () => {
                    if (isVisible) {
                        scrollPosY = window.pageYOffset;
                        image.style.transform = `scale(${1 +
                        scaleAmount * percentageSeen(image)})`;
                    }
                    });
                });

                function percentageSeen(element) {
                    const parent = element.parentNode;
                    const viewportHeight = window.innerHeight;
                    const scrollY = window.scrollY;
                    const elPosY = parent.getBoundingClientRect().top + scrollY + scaleOffset;
                    const borderHeight = parseFloat(getComputedStyle(parent).getPropertyValue('border-bottom-width')) + parseFloat(getComputedStyle(element).getPropertyValue('border-top-width'));
                    const elHeight = parent.offsetHeight + borderHeight;

                    if (elPosY > scrollY + viewportHeight) {
                        return 0;
                    } else if (elPosY + elHeight < scrollY) {
                        return 100;
                    } else {
                        const distance = scrollY + viewportHeight - elPosY;
                        let percentage = distance / ((viewportHeight + elHeight) / 100);
                        percentage = Math.round(percentage);

                        return percentage;
                    }
                }
            }

            scrollZoom();

        });
    }

})(jQuery);
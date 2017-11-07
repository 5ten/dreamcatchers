(function($){
	$(document).ready(function(){
	/* initialize */

        $('body').addClass('shown');

        /* random  beteen 1 and 3 */
        var rand = Math.floor(Math.random() * 3);



        /* hilight active page */
        $('.nav-item a').each(function(){
            console.log($(this).attr('class'));
            if ($('body').hasClass($(this).attr('class'))) {
                $(this).addClass('active');
            }
        });

        $('.hamburger').on('click', function(e){
            $(this).toggleClass('is-active');
            $('.navigation').toggleClass('open');
            e.preventDefault;
            if ($(this).hasClass('is-active')) {
                $('.navigation ul li a').on('click', function(){
                    $('.navigation').removeClass('open');
                    $('.hamburger').removeClass('is-active');
                });
            }
        });    
        
        $('#quotes ul, .for-employers main ul:nth-of-type(1), .our-programs main ul:nth-of-type(1), .about-us main ul:nth-of-type(1)').slick({
            autoplay: true,
            autoplaySpeed: 10000,
            adaptiveHeight: true,            
            arrows: false,
            dots: false,
            lazyLoad: 'progressive',
            speed: 750,
            fade: true,
            cssEase: 'linear',
            initialSlide: rand,
            mobileFirst: true,
            pauseOnFocus: false,
            pauseOnHover: false
        });

        var $contactForm = $('#contact-form');
        $contactForm.submit(function(e) {
            e.preventDefault();
            $.ajax({
                url: '//formspree.io/info@fiveline.co',
                method: 'POST',
                data: $(this).serialize(),
                dataType: 'json',
                beforeSend: function() {
                    $contactForm.append('<div class="alert alert--loading">Sending message…</div>');
                },
                success: function(data) {
                    $contactForm.find('.alert--loading').hide();
                    $contactForm.append('<div class="alert alert--success">Message sent!</div>');
                },
                error: function(err) {
                    $contactForm.find('.alert--loading').hide();
                    $contactForm.append('<div class="alert alert--error">Oops, there was an error.</div>');
                }
            });
        });

        $('#successes-data').insertAfter($('#success-stories'));

        $('.outcomes main > ul > li').each(function(){
            
            var $location = $(this);
            $location.addClass('location-stat')
            var $locationName = $location.find('> p');
            var $locationStats1 = $location.find('> ul > li:first-child');
            var $locationStats1Label = $locationStats1.text().split('=')[0];
            var $locationStats1Value = $locationStats1.text().split('=')[1];

            var $locationStatsOther = $location.find('> ul > li').not(':first-child').not(':nth-child(2)');

            // console.log($locationStats1Label, $locationStats1Value);
            // console.log($locationStatsOther);
            
            $locationStatsOther.each(function(){
                var $row = $(this);
                var $rowStatLabel = $row.text().split('=')[0];
                var $rowStatValue = $row.text().split('=')[1];
                $row.addClass('other-stat');
                $row.wrapInner('<i/>');
                $row.append('<div class="value">'+ $rowStatValue + '</div>')
                $row.append('<div class="label">'+ $rowStatLabel + '</div>')
                console.log($rowStatLabel, $rowStatValue);

            });

            $locationStats1.hide();

            $locationName.append('<span>' + $locationStats1Label + '</span>');
            $locationName.append('<span>' + $locationStats1Value + '</span>');
        });

	/* end initialize */
	});
})(jQuery);



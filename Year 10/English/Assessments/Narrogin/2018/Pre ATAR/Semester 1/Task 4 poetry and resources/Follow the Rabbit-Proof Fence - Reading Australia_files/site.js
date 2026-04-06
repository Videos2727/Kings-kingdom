jQuery(document).ready(function($) {

	var Theme = {

		init: function() {

            this.bookmarks();
            this.accounts();
            this.campaignMonitor();
            this.interface();
            this.lessonPages();
            this.signupModal();

            this.equalHeights();

			this.search();
			this.modals();

			this.tml();

		},

		accounts: function() {

			$('#user_email, #user_email1').on('keyup change paste', function() {
				$('#user_login, #user_login1').val($(this).val().replace('+', ''));
			});

			$('#registerform label[for="user_login"]').parent().hide();
			$('#registerform1 label[for="user_login1"]').parent().hide();

			$('[for="user_login"]').text('Email Address');

			$('.g-recaptcha').prependTo('#reg_passmail');

		},
		modals: function() {

			$('a[data-modal-open]').click(function(e) {

				e.preventDefault();

				var modalId = $(this).data('modal-open');

				$('#' + modalId).addClass('active');

			});

			$('a[data-modal-close]').click(function(e) {

				e.preventDefault();

				$(this).parent().parent('.modal-wrapper').removeClass('active');
			});

		},
        bookmarks: function() {

        	var self = this;

        	// Lesson page

        	$('a[href=#notes]').click(function(e){
        		$('.bookmark-form').slideToggle();
        	});

        	$('a[href=#bookmark]').click(function(e){

        		e.preventDefault();
        		var $this = $(this);

        		$this.addClass('loading');

        		self.saveBookmark($(".bookmark-form form").serialize(),function(data){
        			$('.bookmark-form').slideDown();
        			$this.removeClass('loading').addClass('active');

        			$('.bookmark-count').text(parseInt($('.bookmark-count').text()) + 1);

        		});


        	});

        	$('.bookmark-form form').submit(function(e){

        		e.preventDefault();

        		self.saveBookmark($(".bookmark-form form").serialize(),function(data){
        			$('.bookmark-form').slideUp();
        		});

        	});

        	$('a[href=#close-bookmark]').click(function(e){

        		e.preventDefault();
    			$('.bookmark-form').slideUp();

        	});

        	// Bookmarks page
        	$('a[href=#edit]').click(function(e){
        		e.preventDefault();
	    		$(this).parent().parent().find(".bookmark-notes p").hide();
        		$(this).parent().parent().find(".bookmark-notes textarea").show();
        		$(this).parent().parent().find('a').css('display', 'inline-block');
        	});

			$('a[href=#save]').click(function(e){
        		e.preventDefault();

				var button = this;
	       		self.saveBookmark($('#book-' + $(this).data('book') + ' form').serialize(), function(data) {
    				$(button).parent().parent().find(".bookmark-notes textarea").hide();
        			$(button).parent().parent().find(".bookmark-notes p").text($(button).parent().find("textarea").val()).show();
        			$('#book-' + $(button).data('book')).find('a[href*="save"]').hide();
        		});

        	});

        	$('a[href=#remove]').click(function(e){

        		e.preventDefault();

				if(confirm('Are you sure you want to remove this bookmark?')){

					var button = this;

		       		self.removeBookmark($(button).data('book'),function(data){

	    				$("#book-"+$(button).data('book')).slideUp(function(){
	    					$(this).remove();
	    				});

	    				$('.bookmark-count').text(parseInt($('.bookmark-count').text()) - 1);

	        		});

				}

        	});

        },

        saveBookmark: function (data, success, error) {

			$.post( "/bookmarks/api/add", data, function( data ) {
				success(data);
			});

        },

        removeBookmark: function (book, success, error) {

			$.post( "/bookmarks/api/remove?book="+book, function( data ) {
				console.log(data);
				success(data);

			});

        },

        campaignMonitor: function() {

        	$('.subscribe-form').submit( function(event) {

	            event.preventDefault();

	            var $form = $(this);

	            $(this).find('button[type="submit"]').addClass('disabled').prop('disabled', true).text('Loading');

	            $.getJSON(
		            this.action + "?callback=?",
		            $(this).serialize(),
		            function (data) {
		                if (data.Status === 400) {
		                    alert("Error: " + data.Message);
		                    $form.find('input').prop('disabled', false).removeClass('disabled');
		                    $form.find('button[type="submit"]').text('Subscribe').prop('disabled', false).removeClass('disabled');
		                } else { // 200
		                    $form.find('input').prop('disabled', true).addClass('disabled');
		                    $form.find('button[type="submit"]').text('Subscribed');
		                    Theme.closeSignupModal();
		                }
		            }
		        );

	        });

        },

        interface: function() {

        	$('#js-more-resources').click( function(event) {

        		event.preventDefault();
        		$('.lessonMore').slideToggle();

        	});

        	$('.widget_search [placeholder]').attr('placeholder', 'Search news posts');
        	$('.widget_search .search-field').after('<input type="hidden" name="post_type" value="post">')

        	$('a[href="#top"]').click( function(event) {

        		event.preventDefault();

        		$('html, body').animate({
        			scrollTop: 0
        		}, 1000);

        	})

        },

        lessonPages: function() {

        	$('.lessonContent').each( function() {

        		var active,
        			$this = $(this);

	        	// get current active page
	        	var getActive = function() {

	        		active = $this.find('.lesson-page.active').index();

	        		if (active > 0) {
		        		$this.find('.prevPage').show();
		        	} else {
		        		$this.find('.prevPage').hide();
		        	}

		        	if (active == $this.find('.lesson-page').length - 1) {
		        		$this.find('.nextPage').hide();
		        	} else {
		        		$this.find('.nextPage').show();
		        	}

	        	}
	        	getActive();


	        	$this.find('.nextPage').click( function(event) {

	        		event.preventDefault();

	        		$this.find('.lesson-page.active').removeClass('active');

	        		$this.find('.lesson-page-' + (active + 1)).addClass('active');

	        		window.scrollTo(0, $('.pageTitle').offset().top);

	        		getActive();

	        	})

	        	$this.find('.prevPage').click( function(event) {

	        		event.preventDefault();
	        		$this.find('.lesson-page.active').removeClass('active');
	        		$this.find('.lesson-page-' + (active - 1)).addClass('active');

	        		window.scrollTo(0, $('.pageTitle').offset().top);

	        		getActive();

	        	})

        	})

        },

        signupModal: function() {

			// allows us to pass in a hash value in the url to trigger the modal on demand (bypasses cookie and content checking)
        	if(window.location.hash != '#triggermodal') {
				if (!$('body').hasClass('single-essay') && !$('body').hasClass('single-lesson')) return;
				if (Cookies.get('readingaus_modal') == 'true') return;
        	}

        	setTimeout( function() {
        		$('.modal-wrapper').addClass('active');
        	}, 1000);

        	$('.modal-close').click( function(event) {

        		event.preventDefault();

        		Theme.closeSignupModal();

        	})

        },

        closeSignupModal: function() {

        	Cookies.set('readingaus_modal', true);
        	$('.modal-wrapper').removeClass('active');

        },

         equalHeights: function() {

            var maxHeight = 0;

            var $el = $('[data-equal]');

            if ($el.parent().hasClass('auto-height')) return;
            $(window).load(function() {
                $el.each( function() { maxHeight = Math.max(maxHeight, $(this).height()); } ).css('min-height', maxHeight);
            });

        },

		search: function() {

			// live search from nav
			$('.search-field').on('keyup paste change', function(e) {

				if (e.keyCode == 27) return;

				var $self = $(this);

				clearTimeout($.data(this, 'changeTimer'));
				$.data(this, 'changeTimer', setTimeout(function() {

					if ($self.val().length < 1) $self.parent().find('.quick-results').remove();

					$.get('/?'+$('.search-form').serialize(), function(data) {

						$self.parent().find('.quick-results').remove();
						$self.parent().append('<div class="quick-results"><ul></ul></div>')

						var $document = $(data), i = 0;;

						$document.find('#search-results article').each(function() {
							if (i < 5) {
								$('.quick-results ul').append('<li class="' + $(this).attr('class') + '"><a href="' + $(this).find('> a').attr('href') + '">' + $(this).find('.postInfo h2').text() + '</a></li>')
							}
							i++;
						})

						if ($self.val().length < 1) $self.parent().find('.quick-results').remove();

					})

				}, 250));

			});

			$(document).on('click', function(event) {
				if (event.target.localName !== 'a') $('.quick-results').remove();
			})

			$(document).keyup(function(e) {
			     if (e.keyCode == 27) { // escape key maps to keycode `27`
			        $('.quick-results').remove();
			    }
			});

			// realtime search
			$('.advanced-search-form input, .advanced-search-form select').on('keyup paste change', function() {

				var $self = $(this);

				clearTimeout($.data(this, 'changeTimer'));
				$.data(this, 'changeTimer', setTimeout(function() {

					$('.pagination').hide();
					$('.loader').fadeIn();
					$('#search-results article').fadeOut('fast', function() { $(this).remove() });

					$.get('/?'+$('.advanced-search-form').serialize(), function(data) {

						var $document = $(data);

						if ($document.find('#search-results article').length > 0) {

							$('#search-results').append($document.find('#search-results').html())
							$('.pagination').html($document.find('.pagination').html())
							$('.pagination').show();
							$('.loader').fadeOut();

							$('.no-results, .no-results-related').remove();

						} else {

							$('.no-results, .no-results-related').remove();

							$('#search-results').html('');
							$('.pagination').html('');
							$('.search-options').after($document.find('.no-results-related'));
							$('.search-options').after($document.find('.no-results'));

							$('.loader').fadeOut();


						}

					})

					// change order buttons to be ajax
					$('.page-order a').click(function(event) {

						$(this).unbind("click");
						event.preventDefault();

						if ($(this).data('orderby')) $('.advanced-search-form input[name="orderby"]').val($(this).data('orderby'))
						if ($(this).data('order')) $('.advanced-search-form input[name="order"]').val($(this).data('order'))

						$('.page-order a').removeClass('active');
						$(this).addClass('active');

						$('.advanced-search-form input:first').trigger('change');


					})

				}, 250));

			})

			// infinite scrolling
			if ($('#search-results').length > 0) {

				var urls = [];

				$(window).scroll(function() {
				    clearTimeout($.data(this, 'scrollTimer'));
				    $.data(this, 'scrollTimer', setTimeout(function() {

						var top = ($('.next').offset()) ? $('.next').offset().top : 1000000,
							scroll = $(window).scrollTop(),
							height = $(window).height();

						if (top < (scroll + height + 100)) {

							$('.pagination').hide();
							$('.loader').fadeIn();

							if ($('.pagination .next').length > 0 && urls.indexOf($('.pagination .next').attr('href')) < 0) {

								urls.push($('.pagination .next').attr('href'));
								$.get($('.pagination .next').attr('href'), function(data) {
									var $document = $(data);
									$('#search-results').append($document.find('#search-results').html())
									$('.pagination').html($document.find('.pagination').html())
									$('.pagination').show();
									$('.loader').fadeOut();
								})

							}

						}

				    }, 250));
				});

			}

		},

		tml: function() {

			if (window.location.href.indexOf('checkemail=confirm') > -1) {
				$('.tml-login .message').show();
			}

			if (window.location.href.indexOf('resetpass') > -1) {
				setTimeout( function() {
					$('#pass1').val('');
				}, 1200)
				// var done = false;
				var interval = setInterval(function() {
					if ($('#pass1').val() && $('#pass1').val().length > 1) {
						$('#pass1').val('');
						clearInterval(interval);
					}
				}, 100)
			}

			$('#registerform1, #registerform').validate({
				rules: {
					"user_email": {
						required: true,
						email: true
					},
					"first_name": "required",
					"last_name": "required",
					"organisation": "required",
					"state": "required",
					"aboutyou": "required"
				}
			})

		}

	}

	Theme.init();

	window.Theme = Theme;

	// Initialise Share Buttons
	$('.shareThis a').each( function() {
		if ($(this).data('share') == 'linkedin') {

			$(this).click( function(event) {
				event.preventDefault;

				popupCenter( 'https://www.linkedin.com/shareArticle?mini=true&url=' + $(this).data("url") + '&title=' + $(this).data("title") + '&summary=' + $(this).data("summary") + '&source=', 'Share on LinkedIn', 600, 450 );
			});

		} else {
			$(this).share();
		}
	});

	//Flexslider for the homepage slideshow
	$('.home .slider').flexslider({
		 animation: "slide",
		 slideshowSpeed: 8000,
		 animationSpeed: 1000,
	});

	//Flexslider for the featured resource
	$('.home .featuredContent').flexslider({
		 animation: "slide",
		 animationSpeed: 500,
		 slideshow: false,
		 manualControls: ".featuredTabs a"
	});

	//Flexslider for the homepage Authors
	$('.home .authorSlider').flexslider({
		 animation: "fade",
		 slideshowSpeed: 8000,
		 animationSpeed: 1000,
	});

	//Tab Switching for Lesson Content

	$('.lessonTabs a:first-child').addClass('active');
	$('.lessonContent:not(:first-child)').hide();
	$('.lessonTabs a').click(function(e){

		e.preventDefault();

		var lessonID = $(this).attr('href');

		$('.lessonTabs a').removeClass('active');
		$(this).addClass('active');
		$('.lessonContent').slideUp('medium');

		$(lessonID).slideDown('medium');

		checkLessonButtons( $(lessonID) );

	})

	//Next/Previous Section Bttons for Lessons
	$('.lessonButtons .icon-left-dir').hide();

	//Function to check if buttons should be shown.
	function checkLessonButtons(currentLesson) {
		if ( currentLesson.next().length > 0 ) {
			$('.lessonButtons .nextSection').show();
		}else{
			$('.lessonButtons .nextSection').hide();
		}

		if ( currentLesson.prev().length > 0 ) {
			$('.lessonButtons .icon-left-dir').show();
		}else{
			$('.lessonButtons .icon-left-dir').hide();
		}
	}

	$('.lessonButtons .nextSection').click(function(e) {
		var currentLesson = $('.lessonContent:visible');
		var currentTab = $('.lessonTabs .active');

		//Change tab and content
		currentLesson.slideUp('medium');
		currentLesson.next().slideDown('medium');
		$('.lessonTabs a').removeClass('active');
		currentTab.next().addClass('active');
		checkLessonButtons( currentLesson.next() );

		$('html, body').scrollTop(100);

	});

	$('.lessonButtons .icon-left-dir').click(function(e) {
		var currentLesson = $('.lessonContent:visible');
		var currentTab = $('.lessonTabs .active');

		//Change tab and content
		currentLesson.slideUp('medium');
		currentLesson.prev().slideDown('medium');
		$('.lessonTabs a').removeClass('active');
		currentTab.prev().addClass('active');
		checkLessonButtons( currentLesson.prev() );

	});

	//Nav Slide Down/Up
	$('.menu-link').click(function(e){
		e.preventDefault();
		$('#mainNav').slideToggle('fast');
	});

	// function to center popup
	function popupCenter(url, title, w, h) {
	    // Fixes dual-screen position                         Most browsers      Firefox
	    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
	    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

	    width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
	    height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

	    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
	    var top = ((height / 2) - (h / 2)) + dualScreenTop;
	    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

	    // Puts focus on the newWindow
	    if (window.focus) {
	        newWindow.focus();
	    }
	}

});

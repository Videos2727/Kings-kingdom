var Academy = {};

function epcoReg() {
    $('#epcoReg').click(function(){
        var goRegister = $(this).find('a').attr('href');
        window.location.href = goRegister;
    })
}

function nextButtonClickHandler() {
	var totalQuestions = $('.questionContainer').length;
	var totalAnswered = $('form#quiz').find(':checked').length;
	var totalAnsweredCorrectly = $('form').find(':checked').filter('.correctAnswer').length;
    var aid = $('#quizReplacement').attr('data-aid');
    var caid = $('#quizReplacement').attr('data-caid');

    assessmentTracker.resetQuestionAttempts();

    // quiz completed
	if (totalAnswered == totalQuestions) {
		var score = $('#quizSection .scoreMessage');
        var passFail = $('#quizSection .passFailMessage');
		var percentage = (totalAnsweredCorrectly / totalQuestions) * 100;

        $('#quizSection .score').show();
        score.show().html("<p>Your score:</p> " + percentage.toFixed(0) + "%");

        if (totalAnsweredCorrectly == totalQuestions){
            passFail.html("<p>Congratulations, you got a perfect score!</p>")
        } else {
            passFail.html("<p>Oops, you didn't pass. But, that's ok! You can <a class='retakeQuiz'>retake</a> the quiz at any time. <span>(To pass you need a perfect score)</span></p>")
            $('#quizSection .score #emailScore').css('margin-top','-20px')
        }

        // save quiz score
        $.ajax({
            type: 'POST',
            url: '/member/course-progress/save-quiz-score.ajax',
            data: {
                aid: aid,
                caid: caid,
                questions: totalQuestions,
                answers: totalAnswered,
                correct: totalAnsweredCorrectly
            },
            complete: function() {
              $("#teacherShareStatus").html("Your score has been sent to your teacher!")
            }

        });
	}

	var nextQuestion = $(this).closest('.questionContainer').next();

	$('#quizScroll').delay(200).animate({left: '-=609'}, 250, "swing", function() {

		if (totalAnswered == totalQuestions) {
			resizeQuizSection(score.height());
		}
		else {
			resizeQuizSection(nextQuestion.height());
		}
	});
}

function retakeQuizClickHandler() {
    assessmentTracker.startNewQuiz();

	$('form#quiz input[type="radio"]').each(function() {
		this.checked = false;
	});

	$('#quizReplacement .correct, #quizReplacement .incorrect, #quizReplacement .continue, #quizReplacement .explanation').each(function() {
		$(this).hide();
	});

	$('#quizReplacement .quickCheckAnswer').each(function() {
		$(this).show();
	});

	$('#quizScroll').css('left', 0);

	var firstQuestionHeight = $('.questionContainer').first().height();

	resizeQuizSection(firstQuestionHeight);
}

function checkAnswerButtonClickHandler() {
	var questionContainer = $(this).closest('.questionContainer');
	var correctAnswer = questionContainer.find('.correctAnswer');
	var checkedAnswers = questionContainer.find('input:checked');
	var correctWithoutExplanation = questionContainer.find('.correct.withoutExplanation');
	var correctWithExplanation = questionContainer.find('.correct.withExplanation');
	var incorrectWithoutExplanation = questionContainer.find('.incorrect.withoutExplanation');
	var incorrectWithExplanation = questionContainer.find('.incorrect.withExplanation');
	var explanation = questionContainer.find(".explanation");
	var explanationText = questionContainer.find(".explanation .answer");
	var noSelection = questionContainer.find('.noSelection');
	var checkAnswerButton = questionContainer.find('.quickCheckAnswer');
	var nextButton = questionContainer.find('.continue');

    assessmentTracker.logQuizQuestionAttempt(correctAnswer, checkedAnswers);

	correctWithExplanation.hide();
	incorrectWithExplanation.hide();
	correctWithoutExplanation.hide();
	incorrectWithoutExplanation.hide();
	explanation.hide();
	resizeQuizSection($(this).closest('.questionContainer').height());
	noSelection.hide();

	if (correctAnswer.is(':checked')) {
		if (explanationText.text() == "") {
			correctWithoutExplanation.show();
		}
		else {
			correctWithExplanation.show();
			explanation.show();

			var extraHeight = 0;

			if (navigator.userAgent.indexOf("Chrome") != -1) {
				extraHeight = $('.explanation .watchCorrectSeek', questionContainer).height();
			}

			resizeQuizSection($(this).closest('.questionContainer').height() + extraHeight);
		}

		checkAnswerButton.hide();
		nextButton.show();
	}
	else if (checkedAnswers.size() == 1) {
		if (explanationText.text() == "") {
			incorrectWithoutExplanation.show();
		}
		else {
			incorrectWithExplanation.show();
		}

		checkAnswerButton.hide();
		nextButton.show();
	}
	else {
		noSelection.show();
	}
}

function optionClickHandler() {

	var questionContainer = $(this).closest('.questionContainer');
	var checkAnswerButton = questionContainer.find('.quickCheckAnswer');
	var nextButton = questionContainer.find('.continue');

	checkAnswerButton.show();
	nextButton.hide();
}

function registerImageClickListeners() {
	$('.questionContainer .answers img').click(function() {
		$($(this).attr("data-for")).trigger('click');
	});
}

function quizTabClicked() {
	var quizReplacement = $("#quizReplacement");

	updateHash("\\w+", "qz", true);
	quizReplacement.load(quizReplacement.attr("rel"), function(response, status, request) {
		
		if (!response) {
            var upgradeFeature = $('#quizPaywall');
            $('#quizSection').html(upgradeFeature);
			$("#quizTab").one("click", quizTabClicked); //re-register this click handler in case they try again after logging in
			return;
		}
		
		assessmentTracker.startTracking();

		$('.quickCheckAnswer').click(function() {
			if (!($(this).hasClass('checked'))) {
				$(this).closest('.questionContainer').find('.noSelection').show();
			}
		});

		$('.questionContainer .watchCorrectSeek').click(function() {
			Academy.lessonVideo.seekTo($(this).data('marker'))
		});

		$('.questionContainer .explainCorrectAnswer').click(function() {
			$(this).closest('.answersContainer').find(".explanation").show();
			resizeQuizSection($(this).closest('.questionContainer').height());
		});

		registerImageClickListeners();

		resizeQuizSection($('.questionContainer').first().height());

		$('form#quiz input:radio').click(optionClickHandler).addClass('checked');

		$('.questionContainer .quickCheckAnswer').click(checkAnswerButtonClickHandler);

		$('.questionContainer .continue').click(nextButtonClickHandler);
	});
}

function articleGroupTog() {
	$('ul.toggleGroup').each(function(index) {
		var elems = $(this).find('li');

		elems.hide();
		elems.slice(0, 8).show();
	})
}



function resizeQuizSection(desiredHeight) {
	if (desiredHeight != null && desiredHeight != undefined) {
		window.qHeight = desiredHeight
	}

	// we don't want the video to show when the score is shown
	if (window.qHeight == null || window.qHeight < 317) {
		window.qHeight = 317;
	}

	var extraHeight = 50;

	$('#quizSection').css('height', window.qHeight + extraHeight);
	$('.featureLessonContainer').css('height', window.qHeight + extraHeight);
}

function scrollTopicBrowser(index) {
	var slideDistance = $('#topicBrowser .topicSlider .topic').width() * parseInt(index);
	slideDistance = "-" + slideDistance + "px";
	$('#topicBrowser .topicSlider').animate({ left: slideDistance});
	$('#topicBrowser .buttonTabs li').eq(index).addClass('selected');
}

function collapseChapterWiki() {
    var body = $("#academyTopic");
    var wikiDesc = body.find('.wikiDescription');
    var wikiContent = body.find(".wikiContent");

    wikiContent.hide();

    var html = ' <span class="wikiShow">Read more</span>';
    $(html).appendTo(wikiDesc);

    body.find('.wikiShow').css({color: '#126273', cursor: 'pointer', textDecoration: 'underline', margin: '10px 0 20px 0'}).attr('data-cname',
            'about_this_course');
    body.find('.wikiShow').click(function () {
        wikiContent.show();
        $(this).remove();
    });

}

function collapseCourseWiki() {
	var body = $("#courseHome, #courseMain");
	var wikiDesc = body.find('.wikiDescription');
    var wikiContent = body.find(".wikiContent");

    wikiContent.hide();

    var html = '<span class="wikiShow">Read more</span>';
    $(html).appendTo(wikiDesc);

    body.find('.wikiShow').css({color: '#126273', cursor: 'pointer', textDecoration: 'underline', margin: '10px 0 20px 0'}).attr('data-cname', 'about_this_course');
    body.find('.wikiShow').click(function(){
        wikiContent.show();
        $(this).remove();
    });
}

function toggleFAQ() {
    var faqActiveChild = $('.FAQS .questions').children();


    faqActiveChild.children('h4').click(function(){
        faqActiveChild.removeClass('active');
        $(this).parent().addClass('active');
    }).hover(function(){
                $(this).toggleClass('hover');
            });

}


function academyAssetTabClickHandler(event, next) {

    // update css for tabs
    $(this).siblings().removeClass("on");
    $(this).addClass("on");

    // show the correct tab panel
    var index = $(this).index();


    if (index != 1) {
		$('.featureLessonContainer').css('height', 'auto').removeClass('videoClicked');
    }

	 // video tab
    if (index == 0) {
	    $('.featureLessonContainer').addClass('videoClicked');
	    showTabPanel(index, 'lesson');
    }
    // quiz tab
    else if (index == 1) {
        $("div#quizSection").css("position", "absolute").css("top", "34px");
        resizeQuizSection();
        showTabPanel(index, 'qz');
    }
    // transcript
    else if (index == 2) {

    }
    // track progress tab (registration)
    else if (index == 3) {
        showTabPanel(index, 'tp');
    }

    if (next) {
        next();
    }
}

function showTabPanel(index, hash) {
    var tabSelectors = [$('#videoTabPanel'), $("div#quizSection"), null];

    // hide all other tab panels
    for(var i = 0; i < tabSelectors.length; i++) {
        var tabPanel = tabSelectors[i];
        if(tabPanel && index != i) {
            tabPanel.hide();
        }
    }

    // show tab panel
    tabSelectors[index].show();

    // hash
    updateHash("\\w+", hash, true);
}

var initSmoothScroller = function() {
	$('.courseSmoothScroller').each(function() {
		var scroller = $(this);
		var courses = scroller.find('.courseList');
		$(scroller.find('.scrollbar.left > div')).bind('click', function() {
			var left = $(courses.find('.coursePreview:first'));
			courses.animate({marginLeft: '-=' + left.outerWidth(true) + 'px'}, function() {
				left.appendTo(courses);
				courses.css('margin-left', parseInt(courses.css('margin-left')) + left.outerWidth(true) + 'px');
			});
		});
		$(scroller.find('.scrollbar.right > div')).bind('click', function() {
			var right = $(courses.find('.coursePreview:last'));
			courses.css('margin-left', parseInt(courses.css('margin-left')) - right.outerWidth(true) + 'px');
			right.prependTo(courses);
			courses.animate({marginLeft: '+=' + right.outerWidth(true) + 'px'});
		});
	});
};

// controls the the course previews below the tabs on the course home page
var initCourseBrowserAndPreviews = function() {
	var courseBrowser = $("#courseBrowser");
	var segmentPreviewContainer = $("#segmentedCoursePreviews");

	if (courseBrowser.size() == 1 && segmentPreviewContainer.size() == 1) {

		// initial setup
		var tabs = courseBrowser.find("li.tab");
		var coursePreviews = segmentPreviewContainer.find("div.coursePreviews");
		coursePreviews.hide().eq(tabs.index("li.on")).show();

		// click handler
		tabs.click(function(e) {
			coursePreviews.hide().eq(tabs.index(e.target)).show();
		});
	}
};

/*
 * Invoked when the window hash (anchor) changes
 */
function updateLessonPageFromHash() {
	if (window.location.hash) {
		var hash = window.location.hash.slice(1);
		if (hash == 'qz') {
			$("#quizTab").click();
			window.scrollTo(0,0);
		}
		else if (hash == 'lesson') {
			// Default tab
			if ($('.textLessonMain').length > 0) {
				$("#lessonTab").click()
			}
			else {
				$("#videoTab").click()
			}
			window.scrollTo(0,0);
		}
	}
}


function lessonOverlay() {
    var overlayTarget = $('#lessonOverlay');

    overlayTarget.insertAfter('#container');
	$(".tlOverlayTrigger").click(function () {
        $(this).overlay({
			load: true,
			target: overlayTarget,
			mask: {color: '#000000', opacity: 0.6},
			effect: 'default',
			closeOnClick: true,
			closeOnEsc: true,
			left: 'center',
			top: '10%',
			speed: 'fast',
			onClose: function () {
				$('.tlOverlayTrigger').hide();
                $('.postOverlayMessage').show();
			}
		});
	});
}

function saveCTAEmail(formCTA) {
    var email = formCTA.find('input[type=email]').val();
    formCTA.find('a[data-cname="email_cta_bar_button"]').attr('data-extra', email);

    $.cookie('sscst', email, {path: '/', domain: 'education-portal.com', secure: false});
    $.cookie('sscst', email, {path: '/', domain: 'education-portal.com', secure: true});
}

function emailCTAbar() {
    var bar = $('.emailCTAbar');

    bar.find('a.btn').bind('mousedown touchstart', function () {
        saveCTAEmail($('.emailCTAbar'));
    });
    bar.find('input').blur(function () {
        saveCTAEmail($('.emailCTAbar'));
    });
}


function initEmailPaywalls() {
    $('.email-paywall-button').live('mousedown',function() {

        saveCTAEmail($(this).parent());

        //var cname = $(this).data("cname");
        //var input = $(this).parent().find('input[data-cname="' + cname + '_input"]');
        //
        //if (input) {
        //    $(this).data('extra', input.val());
        //}
    });
}

$(document).ready(function() {
	//script is in eplibrary.js
	collapseChapterWiki();
	collapseCourseWiki();
	toggleFAQ();
	emailCTAbar();

    initEmailPaywalls();
	lessonOverlay();


   epcoReg();
	var topicBrowserButtons = $('#topicBrowser .buttonTabs li');

	$(topicBrowserButtons).bind('mouseover mouseout', function() {
		$(this).toggleClass('highlight');
	});

	$(topicBrowserButtons).click(function() {
		$(topicBrowserButtons).removeClass('selected').removeClass('highlight');
		//$(this).addClass('selected');
		scrollTopicBrowser($(this).index());
	});
	scrollTopicBrowser('0'); //default default tab in Topic Browser

	$("#quizSection .score").delegate(".retakeQuiz", "click", retakeQuizClickHandler);

	// issue click on first tab of each container for initial load
	$(".tabSet").each(function() {
		$(this).children(".tab").eq(0).click();
	});

	$(".lessonTabSet .tab").click(academyAssetTabClickHandler);

	//transcript tab scrolls to transcript section on lesson page
	$('.lessonTabSet .transcript').click(function() {
		$('html,body').animate({scrollTop: $('#transcript').offset().top}, 'slow');
	});

    $('.courseInfoHover').click(function () {
        $(this).next('span').fadeIn();
    });

    $('body').click(function (e) {
        if ($(e.target).closest('.courseInfoHover').length <= 0 && e.target.id != 'courseInfoTooltip') {
            $('.courseInfoHoverTooltip').fadeOut();
        }
    });


    $('#timelineTrigger').click(function () {
        var tl = $('#timeline');
        tl.slideToggle().toggleClass('open');
        if (tl.hasClass('open')){
            $('#timelineTrigger').text('Hide Timeline')
        } else {
            $('#timelineTrigger').text('Show Timeline')

        }
    });

	/*quiz section handled differently between textlesson and lesson page*/
	if ($('.textLessonMain').length > 0) {
		/*add break to wikicontent*/
		$('.wikiContent').append('<div class="clear"></div>');

		/*quiz click*/
		$('#lessonTab').click(function(){
			$('#lessonSection').show();
		});
		$("#quizTab").one("click", quizTabClicked);
		$('#quizTab').click(function(){
			$('#lessonSection').hide();
		});
	} else {
		$("#quizTab").one("click", quizTabClicked);
	}
	//timeline
	var activeLi = $('#timeline li');
	activeLi.mouseover(
	 function() {
		 $(this).find('strong').css({textDecoration:'underline'});
	 }).mouseout(function() {
		 activeLi.find('strong').css({textDecoration:'none'});
	 });

	activeLi.click(function() {Academy.lessonVideo.seekTo($(this).data('marker'))});

	//show / hide 'courses coming soon'
	articleGroupTog();
	var toggleP = $('p.toggle');

	if (toggleP.length > 0) {
		toggleP.css('display', 'block');
	}

	toggleP.click(function() {
		if ($(this).text() == 'View More Courses') {
			$(this).parent().find('ul.toggleGroup li').show();
			$(this).text('View Fewer Courses');
			//$(this).css('background-position', '-10px -38px');
		}
		else {
			if ($(this).text() == 'View Fewer Courses') {
				articleGroupTog();
				$(this).text('View More Courses');
				//$(this).css('background-position', '-10px -8px');
			}
		}
	});

	/* Replacing Wistia default messsage*/
	if ($("#videoTabPanel").children().text() == "Unable to play video") {
		$("#videoTabPanel").children("div")
		 .html("<p class=\"flashRequired\">Flash Player or an HTML5-compliant browser are required to view this video.</p>");
	}
	if ($("#introVideo .video").text().indexOf('Unable to play video') != -1) {
		$("#introVideo .video").text($("#introVideo .video").text().replace('Unable to play video',
		 'Flash Player or an HTML5-compliant browser are required to view this video.'));
		$("#introVideo").css('height', '351px');
	}

	//$('.finalExamExplanation').hover(
	// function() { $(this).closest('.questionContainer').find('.explanation').slideDown('fast'); }, // in
	// function() { $(this).closest('.questionContainer').find('.explanation').slideUp('fast'); }  // out
	//);

	$('.finalExamExplanation').click(function() {
		var explanation = $(this).closest('.questionContainer').find('.explanation');
		if (explanation.css('display') == 'none') {
			explanation.slideDown('fast');
		} else {
			explanation.slideUp('fast');
		}
	});


    initSmoothScroller();
	initCourseBrowserAndPreviews();
});
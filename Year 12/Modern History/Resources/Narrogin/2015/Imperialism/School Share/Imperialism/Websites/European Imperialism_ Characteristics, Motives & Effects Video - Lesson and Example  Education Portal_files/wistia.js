var wistiaVideoDebug = false;
var wistiaVideoPostInterval = 5000;
var wistiaVideoPostUrl = '/videoview/log.ajax';

function RemVideo(wistiaEmbedId, options) {

	var videoFoam = true; /*makes things responsive*/
	var tracking = options['tracking'];
	var usePaywall = options['paywall'];
	var fullSample = options['sample'];
	var wistiaVideo, paywall, videoTracking;

    wistiaVideo = Wistia.embed(wistiaEmbedId, {
        videoFoam: videoFoam,
        controlsVisibleOnLoad: false,
        autoPlay: false,
        playButton: true,
        endVideoBehavior: 'default'
    });

    if (tracking) {
        videoTracking = new VideoTracking(wistiaVideo, tracking);
    }

    if (usePaywall) {
        paywall = new Paywall(wistiaVideo, fullSample);
    }


	function formatMarkerToSeconds(time) {
		var timeArray = time.split(':');
		return (parseInt(timeArray[0]) * 60) + parseInt(timeArray[1]);
	}

	this.seekTo = function (timeStr) {
		$('#videoTab').trigger('click');
		wistiaVideo.time(formatMarkerToSeconds(timeStr));
	}
}

function VideoTracking(video, trackingId) {
	var views = [];
	var currentView = null;
	var lastLoggedBatchDate = null;

	function endCurrentView() {
		if (currentView != null) {
			currentView.timeEnded = new Date().getTime();
			if (wistiaVideoDebug) {
				console.log(currentView);
			}
			currentView = null;
		}
	}

	function beginNewView() {
		var videoView = {};
		videoView.requestGuid = document.getElementById("requestGuid").value;
		videoView.embedId = video.hashedId();
		videoView.siteResourceId = trackingId;
		videoView.durationInSeconds = Math.floor(video.duration());
		videoView.timeStarted = new Date().getTime();
		videoView.videoViewId = null;
		videoView.logged = false;
		currentView = videoView;
		views[views.length] = currentView;
	}

	function logViewBatch() {
		var batch = [];
		for (var i = 0; i < views.length; i++) {
			if (!views[i].logged) {
				batch[batch.length] = views[i]
			}
		}
		lastLoggedBatchDate = new Date();
		if (batch.length > 0) {
			if (wistiaVideoDebug) {
				console.log('Logging batch of ' + batch.length + ' views');
			}

			$.ajax({
				async: true,
				cache: false,
				type: 'POST',
				url: wistiaVideoPostUrl,
				data: JSON.stringify(batch),
				contentType: "application/json",
				dataType: "json",
				success: function (response) {
					for (var i = 0; i < batch.length; i++) {
						if (response != null && i < response.length) {
							batch[i].multimediaViewId = response[i];
							if (batch[i].timeEnded != null) {
								if (wistiaVideoDebug) {
									console.log('Marking batch item ' + i + ' as logged: ' + response[i]);
								}
								batch[i].logged = true;
							}
						}
					}
					window.setTimeout(logViewBatch, wistiaVideoPostInterval);
				},
				error: function (response) {
					window.setTimeout(logViewBatch, wistiaVideoPostInterval);
				}
			});
		}
		else {
			window.setTimeout(logViewBatch, wistiaVideoPostInterval);
		}
	}

	video.bind('play', function () {
		if (wistiaVideoDebug) {
			console.log('play');
		}
		beginNewView()
	});

	video.bind('end', function () {
		if (wistiaVideoDebug) { console.log('end'); }
		endCurrentView();
	});

	video.bind('seek', function () {
		if (wistiaVideoDebug) { console.log('seek'); }
		endCurrentView();
		beginNewView()
	});

	video.bind('pause', function () {
		if (wistiaVideoDebug) { console.log('pause'); }
		endCurrentView();
	});

	video.bind('secondchange', function (second) {
		if (wistiaVideoDebug) {
			console.log('secondchanged: ' + second);
		}
		if (currentView != null) {
			if (currentView.startSecond == null || second < currentView.startSecond) {
				currentView.startSecond = second;
			}
			if (currentView.endSecond == null || second > currentView.endSecond) {
				currentView.endSecond = second;
			}
		}

	});

	window.setTimeout(logViewBatch, wistiaVideoPostInterval);
	$(window).unload(logViewBatch);
}

function Paywall(video, isSample) {
	var paywall = $('#videoPaywall');

    if (!window.isMobile) {
        paywall.height = paywall.height(video.videoHeight());
        paywall.width = paywall.width(video.videoWidth());
        video.grid.top_inside.appendChild(paywall[0]);
    }

    video.bind("secondchange", function(s) {
        if ((s + 1) >= video.duration() / 2) {
            video.pause();
            video.time(video.duration() / 2);

            if(window.isMobile){
                exitFullscreen($('video')[0]);
                paywall.show();

                $('html, body').animate({
                    scrollTop: paywall.offset().top
                }, 1000);
            }
            else {
                paywall.removeClass('displayNone')
            }

        }
    })
}

function exitFullscreen(videoElem) {
    if (videoElem.exitFullscreen) {
        videoElem.exitFullscreen();
    }
    else if (videoElem.mozCancelFullScreen) {
        videoElem.mozCancelFullScreen();
    }
    else if (videoElem.webkitExitFullscreen) {
        videoElem.webkitExitFullscreen();
    }
}

/**
 * Document ready
 */
$(window).load(function () {

    // select wistia embeds
    $('.wistia_embed').each(function() {

        // lookup id and options from data attributes
        var embedElement = $(this);
        // using attr instead of data to ensure wistiaId is a String. rarely, there will be an id that is all numbers (no letters) and will be passed as an int. this causes js error
        var wistiaId = embedElement.attr('data-wistiaid');
        var options = embedElement.data('wistiaoptions');

        // create video
        var video = new RemVideo(wistiaId, options);
        if (window.Academy) {
            Academy.lessonVideo = video;
        }
    });

});
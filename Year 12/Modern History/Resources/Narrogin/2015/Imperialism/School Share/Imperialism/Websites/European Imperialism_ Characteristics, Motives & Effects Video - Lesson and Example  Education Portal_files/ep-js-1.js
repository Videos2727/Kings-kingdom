/*!
 * jQuery Tools v1.2.6 - The missing UI library for the Web
 * 
 * overlay/overlay.js
 * overlay/overlay.apple.js
 * scrollable/scrollable.js
 * scrollable/scrollable.autoscroll.js
 * scrollable/scrollable.navigator.js
 * toolbox/toolbox.expose.js
 * toolbox/toolbox.mousewheel.js
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 * jquery.event.wheel.js - rev 1 
 * Copyright (c) 2008, Three Dub Media (http://threedubmedia.com)
 * Liscensed under the MIT License (MIT-LICENSE.txt)
 * http://www.opensource.org/licenses/mit-license.php
 * Created: 2008-07-01 | Updated: 2008-07-14
 * 
 * -----
 * 
 */
(function(a){a.tools=a.tools||{version:"v1.2.6"},a.tools.overlay={addEffect:function(a,b,d){c[a]=[b,d]},conf:{close:null,closeOnClick:!0,closeOnEsc:!0,closeSpeed:"fast",effect:"default",fixed:!a.browser.msie||a.browser.version>6,left:"center",load:!1,mask:null,oneInstance:!0,speed:"normal",target:null,top:"10%"}};var b=[],c={};a.tools.overlay.addEffect("default",function(b,c){var d=this.getConf(),e=a(window);d.fixed||(b.top+=e.scrollTop(),b.left+=e.scrollLeft()),b.position=d.fixed?"fixed":"absolute",this.getOverlay().css(b).fadeIn(d.speed,c)},function(a){this.getOverlay().fadeOut(this.getConf().closeSpeed,a)});function d(d,e){var f=this,g=d.add(f),h=a(window),i,j,k,l=a.tools.expose&&(e.mask||e.expose),m=Math.random().toString().slice(10);l&&(typeof l=="string"&&(l={color:l}),l.closeOnClick=l.closeOnEsc=!1);var n=e.target||d.attr("rel");j=n?a(n):null||d;if(!j.length)throw"Could not find Overlay: "+n;d&&d.index(j)==-1&&d.click(function(a){f.load(a);return a.preventDefault()}),a.extend(f,{load:function(d){if(f.isOpened())return f;var i=c[e.effect];if(!i)throw"Overlay: cannot find effect : \""+e.effect+"\"";e.oneInstance&&a.each(b,function(){this.close(d)}),d=d||a.Event(),d.type="onBeforeLoad",g.trigger(d);if(d.isDefaultPrevented())return f;k=!0,l&&a(j).expose(l);var n=e.top,o=e.left,p=j.outerWidth({margin:!0}),q=j.outerHeight({margin:!0});typeof n=="string"&&(n=n=="center"?Math.max((h.height()-q)/2,0):parseInt(n,10)/100*h.height()),o=="center"&&(o=Math.max((h.width()-p)/2,0)),i[0].call(f,{top:n,left:o},function(){k&&(d.type="onLoad",g.trigger(d))}),l&&e.closeOnClick&&a.mask.getMask().one("click",f.close),e.closeOnClick&&a(document).bind("click."+m,function(b){a(b.target).parents(j).length||f.close(b)}),e.closeOnEsc&&a(document).bind("keydown."+m,function(a){a.keyCode==27&&f.close(a)});return f},close:function(b){if(!f.isOpened())return f;b=b||a.Event(),b.type="onBeforeClose",g.trigger(b);if(!b.isDefaultPrevented()){k=!1,c[e.effect][1].call(f,function(){b.type="onClose",g.trigger(b)}),a(document).unbind("click."+m).unbind("keydown."+m),l&&a.mask.close();return f}},getOverlay:function(){return j},getTrigger:function(){return d},getClosers:function(){return i},isOpened:function(){return k},getConf:function(){return e}}),a.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}}),i=j.find(e.close||".close"),!i.length&&!e.close&&(i=a("<a class=\"close\"></a>"),j.prepend(i)),i.click(function(a){f.close(a)}),e.load&&f.load()}a.fn.overlay=function(c){var e=this.data("overlay");if(e)return e;a.isFunction(c)&&(c={onBeforeLoad:c}),c=a.extend(!0,{},a.tools.overlay.conf,c),this.each(function(){e=new d(a(this),c),b.push(e),a(this).data("overlay",e)});return c.api?e:this}})(jQuery);
(function(a){var b=a.tools.overlay,c=a(window);a.extend(b.conf,{start:{top:null,left:null},fadeInSpeed:"fast",zIndex:9999});function d(a){var b=a.offset();return{top:b.top+a.height()/2,left:b.left+a.width()/2}}var e=function(b,e){var f=this.getOverlay(),g=this.getConf(),h=this.getTrigger(),i=this,j=f.outerWidth({margin:!0}),k=f.data("img"),l=g.fixed?"fixed":"absolute";if(!k){var m=f.css("backgroundImage");if(!m)throw"background-image CSS property not set for overlay";m=m.slice(m.indexOf("(")+1,m.indexOf(")")).replace(/\"/g,""),f.css("backgroundImage","none"),k=a("<img src=\""+m+"\"/>"),k.css({border:0,display:"none"}).width(j),a("body").append(k),f.data("img",k)}var n=g.start.top||Math.round(c.height()/2),o=g.start.left||Math.round(c.width()/2);if(h){var p=d(h);n=p.top,o=p.left}g.fixed?(n-=c.scrollTop(),o-=c.scrollLeft()):(b.top+=c.scrollTop(),b.left+=c.scrollLeft()),k.css({position:"absolute",top:n,left:o,width:0,zIndex:g.zIndex}).show(),b.position=l,f.css(b),k.animate({top:f.css("top"),left:f.css("left"),width:j},g.speed,function(){f.css("zIndex",g.zIndex+1).fadeIn(g.fadeInSpeed,function(){i.isOpened()&&!a(this).index(f)?e.call():f.hide()})}).css("position",l)},f=function(b){var e=this.getOverlay().hide(),f=this.getConf(),g=this.getTrigger(),h=e.data("img"),i={top:f.start.top,left:f.start.left,width:0};g&&a.extend(i,d(g)),f.fixed&&h.css({position:"absolute"}).animate({top:"+="+c.scrollTop(),left:"+="+c.scrollLeft()},0),h.animate(i,f.closeSpeed,b)};b.addEffect("apple",e,f)})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.6"},a.tools.scrollable={conf:{activeClass:"active",circular:!1,clonedClass:"cloned",disabledClass:"disabled",easing:"swing",initialIndex:0,item:"> *",items:".items",keyboard:!0,mousewheel:!1,next:".next",prev:".prev",size:1,speed:400,vertical:!1,touch:!0,wheelSpeed:0}};function b(a,b){var c=parseInt(a.css(b),10);if(c)return c;var d=a[0].currentStyle;return d&&d.width&&parseInt(d.width,10)}function c(b,c){var d=a(c);return d.length<2?d:b.parent().find(c)}var d;function e(b,e){var f=this,g=b.add(f),h=b.children(),i=0,j=e.vertical;d||(d=f),h.length>1&&(h=a(e.items,b)),e.size>1&&(e.circular=!1),a.extend(f,{getConf:function(){return e},getIndex:function(){return i},getSize:function(){return f.getItems().size()},getNaviButtons:function(){return n.add(o)},getRoot:function(){return b},getItemWrap:function(){return h},getItems:function(){return h.find(e.item).not("."+e.clonedClass)},move:function(a,b){return f.seekTo(i+a,b)},next:function(a){return f.move(e.size,a)},prev:function(a){return f.move(-e.size,a)},begin:function(a){return f.seekTo(0,a)},end:function(a){return f.seekTo(f.getSize()-1,a)},focus:function(){d=f;return f},addItem:function(b){b=a(b),e.circular?(h.children().last().before(b),h.children().first().replaceWith(b.clone().addClass(e.clonedClass))):(h.append(b),o.removeClass("disabled")),g.trigger("onAddItem",[b]);return f},seekTo:function(b,c,k){b.jquery||(b*=1);if(e.circular&&b===0&&i==-1&&c!==0)return f;if(!e.circular&&b<0||b>f.getSize()||b<-1)return f;var l=b;b.jquery?b=f.getItems().index(b):l=f.getItems().eq(b);var m=a.Event("onBeforeSeek");if(!k){g.trigger(m,[b,c]);if(m.isDefaultPrevented()||!l.length)return f}var n=j?{top:-l.position().top}:{left:-l.position().left};i=b,d=f,c===undefined&&(c=e.speed),h.animate(n,c,e.easing,k||function(){g.trigger("onSeek",[b])});return f}}),a.each(["onBeforeSeek","onSeek","onAddItem"],function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}});if(e.circular){var k=f.getItems().slice(-1).clone().prependTo(h),l=f.getItems().eq(1).clone().appendTo(h);k.add(l).addClass(e.clonedClass),f.onBeforeSeek(function(a,b,c){if(!a.isDefaultPrevented()){if(b==-1){f.seekTo(k,c,function(){f.end(0)});return a.preventDefault()}b==f.getSize()&&f.seekTo(l,c,function(){f.begin(0)})}});var m=b.parents().add(b).filter(function(){if(a(this).css("display")==="none")return!0});m.length?(m.show(),f.seekTo(0,0,function(){}),m.hide()):f.seekTo(0,0,function(){})}var n=c(b,e.prev).click(function(a){a.stopPropagation(),f.prev()}),o=c(b,e.next).click(function(a){a.stopPropagation(),f.next()});e.circular||(f.onBeforeSeek(function(a,b){setTimeout(function(){a.isDefaultPrevented()||(n.toggleClass(e.disabledClass,b<=0),o.toggleClass(e.disabledClass,b>=f.getSize()-1))},1)}),e.initialIndex||n.addClass(e.disabledClass)),f.getSize()<2&&n.add(o).addClass(e.disabledClass),e.mousewheel&&a.fn.mousewheel&&b.mousewheel(function(a,b){if(e.mousewheel){f.move(b<0?1:-1,e.wheelSpeed||50);return!1}});if(e.touch){var p={};h[0].ontouchstart=function(a){var b=a.touches[0];p.x=b.clientX,p.y=b.clientY},h[0].ontouchmove=function(a){if(a.touches.length==1&&!h.is(":animated")){var b=a.touches[0],c=p.x-b.clientX,d=p.y-b.clientY;f[j&&d>0||!j&&c>0?"next":"prev"](),a.preventDefault()}}}e.keyboard&&a(document).bind("keydown.scrollable",function(b){if(!(!e.keyboard||b.altKey||b.ctrlKey||b.metaKey||a(b.target).is(":input"))){if(e.keyboard!="static"&&d!=f)return;var c=b.keyCode;if(j&&(c==38||c==40)){f.move(c==38?-1:1);return b.preventDefault()}if(!j&&(c==37||c==39)){f.move(c==37?-1:1);return b.preventDefault()}}}),e.initialIndex&&f.seekTo(e.initialIndex,0,function(){})}a.fn.scrollable=function(b){var c=this.data("scrollable");if(c)return c;b=a.extend({},a.tools.scrollable.conf,b),this.each(function(){c=new e(a(this),b),a(this).data("scrollable",c)});return b.api?c:this}})(jQuery);
(function(a){var b=a.tools.scrollable;b.autoscroll={conf:{autoplay:!0,interval:3e3,autopause:!0}},a.fn.autoscroll=function(c){typeof c=="number"&&(c={interval:c});var d=a.extend({},b.autoscroll.conf,c),e;this.each(function(){var b=a(this).data("scrollable"),c=b.getRoot(),f,g=!1;function h(){f=setTimeout(function(){b.next()},d.interval)}b&&(e=b),b.play=function(){f||(g=!1,c.bind("onSeek",h),h())},b.pause=function(){f=clearTimeout(f),c.unbind("onSeek",h)},b.resume=function(){g||b.play()},b.stop=function(){g=!0,b.pause()},d.autopause&&c.add(b.getNaviButtons()).hover(b.pause,b.resume),d.autoplay&&b.play()});return d.api?e:this}})(jQuery);
(function(a){var b=a.tools.scrollable;b.navigator={conf:{navi:".navi",naviItem:null,activeClass:"active",indexed:!1,idPrefix:null,history:!1}};function c(b,c){var d=a(c);return d.length<2?d:b.parent().find(c)}a.fn.navigator=function(d){typeof d=="string"&&(d={navi:d}),d=a.extend({},b.navigator.conf,d);var e;this.each(function(){var b=a(this).data("scrollable"),f=d.navi.jquery?d.navi:c(b.getRoot(),d.navi),g=b.getNaviButtons(),h=d.activeClass,i=d.history&&history.pushState,j=b.getConf().size;b&&(e=b),b.getNaviButtons=function(){return g.add(f)},i&&(history.pushState({i:0}),a(window).bind("popstate",function(a){var c=a.originalEvent.state;c&&b.seekTo(c.i)}));function k(a,c,d){b.seekTo(c),d.preventDefault(),i&&history.pushState({i:c})}function l(){return f.find(d.naviItem||"> *")}function m(b){var c=a("<"+(d.naviItem||"a")+"/>").click(function(c){k(a(this),b,c)});b===0&&c.addClass(h),d.indexed&&c.text(b+1),d.idPrefix&&c.attr("id",d.idPrefix+b);return c.appendTo(f)}l().length?l().each(function(b){a(this).click(function(c){k(a(this),b,c)})}):a.each(b.getItems(),function(a){a%j==0&&m(a)}),b.onBeforeSeek(function(a,b){setTimeout(function(){if(!a.isDefaultPrevented()){var c=b/j,d=l().eq(c);d.length&&l().removeClass(h).eq(c).addClass(h)}},1)}),b.onAddItem(function(a,c){var d=b.getItems().index(c);d%j==0&&m(d)})});return d.api?e:this}})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.6"};var b;b=a.tools.expose={conf:{maskId:"exposeMask",loadSpeed:"slow",closeSpeed:"fast",closeOnClick:!0,closeOnEsc:!0,zIndex:9998,opacity:.8,startOpacity:0,color:"#fff",onLoad:null,onClose:null}};function c(){if(a.browser.msie){var b=a(document).height(),c=a(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,b-c<20?c:b]}return[a(document).width(),a(document).height()]}function d(b){if(b)return b.call(a.mask)}var e,f,g,h,i;a.mask={load:function(j,k){if(g)return this;typeof j=="string"&&(j={color:j}),j=j||h,h=j=a.extend(a.extend({},b.conf),j),e=a("#"+j.maskId),e.length||(e=a("<div/>").attr("id",j.maskId),a("body").append(e));var l=c();e.css({position:"absolute",top:0,left:0,width:l[0],height:l[1],display:"none",opacity:j.startOpacity,zIndex:j.zIndex}),j.color&&e.css("backgroundColor",j.color);if(d(j.onBeforeLoad)===!1)return this;j.closeOnEsc&&a(document).bind("keydown.mask",function(b){b.keyCode==27&&a.mask.close(b)}),j.closeOnClick&&e.bind("click.mask",function(b){a.mask.close(b)}),a(window).bind("resize.mask",function(){a.mask.fit()}),k&&k.length&&(i=k.eq(0).css("zIndex"),a.each(k,function(){var b=a(this);/relative|absolute|fixed/i.test(b.css("position"))||b.css("position","relative")}),f=k.css({zIndex:Math.max(j.zIndex+1,i=="auto"?0:i)})),e.css({display:"block"}).fadeTo(j.loadSpeed,j.opacity,function(){a.mask.fit(),d(j.onLoad),g="full"}),g=!0;return this},close:function(){if(g){if(d(h.onBeforeClose)===!1)return this;e.fadeOut(h.closeSpeed,function(){d(h.onClose),f&&f.css({zIndex:i}),g=!1}),a(document).unbind("keydown.mask"),e.unbind("click.mask"),a(window).unbind("resize.mask")}return this},fit:function(){if(g){var a=c();e.css({width:a[0],height:a[1]})}},getMask:function(){return e},isLoaded:function(a){return a?g=="full":g},getConf:function(){return h},getExposed:function(){return f}},a.fn.mask=function(b){a.mask.load(b);return this},a.fn.expose=function(b){a.mask.load(b,this);return this}})(jQuery);
(function(a){a.fn.mousewheel=function(a){return this[a?"bind":"trigger"]("wheel",a)},a.event.special.wheel={setup:function(){a.event.add(this,b,c,{})},teardown:function(){a.event.remove(this,b,c)}};var b=a.browser.mozilla?"DOMMouseScroll"+(a.browser.version<"1.9"?" mousemove":""):"mousewheel";function c(b){switch(b.type){case"mousemove":return a.extend(b.data,{clientX:b.clientX,clientY:b.clientY,pageX:b.pageX,pageY:b.pageY});case"DOMMouseScroll":a.extend(b,b.data),b.delta=-b.detail/3;break;case"mousewheel":b.delta=b.wheelDelta/120}b.type="wheel";return a.event.handle.call(this,b,b.delta)}})(jQuery);
isNoRD = true;

$(document).ready(function() {

	/*Prevent IE from erroring on console.log*/
	if (!window.console)  console = {log: function() {}};
	//console.log('testing yo');

	//safely adds the startsWith function if it doesn't already exist (FF implements this)
	if (typeof String.prototype.startsWith != 'function') {
		String.prototype.startsWith = function (str) {
			if (str === undefined || str === null || typeof str != 'string') {
				return false;
			}
			return this.slice(0, str.length) == str;
		};
	}

	//tracking hack. talk to cole when ajax form gets implemented
	$('body').delegate('#leadForm input[type=submit]', 'click', function (e) {
		eval($('.splitFormExitLink').attr('onclick'));
	});

	applySlideHeader();
	$(".breadcrumbLinks").children().reverseOrder();
	$('input').hint();

    navControls();

    //home popular image slider
	if ($('.browsable').length > 0) {
		$(".browsable").scrollable({circular: true}).navigator({ navi:'#videoSample span.navi' });
		resizeScrollerImages();
	}

	if ($('#courseScroller .scrollable').length > 0) {
		$("#courseScroller .scrollable").scrollable({circular: true}).navigator({ navi:'span.naviCourse' }).autoscroll({ autoplay: true, interval: 6500 });

		$('#courseScroller .playPause').click(function() {
			$(this).toggleClass('play');
			
		});
	}




	if (($('#articleBoxes').length > 0) && ($('.browsable').length < 1)) {
		resizeScrollerImages();
	}

	$('.articleCTA').bind('click touchend', function() {
		//$('#dropDownSearchButton').trigger('click');
		$('#dropDownSearchForm').submit();
	});

	//rollover
	$('.articleCTA').bind('mouseenter mouseleave touchstart', function() {
		$(this).find('input').toggleClass('hover');
		$(this).find('.raquo').toggle();
	});


		// mail chimp stuff
		if ($('.mailchimpSubscribe').length > 0) {
		$('.mailchimpSubscribe').submit(function(e) {
			e.preventDefault();
			var thisForm = $(this);
			var databundle = {};
			databundle.email = $(this).find('[name=EMAIL]').val();
			databundle.pageType = $(this).find('[name=PAGETYPE]').val();
			databundle.tagline = $(this).find('[name=TAGLINE]').val();

			if (typeof databundle.email != 'undefined' && databundle.email
			 .match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/)) {

				$.ajax({
					url: "/mailservice/subscribe.process",
					type: "POST",
					data: databundle,
					dataType: "text",
					success: function(data, textStatus, jqXHR) { // this actually comes back with the data from the server
						if ($('#subscribeSocial').length <= 0) {
							$(thisForm).find('.formMessage').html(data).css('font-weight', 'bold').css('color', '#2c8f00');
						}
					},
					complete: function(jqXHR, textStatus) {
						if ($('#subscribeSocial').length > 0) {
							//only do on blog
							$('#subscribeSocial').load('/mailservice/thankYou.html');
						}
					}
				});
			}
			else {
				$(thisForm).find('.formMessage').html('Please enter a valid email address.').css('font-weight', 'bold').css('color', '#990000');
			}


		});
	}

	/*dropdown select too narrow in ie browsers*/
	if ($.browser.msie) {

		var selectExpand = $('select#topC2, select#topC3, #leadForm #program');

		if (/msie|MSIE 6/.test(navigator.userAgent)) {
			/*ie6 seems to lack an default width value for option tags So we create one based length of text and font-size*/
			/*required: define selectWrapper CSS properties to match the select properties and add position relative.
			 * then add CSS properties for a select wrapped in selectWrapper position: absolute etc*/
			/*wrap select in a div to allow select to be positioned absolutely. Styles are applied to class*/

			$(selectExpand).each(function() {
				heightAdjusted = parseInt($(this).height()) + 2;
				$(this).wrap('<div class=\"selectWrapper\" style=\"height:' + heightAdjusted + 'px\"></div>');
			});

			$(selectExpand)
			 .bind('focus mouseover', function() {
				 $(this).data('defaultWidth', $(this).parent().width());
				 $(this).addClass('expand').removeClass('clicked').width(calculateWidestOption($(this)));
			 })
			 .bind('click', function() { $(this).toggleClass('clicked'); })
			 .bind('mouseout', function() { if (!$(this).hasClass('clicked')) { $(this).removeClass('expand').width($(this).data('defaultWidth')); }})
			 .bind('blur', function() {
				 $(this).removeClass('expand clicked').width($(this).data('defaultWidth'));
			 });

			function calculateWidestOption(optionList) {
				var widestOption = optionList.parent().width();

				optionList.find('option').each(function() {
					optionCalculatedWidth = $(this).text().length * (parseInt($(this).css('font-size')) / 2); //n-dash width = 1/2 m-dash
					if (widestOption < optionCalculatedWidth) { widestOption = optionCalculatedWidth; }
				});
				return widestOption;
			}
		}

		else if (/msie|MSIE 9/.test(navigator.userAgent)) {
			//do nothing. ie9 doesnt need select to grow
		}

		else {
			/*requires css styles for class expand*/
			$(selectExpand)
			 .bind('focus mouseover', function() { $(this).addClass('expand').removeClass('clicked'); })
			 .bind('click', function() { $(this).toggleClass('clicked'); })
			 .bind('mouseout', function() { if (!$(this).hasClass('clicked')) { $(this).removeClass('expand'); }})
			 .bind('blur', function() { $(this).removeClass('expand clicked'); });
		}

	}


	/*PNG transparency fix for IE broswers*/
	if ($.browser.msie && $.browser.version=="6.0") {
		$('.fixPng, .logo, .formError, .fieldError, table.imageplugin img').supersleight({shim: '/images/blank.gif'});
	}
	/*google plus1 button*/
	/*	if ($.browser.msie && $.browser.version.split('.')[0] <= 7) {
	 $('span.hideFromIE76').css('display', 'none');
	 }*/

	/*
	 *
	 * TODO: setUpFormEnhancements method used to be here before now it's in leadFormMain.jsp. Why?
	 * Also fix for long selects is below instead of jso and it looks different than old method
	 * in old setUpFormEnhancements()
	 * */

	/*Leadform fix for long selects*/
	if ($.browser.msie) {
		$("#leadForm select").each(function() {

			if ($(this).width() > 600) {
				var innerSelect = $(this);
				innerSelect.css('width', '500px').css({position: "absolute"}).wrap("<span>")
				 .parent().css({position: "relative", display: "block", height: "48px"});

				innerSelect.not("#leadForm ul.pInfo select").mousedown(
				 function() {
					 if ($(this).css("width") != "auto") {
						 $(this)
						  .data("origWidth", $(this).css("width"))
						  .css("width", "auto");
					 }
				 }).change(function() {
					 $(this).css("width", $(this).data("origWidth"));
				 });
			}
		});
	}

	/* Overlay Containing iFrame+URL  jQuery Tools */
	if ($("a.iframeOverlay, div.companyComplianceLink span, p.disclaimer span, .disclaimerTextSmall span").length >= 1) {
		$('body').append('<div id=\"overlayIframe\">'
		 + '<p><span><a class=\"close\">Close Window <img src=\"/images/closeWindow.gif\" /></a></span><p>'
		 + '<iframe width=\"100%" height=\"430px" scrolling=\"auto\" src=\"\" frameborder=\"0\" =\"0\"></iframe>'
		 + '</div>');
        $(".companyComplianceLink span, p.disclaimer span, .disclaimerTextSmall span").css({cursor: "pointer"});
	}

	/*company page iFrame overlay - see ai-ground jQuery Toolkit*/
	$("a.iframeOverlay, div.companyComplianceLink span, .disclaimer span, .disclaimerTextSmall span").click(function() {
        if ($(this).hasClass('forgotPass')) {
            $('#overlayIframe').addClass('forgotPassOverlay');
        }
		/* hide select if ie */
		if ($.browser.msie && $.browser.version < 7.0) {
			$('select').css('visibility', 'hidden');
		}

		var pageURL = $(this).attr('rel');

		$(this).overlay({
			load: true,
			target: '#overlayIframe',
			mask: {color: '#000000', opacity: 0.5},
			effect: 'default',
			closeOnClick: true,
			closeOnEsc: true,
			left: 'center',
			top:'10%',
			speed: 'fast',

			onBeforeLoad: function() {
				$('#overlayIframe iframe').attr('src', pageURL);
				if ($.browser.msie && $.browser.version.split('.')[0] == 6) {
					$('select').css('visibility', 'hidden');
				}
			},
			onClose: function() {
				$('select').css('visibility', 'visible');
			}
		});
	});

	/*Home search menu toggle */
	$("#hero input.filter").click(function() {
		if (!$(this).hasClass("menuOn")) {
			$("#hero input.filter").next("ul").hide();
			$("#hero input.filter").removeClass("menuOn");
		}
		$(this).next("ul").toggle(100);
		$(this).toggleClass("menuOn");

	});

	/* =homeSearch these two functions hid the mini-meg menu when you click outside of the form */
	$(document).click(function() {
		$("#hero input.filter").next("ul").hide();
		$("#hero input.filter").removeClass("menuOn");
		//for home tooltips
		if ($('.popup').length > 0) {
			$('.popup').slideUp();
		}
	});

	/*dropdownsearch, removed t2(t3) if t1(t2) is changed*/
	$('#topC1').change(function() {
		$('#topC2,#topC3').remove();
	});
	$('#topC2').change(function() {
		$('#topC3').remove();
	});

	/*Samples Articles Toggle*/
	$("ul.sample").hide();

	$(".collapsibleList p").click(function() {
		$(this).next("ul").slideToggle("fast");
		$(this).toggleClass("msgHighlight");
		$(this).find('span').text($(this).find('span').text() == 'Show' ? 'Hide' : 'Show');
	});

	$("#toggledLinks ul").hide();

	/* Accordion function for company programs, locations, learning, and financial aid  -- calls plugin*/
	$("div.accordion").remAccordion();

	$("p.moreSchools").click(function() {
		$(this).closest("#toggledLinks").find("ul").toggle();
		$(this).text($(this).text() == 'Less Schools' ? 'More Schools' : 'Less Schools');
	});

	/* IE6 select obj fix  */
	$('.sub').bgiframe({ opacity: false, src: '#', top: '-0.23em', left: '-0.4em' });

	function dropDownSearchRadio() {
		if ($('#dropDownZip').length > 0) {
			if ($('#dropDownZip').val().length > 0) {
				$('#dropDownZipContainer').css('display', 'block');
			}
			else if ($('#searchC3cb').val() != 'ALL' && $('#dropDownZip').val().length != 5) {
				$('#dropDownStateContainer').css('display', 'block');
			}
		}
	}

	dropDownSearchRadio();

	/*reset zip when state is selected*/
	$('#searchC3c').click(function() {
		$('#dropDownZip').val('')
	});

    notificationPopup();
    closeNotificationPopup();

	setupFeatureTabs();

	highlightWikiTables();

	autoWidthTableColumns();

	showTextSearchField();

	/*text wrapping and image scaling
	 * acts on images on any page that are within .wikicontent table.imageplugin */

	var imageTableImg = $('.wikiContent .imageplugin img'); //article image

	$(imageTableImg).css('visibility', 'hidden'); //hide article image until the image loads but allow placeholder - prevents flicker
	$(window).load(function() {
		$(imageTableImg).css('visibility', 'visible'); //display image when fully loaded
		if ($('.wikiContent .imageplugin img').length > 0) {
			resizeBlogImages(imageTableImg); //window load makes sure the images are loaded
			//Text wrapping is dependant on scaling DES-432
		}
	});

	/* Overlay Containing iFrame+URL  */
	/*	if ($("a.iframeOverlay, div.companyComplianceLink span").length >= 1) {
	 $('body').append('<div id=\"overlayIframe\">'
	 + '<p><span class=\"close\"><a>Close Window</a></span><p>'
	 + '<iframe width=\"100%" height=\"450px" background=\"#ffffff\" scrolling=\"auto\" src=\"\"></iframe>'
	 + '</div>');
	 $(".companyComplianceLink span").css({cursor: "pointer"});
	 }*/

	/* auto submit miniform on _relatedSchools */
	/*
	 $('#relatedSchools input:radio').change(function()
	 {
	 });
	 */

	// Needs to be a delegate in order to support ajax search results!
	$('body').delegate('.megaMiniForm .miniformSelect, .toggleControlled .miniformSelect', 'change', function() {
		$(this).closest('.miniform').submit();
	});

	setupScrollTopicBrowser();

	$('.disclaimerToggle').click(function() {
		$('.companyDisclaimerNComplianceLinks').slideToggle();
	});

	setupFacebookLike();
    hideTopAnnouncement();
});
/* end document.ready*/

$(window).load(function() {
	$('#locations').click(function() {
		initialize_map();
	});
	textareaLengthCheck()
});

/* begin functions */

/**** remove once beta is over ****/
function hideTopAnnouncement() {
    $('#closeTopAnnouncement').click(function () {
        $('#topAnnouncement').slideUp();
    })
}
/**********************************/

/*topic  browser*/
function setupScrollTopicBrowser() {
	var topicBrowserButtons = $('#topics .navigation li, #topicBrowser .buttonTabs li');
	$(topicBrowserButtons).bind('mouseover mouseout', function() {
		$(this).toggleClass('highlight');
	});
	$(topicBrowserButtons).click(function() {

		$(topicBrowserButtons).removeClass('selected').removeClass('highlight');
		//$(this).addClass('selected');
		scrollTopicBrowser($(this).index());

	});
	scrollTopicBrowser('0'); //default default tab in Topic Browser
}

function highlightWikiTables() {
	/* company pages HTML tables*/
	$("table.wikitable tr").mouseover(
	 function() {$(this).addClass("over");}).mouseout(function() {
		 $(this).removeClass("over");
	 });
	$(".wikitable tr:even").addClass("alt");
	$(".wikitable tr td").css("border-right", "1px solid #CDCBB9");

	$('.wikitable').each(function() {
		var columnLast = $(this).find('tr:nth-child(2) td').length;
		$(this).find('tr td:nth-child(' + columnLast + ')').css("border-right", "none");
	});
}

function autoWidthTableColumns() {
	var wikiTables = $('table.wikitable');

	if ($(wikiTables).length >= 1) {
		$(wikiTables).each(function() {
			$(this).find('th').css('width', 100 / $(this).find('th').length + '%');
		});
	}
}

/* Site-wide Javascript goes here */
function navControls() {
    $('#loginNav li').mouseover(
            function () {
                $(this).children('.sub').show();
            }).mouseout(function () {
                $(this).children('.sub').hide();
            })
}

function setupFeatureTabs() {
	// tabs are now handled in academy.js, we can probably delete this
	$(".tabSet .tab").click(function() {
		$(this).parent().children().removeClass("on");
		$(this).addClass("on");
		var features;
		
		if ($('#companyNav').length > 0 || $('#companyNavDark').length > 0) {
			//features = $(this).parent().parent().siblings(".contentContainer").children(".featureElementsContainer").children();
			features = $(this).parent().parent().siblings(".contentContainer").children(".featureElementsContainer").children();
		} else {
			features = $(this).parent().parent().find(".featureElementsContainer").children();
		}

		
		features.hide();
		// show feature at index that corresponds to clicked on tab
		features.eq($(this).parent().children(".tab").index($(this))).show();
	});

	// issue click on first tab of each container for initial load
	$(".tabSet").each(function() {
		$(this).children(".tab").eq(0).click();
	});
}

function textareaLengthCheck() {
	var txts = document.getElementsByTagName('TEXTAREA');

	for (var i = 0, l = txts.length; i < l; i++) {
		if (/^[0-9]+$/.test(txts[i].getAttribute("maxlength"))) {
			var func = function() {
				var len = parseInt(this.getAttribute("maxlength"), 10);

				if (this.value.length > len) {
					//alert('Maximum length exceeded: ' + len);
					this.value = this.value.substr(0, len);
					return false;
				}
			};

			txts[i].onkeyup = func;
			txts[i].onblur = func;
		}
	}
}

function notificationPopup(){
    $('.notificationIcon, .notificationCount').click(function () {
        $('.notificationPopup').show();
    });
}

function closeNotificationPopup() {
    $('html').click(function () {
        $('.notificationPopup').hide()
    });

    $('.notificationIcon, .notificationCount').click(function (event) {
        event.stopPropagation();
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            $('.notificationPopup').hide()
        }
    });
}

var globalMacromediaUrl = 'http://www.macromedia.com/go/getflashplayer';

// Hide/Show default field names for right nav form
function fieldOnFocus(formField, formDefault) {
	if (formField.value == formDefault) {
		formField.value = '';
	}
	return false;
}

function fieldOnBlur(formField, formDefault) {
	if (formField.value == '') {
		formField.value = formDefault;
		formField.value = formDefault;
	}
	return false;
}

function enableButtons() {
	enableButton(document.getElementById("sfSearchButton"));
	enableButton(document.getElementById("topSearchButton"));
	enableButton(document.getElementById("submitText"));
}

function enableButton(button) {
	if (button) {
		button.disabled = false;
	}
}

window.onfocus = enableButtons;

//2012-03-01 track clicks on article button inset in wikiContent
function addArticleButtonTracking() {

    $('<input />').attr('type', 'hidden')
            .attr('name', 'clk')
            .attr('value', 'artb')
            .appendTo('#dropDownSearchForm');
}

function prepareForSubmit(formToSubmit, submitButton) {
    if (formToSubmit.dropDownZip && formToSubmit.dropDownZip.value != '' && formToSubmit.dropDownZip.value != 'zip') {
        formToSubmit.state.value = 'ALL';
        formToSubmit.state.selectedIndex = 0;
    }
    submitButton.disabled = true;
}

function getViewportWidthHeightSize() {
	var myWidth = 0, myHeight = 0;
	if (typeof( window.innerWidth ) == 'number') {
		//Non-IE
		myWidth = window.innerWidth;
		myHeight = window.innerHeight;
	}
	else if (document.documentElement && ( document.documentElement.clientWidth
	 || document.documentElement.clientHeight )) {
		//IE 6+ in 'standards compliant mode'
		myWidth = document.documentElement.clientWidth;
		myHeight = document.documentElement.clientHeight;
	}
	else if (document.body && ( document.body.clientWidth || document.body.clientHeight )) {
		//IE 4 compatible
		myWidth = document.body.clientWidth;
		myHeight = document.body.clientHeight;
	}
	return [
		myWidth, myHeight
	];
}

function getScreenWidthHeightResolution() {
	var myResWidth = 0, myResHeight = 0;
	myResWidth = screen.availWidth;
	myResHeight = screen.availHeight;
	return [
		myResWidth, myResHeight
	];
}

function ajaxPost(url, param) {
	$.ajax({ url: url, data: param, context: document.body})
}


function showTextSearchField() {
	$('#textSearch .trigger').click(function() {
	});
}
function doMiniformReq(triggerElem) {
	var formIdAndLoc = triggerElem.attr("rel");
	var elem = triggerElem.next('.toggleControlled');
	var formIdAndLocArr = formIdAndLoc.split("+");

	// we don't make a request if this container already has a miniform in it
	var miniform = elem.find(".miniform");

	if (miniform.length == 0) {
		triggerElem.find('.showInfo').addClass('loading');

		elem.load("/form/m/form.xml", { 'formId': formIdAndLocArr[0], 'pageLoc': formIdAndLocArr[1],
			'companyPageURL' : "/" + formIdAndLocArr[2], 'excludeBanner': true}, function() {
			triggerElem.find('.showInfo').removeClass('loading');
			//elem.addClass("loaded");
		});
	}
}

function emailEPA(dept) {
    if (dept == '' || typeof(dept) === "undefined") { dept = 'questions'; }

    var title = dept + '&nbsp;AT&nbsp;education-portal.com';
    var part3 = 'education-portal';
    document.write('<a href=\"mailto:' + dept + '@' + part3 + '.com\" target=\"_blank\">' + title + '</a>');
}

/*sfHover = function()
 {
 var nav = document.getElementById("tabs");

 if (nav) {
 var sfEls = nav.getElementsByTagName("li");
 for (var i = 0; i < sfEls.length; i++) {
 sfEls[i].onmouseover = function()
 {
 this.className += " sfhover";
 };
 sfEls[i].onmouseout = function()
 {
 this.className = this.className.replace(new RegExp(" sfhover\\b"), "");
 };
 }
 }
 };
 if (window.attachEvent) window.attachEvent("onload", sfHover);*/


jQuery.cookie = function(name, value, options) {
	if (typeof value != 'undefined') { // name and value given, set cookie
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			}
			else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		}
		// CAUTION: Needed to parenthesize options.path and options.domain
		// in the following expressions, otherwise they evaluate to undefined
		// in the packed version for some reason...
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [
			name, '=', encodeURIComponent(value), expires, path, domain, secure
		].join('');
	}
	else { // only name given, get cookie
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};


function imgError(image) {
	image.onerror = "";
	image.src = "/cimages/videopreview/homeCoursePreview.jpg";
	return true;
}


function homeAccordion() {
	$("#accordion ul.chickletBody:not(:last)").hide();
	$("#accordion ul.chickletBody:visible").parent().addClass("openAccordion");
	$('#accordion h3 a').click(function() {
		var target = $(this).parent().next();
		var targetIsOpen = target.parent().hasClass("openAccordion");

		$("#accordion .chicklet ul.chickletBody:visible").slideUp("fast").parent().removeClass("openAccordion");

		if (!targetIsOpen) {
			target.slideDown("fast").parent().addClass("openAccordion");
		}

		return false;
	});
}

function applySlideHeader() {
	$(".slideHeader").click(function() {
		$(this).next().slideToggle("fast");
		$(this).toggleClass("expanded");
	});

	$(".slideHeader").filter(":not(.expanded)").next().css("display", "none");
}

function resizeBlogImages(imageTableImg) {
	marginWidth = 30;
	if ($('.textLessonMain').length > 0){
		marginWidth = 20;
	}

	$(imageTableImg).each(function() {
		/*Wrapping and scaling modified DES-483*/
		var blogImage = $(this);
		var defaultWidth = $(blogImage).width();
		var defaultHeight = $(blogImage).height();
		var twoThirdsColWidth = parseInt($('.wikiContent').parent().width() * 0.67); // Large images are not scaled
		var maxWidth = parseInt($('.wikiContent').parent().width() - marginWidth); //should be slightly less that article column width to allow for image margins

		if (defaultWidth > maxWidth) {
			$(blogImage).width(maxWidth);
			$(blogImage).height(parseInt((defaultHeight * maxWidth) / defaultWidth));
		}
		else if (defaultWidth < twoThirdsColWidth) {
			blogImage.closest('table').before('<br clear=all />');
			enableTextWrappingOnArticleImage();
		}
	});
}
function enableTextWrappingOnArticleImage() {
	/*make text wrap around table*/
	$('table.imageplugin:even').css({float:'left',margin:'0 20px 10px 0'}).attr('align', 'left');
	$('table.imageplugin:odd').css({float:'right',margin:'0 0 10px 20px'}).attr('align', 'right');
}

//resize blog images in the scrollable

function resizeScrollerImages() {
	var scrollableImage = $('.scrollable .articlePreview img, #articleBoxes .imgContainer img');


	scrollableImage.each(function() {

		if (($(this).width() > 0) && ($(this).height() > 0)) {
			//alert('mozilla')
			scrollerResizeCalculations($(this));
		} else {
			//alert('webkit')
			//wait for each item to load
			$(this).load(function() {
				scrollerResizeCalculations($(this)); 
			});
		}
	});
}

function scrollerResizeCalculations(scrollableImage) {
	var width1 = scrollableImage.width();
	var height1 = scrollableImage.height();

	if (height1 > width1) {
		//portrait
		var width2 = scrollableImage.parent().width();
		var height2 = ( width2 / width1 ) * height1;
		//alert("a" + width1 + ' x ' + height1 + ' / ' + width2 + ' x ' + height2);

	} else if (width1 > (height1 * 2)) {
		// buttons & CTA 2:1
		var width2 = scrollableImage.parent().width();
		var height2 = ( width2 / width1 ) * height1;
		//alert("c" + width1 + ' x ' + height1 + ' / ' + width2 + ' x ' + height2);
	} else {
	  //landscape and square
		var height2 = scrollableImage.parent().height();
		var width2 = ( height2 / height1 ) * width1;
		//alert("b " + width1 + ' x ' + height1 + ' / ' + width2 + ' x ' + height2);
	}

	// Set the new height and width
	scrollableImage.width(width2);
	scrollableImage.height(height2);

	//center in parent
	scrollableImage.css('left', (width2 - scrollableImage.parent().width()) * -1 / 2);
}

function scrollTopicBrowser(index) {
	var slideDistance = $('#topics .topicList').height() * parseInt(index);
	slideDistance = "-" + slideDistance + "px";
	$('#topics .topicSlider').animate({ top: slideDistance});
	$('#topics .navigation li').eq(index).addClass('selected');

	//alert(slideDistance);
}

function updateHash(find, replace, createHistory) {

	if (location.hash.match(find) != null) {

		var re = new RegExp(find, 'g');
		hashReplace(location.hash.replace(re, replace), createHistory);
	}
	else {
		if (location.hash.length < 1) {
			hashReplace('#' + replace, createHistory);
		}
		else {
			hashReplace(location.hash + '-' + replace, createHistory);
		}
	}
}

function hashReplace(replaceWith, createHistory) {
	if(!replaceWith.startsWith('#')) {
		replaceWith = '#' + replaceWith;
	}

	if(createHistory) {
		top.location = replaceWith;
	}
	else {
		location.replace(replaceWith);
	}
}


(function($) {
	$.fn.reverseOrder = function() {
		return this.each(function() {
			$(this).prependTo($(this).parent());
		});
	};
})(jQuery);

(function($) {
	$.fn.bgIframe = $.fn.bgiframe = function(s) {
		// This is only for IE6
		if ($.browser.msie && $.browser.version.split('.')[0] < 7) {
			//alert('moo'); //this goes off when fixpng code is commented out
			s = $.extend({
				top     : 'auto', // auto == .currentStyle.borderTopWidth
				left    : 'auto', // auto == .currentStyle.borderLeftWidth
				width   : 'auto', // auto == offsetWidth
				height  : 'auto', // auto == offsetHeight
				opacity : true,
				src     : 'javascript:false;'
			}, s || {});
			var prop = function(n) {return n && n.constructor == Number ? n + 'px' : n;},
			 html = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' + s.src + '"' +
			  'style="display:block;position:absolute;z-index:-1;' +
			  (s.opacity !== false ? 'filter:Alpha(Opacity=\'0\');' : '') +
			  'top:' + (s.top == 'auto' ? 'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')' : prop(s.top)) + ';' +
			  'left:' + (s.left == 'auto' ? 'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')' : prop(s.left)) + ';' +
			  'width:' + (s.width == 'auto' ? 'expression(this.parentNode.offsetWidth+\'px\')' : prop(s.width)) + ';' +
			  'height:' + (s.height == 'auto' ? 'expression(this.parentNode.offsetHeight+\'px\')' : prop(s.height)) + ';' +
			  '"/>';
			return this.each(function() {
				if ($('> iframe.bgiframe', this).length == 0) {
					this.insertBefore(document.createElement(html), this.firstChild);
				}
			});
		}
		return this;
	};

})(jQuery);

(function($) {
	$.fn.bubbleInfo = function() {
		this.each(function() {
			// options
			var distance = 10;
			var time = 250;
			var hideDelay = 500;

			var hideDelayTimer = null;

			// tracker
			var beingShown = false;
			var shown = false;

			var trigger = $('.trigger', this);
			var popup = $('.popup', this).css('opacity', 0);

			// set the mouseover and mouseout on both element
			$([
				trigger.get(0), popup.get(0)
			]).mouseover(
			 function () {
				 // stops the hide event if we move from the trigger to the popup element
				 if (hideDelayTimer) {
					 clearTimeout(hideDelayTimer);
				 }

				 // don't trigger the animation again if we're being shown, or already visible
				 if (beingShown || shown) {
					 return;
				 }
				 else {
					 beingShown = true;


					 popup.css({
						 top: -1 * popup.outerHeight() + 5,
						 left: -53,
						 display: 'block' // brings the popup back in to view
					 })
						 // (we're using chaining on the popup) now animate its opacity and position
					  .animate({
						  top: '-=' + distance + 'px',
						  opacity: 1
					  }, time, 'swing', function() {
						  // once the animation is complete, set the tracker variables
						  beingShown = false;
						  shown = true;
					  });
				 }
			 }).mouseout(function () {
				 // reset the timer if we get fired again - avoids double animations
				 if (hideDelayTimer) {
					 clearTimeout(hideDelayTimer);
				 }

				 // store the timer so that it can be cleared in the mouseover if required
				 hideDelayTimer = setTimeout(function () {
					 hideDelayTimer = null;
					 popup.animate({
						 top: '-=' + distance + 'px',
						 opacity: 0
					 }, time, 'swing', function () {
						 // once the animate is complete, set the tracker variables
						 shown = false;
						 // hide the popup entirely after the effect (opacity alone doesn't do the job)
						 popup.css('display', 'none');
					 });
				 }, hideDelay);
			 });
		});
	}
})(jQuery);

(function($) {
	/* requirement: containing div with class 'accordion' */
	/* requirement: must have an h5 for the trigger */
	/* requirement: must have an ul for the expanding element*/
	$.fn.extend({
		remAccordion: function() {
			return this.each(function() {
				$(this).find('ul').hide();
				$(this).find('ol h5').click(function () {
					$(this).parent('li').toggleClass('openAccordion');
					$(this).next('ul').slideToggle('fast');
					$('div.accordion ol h5').not(this).next('ul').hide().parent('li').removeClass('openAccordion');
				});
			});
		}
	});
})(jQuery);

/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($, e, b) {
	var c = "hashchange",h = document,f,g = $.event.special,i = h.documentMode,d = "on" + c in e && (i === b || i > 7);

	function a(j) {
		j = j || location.href;
		return"#" + j.replace(/^[^#]*#?(.*)$/, "$1")
	}

	$.fn[c] = function(j) {return j ? this.bind(c, j) : this.trigger(c)};
	$.fn[c].delay = 50;
	g[c] = $.extend(g[c], {setup:function() {
		if (d) {return false}
		$(f.start)
	},teardown:function() {
		if (d) {return false}
		$(f.stop)
	}});
	f = (function() {
		var j = {},p,m = a(),k = function(q) {return q},l = k,o = k;
		j.start = function() {p || n()};
		j.stop = function() {
			p && clearTimeout(p);
			p = b
		};
		function n() {
			var r = a(),q = o(m);
			if (r !== m) {
				l(m = r, q);
				$(e).trigger(c)
			}
			else {if (q !== m) {location.href = location.href.replace(/#.*/, "") + q}}
			p = setTimeout(n, $.fn[c].delay)
		}

		$.browser.msie && !d && (function() {
			var q,r;
			j.start = function() {
				if (!q) {
					r = $.fn[c].src;
					r = r && r + a();
					q = $('<iframe tabindex="-1" title="empty"/>').hide().one("load",
					 function() {
						 r || l(a());
						 n()
					 }).attr("src", r || "javascript:0").insertAfter("body")[0].contentWindow;
					h.onpropertychange = function() {
						try {if (event.propertyName === "title") {q.document.title = h.title}}
						catch(s) {}
					}
				}
			};
			j.stop = k;
			o = function() {return a(q.location.href)};
			l = function(v, s) {
				var u = q.document,t = $.fn[c].domain;
				if (v !== s) {
					u.title = h.title;
					u.open();
					t && u.write('<script>document.domain="' + t + '"<\/script>');
					u.close();
					q.location.hash = v
				}
			}
		})();
		return j
	})()
})(jQuery, this);


/*Social Media Overlay Feedback Widget*/
/*Questions are set in _socialOverlayParameters.jsp*/
/*Forms are set in _feedbackWidget.jsp*/
(function($) {
	$.fn.feedbackWidget = function(options) {

		// Create some defaults, extending them with any options that were provided
		var settings = $.extend({
			'facebook' : 'false',
			'twitter' : 'false',
            'thumbsupOverlayEnabled' : 'false', //whether or not to open the overlay after the click (note that we still record the values)
            'thumbsdownOverlayEnabled' : 'false' //whether or not to open the overlay after the click (note that we still record the values)  
		}, options);

		var thisURL = document.location.href;

        // move these to the end of body otherwise the zindex will not work
		$('#overlayLikeDiv, #overlayDislikeDiv').appendTo('body');

		/*thumbsup overlay*/

        /*since creating the feedbackwidget plugin, the class cboxElement seems to interfere with the js
        * the overlay appears to be cached after first use.
        * we should investigate using the Flowplayer overlay*/
        $('.ilike, .idislike').removeClass('cboxElement');

		if ($(this).hasClass('ilike')) {

			__utmTrackEvent('SocialFeedback', 'ThumbsUp', settings.articleTitleCleaned + ', ' + thisURL); // or FOR SITESPECT EDUCATIONPORTALCOM
			$('.ilike, .idislike').removeClass('uplike');
			$('.ilike').addClass('uplike');

			if (settings.thumbsupOverlayEnabled == 'true') {
				/*trigger iLike overlay */
				$(this).colorbox({top:50,fixed:true,opacity:0.5, inline:true, href:"#overlayLikeDiv",
					width: 20, /* we might be able to remove this */
					scrolling: false,
					transition:"none",
					onOpen:function() {
						$('#overlayLikeDiv').show();
						// hide the elements that IE doesnt play nice with
						$('object, embed').css('visibility', 'hidden');
						if ($.browser.msie && $.browser.version.split('.')[0] == 6) {
							$('select').not('#programSearch select').css('visibility', 'hidden');
						}
						createWidgets(); //social sharing buttons
					},
					onComplete: function() {
						$('#cboxLoadedContent').css('overflow-x', 'visible');
						$('#cboxLoadedContent').css('overflow-y', 'visible');
					},
					onClosed:function() {
						$('#overlayLikeDiv').hide();
						$('object, embed, select').css('visibility', 'visible');
						$('#mainBody').css('z-index', '5');
						$('#facebookLike, #twitterTweet, #twitterFollow').empty();
					}
				});
			}

		}

		$('.overlayDiv .submitComment').click(function() {

			var thisForm = $(this).closest('form');

			var comms = thisForm.find('textarea.negativeArticleComments').val();
			var email = thisForm.find('input.smoEmail').val();

			var questionsInTheForm = $(this).parents('form').find('fieldset');
			var fieldSetCompleted = '';
			//Loop through the questions and append title and value to sting
			$(questionsInTheForm).each(function() {
				var answeredQuestionCount = 0;
				var questionTitle = '';
				if ($(this).find('label').length > 0) {
					questionTitle = $(this).find('label').text();
				}
				if ($(this).find('legend').length > 0) {
					//overrides previous test
					questionTitle = $(this).find('legend').text();
				}

				var questionValue = '';
				if ($(this).hasClass('checkbox') ) {
					$(this).find('input:checked').each(function() {
						questionValue = questionValue + '\n\t* ' + $(this).val();
						answeredQuestionCount++;
					});
				} else if ($(this).hasClass('textArea')) {
					questionValue = questionValue + $(this).find('textarea').val();
					if ($(this).find('textarea').val() != '') { answeredQuestionCount++; }
				} else if ($(this).hasClass('dropdown')) {
					questionValue = questionValue + $(this).find('select option:selected').text();
					if ($(this).find('select option:selected').val() != '') { answeredQuestionCount++; }
				}  else if ($(this).hasClass('textInput')){
					questionValue = questionValue + $(this).find('input').val();
					if ($(this).find('input').val() != '') { answeredQuestionCount++; }
				}
				if (answeredQuestionCount > 0) {
				fieldSetCompleted = fieldSetCompleted + '\n\n' + questionTitle + '\n\t*' + questionValue;
				}

			});

			//alert(fieldSetCompleted);


			overlayQuestions = '\n***' + fieldSetCompleted + '\n***';

			otherDesc = thisForm.find('.otherDesc').val();
			var smoLocation = thisForm.find('.smoLocation').val();
			var dataBundle = {};

			if (comms == '' && fieldSetCompleted == '') {
				thisForm.find('.submitError').html("Please select an option or leave a comment");
			}
			else if (comms.length > limitNum) {
				thisForm.find('.submitError').html("Please keep your comments under 800 characters in length.");
			}
			else {
				dataBundle =
				{comments: comms, at: document.location.href, overlayQuestions: overlayQuestions, otherDesc: otherDesc, smoLocation: smoLocation};

				if (email.length == 0 || email
				 .match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/)) {

					dataBundle.email = email;

					thisForm.show();
					$.ajax({
						type: "post",
						url: "/social/dislikeFeedback.process",
						data: dataBundle,
						dataType: "html",
						beforeSend: function(jqXHR, settings) {
							thisForm.siblings('div.feedbackReceived').show().text("Sending your feedback...");
							thisForm.find('.submitError').html("");
							thisForm.hide();

						},
						success: function(data, status, jqXHR) {
							if (typeof data != 'undefined') {

								__utmTrackEvent('SocialFeedback', 'Submitted Feedback Comment', settings.articleTitleCleaned + ', ' + thisURL); // or FOR SITESPECT EDUCATIONPORTALCOM

								dislikeAlreadySubmitted(); //disable no button

								thisForm.siblings('p.feedbackReceived').html(data);
							}
						},
						complete: function() {
						}
					});

					//Close overlay
					//$.colorbox.close();
					timeoutID = window.setTimeout(function() {$.colorbox.close(); }, 3000);
				}
				else {
					thisForm.find('.submitError').html("Please provide a valid email");
				}
			}
			return false;
		});

		function createWidgets() {
			if (settings.twitter) {

				// dynamically add the twitter elements
				if (settings.twitterTweets) {
					(function() {
						var dataUrl = settings.tweetCustomUrl ? 'data-url="' + settings.tweetUrl + '"' : '';
						var dataText = settings.tweetCustomText ? 'data-text="' + settings.tweetText + '"' : '';
						$('#twitterTweet')
						 .append('<p class="thumbsUpLabel">Tweet this article</p><a href="http://twitter.com/share" class="twitter-share-button" '
						 + dataUrl + dataText + ' data-count="' + settings.tweetCountLocation + '" data-via="EducationPortal" data-related="EducationPortal">Tweet</a>')
						;
					}());
				}

				if (settings.twitterFollows) {
					(function() {
						$('#twitterFollow')
						 .append('<p class="thumbsUpLabel">Follow us on Twitter</p><a href="http://twitter.com/' + settings.twitterAccount
						 + '" class="twitter-follow-button" data-show-count="' + settings.showNumberFollowers + '">Follow @' + settings.twitterAccount + '</a>');
					}());
				}

				function twitterUrchinInit() {
					twttr.events.bind('tweet', function(event) {
						if (event) {
							__utmTrackEvent("SocialFeedback", "Twitter-tweet", settings.articleTitleCleaned + ', ' + thisURL, document.location);
						}

					});
					twttr.events.bind('follow', function(event) {

						var followed_user_id = event.data.user_id;

						var followed_screen_name = event.data.screen_name;

						__utmTrackEvent('SocialFeedback', 'Twitter-follow',
						 'newFollower:{followed_uid:' + followed_user_id + ';followed_name:' + followed_screen_name + '}, ' + thisURL, document.location);

					});
				}

				$.getScript(document.location.protocol + '//platform.twitter.com/widgets.js', twitterUrchinInit);

			}
		}

		/**
		 * WARNING: YOU MUST Call this on document.ready if a negative feedback comment has already been submitted (if using cookies)
		 */
		function dislikeAlreadySubmitted() {
			$(".idislike").unbind('click').removeClass('uplike').addClass('downlike');
		}

		/*thumbsdown overlay colorbox*/
		if ($(this).attr('class') == 'idislike') {

			if ($('.idislike').attr('class') != 'uplike') {
				//probably shouldnt do anything once they dislike an article

				$('.ilike, .idislike').removeClass('uplike');
				$('.idislike').addClass('uplike');

				__utmTrackEvent('SocialFeedback', 'ThumbsDown', settings.articleTitleCleaned + ', ' + thisURL); // or FOR SITESPECT EDUCATIONPORTALCOM

				if (settings.thumbsdownOverlayEnabled == 'true') {
					/*trigger idislike overlay */
					$(this).colorbox({
						top:50,
						fixed:true,
						opacity:0.5,
						inline:true,
						width: 20, /* we might be able to remove this */
						scrolling: false,
						transition:"none",
						href:"#overlayDislikeDiv",
						onOpen:function() {
							$('#overlayDislikeDiv').show();
							// hide the elements that IE doesnt play nice with
							$('object, embed').css('visibility', 'hidden');
							if ($.browser.msie && $.browser.version.split('.')[0] == 6) {
								$('select').not('#programSearch select').css('visibility', 'hidden');
							}
						},
						onClosed:function() {
							$('#overlayDislikeDiv').hide();
							$('object, embed, select').css('visibility', 'visible');
							$('#mainBody').css('z-index', '5');
							$('#facebookLike, #twitterTweet, #twitterFollow').empty();
						}
					});
				}

			}
		}
	};
})(jQuery);

function setupFacebookLike() {
	$('.socialSidebar').bind('mouseenter', function() {
		if (typeof FB == 'undefined') {
			$.getScript(document.location.protocol + '//connect.facebook.net/en_US/all.js#xfbml=1', window.likeButtonInit);
		}
		else {
			showFacebookLike();
		}
	});
	$('.fb-button').bind('mouseenter', function() {
		clearTimeout(facebookLikeButtonTimeout);
	});
	$('.fb-button').bind('mouseout', function() {
		/*facebookLikeButtonTimeout = setTimeout(function() {
		 hideFacebookLike();
		 }, 1500);*/
	});

	window.likeButtonInit = function() {
        var host = 'http://' + window.location.host;
        // make sure local gets grouped into the same url as production
        host = host.replace("http://local.", "http://");

        var path = window.location.pathname;

        var url = host + path;

        var facebookLikeHtml = '<fb:like href="' + url + '" send="false" layout="box_count" width="90px" show_faces="false" font="arial"></fb:like>';

		$('.facebookLike .fb-button').html(facebookLikeHtml);
		FB.init({appId: "154169414663558", status: true, cookie: true, xfbml: true});

		FB.Event.subscribe('edge.create', function(response) {
			console.log("UTMing!!!");
			__utmTrackEvent('SocialFeedback', 'FB-Like', document.location.href);
		});

		showFacebookLike();
	}
}

var facebookLikeButtonTimeout = null;

var showFacebookLike = function() {
	$('.fb-logo').animate({height:'hide',opacity:'hide'});
	$('.fb-button').animate({height:'show',opacity:'show'});
};

var hideFacebookLike = function() {
	$('.fb-button').animate({height:'hide',opacity:'hide'});
	$('.fb-logo').animate({height:'show', opacity:'show'});
};

var login = function() {
	$('#loginForm').ajaxForm({url: '/member/do-login.ajax', type: 'post'});
}

var Register = function() {
	$('#registerForm').ajaxForm({url: '/academy/register/do-register.ajax', type: 'post'});
}

// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values?lq=1
// changed function name from getParameterByName()
function getUrlParam(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**
 * Post a remspect response point
 * @param {String} responsePointKey
 */
function responsePoint(responsePointKey) {
    $.ajax('/rp/' + responsePointKey);
}
(function ($) {

	$.fn.hint = function (blurClass) {
		if (!blurClass) {
			blurClass = 'blur';
		}

		return this.each(function () {
			// get jQuery instance of 'this'
			var $$ = $(this);

			// get it once since it won't change
			var title = $$.data("hint");

			if (!title) {
				title = $$.attr('title');
				$$.data("hint", title);
			}

			// only apply logic if the element has the attribute
			if (title) {

				// on blur, set value to title attr if text is blank
				function blurIt() {
					if ($$.val() == '') {
						$$.val(title).addClass(blurClass);
					}
				}

				// on focus, set value to blank if current value matches title attr
				function focusIt() {
					$$.removeClass(blurClass);

					if ($$.val() == title) {
						$$.val('');
					}
				}


				$$.blur(blurIt);
				$$.focus(focusIt);

				// clear the pre-defined text when form is submitted
				$$.parents('form:first').submit(
				function () {
					if ($$.val() == title) {
						$$.val('').removeClass(blurClass);
					}
				}).end();

				// now change all inputs to title
				blurIt();

				// counteracts the effect of Firefox's autocomplete stripping the blur effect
				if ($.browser.mozilla && !$$.attr('autocomplete')) {
					setTimeout(function () {
						focusIt();
						blurIt();
					}, 10);
				}
			}
		});
	};
})(jQuery);function Member() {
    var self = this;

    // init validation
    this.initValidation = function (validation) {
        self.validation = validation;
    };

    /**
     * Validate with the currently set validation
     * @return an error message, or null if the value passes validation
     */
    this.validate = function (fieldName, fieldValue) {
		 if (!self.validation) {
			 return;
		 }
        var validator = self.validation[fieldName];

        // min length
        if (validator.minLength && validator.minLength > fieldValue.length) {
            return fieldName + ' must be at least ' + validator.minLength + ' characters';
        }

        // max length
        if (validator.maxLength && validator.maxLength < fieldValue.length) {
            return fieldName + ' must be less than ' + validator.maxLength + ' characters';
        }

        // blacklist
        if (validator.blacklist && jQuery.inArray(fieldValue, validator.blacklist) > -1) {
            return fieldName + ' is too obvious';
        }

        // email
        if (validator.isEmail) {
            var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!emailRegex.test(fieldValue)) {
                return fieldName + ' is invalid'
            }
        }

        // validation passed
        return null;
    };

    this.validatePasswordConfirm = function (password, passwordConfirm) {
        return password == passwordConfirm ? null : 'Passwords don\'t match';
    };

    this.validateAgreeToTerms = function (isChecked) {
        return isChecked ? null : 'Please agree to the terms and conditions';
    };

    this.validateUserType = function(userType) {
        return userType ? null : 'Required';
    };

    // handle validation
    this.handleValidation = function (data, successTrigger, failureTrigger) {
        if (data.success) {
            $('body').trigger(successTrigger);
        }
        else {
            $('body').trigger(failureTrigger, data);
        }
    };

    // change password
    this.changePassword = function (reset, currentPassword, newPassword, confirmNewPassword) {
        var ajaxUrl = '/member/do-change-password.ajax?passwordNew=' + newPassword + '&passwordConfirm=' + confirmNewPassword +
                '&currentPassword=' + currentPassword + '&reset=' + reset;
        $.ajax(ajaxUrl)
                .done(function (data) {
                    self.handleValidation(data, 'changePassword_success', 'changePassword_failed');
                });
    };

    //Submit a question
    this.submitQuestion = function (question, element) {
        $.ajax({
            type: "POST",
            url: '/member/ask/submit-question.ajax',
            data: {
                question: question
            },
            dataType: 'json'
        }).done(function (data) {

            // check response for errors
            if(!data.success) {

                if(data.errors.auth) {
                    window.location = '/academy/get-started.html';
                }
            }
            else {
                new RemilonNotification().success([
                    'Thanks! Your question has been submitted to our experts and will be answered via email. You can check the status of your question on this dashboard.',
                    'Response times may vary by topic.'
                ], 8000);
                self.refreshRecentQuestions();
            }
        });
    };

    //Get recent questions
    this.refreshRecentQuestions = function () {
        var ajaxUrl = '/member/ask/get-recent-questions.ajax?count=3';
        $.ajax(ajaxUrl).done(function (data) {
            $('body').trigger('refreshRecentQuestions', data);
        });
    };
}
function MembersEP() {
	var self = this;
	var member = new Member();

    var isPasswordInit = false;
    var isPasswordConfirmInit = false;

	/**
	 * Initialize bindings
	 */
	this.initMemberBindings = function() {
        self.bindLoginButton();
        self.bindLoginBlur();
        self.initResendPasswordLink();
        self.initShowSummaryByCourse();
        self.initUpdateSubscription();
        self.initMemberGoals();
	};

 	/****************
	 * Member login *
	 ****************/
	this.bindLoginBlur = function() {
		$('body').click(function(e) {
			if ($(e.target).closest('.memberLogin').length <= 0 && e.target.id != 'headerLogin') {
				self.closeLoginPopup();
			}
		});

		$(document).keyup(function(e) {
			if (e.keyCode == 27) {
				self.closeLoginPopup();
			}
		});

		$('.betaClose').click(function(){
			self.closeLoginPopup();
		});
	};

	this.closeLoginPopup = function() {
		$.when($('.memberLogin').fadeOut()).done(
		 function() {
			 $('.memberLogin .loginPopup form label input').val('');
			 $('.memberLogin .loginPopup .errors').hide();
		 }
		);
	};

	this.bindLoginButton = function() {
		$('#headerLogin').bind('click', function(e) {
			$('.memberLogin').fadeIn();
            e.preventDefault();
		});
	};

	/***********************
	 * Member registration *
	 ***********************/
    /*disable multi click for resend password */
    this.initResendPasswordLink = function () {
        var sendEmail = $('.sendVerificationEmail');

        sendEmail.click(function (e) {
            if ($(this).hasClass('sendVerificationEmail')) {
                self.bindResendVerifyEmail($(this));

                e.preventDefault();
                $(this).removeClass('sendVerificationEmail');

                //set timer to allow user to click to send another email
                setTimeout(function () {
                    sendEmail.addClass('sendVerificationEmail')
                }, 3000)
            }
        })
    };

	/**
	 * Member registration validation
	 */

	this.initMemberRegisterValidation = function(validation) {
		member.initValidation(validation);

		// email
        self.initKeyUpValidation($('#emailRegister'), 'Email', '#emailRegisterError');

        // password and password confirm
        self.initPasswordValidation($('#passwordRegister'), $('#passwordConfirmRegister'), '#passwordRegisterError', '#passwordConfirmRegisterError');

		// agree to terms
        var agreeToTerms = $('#termsAndConditions');
		agreeToTerms.change(function() {
			self.displayValidationError(member.validateAgreeToTerms(agreeToTerms.prop('checked')), '#termsAndConditionsError');
		});

	};

    /**************
     * Validation *
     **************/
	this.displayValidationError = function(errorMessage, errorLabelId) {
		if (errorMessage == null) {
            $(errorLabelId).hide();
            $(errorLabelId).text('');
            $(errorLabelId).parent('label').removeClass('validateError').addClass('validateSuccess');
		}
		else {
			$(errorLabelId).text(errorMessage);
			$(errorLabelId).show();
			$(errorLabelId).parent('label').removeClass('validateSuccess').addClass('validateError');
		}
	};

    this.initKeyUpValidation = function(input, fieldName, errorLabelId) {
        var isValueInit = false;

        var func = function() {
            if (input.val()) {
                isValueInit = true;
            }
            if (isValueInit) {
                self.displayValidationError(member.validate(fieldName, input.val()), errorLabelId);
            }
        }

        //input.keyup(func);
        //$(input).blur(func);
        input.keyup(func);
        $(input).bind('input', func);
        $(input).blur(func);
    };

    this.initPasswordValidation = function(password, passwordConfirm, passwordErrorId, passwordConfirmErrorId) {

        // password
        password.keyup(function () {
            if (password.val()) {
                isPasswordInit = true;
            }
            if(isPasswordInit) {
                self.displayValidationError(member.validate('Password', password.val()), passwordErrorId);
                if (!isPasswordConfirmInit) {
                    self.clearPasswordConfirmRegistration(true);
                }
            }
            if (isPasswordConfirmInit) {
                self.displayValidationError(member.validatePasswordConfirm(password.val(), passwordConfirm.val()), passwordConfirmErrorId);
            }
        });

        // password confirm
        passwordConfirm.keyup(function () {
            if(passwordConfirm.val()) {
                isPasswordConfirmInit = true;
            }
            if(isPasswordConfirmInit) {
                self.displayValidationError(member.validatePasswordConfirm(password.val(), passwordConfirm.val()), passwordConfirmErrorId);
            }
        });
    };

    /*******************
     * Change Password *
     *******************/
    this.bindChangePasswordButtonSubmit = function (reset) {
        var inputs = $('form#changePasswordForm input');

        var currentPassword = $('#currentPassword');
        var newPassword = $('#newPassword');
        var passwordConfirm = $('#confirmNewPassword');
        var submit = $('#memberRegisterSubmit');

        submit.click(function (e) {
            e.preventDefault();

            // check for errors one last time
            var passwordError = member.validate('Password', newPassword.val());
            var passwordConfirmError = member.validatePasswordConfirm(newPassword.val(), passwordConfirm.val());

            // update error messages
            self.displayValidationError(passwordError, '#newPasswordError');
            self.displayValidationError(passwordConfirmError, '#confirmNewPasswordError');

            // submit register request if all fields are valid
            if (passwordError == null && passwordConfirmError == null) {
                // disable inputs while sending ajax call
                inputs.attr("disabled", "disabled");

                // send register ajax call
                member.changePassword(reset, currentPassword.val(), newPassword.val(), passwordConfirm.val());
            }
        });
    };

    this.bindChangePasswordSuccess = function () {
        $('body').bind('changePassword_success', function () {
            window.location.replace('/member/my-dashboard.html');
        });
    };

    this.bindChangePasswordFailed = function () {
        $('body').bind('changePassword_failed', function (event, data) {
            var inputs = $('form#changePasswordForm input');

            // erors returned from server
            var currentPasswordError = data.errors.auth;
            var passwordError = data.errors.password;
            var passwordConfirmError = data.errors.passwordConfirm;

            $('#passwordChangeError').show();

            // server error
            if (!currentPasswordError && !passwordError && !passwordConfirmError) {
                self.displayValidationError('An error occurred, please try again later', '#confirmNewPassword');
            }

            // validation errors
            self.displayValidationError(currentPasswordError, '#currentPasswordError');
            self.displayValidationError(passwordError, '#newPasswordError');
            self.displayValidationError(passwordConfirmError, '#confirmNewPasswordError');

            // enable form again
            inputs.removeAttr("disabled");
        });
    };

    /**
     * Change password validation
     */
    this.initChangePasswordValidation = function (validation, reset) {
        member.initValidation(validation);
        self.initPasswordValidation($('#newPassword'), $('#confirmNewPassword'), '#newPasswordError', '#confirmNewPasswordError');
        self.bindChangePasswordButtonSubmit(reset);
        self.bindChangePasswordSuccess();
        self.bindChangePasswordFailed();
    };

    /******************
     * Ask the Expert *
     ******************/
    this.bindSubmitQuestion = function () {
        var submit = $('#memberInquirySubmit');
        var question = $('#memberInquiry');
        submit.click(function (e) {
            e.preventDefault();

            // don't submit if question is blank
            if ($.trim(question.val()).length > 0) {
                member.submitQuestion(question.val(), $(this));
            }
            question.val('');
        });
    };

    this.bindRefreshAskedQuestions = function() {
        var questionList = $('#askTheExpert').find('.memberArticleList');

        $('body').bind('refreshRecentQuestions', function (event, data) {
            questionList.empty();

            for(var i = 0; i < data.questions.length; i++) {
                var questionItem = data.questions[i];
                var isAnswered = '';

                if(questionItem.status == 'ANSWERED'){
                    isAnswered = 'class="viewAnswer"';
                } else {
                    isAnswered = 'class="notAnswered"';
                }

                questionList.append('<li>'
                        + '<span '+isAnswered+'>' + questionItem.status + '</span>'
                        + '<div class="question">' + questionItem.question +'</div>'
                        + '<div class="answer">' + questionItem.answer +'</div>'
                        + '</li>');

                isAnswered = '';
            }
            self.bindShowAnswer();

        });

        member.refreshRecentQuestions();
    };

    this.bindShowAnswer = function () {
        var questionList = $('#questionsAsked li');
        questionList.click(function () {
            var viewAnswer = $(this).find('span');

            if (viewAnswer.hasClass('viewAnswer')){
                questionList.removeClass('showAnswer');
                $(this).addClass('showAnswer');
            }
        })
    };

    /******************
     * Member Profile *
     ******************/
    this.initMemberGoals = function(){
        var userType = $('select[name=userType]');
        var goals = $('#goals');
        var goalsContainer = $('#goalsContainer');

        var goalsMap = {Instructor: [
            "Supplementing my in-classroom material",
            "Flipping my classroom",
            "Engaging my students",
            "Explaining difficult topics in the classroom",
            "Assigning Homework",
            "Other"
            ],
            Student: [
                "Improving my grades",
                "Cramming for an exam",
                "Getting a short explanation of a difficult subject",
                "Getting a degree faster",
                "Getting a degree while I'm working",
                "Saving money on my degree",
                "Preparing for a standardized exam(ACT, SAT, CLEP, AP, etc.)",
                "Preparing to go back to school",
                "Teacher assigned homework",
                "Homework help",
                "Earning college credit",
                "Other"
            ],
            "Casual Learner": [
                "Learn something new",
                "Get an answer to a question",
                "Keep my mind sharp",
                "Prepare to go back to school",
                "Get ahead at work",
                "Just for fun",
                "Other"
            ],
            Parent: [
                "Helping My child with a difficult subject",
                "Personal review to better assist my child",
                "Improving	my child's grades",
                "My child is studying for a credit granting exam",
                "Just for fun",
                "Other"
            ]};

        userType.change(function(){
            var userTypeVal = $(this).val();
            var newOptions = '';

            if (userTypeVal != '' && userTypeVal != 'Other'){
                goalsContainer.show();

                $.each(goalsMap[userTypeVal], function(i, val){
                    newOptions += '<option value="' + val + '">' + val + '</option>'
                });

                goals.html(newOptions);

            } else {
                goalsContainer.hide();
                goals.html('')
            }

        })
    };



    /******************
     * Course Progress *
     ******************/
    this.initShowSummaryByCourse = function() {
        var summaryTrigger = $('#courseProgress .subHeader');
        var summary = $('.activeCourse');
        summary.first().slideToggle();

        summaryTrigger.click(function () {
            if (!$(this).hasClass('on') && !$(this).hasClass('none')){
                summaryTrigger.removeClass('on');
                summary.slideUp();
                $(this).addClass('on').next(summary).slideDown();
            }
        });

        summaryTrigger.hover(function(){
            $(this).addClass('hover')
        }, function(){
            $(this).removeClass('hover')
        });
    };

    /******************
     * send quiz score email *
     ******************/

    this.initSendExamScoreValidation = function(validation, memberStatus){
        member.initValidation(validation);
        // email
        self.initKeyUpValidation($('#emailTo'), 'Email', '#emailRegisterError');
        self.sendExamScore(memberStatus);
    };

    this.sendExamScore = function(memberStatus) {
        var formToSubmit = $('#emailScoreForm');
        var email = $('#emailTo');
        var isMember = memberStatus;

        formToSubmit.submit(function (e) {
            e.preventDefault();

            var emailError = member.validate('Email', email.val());
            self.displayValidationError(emailError, '#emailScoreError');

            //validate first
            if(emailError == null) {

                //if member, send email
                $.ajax({
                    type: 'POST',
                    url: '/member/quiz-score/notification/save.ajax',
                    data: {toEmailAddress: email.val()}
                })
                .done(function () {
                    //receive a response from server that tells us if member is logged in, if yes, do the following, if not, show track progress tab
                    if (isMember) {
                        new RemilonNotification().success('Great! Your quiz score has been sent to the email you submitted.');
                        email.val('');
                    } else {
                        $('#registerCallout .intro strong').html('Please create your FREE account to email your quiz score.');
                        $('#trackProgressTab').click();
                    }
                })
                .error(function () {
                    new RemilonNotification().error('An error has occurred while sending your email. Please try again later.');
                });
            }
        });
    };

    /******************
     * update subscription *
     ******************/

    this.initUpdateSubscription = function () {
        /* stupid mobile errors with this so im putting a check around if its mobile :/ */
        if (!window.isMobile) {
            var editSubscriptionPopup = $("#editSubscriptionPopup");
            var cancelOptionWriteIn = $('#cancelOptionWriteIn');

            $("body").append(editSubscriptionPopup.not('.inline'));

            $('#editSubscription').click(function () {
                editSubscriptionPopup.not('.inline').overlay({
                    top: '10%',
                    left: 'center',
                    mask: {color: '#000000', opacity: 0.5},
                    closeOnClick: false,
                    closeOnEsc: false,
                    fixed: false
                });
                editSubscriptionPopup.overlay().load();
            });

            $('#subscriptionCancellation').click(self.showCancelSubscription);
            $('#subscriptionUpgrade').click(self.showUpdateSubscription);

            $('input[name=cancelSubscription]:radio').change(function () {
                if ($('#cancelQ8').is(':checked')) {
                    cancelOptionWriteIn.show();
                }
                else {
                    cancelOptionWriteIn.hide();
                    cancelOptionWriteIn.val('')
                }
            });

            $('#updateSubscription a[data-plan]').click(function () {
                var editSubscriptionPopup = $('#editSubscriptionPopup');
                var selectedPlan = $(this).data('plan');
                editSubscriptionPopup.data('selectedPlan', selectedPlan);

                var reactivate = editSubscriptionPopup.data('reactivate');
                var activate = editSubscriptionPopup.data('activate');
                if (reactivate || activate) {
                    $('#editSubscriptionPopup').overlay().close();
                    window.location.href = '/member/billing/update.html?product=' + selectedPlan;
                }
                else {
                    var subscriptionPanels = $('#subscriptionPanels');
                    var confirmSubscription = $('#confirmSubscription');

                    subscriptionPanels.hide();
                    confirmSubscription.fadeIn();
                    $('#yesConfirm').click(function () {
                        self.sendUpdateSubscription(editSubscriptionPopup.data('selectedPlan'), $(this))
                    });
                    $('#noConfirm').click(function () {
                        confirmSubscription.hide();
                        subscriptionPanels.fadeIn();
                    });

                    //make the panels come back up if they close it
                    editSubscriptionPopup.find('.close').click(function(){
                        editSubscriptionPopup.overlay().close();
                        confirmSubscription.hide();
                        subscriptionPanels.show();
                    })
                }
            });
            $('#cancelSubscription form').submit(self.sendCancelSubscription)
        }
    };

    this.sendUpdateSubscription = function (updateAction, submitButton) {
        var subscriptionUpdatedMsg = $('#subscriptionUpdated');
        submitButton.html('Processing...').attr('disabled', true);

        var data = {};
        data.product = updateAction;

        if($.cookie('SSOE') && $.cookie('SSOE').indexOf("pt-") == 0){
            data.couponCode = "REMSPECT-"+$.cookie('SSOE')+"-"+updateAction;
            this.invisibleCoupons = true;
        }

        $.ajax({
            type: 'POST',
            url: '/member/update-subscription.ajax',
            data: data,
            success: function (response) {
                window.location.href = '/member/my-dashboard.html';
            },
            error: function (response) {
                response = JSON.parse(response.responseText);

                if (response.errors && response.errors['payment']) {
                    new RemilonNotification().error(response.errors['payment']);
                }
                else {
                    new RemilonNotification().error("An unknown error occurred. Please reload the page and try again.");
                }

                submitButton.html('Yes').attr('disabled', false);
            }
        })
    };

    this.reactivateSubscription = function () {
        var editSubscriptionPopup = $('#editSubscriptionPopup');
        editSubscriptionPopup.data('reactivate', true);
        editSubscriptionPopup.not('.inline').overlay({
            top: '10%',
            left: 'center',
            mask: {color: '#000000', opacity: 0.5},
            closeOnClick: false,
            closeOnEsc: false,
            close: 'false',
            fixed: false
        });
        editSubscriptionPopup.overlay().load();
    };

    this.activateSubscription = function () {
        var editSubscriptionPopup = $('#editSubscriptionPopup');
        editSubscriptionPopup.data('activate', true);
        editSubscriptionPopup.overlay({
            top: '10%',
            left: 'center',
            mask: {color: '#000000', opacity: 0.5},
            closeOnClick: false,
            closeOnEsc: false,
            close: 'false',
            fixed: false
        });
        editSubscriptionPopup.overlay().load();
    };

    this.showCancelSubscription = function () {
        var editSubscriptionPopup = $('#editSubscriptionPopup');
        editSubscriptionPopup.children('#updateSubscription').hide();
        editSubscriptionPopup.children('#cancelSubscription').fadeIn();
        $('#yesCancel').click(self.showCancelPart2);
        $('#noCancel').click(self.showUpdateSubscription);
    };

    this.showCancelPart2 = function () {
        $('#cancelPart1').hide();
        $('#cancelPart2').fadeIn();
    };

    this.showUpdateSubscription = function () {
        var editSubscriptionPopup = $('#editSubscriptionPopup');
        editSubscriptionPopup.children('#cancelSubscription').hide();
        editSubscriptionPopup.children('#updateSubscription').fadeIn();
    };

    this.sendCancelSubscription = function (e) {
        e.preventDefault();
        var subscriptionCanceledMsg = $('#subscriptionCancelled');
        var cancelReason = $('input[name=cancelSubscription]:checked').val();
        var otherWriteIn = $('#cancelOptionWriteIn').val();
        var submitButton = $(this).find('input[type=submit]');

        submitButton.attr('disabled', true).val('Processing...');

        $.ajax({
            type: 'POST',
            url: '/member/cancel-subscription.ajax',
            data: {
                updateAction: 'cancel',
                cancelReason: cancelReason,
                other: otherWriteIn
            },
            success: function (response) {
                location.reload();
            },
            error: function (response) {
                //todo brandon make sexy (;_;)
                submitButton.attr('disabled', false).val('Cancel Subscription');
            }
        })
    };


	/**
	 * document ready
	 */
	$(document).ready(function() {
		self.initMemberBindings();
	});
}

var membersEP = new MembersEP();
/**
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
*
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);/**
 * Adds a tooltip for the info 'i'
 */
function prepCustomAdInfoToolTip() {
	//offsets to get the image in the right place relative to where you clicked
	var imageOffsetX = -82;
	var imageOffsetY = -105;

	//space required to the right of where you clicked to fit the whole image
	var requiredSpaceOnTheRight = 209;

	var lastTooltipClicked = null;
	var tooltipImage = null;

	function getOrCreateTooltip() {
		if (tooltipImage === null) {
			tooltipImage = $('<img src=\"/images/sitespect/adInfoTooltip-tooltip.png\" id=\"adInfoTooltipImage\"/>').prependTo('body');
		}
		return tooltipImage;
	}

	//ensures that the popup can be seen by moving it left if the window is small
	function calcXOffsetForSmallWindows(targetX) {
		var containerWidth = $('#container').width();
		var windowWidth = $(window).width();

		//this boundary forces the tooltip to stop moving too far to the left as the window gets really small
		var boundaryWidth = Math.max(containerWidth, windowWidth);
		var spaceOnRightSide = boundaryWidth - targetX;

		var newOffset = 0;
		if (spaceOnRightSide < requiredSpaceOnTheRight) {
			newOffset = -1 * (requiredSpaceOnTheRight - spaceOnRightSide);
		}

		return newOffset;
	}

	/* Next click in body closes tooltip */
	function bindCloseToBody() {
		$('body').one('mousedown', function () {
			if (tooltipImage !== null) {
				tooltipImage.hide();
			}
		});
	}

	function evalAndSetOffsets() {
        if (lastTooltipClicked !== null) {
            var lastTooltipClickPosition = lastTooltipClicked.offset();
            var tooltipImage = getOrCreateTooltip();
            var xOffsetForSmallWindows = calcXOffsetForSmallWindows(lastTooltipClickPosition.left);

            tooltipImage.css({top: lastTooltipClickPosition.top + imageOffsetY, left: lastTooltipClickPosition.left + imageOffsetX
                    + xOffsetForSmallWindows});
        }
	}

	$(document).ready(function () {
		$('.adInfoTooltip').click(function () {
			//this position is used to calculate x offset
			lastTooltipClicked = $(this);

			evalAndSetOffsets();
			tooltipImage.show();

			bindCloseToBody();
		});

		$(window).resize(function () {
			evalAndSetOffsets();
		});

	});
}
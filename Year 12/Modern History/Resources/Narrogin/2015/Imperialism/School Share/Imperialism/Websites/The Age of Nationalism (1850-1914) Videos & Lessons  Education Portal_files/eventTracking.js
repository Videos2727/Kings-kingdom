    /**
     * Collects data on each and every click on the site, sending them to the server via "ajax" every second or so
     */
    var eventTracking = {
        /**
         * Turn on/off debug logging [ eventTracking.log() ]
         * @type {Boolean}
         */
        debug: false,
        /**
         * queue used to store events before heading off to the server
         * @type {eventTracking.queue}
         */
        events: "",
        /**
         * Name of the data field (attribute name in DOM will be prefixed w/ data-) where we can find the canonical-name for this element
         * @const {String}
         */
        cNameAttr: "cname",
        /**
         * Name of the data field (attribute name in DOM will be prefixed w/ data-) where extraData can be found for this element
         * @const {String}
         */
        extraDataAttr: "extra",
        /**
         * String used to indicate that a value can't be provided because it is private billing data
         * @const {String}
         */
        NO_LOG_VALUE: "NO_LOG_VALUE",
        /**
         * String used to indicate that this value is longer than 512 characters and has been truncated
         * @const {String}
         */
        TRUNCATED: "truncated",
        /**
         * A map of fields which errored. Values stored as lists to handle multiple errors
         * Init'd here to be populated as we go
         * @type {Map.<String, Array.<String>>}
         */
        fieldErrorList: {},

         /**
         * Initialize the internal queue which will store events until successfully sent to server and start the polling every 1s
         */
        init: function () {
            this.events = new this.queue();
            // Poll the queue every second ... will send 1/sec till q is exhausted
            setInterval($.proxy(this.sendEvents, this), 1000);
        },

        /**
         * Clear eventTracking state, called after successful call to server
         */
        reset: function () {
            $.cookie('cd', null, {path: "/"});
        },

        /**
         * Handle req/res for ajax call
         */
        sendEvents: function () {

            if (!this.events || this.events.isEmpty()) {
                return;
            }

            // Create JSON for events
            var eventsJson = JSON.stringify(eventTracking.events.getItems());
            // Empty event queue right away (If we wait for a success response we risk deleting anything added while waiting for it)
            eventTracking.events.clear();

            this.log("SENDING:" + eventsJson);

            // Send event JSON
            $.ajax({
                async: true,
                cache: false,
                type: "POST",
                url: "/eventLogger/eventLog.ajax",
                contentType: "application/json",
                data: eventsJson,
                success: function (data) {

                    // Clear the fallback cookie once request is successfully sent
                    // The fall back might contain a new event if one occurred before the success response but it will be in the queue
                    eventTracking.reset();
                }
            });
        },

        /**
         * Push event data onto queue to be sent to server eventually
         * @param {object} eventDetail
         */
        queueEvent: function (eventDetail) {
            this.events.enqueue(eventDetail);

            // go ahead and set the cookie in case we unload before the click is sent
            if (!eventTracking.events.isEmpty()) {
                var date = new Date();
                date.setFullYear(date.getFullYear() + 1);
                $.cookie("cd", JSON.stringify(eventTracking.events.getItems()), { expires: date, path: '/' });
            }

            if (this.debug) {
                this.log("QUEUE AS OF NOW:");
                this.log(JSON.stringify(this.events.getItems()));
            }
        },

        /**
         * add generic event parameters to the eventDetail object to be queued up
         * @param event - the event passed from the .mouseUp
         */
        addGenericEventDetail: function (event) {
        
            var el = $(event.target);
            var eventDetail = new eventTracking.LoggableEvent(event.type);
            var paths = this.getPathsTo(el);

            /**
             * xPath as string to the target of the event
             * @type {String}
             */
            if(paths.xPath && paths.xPath.length > 0) {
                eventDetail.xPath = '/html/' + paths.xPath.reverse().join('/');
            } else {
                eventDetail.xPath = '/html';
            }

            /**
             * The canonical path as an array of Objects representing the set of elements containing data-cname attribute
             * (and optionally the data-extra attribute value, if defined) starting with the clicked element scanning up the tree
             * e.g. [{canonicalValue : "valueHere", extraData: "xData"}, {canonicalValue : "valueHereToo", extraData: "xDataToo"}]
             * @type {Array.<{canonicalValue : string, extraData: string}>}
             */
            eventDetail.canonicalPath = (paths.canonicalPath.length > 0)
                    ? paths.canonicalPath
                    : null;
            /**
             * The clicked node as Object containing it's name, it's innerHTML (upto 512 chars or the word "truncated"
             * @type {Array.<{xmlNodeName : string, xmlNodeText: string, xmlNodeAttributes: Array.<{string,string}>}>}
             */
            eventDetail.xmlNode = {};
            eventDetail.xmlNode.xmlNodeName = el.prop('nodeName');

            /**
             * The value of the node (if input, select, textarea, etc). Empty if there is no value
             * @type {String}
             */
            eventDetail.xmlNode.xmlNodeValue = !eventTracking.isNoLogValue(el)
                    ? el.val()
                    : eventTracking.NO_LOG_VALUE;

            if(el.html()) {
                /**
                 * The text inside of the element
                 * @type {String}
                 */
                eventDetail.xmlNode.xmlNodeText = (el.html().length <= 512)
                    ? el.html()
                    : eventTracking.TRUNCATED;
            }

            eventDetail.xmlNode.xmlNodeAttributes = {};

            // gather attributes for this tag
            if(el[0].attributes) {
                for(var i = 0; i < el[0].attributes.length; i++){
                    var a = el[0].attributes[i];
                    if(a.specified) {
                        eventDetail.xmlNode.xmlNodeAttributes[a.name] = a.value.length <= 512
                                ? a.value
                                : eventTracking.TRUNCATED;
                    }
                }
            }

            eventDetail.scrollCoordinate = eventTracking.getScrollCoordinate();
            eventDetail.viewportSize = eventTracking.getViewPortSize();

            // Add any click specific data to the eventDetail
            if (eventDetail.eventType === 'click') {
                eventTracking.addClickEventData(event, eventDetail);
            }

            /**
             * A map of fields which errored. Values stored as lists to handle multiple errors
             * @type {Map.<String, Array.<String>>}
             */
            eventDetail.fieldErrorList = eventTracking.fieldErrorList;
            // clear class level errors
            eventTracking.fieldErrorList = {};

            // queue the click for async sending to the server
            eventTracking.queueEvent(eventDetail);
        },

        addStripeErrorDetail: function(stripeError){
            var eventDetail = new eventTracking.LoggableEvent("stripeError");
            eventTracking.addStripeErrorData(stripeError, eventDetail);

            eventTracking.queueEvent(eventDetail);
        },

        addRegErrorDetail: function (regError) {
            var eventDetail = new eventTracking.LoggableEvent("regError");
            eventDetail.errorField = regError.errorField;
            eventDetail.errorValue = regError.errorValue;

           eventTracking.queueEvent(eventDetail);
        },

        /**
         * Checks if the provided element is a "billing field" and contains private data (credit card #, cvc, credit card expiration)
         *
         * @param el the element to check
         * @returns {boolean}
         */
        isNoLogValue: function(el) {
            return el.data('no-log') !== undefined;
        },

        getScrollCoordinate: function() {
            return {
                /**
                 * the number of pixels that an element's content is scrolled to the left
                 * @type {!number}
                 */
                x: Math.floor($(document).scrollLeft()),
                /**
                 * the number of pixels that an element's content is scrolled down from the top
                 * @type {!number}
                 */
                y: Math.floor($(document).scrollTop())
            }
        },

        getViewPortSize: function() {
            return {
                /**
                 * The width of the viewport at the moment of the click
                 * @type {!number}
                 */
                x: Math.floor($(window).width()),
                /**
                 * The height of the viewport at the moment of the click
                 * @type {!number}
                 */
                y: Math.floor($(window).height())
            };
        },

        addStripeErrorData: function(stripeError, eventDetail) {
            eventDetail.stripeType = stripeError.type;
            eventDetail.stripeMessage = stripeError.message;
            eventDetail.stripeCode = stripeError.code;
            eventDetail.stripeParam = stripeError.param;
        },

        addClickEventData: function(event, eventDetail) {

            eventDetail.clickCoordinate = {
                /**
                 * The X coordinate relative to the page as a whole (regarless of viewport and scrolling)
                 * @type {!number}
                 */
                x: Math.floor(event.pageX),
                /**
                 * The Y coordinate relative to the page as a whole (regarless of viewport and scrolling)
                 * @type {!number}
                 */
                y: Math.floor(event.pageY)
            }

            eventDetail.clientCoordinate = {
                /**
                 * The horizontal coordinate within the application's client area at which the event occurred (as opposed to the coordinates
                 * within the page). For example, clicking in the top-left corner of the client area will always result in a mouse event with a
                 * clientX value of 0, regardless of whether the page is scrolled horizontally.
                 *
                 * If clientX , use it, otherwise if event.originalEvent, then use event.originalEvent.clientX
                 *
                 * @type {!number}
                 */
                x: Math.floor((event.clientX) ? event.clientX : ((event.originalEvent) ? event.originalEvent.clientX : null)),
                /**
                 * The vertical coordinate within the application's client area at which the event occurred (as opposed to the coordinates
                 * within the page). See x notes above.
                 * @type {!number}
                 */
                y: Math.floor((event.clientY) ? event.clientY : ((event.originalEvent) ? event.originalEvent.clientY : null))
            }

            /**
             * String representing which button was pressed (canonical)
             * @type {String}
             */
            eventDetail.mouseButtonName = eventTracking.whichButton(event);

            /**
             * Number value reporting which button was pressed
             * Will make more sense when joined with UA
             * @type {Number}
             */
            eventDetail.mouseButtonValue = eventTracking.whichButtonValue(event);
        },

        /**
         * NOTE: Is NOT RFC4122 compliant (see: http://stackoverflow.com/a/8809472/677381) since we removed the dashes
         * was: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
         * this removes the jQuery Dependancy of GUID used in tracking.js
         */
        generateUUID: function () {
            Date.now = Date.now || function () { return +new Date; };
            var d = Date.now();
            var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
            });
            return uuid;
        },

        /**
         * Utility method to handle building of the canonical path, element by element
         * @param {jQuery} el the element to decide if it should be included in the canonical path for
         * @param {Object.<{canonicalValue : string, extraData: string}>}
         * @param {{xPath: Array.<string>, canonicalPath: Object}}
         */
        handleCanonicalPathMember: function (el, pair, lastPath) {
            if (el.data(this.cNameAttr)) {
                pair = {
                    canonicalValue: el.data(this.cNameAttr),
                    extraData: el.data(this.extraDataAttr)
                }
                lastPath.canonicalPath.push(pair);
            }
        },

        getSiblingIndexOfElement: function (el) {

            // all the children of parent of 'el' (including 'el')
            var childrenOfParent = (el[0].parentNode) ? el[0].parentNode.childNodes : [];
            var indexAmongSiblings = 0;

            for (var i = 0; i < childrenOfParent.length; i++) {

                var currentChild = childrenOfParent[i];

                // If we have found 'el' then return its index
                if (currentChild === el[0]) {
                    return indexAmongSiblings;
                }

                // This constant seems to be missing in IE
                var elementNode = (Node !== undefined) ? Node.ELEMENT_NODE : 1;

                // If it's an element with the same tagName then it's a sibling so we want to increment the index and keep iterating
                if ($(currentChild).prop('nodeType') === elementNode && $(currentChild).prop('tagName') === el.prop('tagName')) {
                    indexAmongSiblings++;
                }
            }

            // If we weren't able find ourselves in the children of the parent then something has gone wrong...
            return null;
        },

        /**
         * Scans up the DOM to build out both xPath and internally defined canonicalPath (which only contains elements containing a 'data-canonical' attr)
         * Also grabs the value of the 'data-extra' attribute of the inner-most node (relative to the clicked node)
         * @param {jQuery} el the element to generate the xPath for
         * @param {{xPath: Array.<string>, canonicalPath: Object}} [lastPath] the previous path to process
         * @return {{xPath: Array.<string>, canonicalPath: Object}}
         */
        getPathsTo: function (el, lastPath) {

            if (!lastPath) {
                lastPath = {
                    /**
                     * The xPath as an array to be concatted as string when written to cookie
                     * @type {Array.<String>}
                     */
                    xPath: [],
                    /**
                     * The canonical path is an array of Objects representing the set of elements containing data-cname attribute
                     * (and optionally the data-extra attribute value, if defined) starting with the clicked element scanning up the tree
                     * e.g. [{canonicalValue : "valueHere", extraData: "xData"}, {canonicalValue : "valueHereToo", extraData: "xDataToo"}]
                     * @type {Array.<{canonicalValue : string, extraData: string}>}
                     */
                    canonicalPath: []
                }
            }

            var pair = {
                canonicalValue: null,
                extraData: null
            }

            if(el.prop('tagName') == "HTML"){
                return lastPath;
            }

            if (el[0] === document.body) {
                lastPath.xPath.push(el.prop('tagName'));
                this.handleCanonicalPathMember(el, pair, lastPath);
                return lastPath;
            }

            // div[@id="idhere"]
            if (el.attr('id')) {
                lastPath.xPath.push(el.prop('tagName') + '[@id="' + el.attr('id') + '"]');
                this.handleCanonicalPathMember(el, pair, lastPath);
                return this.getPathsTo(el.parent(), lastPath);
            } else {
                if(!el[0].parentNode) {
                    // RACE CONDITION FAIL
                    // Something has reworked the DOM out from underneath us
                    // grab what we can and move on
                    var errMsg = "Race Condition Fail in DOM scan- el no longer has a defined parent";
                    if(eventTracking.fieldErrorList["xPath"]) {
                        eventTracking.fieldErrorList["xPath"].push(errMsg);
                    } else {
                        eventTracking.fieldErrorList["xPath"] = [errMsg];
                    }
                    lastPath.xPath.push(el.prop('tagName'));
                    this.handleCanonicalPathMember(el, pair, lastPath);
                    return lastPath;
                } else {

                    var indexAmongSiblings = this.getSiblingIndexOfElement(el);
                    if(indexAmongSiblings !== null) {
                        // add one to the index because XPath expects a 1-based index?
                        lastPath.xPath.push(el.prop('tagName') + '[' + (indexAmongSiblings + 1) + ']');
                        this.handleCanonicalPathMember(el, pair, lastPath);
                        return this.getPathsTo(el.parent(), lastPath);
                    }
                }
            }
        },

        /**
         * It's a q ;)
         * It's a q! :D
         */
        queue: function () {
            this.enqueue = function (item) {
                if (typeof(this.items) === 'undefined') {this.items = []; }
                this.items.push(item);
            }
            this.dequeue = function () { return this.items.shift(); }
            this.peek = function () { return this.items[0]; }
            this.isEmpty = function () { return (typeof(this.items) === 'undefined' || this.items.length < 1)}
            this.getItems = function () { return this.items }
            this.clear =  function () { this.items = []; }
        },

        LoggableEvent: function (eventType) {

            /**
             * The type of event that we are logging. E.g. focusout, click, change, etc...
             * @type {String}
             */
            this.eventType = eventType;

            /**
             * UUID for this individual event, to be used for de-duping on server side
             * @type {String}
             */
            this.javascriptUUID = eventTracking.generateUUID();

            /**
             * Local client timestamp... to be used for sorting events within session
             * Local clock obviously should NOT be trusted for event's actual timing
             * @type {Number}
             */
            this.javascriptTimestamp = new Date().getTime();

            /**
             * UUID for this page view (server side), generated outside of this scope, found in $('#requestGuid').val();
             * @type {String}
             */
            this.pageRequestGuid = $('#requestGuid').val();

            /**
             * UUID for this page impression (client side), generated outside of this scope, found in $('#impressionGuid').val();
             * @type {String}
             */
            this.pageImpressionGuid = $('#impressionGuid').val();
        },

        /**
         * Log out to console if debug flag is on
         * @param {String} logThis
         */
        log: function (logThis) {
            if (this.debug) {
                // handle browsers that bark at no console or console.debug
                if (!console) console = {log: function () {}};
                console.log(logThis)
            }
        },

        whichButton : function (event) {
            event = event || window.event;

            if (event.which == null) {
                button = (event.button < 2) ? 'LEFT' :
                        ((event.button == 4) ? 'MIDDLE' : 'RIGHT');
            } else {
                button = (event.which < 2) ? 'LEFT' :
                        ((event.which == 2) ? 'MIDDLE' : 'RIGHT');
            }

            return button
        },

        whichButtonValue : function (event) {
            event = event || window.event;
            return (event.which == null) ? event.button : event.which
        }
    }

    $(document).ready(function() {
        eventTracking.init();

        // set the cookie on the way out, will be read in on next req
        $(window).bind('beforeunload', function () {
            if (!eventTracking.events.isEmpty()) {
                var date = new Date();
                date.setFullYear(date.getFullYear() + 1);
                $.cookie("cd", JSON.stringify(eventTracking.events.getItems()), { expires: date, path: '/' });
            }
        });

        // queue the click!
        $(document).bind('click', function (event) {
            // only queue left events
            if (eventTracking.whichButton(event) !== 'RIGHT') {
                eventTracking.addGenericEventDetail(event);
            }
        });

        $(document).bind('focusin focusout change', function (event) {
            eventTracking.addGenericEventDetail(event);
        });

        $(document).bind('stripeError', function (event, type, message, code, param) {
            var stripeError = {};
            stripeError.type = type;
            stripeError.message = message;
            stripeError.code = code;
            stripeError.param = param;
            eventTracking.addStripeErrorDetail(stripeError);
        });

        $(document).bind('regError', function (event, errorField, errorValue) {
            var regError = {};
            regError.errorField = errorField;
            regError.errorValue = errorValue;
            eventTracking.addRegErrorDetail(regError);
        });
    });
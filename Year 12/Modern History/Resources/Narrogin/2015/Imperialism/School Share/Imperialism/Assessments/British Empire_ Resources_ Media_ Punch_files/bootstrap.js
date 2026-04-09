









    window.jQueryPatchIPadOffset = false;
    var amznJQ = {
        _timesliceJS: false,
        _a: [], _s: [], _d: [], _l: [], _o: [], _c: [], _cs: [], _pl: [],
        addLogical: function() {
            this._l.push(arguments)
        },
        addStyle: function() {
            this._s.push(arguments)
        },
        addPL: function(d) {
            this._pl.push(d);
        },
        declareAvailable: function() {
            this._d.push(arguments)
        },
        available: function() {
            this._a.push(arguments)
        },
        onReady: function() {
            this._o.push(arguments)
        },
        onCompletion: function() {
            this._c.push(arguments)
        },
        completedStage: function() {
            this._cs.push(arguments)
        },
        strings: {},
        chars: {
            EOL: String.fromCharCode(0x0A),
            SQUOTE: String.fromCharCode(0x27),
            DQUOTE: String.fromCharCode(0x22),
            BACKSLASH: String.fromCharCode(0x5C),
            YEN: String.fromCharCode(0xA5)
        }
    }



window.AmazonPopoverImages = {
  snake: 'http://g-ecx.images-amazon.com/images/G/01/javascripts/lib/popover/images/snake._V192571611_.gif',
  btnClose: 'http://g-ecx.images-amazon.com/images/G/01/javascripts/lib/popover/images/btn_close._V192188154_.gif',
  closeTan: 'http://g-ecx.images-amazon.com/images/G/02/nav2/images/close-tan-sm._V192198775_.gif',
  closeTanDown: 'http://g-ecx.images-amazon.com/images/G/02/nav2/images/close-tan-sm-dn._V192263238_.gif',
  loadingBar: 'http://g-ecx.images-amazon.com/images/G/01/javascripts/lib/popover/images/loading-bar-small._V192188123_.gif',
  pixel: 'http://g-ecx.images-amazon.com/images/G/01/icons/blank-pixel._V192192429_.gif'
};
var container = document.createElement("DIV");
container.id = "ap_container";
if (document.body.childNodes.length) {
    document.body.insertBefore(container, document.body.childNodes[0]);
} else {
    document.body.appendChild(container);
}

document.write('<scr'+'ipt type="text/javascript" src="http://z-ecx.images-amazon.com/images/G/01/browser-scripts/site-wide-js-1.2.6-beacon/site-wide-6930860459._V1_.js"></scr'+'ipt>');
amznJQ.onReady('popover', function(){
amznJQ.addStyles({urls:["http://z-ecx.images-amazon.com/images/G/01/browser-scripts/uk-site-wide-css-beacon/site-wide-6800426958._V1_.css"],styles:["\n/* non-sprited */\n.ap_popover_unsprited .ap_body   .ap_left   { background-image: url(http://g-ecx.images-amazon.com/images/G/01/javascripts/lib/popover/images/po_left_17._V248144977_.png); }\n.ap_popover_unsprited .ap_body   .ap_right  { background-image: url(http://g-ecx.images-amazon.com/images/G/01/javascripts/lib/popover/images/po_right_17._V248144979_.png); }\n.ap_popover_unsprited .ap_header .ap_left   { background-image: url(http://g-ecx.images-amazon.com/images/G/01/javascripts/lib/popover/images/po_top_left._V265110087_.png); }\n.ap_popover_unsprited .ap_header .ap_right  { background-image: url(http://g-ecx.images-amazon.com/images/G/01/javascripts/lib/popover/images/po_top_right._V265110087_.png); }\n.ap_popover_unsprited .ap_header .ap_middle { background-image: url(http://g-ecx.images-amazon.com/images/G/01/javascripts/lib/popover/images/po_top._V265110086_.png); }\n.ap_popover_unsprited .ap_footer .ap_left   { background-image: url(http://g-ecx.images-amazon.com/images/G/01/javascripts/lib/popover/images/po_bottom_left._V265110084_.png); }\n.ap_popover_unsprited .ap_footer .ap_right  { background-image: url(http://g-ecx.images-amazon.com/images/G/01/javascripts/lib/popover/images/po_bottom_right._V265110087_.png); }\n.ap_popover_unsprited .ap_footer .ap_middle { background-image: url(http://g-ecx.images-amazon.com/images/G/01/javascripts/lib/popover/images/po_bottom._V265110084_.png); }\n\n/* Everything else -- sprited */\n.ap_popover_sprited .ap_body .ap_left, \n.ap_popover_sprited .ap_body .ap_right {\n    background-image: url(http://g-ecx.images-amazon.com/images/G/01/javascripts/lib/popover/images/light/sprite-v._V219326283_.png);\n}\n\n\n.ap_popover_sprited .ap_header .ap_left, \n.ap_popover_sprited .ap_header .ap_right,\n.ap_popover_sprited .ap_header .ap_middle,\n.ap_popover_sprited .ap_footer .ap_left, \n.ap_popover_sprited .ap_footer .ap_right,\n.ap_popover_sprited .ap_footer .ap_middle,\n.ap_popover_sprited .ap_closebutton {\n    background-image: url(http://g-ecx.images-amazon.com/images/G/01/javascripts/lib/popover/images/light/sprite-h._V219326280_.png);\n}\n\n.ap_popover_sprited .ap_body .ap_right-arrow, .ap_popover_sprited .ap_body .ap_left-arrow {\n    background-image: url(http://g-ecx.images-amazon.com/images/G/01/javascripts/lib/popover/images/light/sprite-arrow-v._V219326286_.png);\n}\n\n"]});
});





if (!window.AssocPreviews)
{
window.AssocPreviews = {
  context : {
   "_impression" : "http://www.assoc-amazon.co.uk",
   "_contentURL" : "http://www.amazon.co.uk/gp/associates/previews/content.html",
   "_tag" : "britishempire00",
   "_programID" : "2",
   "_img" : {
      "/associates/network/amazon-logos/amazon-logo-72-b-efedd4" : "<img src=\"http://g-ecx.images-amazon.com/images/G/02/associates/network/amazon-logos/amazon-logo-72-b-efedd4._V152930884_.gif\" width=\"84\" height=\"22\" border=\"0\" />"
   }
}
};
}

document.write('<scr'+'ipt type="text/javascript" src="http://z-ecx.images-amazon.com/images/G/01/browser-scripts/assoc_pp/assoc_pp-1912654784._V1_.js"></scr'+'ipt>');


window.AssocPreviews.importStyles = function(){
         amznJQ.addStyles({urls:[
   "http://z-ecx.images-amazon.com/images/G/01/browser-scripts/assoc_pp_css/assoc_pp_css-1430087270._V1_.css"
]});
};




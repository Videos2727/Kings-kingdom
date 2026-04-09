/* JS */ gapi.loaded_3(function(_){var window=this;
_.D("gapi.plusone.render",_.ic);_.D("gapi.plusone.go",_.kc);
var Wp,Xp,Yp,$p;Wp=function(a,b){if("string"==typeof a){a=a.toLowerCase();var c;for(c=0;c<b.length;c++)if(b[c]==a)return a}};Xp="inline bubble none only pp vertical-bubble".split(" ");Yp=["left","right"];_.Zp=function(a){return Wp(a,Xp)};$p=function(a){return Wp(a,Yp)};_.aq=function(a){a.source=[null,"source"];a.expandTo=[null,"expandTo"];a.align=[$p];a.annotation=[_.Zp];a.origin=[_.Un]};

_.nr=function(a,b){b||(b={});var c=window,d="undefined"!=typeof a.href?a.href:String(a),e=b.target||a.target,f=[],g;for(g in b)switch(g){case "width":case "height":case "top":case "left":f.push(g+"="+b[g]);break;case "target":case "noreferrer":break;default:f.push(g+"="+(b[g]?1:0))}f=f.join(",");if(b.noreferrer){if(c=c.open("",e,f))_.N&&-1!=d.indexOf(";")&&(d="'"+d.replace(/'/g,"%27")+"'"),c.opener=null,d=_.Ed(d),c.document.write('<META HTTP-EQUIV="refresh" content="0; url='+d+'">'),c.document.close()}else c= c.open(d,e,f);return c};

_.CH=function(){var a=_.rd;return!!a&&0<=a.indexOf("CriOS")};_.DH=function(){var a=_.rd;return!!a&&0<=a.indexOf("iPhone")&&0<=a.indexOf("Safari")&&-1==a.indexOf("CriOS")};_.EH=function(a,b){var c=/^https:\/\/([^\/]+\.google\.com)\//.exec(a);c&&-1!=["plus.google.com","plus.sandbox.google.com"].indexOf(c[1])&&(c=b||{},c.noreferrer=!0,(c=_.nr(a,c))&&c.focus())};

var FH,GH;
(function(){var a=null,b=null,c={0:"comments"};c[1]={href:[_.Vn],view_type:[null],query:[null],width:[null],pinned_comment:[null],owner_id:[null],first_party_property:[null],legacy_comment_moderation_url:[null]};var d=function(a,c,d){var e=_.gs(_.Ur(b)).y;c&&_.DH()&&(e-=60);var f=_.Lr().height,p=_.Gr(window.document).y;a=e+a;if(a<p||a>p+f||d)d=a,c&&(d-=f),_.Dr(window.document).scrollTop=d};c[3]={onfirsttimeplusonepromo:!0,onallcommentsclicked:!0,onfirsttimecommenter:!0,onhidefirsttimecommenterpromo:!0,ontimestampclicked:!0,
onshareboxopen:!0,onshownotification:!0,onthumbsup:!0,onupgradeaccount:!0,scroll:function(){return d},openwindow:function(){return _.CH()?_.EH:void 0}};var e=function(){if(b){var a=window.document.getElementById(b);a&&a.parentNode&&a.parentNode.parentNode&&(a.style.width=a.parentNode.parentNode.offsetWidth+"px")}},f=function(){a&&(a.ia&&a.ia(),b=a=null,window.removeEventListener?window.removeEventListener("resize",e):window.detachEvent&&window.detachEvent("onresize",e))};c[5]=function(c,d){"e"==c&&
(f(),a=d[5],b=a.ca(),window.addEventListener?window.addEventListener("resize",e):window.attachEvent&&window.attachEvent("onresize",e))};_.Hp(c);FH=f;GH=function(b){a.send("createComment",{content:b},null,_.xm)}})();_.D("gapi.comments.createComment",GH);_.D("gapi.comments.dispose",FH);

});
// Google Inc.

//
// $Id: swiki.js 151916 2012-03-07 19:49:27Z xinxin@ANT.AMAZON.COM $
//

var Swiki = new Class({
    'initialize':
    function(form) {
      if (!form) form = '0';
      this.form = $('swiki_form.'+form);
      if (this.form) {
        this.form_id = form;
        this.topic_id = this.form['topic_id.'+form].value;
        this.base = this.form['base.'+form].value;
        this.bounce_url = this.form['bounce.'+form].value;
      }
      this.id = 1;
      this.updateBehaviour();
      if (window.ie && !document.documentElement.clientHeight) {
        // mootools really wants strict mode - fix things for IE quirk-smode
        Event.prototype.fixRelatedTarget = function() 
          { this.page.y += document.body.scrollTop; Event.fix.relatedTarget() };
      }
      this.initializeSpacer();
    },
    'xhr': 
    function(action, element, data) {
      element = $(element);
      if (element) element.addClass('busy');
      data.topic = this.topic_id;
      if (this.mode) data.mode = this.mode;
      var ajax =
        new Ajax(this.base + action, 
                 { method: 'post',
                   headers: {'X-L4P': 1},
                   postBody: Object.toQueryString(data),
                   onFailure: function(text) {
                     this.xhrComplete(ajax, element, text, false);
                   }.bind(this),
                   onSuccess: function(text) {
                     this.xhrComplete(ajax, element, text, true);
                   }.bind(this) }).request();
    },
    'xhrComplete':
    function(ajax, element, text, success) {
      if (element) element.removeClass('busy');
      if (window.console) eval(ajax.getHeader("X-L4P"));
      if (success) {
        // did we just create the topic?
        var created = ajax.getHeader("X-Swiki-Create");
        // update our topic id (and push it back to the form)
        if (created) this.topic_id = this.form['topic_id.'+this.form_id].value = created;
        // any pre effects?
        var effect = ajax.getHeader('X-Swiki-FX-Pre');
        if (effect) {
          this.effects(Json.evaluate(effect, true), function() {
                         // update the page when the effects are complete
                         this.update(ajax, text);
                       }.bind(this));
        }
        else {
          // update the page now
          this.update(ajax, text);
        }
      }
      else {
        var error = ajax.getHeader("X-Swiki-Error");
        if (error && (error == 'bounce')) {
          this.bounce();
        }
      }
    },
    'update':
    function(ajax, text) {
      // Opera mangles &quot; inside attributes in innerHTML!
      if (window.opera) text = text.replace(/&quot;/g, '\x01');
      var before, dummy;
      // anything we need to delete?
      var del = ajax.getHeader("X-Swiki-Delete");
      if (del) {
        del = $('swiki'+del);
        if (del) { 
          // replacement nodes will go where deleted node was
          before = del.getNext();
          if (!before) { 
            // bit ugly, but simplifies logic later
            dummy = before = new Element('div');
            dummy.injectInside(del.getParent());
          }
          del.remove();
        }
      }
      // create a new div with the response html in it
      // TODO: does it really need this regexp? (String.trim?)
      var create = new Element('div').setHTML(text.trim());
      // walk through replacing the children
      var walk = create.getFirst();
      while (walk) {
        if (walk.id) {
          var replace = $(walk.id);
          if (replace) {
            // replace element
            var html = walk.innerHTML;
            // Undo our crude escaping for Opera &quot; bug
            if (window.opera) html = html.replace(/\x01/g, '&quot;');
            replace.setHTML(html).className = walk.className;
          }
          else {
            // new element - insert it somewhere
            if (before) {
              // we already know where to put it (because of a delete)
              replace = walk.clone().injectBefore(before);
            }
            else if (walk.id.match(/^before./)) {
              // the id indicates what we should put it before
              before = $(walk.id.substr('before.'.length));
              // but we only want the contents 
              replace = walk.getFirst().clone().injectBefore(before);
            }
          }
        }
        // keep on going
        walk = walk.getNext();
      }
      // cleanup
      if (dummy) dummy.remove();
      // reset any stuff
      this.updateBehaviour();
      // goodbye advert, you had your chance.
      var tn15adrhs = $('tn15adrhs');
      if (tn15adrhs) {
        tn15adrhs.parentNode.removeChild(tn15adrhs);
      }
      // any post effects?
      var effect = ajax.getHeader('X-Swiki-FX-Post');
      if (effect) this.effects(Json.evaluate(effect, true));
    },
    'effects': 
    function(effect, oncomplete) {
      effect = effect.map
      (function(item) {
        if (item[1] == 'Fx.Scroll') {
          // ugh, Fx.Scroll isn't very robust, so drop it here
          eval(item[2].replace(/toElement/, '$')).scrollIntoView(true);
          return null;
        }
        var element = ((item[0] == 'window') ? window : $(item[0]));
        if (element) {
          if (!element.fx) element.fx = eval('new '+item[1]+'(element)');
          var code = 'element.fx.'+item[2];
          if (item[3]) code = '(function(){'+code+'}).delay('+item[3]+')';
          eval(code);
          counter++;
          return element.fx;
        }
        return null;
      });
      if (oncomplete) {
        var counter = 1;
        var grouper = function() { if (!--counter) oncomplete() };
        effect.forEach(function(item) { 
                         if (item) {
                           counter++;
                           item.addEvent('onComplete', grouper);
                         }
                       });
        grouper();
      }
    },
    'save':
    function(element, args) {
      element = $(element);
      if (element) element.addClass('busy');
      if (!args.path) return;
      $ES('input,textarea,select', this.form).
      forEach(function(element) {
                if ((element.name.length > 0) &&
                    (element.name.indexOf(args.path) == 0)) {
                  args[element.name] = element.getValue();
                }
              });
      this.xhr('save', element, args);
    },
    'historyShow':
    function(args) {
      if ($('swiki'+args.path+'.history.show').checked) {
        $('swiki'+args.path+'.history.compare').removeClass('hide');
      }
      else {
        $('swiki'+args.path+'.history.compare').addClass('hide');
      }
      this.historyChangeVersion(args);
    },
    'historyChangeVersion':
    function(args) {
      var version = $('swiki'+args.path+'.history.version');
      var other = $('swiki'+args.path+'.history.other');
      for (var index = 0; index < other.options.length - 1; index++) {
        other.options[index].disabled = (index <= version.selectedIndex);
      }
      other.options[other.options.length - 1].disabled = true;
      other.selectedIndex = version.selectedIndex + 1;
      $('b'+args.path+'.revert').disabled = (version.selectedIndex == 0);
      this.historyView(args);
    },
    'historyView':
    function(args) {
      var element = $('control'+args.path+'.button');
      args.version = $('swiki'+args.path+'.history.version').getValue();
      if ($('swiki'+args.path+'.history.show').checked) {
        var other = $('swiki'+args.path+'.history.other').getValue();
        if (other) {
          args.compare = other;
          this.xhr('diff', element, args);
        }
      }
      else {
        this.xhr('version', element, args);
      }
    },
    'revert':
    function(element, args) {
      element = $(element);
      args.version = $('swiki'+args.path+'.history.version').getValue();
      this.xhr('revert', element, args);
    },
    'del':
    function(element, args) {
      element = $(element);
      var path = args.path;
      var del = $('swiki'+path);
      if (del) del.remove();
      var empty = $('swiki_empty');
      if (empty) empty.removeClass('hide');
    },
    'sortable':
    function(element) {
      var sortable = new Sortables
        (element,
         { onComplete: function() {
             $(element.id + '.save').value = sortable.serialize();
           }
         });
    },
    'spoiler':
    function(element) {
      element.onmouseover = function() { Element.addClass(this, 'hover') };
      element.onmouseout = function() { Element.removeClass(this, 'hover') };
    },
    'tabTweak':
    function() {
      var control2 = $('swiki_control2');
      var body = $('swiki_body');
      if (control2) {
        var doc = body.getSize().size.y;
        var win;
        if (window.innerHeight) win = window.innerHeight;
        else if (document.documentElement && 
                 document.documentElement.clientHeight) 
          win = document.documentElement.clientHeight;
        else if (document.body) win = document.body.clientHeight;
        if (doc > (win * 2)) {
          var control = $('swiki_control');
          control2.style.width = $('swiki_body').offsetWidth + 'px';
          control2.style.display = 'block';
        }
        else {
          control2.style.display = 'none';
        }
      }
    }, 
    'updateBehaviour':
    function() {
      $$('.sortable').each(this.sortable.bind(this));
      $$('.spoiler').each(this.spoiler.bind(this));
      this.tabTweak();
    },
    'bounce':
    function() {
      var url = (this.bounce_url || '/help/additional_authentication?u=');
      if (this.testing && confirm("bounce:" + url)) return;
      document.location = url + document.location.pathname;
    },
    'action':
    function(element, action, args) {
      var empty = $('swiki_empty');
      if (empty) empty.addClass('hide');
      // TODO: move this message somewhere else
      if (args.confirm && !confirm('Are you sure you want to delete this?\n\n(You can use the history to revert the delete later)')) return;
      this.xhr(action, element, args);
    },
    'tocToggle':
    function(path) {
      if (!this.toc) this.toc = {};
      var s = this.toc[path];
      if (s && ($('toc.'+path) != s.outer)) s = null;
      if (!s) {
        this.toc[path] = s = { };
        s.outer = $('toc.'+path);
        s.inner = (s.outer.getElementsByClassName('toc-main'))[0];
        s.hidden = false;
        s.slide = new Fx.Slide(s.inner, 
                               { duration: 250,
                                 onComplete: function() {
                                   if ((s.hidden = !s.hidden))
                                     s.outer.addClass('toc-hide');
                                 } });
      }
      s.outer.removeClass('toc-hide');
      s.slide.toggle();
    },
    'initializeSpacer': 
    function() {
        if (!('generic' in window)) {
            // no ads on this page (pro site)
            return;
        }
        // Yes - I've put jQuery in a mootools class.
        // Hopefully we can incrementally remove mootools and include
        // more jQuery
        generic.on_document_ready(function(){

            var $advert = jQuery('#tn15adrhs'),
                $spacer = jQuery('#swiki_ad_spacer'),
                margin_top = 0;
                
            if ($spacer.length === 0) {
                $spacer = jQuery('<div id="swiki_ad_spacer"></div>')
                .insertBefore('#swiki_body_top');
            }

            // Update the spacer as the page and top_rhs reflow
            jQuery(window).add('#top_rhs')
            .unbind('load.swiki expand_ad')
            .bind('load.swiki expand_ad', function(){
                // Resize the spacer
                // Didn't use jquery's height() and wdith() because of a lame bug in IE9 that caused the miscalculation of the value
                // See tt: https://tt.amazon.com/0013587019
                $spacer.css({
                    width:$advert[0].offsetWidth+"px",
                    height:$advert[0].offsetHeight+"px"
                });
                
                consoleLog('spacer resized', 'swiki');
                
                margin_top = $spacer.position().top -
                    $advert.siblings(':visible').position().top;
                    
                $advert
                .addClass('swiki')
                .css('margin-top', margin_top);
                
            });
            
            jQuery(window).trigger('load.swiki');
        });


    }
  });


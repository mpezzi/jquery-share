/*
 * jQuery Share Plugin by M. Pezzi
 * http://thespiral.ca/jquery/share/demo/
 * Version: 1.0 (03/07/11)
 * Dual licensed under the MIT and GPL licences:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires: jQuery v1.4.2 or later
 */

;(function($){
  
  $.fn.share = function(settings) {
    return this.each(function(){
      var self      = $(this), o = $.extend({}, $.fn.share.defaults, settings || {}),
          
          services  = $.fn.share.services,
          fragment  = ( document.location.hash.substring(1) == self.attr('id') ),
          host      = o.host || document.URL,
          url       = o.url || document.URL,
          title     = o.title || document.title,
          
          _share    = $('<div />').attr('class', o.cssclass),
          _list     = $('<ul />').appendTo(_share);
      
      // Override defaults and settings with element attributes.
      url = self.attr('data-share-url') || url;
      title = self.attr('data-share-title') || title;
      
      // Add enabled services to the share list.
      $.each( o.included || getkeys(services) , function(i, name){
        if ( services.hasOwnProperty(name) && $.inArray(name, o.excluded) == -1 ) {
          var s     = services[name],
              href  = String(s.url).replace('${title}', o.prepend + title + o.append).replace('${url}', url).replace('${host}', host),
              _item = $('<li />').addClass(this).appendTo(_list),
              _link = $('<a />').addClass('share-' + this + '-' + o.iconset)
                        .attr('href', href).attr('target', o.target).html(s.name).appendTo(_item);
        }
      });
      
      // Build return object for callbacks.
      var callback_return = { trigger: self, list: _share };
      
      // Set default state as hidden.
      self.data('state', false);
      
      // Listen for mouse events.
      self.bind('click', function(e){
        var state = self.data('state');
        state ? o.hide(callback_return) : o.show(callback_return);
        self.data('state', !state);
      });
      
      // If fragmenting is enabled add to link.
      if ( o.fragment ) {
        self.attr('href', '#' + self.attr('id'));
      }
      
      // If fragment checking is enabled and is active, open share list on page load.
      if ( o.fragment && fragment ) {
        o.show(callback_return);
      }
      
      o.load(callback_return);
    });
  };
  
  // Default settings.
  $.fn.share.defaults = {
    cssclass: 'jquery-share',
    included: null,
    excluded: [],
    prepend: '',
    append: '',
    target: '_blank',
    fragment: false,
    hover: false,
    title: null,
    url: null,
    host: null,
    iconset: '32',
    iconsettype: 'png',
    show: function() {},
    load: function() {},
    hide: function() {}
  };
  
  // Availble sharing services.
  $.fn.share.services = {
    twitter:      { name: 'Twitter', url: 'http://twitter.com/home?status=${title}%20${url}' },
    facebook:     { name: 'Facebook', url: 'http://facebook.com/sharer.php?u=${url}' },
    digg:         { name: 'Digg', url: 'http://digg.com/submit?phase=2&amp;url=${url}&amp;title=${title}' },
    stumbleupon:  { name: 'Stumbleupon', url: 'http://stumbleupon.com/submit?url=${url}&amp;title=${title}' },
    reddit:       { name: 'Reddit', url: 'http://reddit.com/submit?url=${url}&amp;title=${title}' },
    delicious:    { name: 'Delicious', url: 'http://del.icio.us/post?url=${url}&amp;title=${title}' }
  };
  
  function getkeys(obj) {
    var a = [];
    $.each(obj, function(k) { a.push(k) });
    return a;
  }
  
})(jQuery);

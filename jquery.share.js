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
          title     = o.title || document.title,
          url       = o.url || document.URL,
          host      = o.host || document.URL,
          
          _share    = $('<div />').attr('id', o.id),
          _list     = $('<ul />').appendTo(_share);
      
      // Add enabled services to the share list.
      $.each( o.included || services.keys() , function(i, name){
        if ( services.hasOwnProperty(name) && $.inArray(name, o.excluded) == -1 ) {
          var s     = services[name],
              href  = String(s.url).replace('${title}', title).replace('${url}', url).replace('${host}', host),
              _item = $('<li />').addClass(this).appendTo(_list),
              _link = $('<a />').addClass('share-' + this + '-' + o.iconset)
                        .attr('href', href).html(s.name).appendTo(_item);
        }
      });
      
      self.bind('mouseup', function(e){
        var state = self.data('state');
        state ? o.show(_share) : o.hide(_share);
        self.data('state', !state);
      });
      
      o.load(_share);
    });
  };
  
  // Default settings.
  $.fn.share.defaults = {
    id: 'jquery-share',
    included: null,
    excluded: null,
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
  
  // Extend Object prototype.
  Object.prototype.keys = function() {
    var keys = [];
    for ( var key in this ) {
      keys.push(key);
    }
    return keys;
  };
  
})(jQuery);

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
          
          _share    = $('<div class="jquery-share" />'),
          _list     = $('<ul />').appendTo(_share);
      
      $.each( o.services || services.keys() , function(){
        if ( services.hasOwnProperty(this) ) {
          var _service  = services[this],
              _url      = _service.url,
              _url_p    = _url.replace('${title}', title).replace('${url}', url).replace('${host}', host),
              _item     = $('<li />').addClass(this).appendTo(_list),
              _link     = $('<a />').attr('href', _url_p).html(_service.name).appendTo(_item);
        }
      });
      
      self.bind('mouseup', function(e){
        o.show(e, _share);
      });
    });
    
  };
  
  // Default settings.
  $.fn.share.defaults = {
    services: null,
    hover: false,
    title: null,
    url: null,
    host: null,
    show: function() {},
    hide: function() {}
  };
  
  // Availble sharing services.
  $.fn.share.services = {
    twitter:      { name: 'Twitter', url: 'http://twitter.com/home?status=${title}%20${url}' },
    facebook:     { name: 'Facebook', url: 'http://facebook.com/sharer.php?u=${url}' },
    digg:         { name: 'Digg', url: 'http://digg.com/submit?phase=2&url=${url}&title=${title}' },
    stumbleupon:  { name: 'Stumbleupon', url: 'http://stumbleupon.com/submit?url=${url}&title=${title}' },
    buzz:         { name: 'Buzz', url: 'http://google.com/reader/link?url=${url}&title=${title}&srcURL=${host}' },
    delicious:    { name: 'Delicious', url: 'http://del.icio.us/post?url=${url}&title=${title}' }
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

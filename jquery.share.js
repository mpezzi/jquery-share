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
      var self   = $(this), o = $.extend({}, $.fn.share.defaults, settings || {})
          share  = $('<div class="jquery-share" />'),
          list   = $('<ul />').appendTo(share),
          title  = o.title || document.title,
          url    = o.url || document.URL,
          host   = o.host || url;
      
      $.each( ( o.services == null ) ? available_services() : o.services, function(){
        if ( typeof $.fn.share.services[this] !== 'undefined' ) {
          var service_url = $.fn.share.services[this].url,
              service_url_replace = service_url.replace('${title}', title).replace('${url}', url).replace('${host}', host);
          
          var item = $('<li />').addClass(this).appendTo(list),
              link = $('<a />').attr('href', service_url_replace).html($.fn.share.services[this].name).appendTo(item);
        }
      });
      
      self.bind('mouseup', function(e){
        if ( o.show )
          o.show(e, share);
      });
    });
    
    function available_services() {
      var available = [];
      
      $.each($.fn.share.services, function(key, service){
        available.push(key);
      });
      
      return available;
    }
  };
  
  // Default settings.
  $.fn.share.defaults = {
    services: null,
    hover: false,
    title: null,
    url: null,
    host: null,
    show: null,
    hide: null
  };
  
  // Availble share services.
  $.fn.share.services = {
    twitter:      { name: 'Twitter', url: 'http://twitter.com/home?status=${title}%20${url}' },
    facebook:     { name: 'Facebook', url: 'http://facebook.com/sharer.php?u=${url}' },
    digg:         { name: 'Digg', url: 'http://digg.com/submit?phase=2&url=${url}&title=${title}' },
    stumbleupon:  { name: 'Stumbleupon', url: 'http://stumbleupon.com/submit?url=${url}&title=${title}' },
    buzz:         { name: 'Buzz', url: 'http://google.com/reader/link?url=${url}&title=${title}&srcURL=${host}' },
    delicious:    { name: 'Delicious', url: 'http://del.icio.us/post?url=${url}&title=${title}' }
  };
  
})(jQuery);

////
// Header scroll class
$(window).scroll(function() {
  if ($(this).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  } else {
    $('#header').removeClass('header-scrolled');
  }
});
if ($(window).scrollTop() > 100) {
  $('#header').addClass('header-scrolled');
}
(function($){
  $(window).on("load",function(){
    
    /* Page Scroll to id fn call */
    $("#MainMenu a,a[href='#top'],a[rel='m_PageScroll2id']").mPageScroll2id({
      highlightSelector:"#MainMenu a"
    });
    
    /* demo functions */
    $("a[rel='next']").click(function(e){
      e.preventDefault();
      var to=$(this).parent().parent("section").next().attr("id");
      $.mPageScroll2id("scrollTo",to);
    });
    
  });
})(jQuery);
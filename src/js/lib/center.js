(function ($) {

  $.fn.verticalCenter = function () {
    this.css({
      'top': "50%",
      'margin-top': this.outerHeight() / -2
    });
  };

  $.fn.horizontalCenter = function () {
    this.css({
      'left': "50%",
      'margin-left': this.outerHeight() / -2
    });
  };

})(jQuery);
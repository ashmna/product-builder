function Context() {
  var that = this
    , mainContext = $('.main')
    , canvasContext = mainContext.find('.canvas')
    , thumbsContext = $('.tool-footer .thumbs')
    ;

  that.getContext = function () {
    return mainContext;
  };

  that.getCanvasContext = function () {
    return canvasContext;
  };

  that.getThumbsContext = function () {
    return thumbsContext;
  };

  that.getButtonContext = function (type) {
    return mainContext.find(".action-button-"+type);
  };

  // Constructor


}

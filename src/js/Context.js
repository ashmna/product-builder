function Context() {
  var that = this
    , mainContext = $('.main')
    , canvasContext = mainContext.find('.canvas')
    ;

  that.getContext = function () {
    return mainContext;
  };

  that.getCanvasContext = function () {
    return canvasContext;
  };

  // Constructor


}

function Context(mainContext)
{
  var that = this
    , canvasContext = mainContext.find('.canvas')
    , thumbsContext = mainContext.find('.tool-footer .thumbs')
    , toolRightContext = mainContext.find('.tool-right')
    ;

  that.getContext = function () {
    return mainContext;
  };

  that.getCanvasContext = function () {
    return canvasContext;
  };

  that.getToolRightContext = function () {
    return toolRightContext;
  };

  that.getThumbsContext = function () {
    return thumbsContext;
  };

  that.getButtonContext = function (type) {
    return mainContext.find(".action-button-"+type);
  };

  // Constructor


}

Context.idCounter = 1000;

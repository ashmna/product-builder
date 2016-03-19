function PanelBoard(toolContext)
{
  var that     = this
    , hasChild = false
    ;

  that.context = null;

  // Pubic Methods

  that.init = function () {
    initBoard();
  };

  that.run = function () {
    if (hasChild) {
      that.context.verticalCenter();
      that.context.css({
        left: that.context.outerWidth() * 1.5,
        opacity: 0.5
      });
    } else {
      that.context.hide();
    }
  };

  that.show = function () {
    that.context.animate({
      left: 0,
      opacity: 1
    }, Effects.fastSpeed, Effects.easing);
  };

  that.hide = function () {
    that.context.animate({
      left: that.context.outerWidth() * 1.5,
      opacity: 0.5
    }, Effects.fastSpeed, Effects.easing);
  };

  that.append = function(panel) {
    that.context.append(panel);
    hasChild = true;
  };

  // Private Methods

  function initBoard() {
    that.context = $('<div class="board panel"></div>');
    that.context.css({
      left: that.context.outerWidth() * 1.5,
      opacity: 0.5
    });
    toolContext.append(that.context);
  }

  // Call Constructor
  that.init();
}
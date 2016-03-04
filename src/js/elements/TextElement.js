function TextElement()
{
  // Extends
  Element.apply(this, arguments);

  var that = this
    , el = null
    ;
  that.type = "Text Element";

  // Public Methods

  /**
   *  Text Element Constructor
   */
  that.init = function () {
    initDefault();
    initElement();
    doStyling();
    that.context.append(el);
  };

  // Private Methods

  function initDefault() {
    var defaultVal = {
      "text"        : "Your Favorite Text Hear.",
      "font-family" : "sans-serif",
      "font-size"   : "14px",
      "color"       : "#000",
      "text-align"  : "center",
    };
    for(var key in defaultVal) {
      //noinspection JSUnfilteredForInLoop
      if(!that.params[key]) {
        //noinspection JSUnfilteredForInLoop
        that.params[key] = defaultVal[key];
      }
    }
  }

  function initElement() {
    el = $('<span class="element-text">' + that.params.text + '</span>');
  }

  function doStyling() {
    el.css({
      "font-family" : that.params["font-family"],
      "font-size"   : that.params["font-size"],
      "color"       : that.params["color"],
      "text-align"  : that.params["text-align"],
    });
  }

  that.subscribe('drag', function(event, ui) {
    console.log("drag", event, ui);
  });

  that.subscribe('resize', function(event, ui) {
    console.log("resize", event, ui);
  });

  that.subscribe('rotate', function(event, ui) {
    console.log("rotate", event, ui);
  });


  that.init();
}

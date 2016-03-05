function TextElement()
{
  // Extends
  Element.apply(this, arguments);

  var that = this
    , el = null
    , editPointContext = null
    , w = 0
    , h = 0
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
    initEditable();
    that.context.append(el);
    w = that.position.width;
    h = that.position.height;
    //that.context.draggable( "option", "helper", that.context.);
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
    el = $('<span class="element-text" spellcheck="false">' + that.params.text + '</span>');
  }

  function initEditable() {
    el.dblclick(startEditor);
    el.focusout(endEditor);
    editPointContext = $('<div class="helper-point helper-edit-text"> <em class="fa fa-pencil"></em></div>');
    editPointContext.click(startEditor);
    that.context.append(editPointContext);
  }

  function startEditor() {
    that.context.draggable( "option", "disabled", true);
    el.attr("contenteditable", true);
    el.focus();
    el.selectText();
    that.broker.deactivate();
  }

  function endEditor() {
    that.context.draggable( "option", "disabled", false);
    el.attr("contenteditable", false);
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
    //console.log("drag", event, ui);
  });

  that.subscribe('resize', function(event, ui) {
    var pix = ( (ui.size.width - w) && (ui.size.height -h) ) * 0.4;
    if(Math.abs(pix) >= 1) {
      that.params["font-size"] = parseInt(that.params["font-size"]) + pix + "px";
      doStyling();
    }

    w = ui.size.width;
    h = ui.size.height;
    //console.log("resize", event, ui);
  });

  that.subscribe('rotate', function(event, ui) {
    //console.log("rotate", event, ui);
  });

  jQuery.fn.selectText = function(){
    var element = this[0]
      , range
      ;
    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      var selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };


  that.init();
}

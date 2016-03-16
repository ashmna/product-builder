function FixTextElement()
{
  // Extends
  Element.apply(this, arguments);

  var that = this
    , el = null
    , editPointContext = null
    ;
  that.type = "Fix Text";

  // Public Methods

  /**
   *  Fix Text Element Constructor
   */
  that.init = function () {
    initDefault();
    initElement();
    //initEditable();
    doStyling();
  };

  that.setText = function(text) {
    that.params["text"] = text;
    doStyling();
  };

  that.getText = function() {
    return that.params["text"];
  };

  // Private Methods
  function initDefault() {
    var defaultVal = {
      "text"        : "Your Favorite Text Hear.",
      "font-family" : "'Covered By Your Grace', cursive",
      "font-size"   : "28px",
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
    that.context.append(el);
  }

  function initEditable() {
    el.dblclick(startEditor);
    el.focusout(endEditor);
    editPointContext = $('<div class="helper-point helper-edit-text"> <em class="fa fa-pencil"></em></div>');
    editPointContext.click(startEditor);
    that.context.append(editPointContext);
  }

  function startEditor() {
    //that.context.draggable( "option", "disabled", true);
    el.attr("contenteditable", true);
    el.focus();
    el.selectText();
    that.broker.deactivate();
  }

  function endEditor() {
    //that.context.draggable( "option", "disabled", false);
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


  // Call constructor
  that.init();
}

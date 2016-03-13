function TextElement()
{
  // Extends
  Element.apply(this, arguments);

  var that = this
    , el = null
    , editPointContext = null
    , w = 0
    , h = 0
    , alsoResize = false
    , startFontSize = 0
    ;
  that.type = "Text Element";

  // Public Methods

  /**
   *  Text Element Constructor
   */
  that.init = function () {
    initResizable();
    that.initRotatable();
    that.initDraggable();
    that.initDeletable();

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
  function initResizable() {
    var resizable = that.initResizable();
    var e = $('<div class="ui-my-resizable-handle ui-resizable-e" style="z-index: 90;"></div>');
    var s = $('<div class="ui-my-resizable-handle ui-resizable-s" style="z-index: 90;"></div>');
    resizable.append(e).append(s);
    var resizableHandles = resizable.resizable("option", "handles");
    resizableHandles.e = e;
    resizableHandles.s = s;


    resizableHandles.se.mousedown(function () {
      alsoResize = true;
    });

    resizable.on( "resizestop", function() {
      alsoResize = false;
    });

    resizable.on( "resizestart", function(event, ui) {
      if(alsoResize) {
        w = ui.size.width;
        h = ui.size.height;
        startFontSize = parseInt(that.params["font-size"]);

        alsoResize = w / h;
      }
    });


    resizable.resizable("option", "handles", resizableHandles);
    refresh();

    function refresh() {
      var options = resizable.resizable( "option" );
      resizable.resizable("destroy").resizable(options);
    }
  }

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
    if(alsoResize !== false) {
      ui.size.width = alsoResize * ui.size.height;

      that.params["font-size"] = ui.size.width / w * startFontSize + "px";
      doStyling();
    }
  });

  that.subscribe('rotate', function(event, ui) {
    //console.log("rotate", event, ui);
  });



  // Call Constructor

  that.init();
}

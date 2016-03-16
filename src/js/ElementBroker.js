function ElementBroker(context, borders, elements) {

  var that                  = this;
  that.currentActiveElement = null;
  that.indexCounter         = 0;
  that.list                 = {};

  // Public Methods

  that.append = function (elementObj) {
    context.append(elementObj.getContext());
    that.list[elementObj.id] = elementObj;
  };

  that.detach = function (elementObj) {
    if(that.list[elementObj.id]) {
      delete that.list[elementObj.id];
    }
    elementObj.getContext().fadeOut(Effects.fastSpeed, Effects.easing, function () {
      elementObj.getContext().remove();
    });
  };

  that.activate = function (elementObj) {
    if (that.currentActiveElement != elementObj) {
      if (that.currentActiveElement) {
        that.currentActiveElement.deactivate();
      }
      that.currentActiveElement = elementObj;
      elementObj.activate();
      elementObj.getContext().css({zIndex: ++that.indexCounter});
    }
  };

  that.deactivate = function() {
    if (that.currentActiveElement) {
      that.currentActiveElement.deactivate();
    }
    that.currentActiveElement = null;
  };

  that.createNewElement = function(type) {
    var position = {x: 230, y: 120, width: 100, height: 40, angle: 0}
      , params = {}
      , elementObj
      ;
    elementObj = elementFactory(type, position, params);
    that.activate(elementObj);
    return elementObj;
  };

  that.appendPanel = function(panelElement) {
    $("#panel_1").append(panelElement);
    // TODO: append panel tool element in panel context
  };

  // Private Methods

  function initElements() {
    var i = 0, elementClass;

    for (; i < elements.length; ++i) {
      elementFactory(elements[i].type, elements[i].position, elements[i].params);
    }
  }

  function elementFactory(type, position, params) {
    var id = ++Context.idCounter + '_element';
    var elementInstance = null;

    switch (type) {
      case "Fix Text" :
        elementInstance = FixTextElement(id, that, borders, position, params);
        var panelToolInstance = new FixTextPanel(id, that, params)
        break;
      case "Text" :
        elementInstance = new TextElement(id, that, borders, position, params);
        break;
      case "Image" :
        elementInstance = new ImageElement(id, that, borders, position, params);
        break;
      case "SVG" :
        elementInstance = new SvgElement(id, that, borders, position, params);
        break;
      default:
        elementInstance = new Element(id, that, borders, position, params);
    }
    return elementInstance;
  }

  // Calll Constructor
  initElements();
}

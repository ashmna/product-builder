function ElementBroker(context, borders, elements) {

  var that = this;
  that.currentActiveElement = null;
  that.indexCounter = 0;
  that.list = [];

  // Public Methods

  that.append = function (elementObj) {
    context.append(elementObj.getContext());
    that.list.push(elementObj);
  };

  that.detach = function (elementObj) {
    if(that.list.indexOf(elementObj) != -1) {
      that.list.splice(that.list.indexOf(elementObj), 1);
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

  // Private Methods

  function initElements() {
    var i = 0, elementClass;

    for (; i < elements.length; ++i) {
      elementFactory(elements[i].type, elements[i].position, elements[i].params);
    }
  }

  function elementFactory(type, position, params) {
    switch (type) {
      case "Text Element" :
        return new TextElement(that, borders, position, params);
      case "Image Element" :
        return new ImageElement(that, borders, position, params);
      case "SVG Element" :
        return new SvgElement(that, borders, position, params);
      default:
        return new Element(that, borders, position, params);
    }
  }

  // Constructor

  initElements();
}

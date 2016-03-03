function ElementBroker(context, borderContext, elements) {

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
    var position = {x: 50, y: 50, width: 100, height: 80}
      , params = {}
      ;
    return elementFactory(type, position, params);
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
        return new TextElement(that, borderContext, position, params);
      case "Image Element" :
        return new ImageElement(that, borderContext, position, params);
      case "SVG Element" :
        return new SvgElement(that, borderContext, position, params);
      default:
        return new Element(that, borderContext, position, params);
    }
  }

  // Constructor

  initElements();
}

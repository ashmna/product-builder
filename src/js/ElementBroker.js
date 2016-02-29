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

  // Private Methods

  function initElements() {
    var i = 0;

    for (; i < elements.length; ++i) {
      new Element(that, borderContext, elements[i].position, elements[i].params);
    }
  }

  // Constructor

  initElements();
}

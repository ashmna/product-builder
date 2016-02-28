function Product(broker, data) {
  var that = this;
  that.broker = broker;
  that.title = data.title;
  that.image = data.image;
  that.container = data.container;
  that.context = null;
  that.elementsContext = null;
  that.borderContext = null;


  // Public Methods

  that.getContext = function () {
    return that.context;
  };

  that.getElementsContext = function () {
    return that.elementsContext;
  };

  that.getBorderContext = function () {
    return that.borderContext;
  };

  // Private Methods

  function initProductContext() {
    that.context = $('\
      <div class="product">\
        <div class="product-background">\
          <img class="product-background-image" src="'+that.image+'">\
        </div>\
        <div class="border elements"></div>\
      </div>');
    that.elementsContext = that.context.find('.elements');
    that.borderContext = that.context.find('.border');
    that.borderContext.css({
      width  : that.container.w,
      height : that.container.h,
      top    : that.container.t,
      left   : that.container.l
    });
  }

  // Constructor

  initProductContext();
  that.broker.append(that);
}

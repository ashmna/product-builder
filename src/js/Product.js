function Product(broker, data) {
  var that = this;
  that.broker = broker;
  that.title = data.title;
  that.image = data.image;
  that.container = data.container;
  that.context = null;
  that.elementsContext = null;
  that.thumbContext = null;
  that.borderContext = null;


  // Public Methods

  that.getContext = function () {
    return that.context;
  };

  that.getElementsContext = function () {
    return that.elementsContext;
  };

  that.getThumbContext = function () {
    return that.thumbContext;
  };

  that.getBorderContext = function () {
    return that.borderContext;
  };

  that.activate = function () {
    that.thumbContext.addClass('active');
  };

  that.deactivate = function () {
    that.thumbContext.removeClass('active');
  };

  // Private Methods

  function initProductContext() {
    //that.context = $('\
    //  <div class="product" style="display: none">\
    //    <div class="product-background">\
    //      <img class="product-background-image" src="'+that.image+'">\
    //    </div>\
    //    <div class="border elements"></div>\
    //  </div>');
    that.context = $('\
      <svg width="500" height="500" style="border: 1px solid #000;">\
      </svg>\
      ');

    that.thumbContext = $('\
      <li>\
        <div class="product-thumb-viewer"></div>\
        <div class="view-name">'+that.title+'</div>\
      </li>');

    that.elementsContext = that.context.find('.elements');
    that.borderContext = that.context.find('.border');
    that.borderContext.css({
      width  : that.container.w,
      height : that.container.h,
      top    : that.container.t,
      left   : that.container.l
    });
    that.thumbContext.click(function(){
      that.broker.activate(that);
    });
  }

  // Constructor

  initProductContext();
  that.broker.append(that);
}

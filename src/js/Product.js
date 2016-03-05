function Product(broker, data)
{
  var that = this;
  that.broker = broker;
  that.title = data.title;
  that.image = data.image;
  that.containers = data.containers;
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
    that.context = $('\
      <div class="product" style="display: none">\
        <div class="product-background">\
          <img class="product-background-image" src="'+that.image+'">\
        </div>\
      </div>');
    that.thumbContext = $('\
      <li>\
        <div class="product-thumb-viewer"></div>\
        <div class="view-name">'+that.title+'</div>\
      </li>');

    that.elementsContext = that.context.find('.elements');
    that.thumbContext.click(function(){
      that.broker.activate(that);
    });
  }

  function initBorders() {
    var i = 0
      , tmpBorder
      ;
    for(; i< that.containers.length ; ++i) {
      tmpBorder = $('<div class="border elements"></div>').css({
        width  : that.containers[i].width,
        height : that.containers[i].height,
        left   : that.containers[i].x,
        top    : that.containers[i].y
      });
      that.context.append(tmpBorder);
    }
  }

  // Constructor

  initProductContext();
  initBorders();
  that.broker.append(that);
}

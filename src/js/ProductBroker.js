function ProductBroker(cxt, war)
{
  var that = this
    , idCounter = 1000
    ;
  that.currentActiveProduct = null;
  that.currentActiveProductBroker = null;
  that.list = {};

  // Public Methods

  that.append = function (productObj) {
    cxt.getCanvasContext().append(productObj.getContext());
    cxt.getThumbsContext().append(productObj.getThumbContext());
  };

  that.activate = function (productObj) {
    if (that.currentActiveProduct != productObj) {
      if (that.currentActiveProduct) {
        that.currentActiveProduct.deactivate();
        that.currentActiveProduct.getContext().fadeOut(Effects.fastSpeed, Effects.easing, function(){
          productObj.getContext().fadeIn(Effects.fastSpeed, Effects.easing);
        });
      } else {
        productObj.getContext().fadeIn(Effects.fastSpeed, Effects.easing);
      }
      that.currentActiveProduct = productObj;
      that.currentActiveProductBroker = that.list[that.currentActiveProduct.id].broker;
      productObj.activate();
    }
  };

  that.createNewElement = function(type) {
    if(that.currentActiveProductBroker) {
      that.currentActiveProductBroker.createNewElement(type);
    }
  };

  // Private Methods

  function initProducts() {
    var i = 0, product, broker;

    for (; i < war.length; ++i) {
      product = new Product(that, war[i]);
      broker = new ElementBroker(product.getContext(), product.getBorderContext(), war[i].elements || []);
      product.id = broker.id = ++idCounter+"_el";
      that.list[product.id] = {
        "product" : product,
        "broker"  : broker
      }
    }
  }

  function initAutoDeactivate() {
    $(document).click(function(event){
      var $tg = $(event.target);
      if( $tg.hasClass('element') || $tg.closest('.element').length || $tg.closest('.nd').length) {
      } else {
        if(that.currentActiveProductBroker) {
          that.currentActiveProductBroker.deactivate();
        }
      }
    });
  }

  function initEvents() {
    cxt.getButtonContext("text").click(function(){
      that.createNewElement("Text Element");
    });
  }

  // Constructor

  initProducts();
  initAutoDeactivate();
  initEvents();

}

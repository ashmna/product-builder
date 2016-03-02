function ProductBroker(cxt, war)
{
  var that = this;
  that.currentActiveProduct = null;
  that.list = [];

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
      productObj.activate();
    }
  };

  // Private Methods

  function initProducts() {
    var i = 0, product, broker;

    for (; i < war.length; ++i) {
      product = new Product(that, war[i]);
      broker = new ElementBroker(product.getContext(), product.getBorderContext(), war[i].elements || []);
      that.list.push({
        "product" : product,
        "broker"  : broker
      });
    }
  }

  // Constructor

  initProducts();

}

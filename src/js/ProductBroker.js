function ProductBroker(context, war) {
  var that = this;
  that.list = [];

  // Public Methods

  that.append = function (productObj) {
    context.append(productObj.getContext());
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

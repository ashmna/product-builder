function ProductBroker(cxt, productsData)
{
  var that = this
    , dialog = new Dialog(cxt.getContext())
    ;
  that.currentActiveProduct = null;
  that.currentActiveProductBroker = null;
  that.currentActiveBoard = null;
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
          productObj.getContext().fadeIn(Effects.fastSpeed, Effects.easing, function(){
            that.currentActiveBoard.show();
          });
        });
        that.currentActiveBoard.hide();
      } else {
        productObj.getContext().fadeIn(Effects.fastSpeed, Effects.easing, function(){
          that.currentActiveBoard.show();
        });
      }
      that.currentActiveProduct = productObj;
      that.currentActiveProductBroker = that.list[that.currentActiveProduct.id].broker;
      that.currentActiveBoard = that.list[that.currentActiveProduct.id].board;
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
    var ids = []
      , i = 0
      , product
      , broker
      , board
      ;

    for (; i < productsData.length; ++i) {
      product = new Product(that, productsData[i]);
      board   = new PanelBoard(cxt.getToolRightContext());
      broker  = new ElementBroker(product.getContext(), board, productsData[i].containers, productsData[i].elements || []);
      board.run();
      product.id = broker.id = board.id = ++Context.idCounter + "_product";
      ids.push(product.id);
      that.list[product.id] = {
        "product" : product,
        "broker"  : broker,
        "board"   : board
      }
    }
    if(ids.length) {
      that.activate(that.list[ids[0]].product);
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
    //cxt.getButtonContext("product").click(function(){
    //  dialog.showDesign();
    //});
    cxt.getButtonContext("design").click(function(){
      dialog.showDesign();
    });
    cxt.getButtonContext("image").click(function(){
      dialog.showImage();
    });
    cxt.getButtonContext("text").click(function(){
      that.createNewElement("Text Element");
    });
  }

  // Constructor

  initProducts();
  initAutoDeactivate();
  initEvents();

}

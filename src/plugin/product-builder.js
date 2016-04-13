//=include ../js/lib/**/*.js
(function ($) {

  'use strict';

  //=include ../js/PubSub.js
  //=include ../js/Effects.js
  //=include ../js/Dialog.js
  //=include ../js/Context.js
  //=include ../js/ElementBroker.js
  //=include ../js/ProductBroker.js
  //=include ../js/PanelBoard.js
  //=include ../js/Product.js
  //=include ../js/Element.js
  //=include ../js/Panel.js
  //=include ../js/elements/**/*.js
  //=include ../js/panels/**/*.js

  $.fn.productBuilder = function (obj) {

    var mainContext = $('<div class="product-builder main">\
      <div class="tool-top"></div>\
      <div class="tool-left"></div>\
      <div class="tool-right"></div>\
      <div class="canvas"></div>\
      <div class="tool-footer"><ul class="thumbs"></ul></div>\
    </div>');

    this.append(mainContext);

    new ProductBroker(new Context(mainContext), obj.products || []);

  };


})(jQuery);

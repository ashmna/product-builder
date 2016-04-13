(function ($) {

  $.fn.verticalCenter = function () {
    this.css({
      'top': "50%",
      'margin-top': this.outerWidth() / -2
    });
  };

  $.fn.horizontalCenter = function () {
    this.css({
      'left': "50%",
      'margin-left': this.outerHeight() / -2
    });
  };

})(jQuery);
(function ($) {

  $.fn.selectText = function () {
    var element = this[0]
      , range
      ;
    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      var selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

}(jQuery));
(function ($) {

  'use strict';

  function PubSub()
  {
  
    this.subscribers = {};
  
    this.publish = function (event, args) {
      if (!this.subscribers[event])
        return false;
      this.subscribers[event].forEach(function (subscriber) {
        subscriber.apply(this, args)
      });
      return true;
    };
  
    this.subscribe = function (event, callback) {
      if (!this.subscribers[event])
        this.subscribers[event] = [];
      this.subscribers[event].push(callback);
    };
  
  }
  
  
  
  function Effects() {
  }
  
  Effects.fastSpeed = "fast";
  Effects.easing = "easeInOutQuint";
  
  
  function Dialog(cxt) {
    var that = this
      , activeElement = null
      ;
  
  
    that.showImage = function () {
      open("Upload an image", onShowImage);
    };
  
    that.showDesign = function () {
      open("Choose a design", onShowDesign);
    };
  
    function open(title, callBack) {
      var w = cxt.outerWidth()
        , h = cxt.outerHeight()
        , dialogBody = $('<div title="' + title + '"></div>');
  
      cxt.append(dialogBody);
  
      dialogBody.dialog({
        minHeight: h / 2,
        minWidth: w / 2,
        maxHeight: h,
        maxWidth: w,
        height: h / 2 + h / 3,
        width: w / 2 + w / 3,
        draggable: false,
        resizable: false,
        close: function () {
          dialogBody.dialog("destroy");
          dialogBody.remove();
        },
        open: function () {
          callBack(dialogBody)
        }
      });
    }
  
    function onShowImage(body) {
      var list = $('<ul class="box-list"></ul>');
      var loading = $('<li class="loading"><img src="src/img/loading.gif"></li>');
      var more = $('<li class="more">More...</li>');
  
      list.append(loading);
  
  
      body.append(list);
  
      var data = [
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
        'demo_img/avatar.jpg',
  
      ];
  
  
  
      var item;
      var tmpImg;
      var listItems = [];
  
  
      item = $('<li class="upload-box"><em class="fa fa-upload"></em><input type="file" id="inputFile"></li>');
      item.click(function(e) {
        if(!$(e.target).is('input')) {
          list.find('#inputFile').click();
        }
      });
      list.append(item);
  
  
      item = $('<li class="box  loading-box"><img src="src/img/loading.gif"></li>');
      list.append(item);
  
      data.forEach(addBox);
  
      function addBox(itemData) {
        var item = $('<li class="box loading-box" style="opacity: 0"><img src="src/img/loading.gif"></li>');
        item.data('data', itemData);
        list.append(item);
        var tmpImage = new Image();
        (function (tmpImage, item, src){
          tmpImage.onload = function() {
            item.removeClass('loading-box');
            var tmpImg = item.find('img');
            tmpImg.attr('src', src);
            tmpImg.css('left', (tmpImg.outerWidth() - 128) / -2);
          };
        })(tmpImage, item, itemData);
  
        listItems.push(item);
        tmpImage.src = itemData;
      }
  
      (function (l) {
        var i = 0;
  
        function s() {
          if (l.length > i) {
            l[i].css('opacity', 1);
            if (100 - i * 2 > 50) {
              setTimeout(function () {
                ++i;
                s();
              }, 100 - i * 2);
            } else {
              ++i;
              s();
            }
          }
        }
  
        s();
      })(listItems);
  
      list.append(more);
      //list.remove(loading);
      list.on('click', '.box:not(".loading-box")', function(e){
        if(activeElement) {
          activeElement.removeClass('active');
        }
        activeElement = $(this);
        activeElement.addClass('active');
      });
    }
  
    function onShowDesign(body) {
  
    }
  
  }
  function Context(mainContext)
  {
    var that = this
      , canvasContext = mainContext.find('.canvas')
      , thumbsContext = mainContext.find('.tool-footer .thumbs')
      , toolRightContext = mainContext.find('.tool-right')
      ;
  
    that.getContext = function () {
      return mainContext;
    };
  
    that.getCanvasContext = function () {
      return canvasContext;
    };
  
    that.getToolRightContext = function () {
      return toolRightContext;
    };
  
    that.getThumbsContext = function () {
      return thumbsContext;
    };
  
    that.getButtonContext = function (type) {
      return mainContext.find(".action-button-"+type);
    };
  
    // Constructor
  
  
  }
  
  Context.idCounter = 1000;
  
  function ElementBroker(context, board, borders, elements) {
  
    var that                  = this;
    that.board                = board;
    that.currentActiveElement = null;
    that.indexCounter         = 0;
    that.list                 = {};
  
    // Public Methods
  
    that.append = function (elementObj) {
      context.append(elementObj.getContext());
      that.list[elementObj.id] = elementObj;
    };
  
    that.detach = function (elementObj) {
      if(that.list[elementObj.id]) {
        delete that.list[elementObj.id];
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
      var position = {x: 230, y: 120, width: 100, height: 40, angle: 0}
        , params = {}
        , elementObj
        ;
      elementObj = elementFactory(type, position, params);
      that.activate(elementObj);
      return elementObj;
    };
  
    that.appendPanel = function(panelElement) {
      board.append(panelElement);
      //$("#panel_1").append(panelElement);
      // TODO: append panel tool element in panel context
    };
  
    // Private Methods
  
    function initElements() {
      var i = 0, elementClass;
  
      for (; i < elements.length; ++i) {
        elementFactory(elements[i].type, elements[i].position, elements[i].params);
      }
    }
  
    function elementFactory(type, position, params) {
      var id = ++Context.idCounter + '_element';
      var elementInstance = null;
      var panelToolInstance = null;
  
      switch (type) {
        case "Fix Text" :
          elementInstance = new FixTextElement(id, that, borders, position, params);
          panelToolInstance = new FixTextPanel(id, that, params);
          break;
        case "Fix Text2" :
          elementInstance = new FixTextElement2(id, that, borders, position, params);
          panelToolInstance = new FixTextPanel(id, that, params);
          break;
        case "Text" :
          elementInstance = new TextElement(id, that, borders, position, params);
          break;
        case "Image" :
          elementInstance = new ImageElement(id, that, borders, position, params);
          break;
        case "SVG" :
          elementInstance = new SvgElement(id, that, borders, position, params);
          break;
        default:
          elementInstance = new Element(id, that, borders, position, params);
      }
      return elementInstance;
    }
  
    // Calll Constructor
    initElements();
  }
  
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
  
  function PanelBoard(toolContext)
  {
    var that     = this
      , hasChild = false
      ;
  
    that.context = null;
  
    // Pubic Methods
  
    that.init = function () {
      initBoard();
    };
  
    that.run = function () {
      if (hasChild) {
        that.context.verticalCenter();
        that.context.css({
          left: that.context.outerWidth() * 1.5,
          opacity: 0.5
        });
      } else {
        that.context.hide();
      }
    };
  
    that.show = function () {
      that.context.animate({
        left: 0,
        opacity: 1
      }, Effects.fastSpeed, Effects.easing);
    };
  
    that.hide = function () {
      that.context.animate({
        left: that.context.outerWidth() * 1.5,
        opacity: 0.5
      }, Effects.fastSpeed, Effects.easing);
    };
  
    that.append = function(panel) {
      that.context.append(panel);
      hasChild = true;
    };
  
    // Private Methods
  
    function initBoard() {
      that.context = $('<div class="board panel"></div>');
      that.context.css({
        left: that.context.outerWidth() * 1.5,
        opacity: 0.5
      });
      toolContext.append(that.context);
    }
  
    // Call Constructor
    that.init();
  }
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
  
    that.renderImageData = function (img, w, h, callBack) {
      w = w || 500;
      h = h || 500;
      //var el = that.context.clone();
      //el.find('.element').removeClass('active');
      //el.find('.border').css('border', 'none');
      //el.css({
      //  display: 'block',
      //  width  : '500px',
      //  height : '500px'
      //});
      //el.appendTo(document.body);
      return html2canvas(that.context[0], {
        onrendered: function (canvas) {
          var extra_canvas = document.createElement("canvas");
          extra_canvas.setAttribute('width', w);
          extra_canvas.setAttribute('height', h);
          var ctx = extra_canvas.getContext('2d');
          ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, w, h);
          var dataURL = extra_canvas.toDataURL();
          if (callBack) {
            callBack(dataURL);
          }
          if (img) {
            img.attr('src', dataURL);
          }
        }
      });
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
          <div class="product-thumb-viewer"><img src="'+that.image+'"></div>\
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
  
  function Element(id, broker, borders, position, params)
  {
    PubSub.call(this);
  
    var that = this
      , outOfBorder = false
      , x = 0
      , y = 0
      ;
  
    // Public Members
  
    that.id       = id;
    that.type     = "Element";
    that.broker   = broker;
    that.position = position;
    that.params   = params;
    that.borders  = borders;
    that.context  = null;
  
    // Public Methods
  
    that.getContext = function () {
      return that.context;
    };
  
    that.getData = function () {
      return {
        "position": that.position,
        "type": that.type,
        "params": that.params
      }
    };
  
    that.remove = function () {
      that.broker.detach(that);
    };
  
    that.activate = function () {
      that.context.addClass('active');
    };
  
    that.deactivate = function () {
      that.context.removeClass('active');
    };
  
    that.setOutOfBorder = function (val) {
      if(outOfBorder != val) {
        outOfBorder = val;
        if(outOfBorder) {
          that.context.addClass("error-out-of-border");
        } else {
          that.context.removeClass("error-out-of-border");
        }
      }
    };
  
    that.getCoordinates = function () {
      var piHalf = Math.PI * 0.5
        , sin = Math.sin(Math.abs(that.position.angle) % piHalf)
        , p = that.position
        , w = parseInt(that.position.angle / piHalf) % 2 ? p.height : p.width
        , h = parseInt(that.position.angle / piHalf) % 2 ? p.width  : p.height
        , deltaX = h * 0.5 * sin
        , deltaY = w * 0.5 * sin
        ;
      return {
        tl : { x:     p.x + deltaX, y :     p.y - deltaY },
        tr : { x: w + p.x - deltaX, y :     p.y + deltaY },
        bl : { x:     p.x + deltaX, y : h + p.y - deltaY },
        br : { x: w + p.x - deltaX, y : h + p.y + deltaY }
      };
    };
  
    that.initDraggable = function(object) {
      object = object || {};
      that.context.append(
        $('<div class="helper-point helper-move"> <em class="fa fa-arrows"></em> </div>')
      );
      return that.context.draggable($.extend({
        start: function(event) {
          x = event.pageX - that.position.x;
          y = event.pageY - that.position.y;
        },
        drag: function(event, ui) {
          that.position.x = event.pageX - x;
          that.position.y = event.pageY - y;
          ui.position.left = that.position.x;
          ui.position.top  = that.position.y;
          that.setOutOfBorder(!checkInBorder());
          that.publish('drag', [event, ui]);
        }
      }, object));
    };
  
    that.initResizable = function(object) {
      object = object || {};
      var helper = $('<div class="helper-point helper-resize"> <em class="fa fa-expand fa-flip-horizontal"></em> </div>');
      that.context.append(helper);
      return that.context.resizable($.extend({
        handles: {'se': helper },
        resize: function(event, ui) {
          that.position.width  = ui.size.width;
          that.position.height = ui.size.height;
          that.setOutOfBorder(!checkInBorder());
          that.publish('resize', [event, ui]);
        }
      }, object));
    };
  
    that.initRotatable = function(object) {
      object = object || {};
      var helper = $('<div class="helper-point helper-rotate"> <em class="fa fa-undo"></em> </div>');
      that.context.append(helper);
      var rotatable = that.context.rotatable($.extend({
        angle: that.position.angle,
        handle: helper,
        rotate: function (event, ui) {
          that.position.angle = ui.angle.current;
          that.setOutOfBorder(!checkInBorder());
          that.publish('rotate', [event, ui]);
        }
      }, object));
      that.context.unbind('wheel');
      return rotatable;
    };
  
    that.initDeletable = function() {
      var helper = $('<div class="helper-point helper-remove"> <em class="fa fa-trash"></em> </div>');
      that.context.append(helper);
      return helper.click(function(){
        that.broker.detach(that);
      });
    };
  
    // Private Methods
  
    function checkInBorder() {
      var c = that.getCoordinates()
        , deltaX = 0
        , deltaY = 0
        , w = 0
        , h = 0
        , border = null
        , i = 0
      ;
      for(; i< that.borders.length; ++i) {
        border = that.borders[i];
        deltaX = border.x;
        deltaY = border.y;
        w = border.width;
        h = border.height;
        if(
          (c.tl.x - deltaX >= 0 && c.tl.y - deltaY >= 0) &&
          (c.tr.x - deltaX <= w && c.tr.y - deltaY >= 0) &&
          (c.bl.x - deltaX >= 0 && c.bl.y - deltaY <= h) &&
          (c.br.x - deltaX <= w && c.br.y - deltaY <= h)
        ) {
          return border;
        }
      }
      return null;
    }
  
    function initElement() {
      that.context = $('<div class="element"></div>')
        .css({
          left  : that.position.x,
          top   : that.position.y,
          width : that.position.width,
          height: that.position.height
        });
      that.context.mousedown(function(){
        that.broker.activate(that);
      });
    }
  
    // Constructor
  
    initElement();
    that.broker.append(that);
  }
  
  function Panel(id, broker, params)
  {
    // Extends
    PubSub.apply(this, arguments);
  
    this.id = id;
    this.broker = broker;
    this.params = params;
  
  }
  
  function FixTextElement()
  {
    // Extends
    Element.apply(this, arguments);
  
    var that = this
      , el = null
      , editPointContext = null
      ;
    that.type = "Fix Text";
  
    // Public Methods
  
    /**
     *  Fix Text Element Constructor
     */
    that.init = function () {
      initDefault();
      initElement();
      //initEditable();
      doStyling();
    };
  
    that.setText = function(text) {
      that.params.text = text;
      el.text(text);
    };
  
    that.getText = function() {
      return that.params.text;
    };
  
    // Private Methods
    function initDefault() {
      var defaultVal = {
        "text"        : "Your Favorite Text Hear.",
        "font-family" : "'Covered By Your Grace', cursive",
        "font-size"   : "28px",
        "color"       : "#000",
        "text-align"  : "center",
      };
      for(var key in defaultVal) {
        //noinspection JSUnfilteredForInLoop
        if(!that.params[key]) {
          //noinspection JSUnfilteredForInLoop
          that.params[key] = defaultVal[key];
        }
      }
    }
  
    function initElement() {
      el = $('<span class="element-fix-text" spellcheck="false">' + that.params.text + '</span>');
      that.context.append(el);
    }
  
    function initEditable() {
      el.dblclick(startEditor);
      el.focusout(endEditor);
      editPointContext = $('<div class="helper-point helper-edit-text"> <em class="fa fa-pencil"></em></div>');
      editPointContext.click(startEditor);
      that.context.append(editPointContext);
    }
  
    function startEditor() {
      //that.context.draggable( "option", "disabled", true);
      el.attr("contenteditable", true);
      el.focus();
      el.selectText();
      that.broker.deactivate();
    }
  
    function endEditor() {
      //that.context.draggable( "option", "disabled", false);
      el.attr("contenteditable", false);
      that.params.text = el.text();
    }
  
    function doStyling() {
      el.css({
        "font-family" : that.params["font-family"],
        "font-size"   : that.params["font-size"],
        "color"       : that.params["color"],
        "text-align"  : that.params["text-align"],
      });
    }
  
  
    // Call constructor
    that.init();
  }
  
    function FixTextElement2()
  {
    // Extends
    Element.apply(this, arguments);
  
    var that = this
      , el = null
      , ctx = null
      , points = []
      , xDist = 0
      , showLine = false
      // , editPointContext = null
      ;
    that.type = "Fix Text2";
  
    // Public Methods
  
    /**
     *  Fix Text Element2 Constructor
     */
    that.init = function () {
      initDefault();
      initPoints();
      initElement();
      //initEditable();
      doStyling();
    };
  
    that.setText = function(text) {
      that.params.text = text;
      drawStack();
    };
  
    that.getText = function() {
      return that.params.text;
    };
  
    // Private Methods
  
    function initPoints() {
      //TODO: this is for test remove after testing.
      that.params.points = "99.2,177.2,130.02,60.0,300.5,276.2,300.7,176.2";
      if(that.params.points) {
        points = that.params.points.split(',');
      }
    }
  
    function initDefault() {
      var defaultVal = {
        "text"        : "Your Favorite Text Hear.",
        "font-family" : "arial",
        "font-size"   : "14px",
        "color"       : "#000",
      };
      for(var key in defaultVal) {
        //noinspection JSUnfilteredForInLoop
        if(!that.params[key]) {
          //noinspection JSUnfilteredForInLoop
          that.params[key] = defaultVal[key];
        }
      }
    }
  
    function initElement() {
      el = $('<canvas class="element-text" width="'+that.position.width+'" height="'+that.position.height+'"></canvas>');
      that.context.append(el);
      ctx = el[0].getContext('2d');
    }
  
    /*
    function initEditable() {
      el.dblclick(startEditor);
      el.focusout(endEditor);
      editPointContext = $('<div class="helper-point helper-edit-text"> <em class="fa fa-pencil"></em></div>');
      editPointContext.click(startEditor);
      that.context.append(editPointContext);
    }
  
    function startEditor() {
      //that.context.draggable( "option", "disabled", true);
      el.attr("contenteditable", true);
      el.focus();
      el.selectText();
      that.broker.deactivate();
    }
  
    function endEditor() {
      //that.context.draggable( "option", "disabled", false);
      el.attr("contenteditable", false);
      that.params.text = el.text();
    }
    */
  
    function doStyling() {
      ctx.fillStyle = that.params["color"];
      ctx.font = that.params["font-size"] +" "+that.params["font-family"]+" " +that.params["color"];
      drawStack();
    }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
    function drawStack() {
      var ribbon = {
        maxChar: 50,
        startX: points[0],
        startY: points[1],
        control1X: points[2],
        control1Y: points[3],
        control2X: points[4],
        control2Y: points[5],
        endX: points[6],
        endY: points[7]
      };
  
      ctx.clearRect(0, 0, parseInt(that.position.width), parseInt(that.position.height));
  
      // Show Line
      if(showLine) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(ribbon.startX, ribbon.startY);
        ctx.bezierCurveTo(
          ribbon.control1X, ribbon.control1Y,
          ribbon.control2X, ribbon.control2Y,
          ribbon.endX, ribbon.endY
        );
        ctx.stroke();
        ctx.restore();
      }
  
      fillRibbon(that.params.text, ribbon);
    }
  
    function fillRibbon(text, ribbon) {
  
      text = text.substring(0, ribbon.maxChar);
      var textCurve = [];
      var curveSample = 1000;
  
      xDist = 0;
  
      var i, a, b, c;
      for (i = 0; i < curveSample; i++) {
        a = new Bezier2(
          i/curveSample,
          ribbon.startX,
          ribbon.startY,
          ribbon.control1X,
          ribbon.control1Y,
          ribbon.control2X,
          ribbon.control2Y,
          ribbon.endX,
          ribbon.endY
        );
        b = new Bezier2(
          (i+1)/curveSample,
          ribbon.startX,
          ribbon.startY,
          ribbon.control1X,
          ribbon.control1Y,
          ribbon.control2X,
          ribbon.control2Y,
          ribbon.endX,
          ribbon.endY
        );
        c = new Bezier(a,b);
  
        textCurve.push({bezier: a, curve: c.curve});
      }
  
      var letterPadding = ctx.measureText(" ").width / 4;
      var w = text.length;
      var ww = Math.round(ctx.measureText(text).width);
  
  
      var totalPadding = (w-1) * letterPadding;
      var totalLength = ww + totalPadding;
      var p = 0;
  
      var cDist = textCurve[curveSample-1].curve.cDist;
  
      var z = (cDist / 2) - (totalLength / 2);
  
      for (i=0;i<curveSample;i++) {
        if (textCurve[i].curve.cDist >= z) {
          p = i;
          break;
        }
      }
  
      var j, x1, x2;
      for (i = 0; i < w ; i++) {
        ctx.save();
        ctx.translate(textCurve[p].bezier.point.x,textCurve[p].bezier.point.y);
        ctx.rotate(textCurve[p].curve.rad);
        ctx.fillText(text[i],0,0);
        ctx.restore();
  
        x1 = ctx.measureText(text[i]).width + letterPadding ;
        x2 = 0;
        for (j=p;j<curveSample;j++)
        {
          x2 = x2 + textCurve[j].curve.dist;
          if (x2 >= x1)
          {
            p = j;
            break;
          }
        }
  
  
      }
    } //end fillRibbon
  
    function Bezier(b1, b2) {
      //Final stage which takes p, p+1 and calculates the rotation, distance on the path and accumulates the total distance
      this.rad = Math.atan(b1.point.mY/b1.point.mX);
      this.b2 = b2;
      this.b1 = b1;
      // dx = (b2.x - b1.x);
      // dx2 = (b2.x - b1.x) * (b2.x - b1.x);
      this.dist = Math.sqrt( ((b2.x - b1.x) * (b2.x - b1.x)) + ((b2.y - b1.y) * (b2.y - b1.y)) );
      xDist = xDist + this.dist;
      this.curve = {rad: this.rad, dist: this.dist, cDist: xDist};
    }
  
    function BezierT(t, startX, startY, control1X, control1Y, control2X, control2Y, endX, endY) {
      //calculates the tangent line to a point in the curve; later used to calculate the degrees of rotation at this point.
      this.mx = (3*(1-t)*(1-t) * (control1X - startX)) + ((6 * (1-t) * t) * (control2X - control1X)) + (3 * t * t * (endX - control2X));
      this.my = (3*(1-t)*(1-t) * (control1Y - startY)) + ((6 * (1-t) * t) * (control2Y - control1Y)) + (3 * t * t * (endY - control2Y));
    }
  
    function Bezier2(t, startX, startY, control1X, control1Y, control2X, control2Y, endX, endY) {
      //Quadratic bezier curve plotter
      this.Bezier1 = new Bezier1(t,startX,startY,control1X,control1Y,control2X,control2Y);
      this.Bezier2 = new Bezier1(t,control1X,control1Y,control2X,control2Y,endX,endY);
      this.x = ((1 - t) * this.Bezier1.x) + (t * this.Bezier2.x);
      this.y = ((1 - t) * this.Bezier1.y) + (t * this.Bezier2.y);
      this.slope = new BezierT(t,startX, startY,control1X,control1Y,control2X,control2Y,endX,endY);
  
      this.point = {t: t, x: this.x, y: this.y, mX: this.slope.mx, mY: this.slope.my};
    }
  
    function Bezier1(t, startX, startY, control1X, control1Y, control2X, control2Y) {
      //linear bezier curve plotter; used recursivly in the quadratic bezier curve calculation
      this.x = (( 1 - t) * (1 - t) * startX) + (2 * (1 - t) * t * control1X) + (t * t * control2X);
      this.y = (( 1 - t) * (1 - t) * startY) + (2 * (1 - t) * t * control1Y) + (t * t * control2Y);
    }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
    // Call constructor
    that.init();
  }
  
    function ImageElement()
  {
    // Extends
    Element.apply(this, arguments);
  
    var that = this
      ;
    that.type = "Image";
  
    // Public Methods
  
    /**
     *  Image Element Constructor
     */
    that.init = function () {
      that.initResizable();
      that.initRotatable();
      that.initDraggable();
      that.initDeletable();
    };
  
    // Private Methods
    //TODO Implement Image Element
  
    // Call Constructor
  }
    function SvgElement()
  {
    // Extends
    Element.apply(this, arguments);
  
    var that = this
      ;
    that.type = "SVG";
  
    // Public Methods
  
    /**
     *  SVG Element Constructor
     */
    that.init = function () {
    };
  
    // Private Methods
  
    //TODO Implement SVG Element
  }
  
    function TextElement()
  {
    // Extends
    Element.apply(this, arguments);
  
    var that = this
      , el = null
      , editPointContext = null
      , w = 0
      , h = 0
      , alsoResize = false
      , startFontSize = 0
      ;
    that.type = "Text";
  
    // Public Methods
  
    /**
     *  Text Element Constructor
     */
    that.init = function () {
      initResizable();
      that.initRotatable();
      that.initDraggable();
      that.initDeletable();
  
      initDefault();
      initElement();
      doStyling();
      initEditable();
      that.context.append(el);
      w = that.position.width;
      h = that.position.height;
      //that.context.draggable( "option", "helper", that.context.);
    };
  
    // Private Methods
    function initResizable() {
      var resizable = that.initResizable();
      var e = $('<div class="ui-my-resizable-handle ui-resizable-e" style="z-index: 90;"></div>');
      var s = $('<div class="ui-my-resizable-handle ui-resizable-s" style="z-index: 90;"></div>');
      resizable.append(e).append(s);
      var resizableHandles = resizable.resizable("option", "handles");
      resizableHandles.e = e;
      resizableHandles.s = s;
  
  
      resizableHandles.se.mousedown(function () {
        alsoResize = true;
      });
  
      resizable.on( "resizestop", function() {
        alsoResize = false;
      });
  
      resizable.on( "resizestart", function(event, ui) {
        if(alsoResize) {
          w = ui.size.width;
          h = ui.size.height;
          startFontSize = parseInt(that.params["font-size"]);
  
          alsoResize = w / h;
        }
      });
  
  
      resizable.resizable("option", "handles", resizableHandles);
      refresh();
  
      function refresh() {
        var options = resizable.resizable( "option" );
        resizable.resizable("destroy").resizable(options);
      }
    }
  
    function initDefault() {
      var defaultVal = {
        "text"        : "Your Favorite Text Hear.",
        "font-family" : "sans-serif",
        "font-size"   : "14px",
        "color"       : "#000",
        "text-align"  : "center",
      };
      for(var key in defaultVal) {
        //noinspection JSUnfilteredForInLoop
        if(!that.params[key]) {
          //noinspection JSUnfilteredForInLoop
          that.params[key] = defaultVal[key];
        }
      }
    }
  
    function initElement() {
      el = $('<span class="element-text" spellcheck="false">' + that.params.text + '</span>');
    }
  
    function initEditable() {
      el.dblclick(startEditor);
      el.focusout(endEditor);
      editPointContext = $('<div class="helper-point helper-edit-text"> <em class="fa fa-pencil"></em></div>');
      editPointContext.click(startEditor);
      that.context.append(editPointContext);
    }
  
    function startEditor() {
      that.context.draggable( "option", "disabled", true);
      el.attr("contenteditable", true);
      el.focus();
      el.selectText();
      that.broker.deactivate();
    }
  
    function endEditor() {
      that.context.draggable( "option", "disabled", false);
      el.attr("contenteditable", false);
    }
  
    function doStyling() {
      el.css({
        "font-family" : that.params["font-family"],
        "font-size"   : that.params["font-size"],
        "color"       : that.params["color"],
        "text-align"  : that.params["text-align"],
      });
    }
  
    that.subscribe('drag', function(event, ui) {
      //console.log("drag", event, ui);
    });
  
    that.subscribe('resize', function(event, ui) {
      if(alsoResize !== false) {
        ui.size.width = alsoResize * ui.size.height;
  
        that.params["font-size"] = ui.size.width / w * startFontSize + "px";
        doStyling();
      }
    });
  
    that.subscribe('rotate', function(event, ui) {
      //console.log("rotate", event, ui);
    });
  
  
  
    // Call Constructor
    that.init();
  }
  
  function FixTextPanel()
  {
    // Extends
    Panel.apply(this, arguments);
  
    var that = this
      , block = null
      , label = null
      , el = null
      ;
  
    // Public Methods
  
    that.init = function () {
      initElement();
      initBinding();
    };
  
    // Private Methods
  
    function initElement() {
      var title = that.params.title || '';
      var placeholder = that.params.placeholder || '';
      var text = that.params.text || '';
      block = $('<div class="input-block nd"></div>');
      label = $('<label for="ft' + that.id + '"> ' + title + ' </label>');
      el = $('<input id="ft' + that.id + '" type="text" placeholder="' + placeholder + '" value="' + text + '">');
  
      block.append(label);
      block.append(el);
  
      that.broker.appendPanel(block);
    }
  
    function initBinding() {
      var elementObj = null;
      if (that.broker.list[that.id]) {
        elementObj = that.broker.list[that.id];
      }
  
  		elementObj.getContext().click(function(){
  			el.focus();
  		});
  
      el.focus(function () {
        // TODO: improve
        if (elementObj) {
          that.broker.activate(elementObj);
        }
        el.select();
      });
  
      el.on('keyup keypress blur change', function (event) {
        // TODO: improve
        if (elementObj) {
          elementObj.setText(this.value);
        }
      });
  
    }
  
    // Call Constructor
    that.init();
  }
  

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

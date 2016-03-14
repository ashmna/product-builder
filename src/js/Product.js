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

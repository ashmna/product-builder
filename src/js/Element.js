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

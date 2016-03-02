function Element(broker, borderContext, position, params)
{
  var that = this
    , x = 0
    , y = 0
    ;
  // Public Members

  that.type     = "Element";
  that.broker   = broker;
  that.position = position;
  that.params   = params;
  that.border   = borderContext;
  that.context  = null;

  // Private Methods

  function initElement() {
    that.context = $('\
      <div class="element">\
        <div class="helper-move"  > <em class="fa fa-arrows"></em>                    </div>\
        <div class="helper-rotate"> <em class="fa fa-undo"></em>                      </div>\
        <div class="helper-remove"> <em class="fa fa-trash"></em>                     </div>\
        <div class="helper-resize"> <em class="fa fa-expand fa-flip-horizontal"></em> </div>\
      </div>')
      .css({
        left: that.position.x,
        top: that.position.y,
        width: that.position.width,
        height: that.position.height
      });
    that.context.mousedown(function(){
      that.broker.activate(that);
    });
  }

  function initDraggable() {
    that.context.draggable({
      start: function(event) {
        x = event.pageX - that.position.x;
        y = event.pageY - that.position.y;
      },
      drag: function(event, ui) {
        that.position.x = event.pageX - x;
        that.position.y = event.pageY - y;
        ui.position.left = that.position.x;
        ui.position.top  = that.position.y;
      }
    });
  }

  function initResizable() {
    that.context.resizable({
      handles: {'se': that.context.find('.helper-resize')},
      stop: function () {
        that.position.width = that.context.css('width');
        that.position.height = that.context.css('height');
      }
    });
  }

  function initRotatable() {
    that.context.rotatable({
      angle: that.position.angle,
      handle: that.context.find('.helper-rotate'),
      rotate: function (event, ui) {
        that.position.angle = ui.angle.current;
      }
    });
    that.context.unbind('wheel');
  }

  function initDeletable() {
    that.context.find('.helper-remove').click(function(){
      that.broker.detach(that);
    });
  }

  // Constructor

  initElement();
  initResizable();
  initRotatable();
  initDraggable();
  initDeletable();
  that.init();
  this.broker.append(that);

}

Element.prototype = {
  // Public Members

  type     : "Element",
  broker   : null,
  position : null,
  params   : null,
  border   : null,
  context  : null,

  init : function () {

  },

  getContext : function () {
    return this.context;
  },

  getData : function () {
    return {
      "position": this.position,
      "type": this.type,
      "params": this.params
    }
  },

  remove : function () {
    this.broker.detach(that);
  },

  activate : function () {
    this.context.addClass('active');
  },

  deactivate : function () {
    this.context.removeClass('active');
  },

  getCoordinates : function () {
    var sin = Math.sin(this.position.angle)
      , p = this.position
      , deltaX = p.width/2  * sin
      , deltaY = p.height/2 * sin
      ;
    console.log(deltaX, deltaY);
    return {
      tl : { x:           p.x + deltaX, y :            p.y - deltaY },
      tr : { x: p.width + p.x - deltaX, y :            p.y + deltaY },
      bl : { x:           p.x + deltaX, y : p.height + p.y - deltaY },
      br : { x: p.width + p.x - deltaX, y : p.height + p.y + deltaY },
    };
  }
};

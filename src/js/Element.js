function Element(broker, borderContext, position, params) {

  var that = this;

  // Public Members

  that.broker = broker;
  that.type = "Element";
  that.position = position;
  that.params = params;
  that.border = borderContext;
  that.context = null;
  that.target = null;

  // Public Methods

  that.init = function (params) {};

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

  // Private Methods

  function initElement() {
    var p = that.position;
    that.context = $('\
      <rect x="'+p.x+'" y="'+ p.y+'" width="'+p.w+'" height="'+p.h+'" class="element" style="fill:transparent;stroke-width:1;stroke:rgb(0,0,0)"></rect>\
      ');
      /*
       <div class="target">\
       <div class="helper-move"  > <em class="fa fa-arrows"></em>                    </div>\
       <div class="helper-rotate"> <em class="fa fa-undo"></em>                      </div>\
       <div class="helper-remove"> <em class="fa fa-trash"></em>                     </div>\
       <div class="helper-resize"> <em class="fa fa-expand fa-flip-horizontal"></em> </div>\
       </div>\
       */

    //that.target = that.context.find('.target');
    //that.target.css({
    //  width: that.position.w,
    //  height: that.position.h
    //});
    //that.target.mousedown(function(){
    //  that.broker.activate(that);
    //});
  }

  function initDraggable() {
    that.context.draggable({
      containment: that.border,
      handle: ".helper-move, .target",
      stop: function () {
        that.position.l = that.context.css('left');
        that.position.t = that.context.css('top');
      }
    });
  }

  function initResizable() {
    that.target.resizable({
      containment: that.border,
      alsoResize: that.context,
      handles: {'se': that.context.find('.helper-resize')},
      stop: function () {
        that.position.w = that.context.css('width');
        that.position.h = that.context.css('height');
      }
    });
  }

  function initRotatable() {
    that.target.rotatable({
      angle: that.position.a,
      handle: that.context.find('.helper-rotate'),
      stop: function () {
      }
    });
  }
  function initDeletable() {
    that.context.find('.helper-remove').click(function(){
      that.broker.detach(that);
    });
  }


  // Constructor

  initElement();
  //initResizable();
  //initRotatable();
  //initDraggable();
  //initDeletable();
  that.init();
  that.broker.append(that);
}

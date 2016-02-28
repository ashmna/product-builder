function Element(broker, position, params)
{
    var that = this;
    that.broker = broker;
    that.type = "Element";
    that.position = position;
    that.params = params;
    that.isActive = false;
    that.border = $('.border');
    that.element;
    that.target;
    
    that.init = function(params) {
        
    };
    
    that.getElement = function() {
        return that.element;
    };
    
    that.getData = function() {
        return {
            "position": that.position,
            "type":     that.type,
            "params":   that.params
        }
    };
    
    that.remove = function() {
        that.broker.detach(that);
    };
    
    that.activate = function() {
        that.isActive = true;
    };
    
    that.deactivate = function() {
        that.isActive = false;
    };
    
    function initElement() {
        that.element = $('\
                     <div class="element">\
                         <div class="target">\
                            <div class="helper-move"  > <em class="fa fa-arrows"></em>                    </div>\
                            <div class="helper-rotate"> <em class="fa fa-undo"></em>                      </div>\
                            <div class="helper-remove"> <em class="fa fa-trash"></em>                     </div>\
                            <div class="helper-resize"> <em class="fa fa-expand fa-flip-horizontal"></em> </div>\
                        </div>\
                    </div>')
            .css({
                left: that.position.l,
                top: that.position.t,
                width: that.position.w,
                height: that.position.h
            });
        that.target = that.element.find('.target');
        that.target.css({
            width: that.position.w,
            height: that.position.h
        });
    }
    
    function initDraggable() {
        that.element.draggable({
            containment: that.border,
            handle: ".helper-move, .target",
            stop: function() {
                that.position.l = that.element.css('left');
                that.position.t = that.element.css('top');
            }
        });
    }
    
    function initResizable() {
        that.target.resizable({
            containment: that.border,
            alsoResize: that.element,
            handles: { 'se': that.element.find('.helper-resize')},
            stop: function() {
                that.position.w = that.element.css('width');
                that.position.h = that.element.css('height');
            }
        }); 
    }
    
    function initRotatable() {
        that.target.rotatable({
            angle: that.position.a,
            handle: that.element.find('.helper-rotate'),
            stop: function() {
            }
        }); 
    }
    
    // constructor
    initElement();
    initResizable();
    initRotatable();
    initDraggable();
    that.init();
    that.broker.append(that);
}

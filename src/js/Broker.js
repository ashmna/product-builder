function Broker(context) 
{
    var that = this;
    that.context = context;
    
    that.append = function(elementObj) {
        that.context.append(elementObj.getElement());
    };
    
    that.detach = function(elementObj) {
        that.context.detach(elementObj.getElement());
    };
    
    that.activate = function(elementObj) {
        elementObj.activate();
    };
}

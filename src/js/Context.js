function Context()
{
    var  that = this
        ,tagElements = $('.elements')
    ;
    
    that.append = function(element) {
        tagElements.append(element);
    };
    
    that.detach = function(elementObj) {
        tagElements.remove(element);
    };
    
}
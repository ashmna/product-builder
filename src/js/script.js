$(function(){
    
    var context = new Context();
    var broker = new Broker(context);
    
//    var element = new Element(broker, {})
    
    var el = {
                "position": {
                    "t": 10,
                    "l": 10,
                    "w": 100,
                    "h": 50,
                    "a": 0
                },
                "type": "____",
                "params": {}
            };
    
    var element = new Element(broker, el.position, el.params);
});
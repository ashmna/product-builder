$(function(){

  var war = {
    "title": "Title",
    "image": "src/img/1.png",
    "container": {
      "w": 450,
      "h": 450,
      "t": 10,
      "l": 10
    },
    "elements": [
      {
        "position": {
          "x": 10,
          "y": 10,
          "height": 100,
          "width": 100,
          "angle":0
        },
        "type": "____",
        "params": {}
      },
      //{
      //  "position": {
      //    "x": 180,
      //    "y": 50,
      //    "w": 100,
      //    "h": 50,
      //    "a": 0
      //  },
      //  "type": "____",
      //  "params": {}
      //},
      //{
      //  "position": {
      //    "x": 50,
      //    "y": 180,
      //    "w": 92,
      //    "h": 92,
      //    "a": 0
      //  },
      //  "type": "____",
      //  "params": {}
      //}
    ]
  };
  var war1 = {
    "title": "Title",
    "image": "src/img/2.png",
    "container": {
      "w": 300,
      "h": 450,
      "t": 10,
      "l": 10
    },
    "elements": []};
  var context = new Context();
  var productBroker = new ProductBroker(context, [war, war1]);

});

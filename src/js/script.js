$(function(){

  var war = {
    "title": "Title - 1",
    "image": "src/img/1.png",
    "containers": [{
      "width": 450,
      "height": 450,
      "x": 10,
      "y": 10
    }],
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
    "title": "Title - 2",
    "image": "src/img/2.png",
    "containers": [{
      "width": 280,
      "height": 320,
      "x": 110,
      "y": 95
    }],
    "elements": []};

  var war2 = {
    "title": "Title - 3",
    "image": "src/img/3.png",
    "containers": [{
      "width": 280,
      "height": 320,
      "x": 180,
      "y": 95
    }],
    "elements": []};
  var context = new Context();
  var productBroker = new ProductBroker(context, [war, war1, war2]);

});

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
          "t": 10,
          "l": 10,
          "w": 100,
          "h": 50,
          "a": 0
        },
        "type": "____",
        "params": {}
      },
      {
        "position": {
          "t": 180,
          "l": 50,
          "w": 100,
          "h": 50,
          "a": 0
        },
        "type": "____",
        "params": {}
      },
      {
        "position": {
          "t": 50,
          "l": 180,
          "w": 92,
          "h": 92,
          "a": 0
        },
        "type": "____",
        "params": {}
      }
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
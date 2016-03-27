$(function(){

  var war = {
    "title": "Title - 1",
    "image": "src/img/1.png",
    "containers": [{
      "width": 280,
      "height": 330,
      "x": 35,
      "y": 80
    }],
    "elements": [
      {
        "position": {
          "x": 35,
          "y": 90,
          "width": 280,
          "height": 50,
          "angle":0
        },
        "type": "Fix Text",
        "params": {
          "title": "title"
        }
      },
      {
        "position": {
          "x": 35,
          "y": 140,
          "width": 280,
          "height": 50,
          "angle":0
        },
        "type": "Fix Text",
        "params": {
          "title": "Hello",
          "text":"Hello, World!",
          "color" : "red"
        }
      },
      {
        "position": {
          "x": 35,
          "y": 200,
          "width": 280,
          "height": 110,
          "angle":0
        },
        "type": "Fix Text",
        "params": {
          "title": "Site",
          "text":"Narinj.am",
          "font-family": "'Gloria Hallelujah', cursive",
          "font-size": "50px",
          "color" : "orangered"
        }
      },
      //orangered
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
      "height": 120,
      "x": 180,
      "y": 95
    },
      {
        "width": 280,
        "height": 100,
        "x": 180,
        "y": 315
      }],
    "elements": []};
  var context = new Context($('.main'));
  var productBroker = new ProductBroker(context, [war, war1, war2]);


});

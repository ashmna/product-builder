function svgElement() {

}

svgElement.make = function (tag, attributes) {
  var el = document.createElementNS('http://www.w3.org/2000/svg', tag);

  svgElement.sync(el, attributes);

  return el;
};

svgElement.sync = function(el, attributes) {
  var key, keyName, val;

  for (key in attributes) {
    if(attributes.hasOwnProperty(key)) {
      val = attributes[key];
      switch (key) {
        case 'className':
          keyName = 'class';
          break;
        case 'a':
          keyName = 'transform';
          val = 'rotate('+(val%360)+' '+(attributes.width/2 + attributes.x)+' '+(attributes.height/2 + attributes.y)+')';
          break;
        default:
          keyName = key;
      }
      el.setAttribute(keyName, attributes[key]);
    }
  }
};
function FixTextElement2()
{
  // Extends
  Element.apply(this, arguments);

  var that = this
    , el = null
    , ctx = null
    , points = []
    , xDist = 0
    , showLine = false
    // , editPointContext = null
    ;
  that.type = "Fix Text2";

  // Public Methods

  /**
   *  Fix Text Element2 Constructor
   */
  that.init = function () {
    initDefault();
    initPoints();
    initElement();
    //initEditable();
    doStyling();
  };

  that.setText = function(text) {
    that.params.text = text;
    drawStack();
  };

  that.getText = function() {
    return that.params.text;
  };

  // Private Methods

  function initPoints() {
    //TODO: this is for test remove after testing.
    that.params.points = "99.2,177.2,130.02,60.0,300.5,276.2,300.7,176.2";
    if(that.params.points) {
      points = that.params.points.split(',');
    }
  }

  function initDefault() {
    var defaultVal = {
      "text"        : "Your Favorite Text Hear.",
      "font-family" : "arial",
      "font-size"   : "14px",
      "color"       : "#000",
    };
    for(var key in defaultVal) {
      //noinspection JSUnfilteredForInLoop
      if(!that.params[key]) {
        //noinspection JSUnfilteredForInLoop
        that.params[key] = defaultVal[key];
      }
    }
  }

  function initElement() {
    el = $('<canvas class="element-text" width="'+that.position.width+'" height="'+that.position.height+'"></canvas>');
    that.context.append(el);
    ctx = el[0].getContext('2d');
  }

  /*
  function initEditable() {
    el.dblclick(startEditor);
    el.focusout(endEditor);
    editPointContext = $('<div class="helper-point helper-edit-text"> <em class="fa fa-pencil"></em></div>');
    editPointContext.click(startEditor);
    that.context.append(editPointContext);
  }

  function startEditor() {
    //that.context.draggable( "option", "disabled", true);
    el.attr("contenteditable", true);
    el.focus();
    el.selectText();
    that.broker.deactivate();
  }

  function endEditor() {
    //that.context.draggable( "option", "disabled", false);
    el.attr("contenteditable", false);
    that.params.text = el.text();
  }
  */

  function doStyling() {
    ctx.fillStyle = that.params["color"];
    ctx.font = that.params["font-size"] +" "+that.params["font-family"]+" " +that.params["color"];
    drawStack();
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function drawStack() {
    var ribbon = {
      maxChar: 50,
      startX: points[0],
      startY: points[1],
      control1X: points[2],
      control1Y: points[3],
      control2X: points[4],
      control2Y: points[5],
      endX: points[6],
      endY: points[7]
    };

    ctx.clearRect(0, 0, parseInt(that.position.width), parseInt(that.position.height));

    // Show Line
    if(showLine) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(ribbon.startX, ribbon.startY);
      ctx.bezierCurveTo(
        ribbon.control1X, ribbon.control1Y,
        ribbon.control2X, ribbon.control2Y,
        ribbon.endX, ribbon.endY
      );
      ctx.stroke();
      ctx.restore();
    }

    fillRibbon(that.params.text, ribbon);
  }

  function fillRibbon(text, ribbon) {

    text = text.substring(0, ribbon.maxChar);
    var textCurve = [];
    var curveSample = 1000;

    xDist = 0;

    var i, a, b, c;
    for (i = 0; i < curveSample; i++) {
      a = new Bezier2(
        i/curveSample,
        ribbon.startX,
        ribbon.startY,
        ribbon.control1X,
        ribbon.control1Y,
        ribbon.control2X,
        ribbon.control2Y,
        ribbon.endX,
        ribbon.endY
      );
      b = new Bezier2(
        (i+1)/curveSample,
        ribbon.startX,
        ribbon.startY,
        ribbon.control1X,
        ribbon.control1Y,
        ribbon.control2X,
        ribbon.control2Y,
        ribbon.endX,
        ribbon.endY
      );
      c = new Bezier(a,b);

      textCurve.push({bezier: a, curve: c.curve});
    }

    var letterPadding = ctx.measureText(" ").width / 4;
    var w = text.length;
    var ww = Math.round(ctx.measureText(text).width);


    var totalPadding = (w-1) * letterPadding;
    var totalLength = ww + totalPadding;
    var p = 0;

    var cDist = textCurve[curveSample-1].curve.cDist;

    var z = (cDist / 2) - (totalLength / 2);

    for (i=0;i<curveSample;i++) {
      if (textCurve[i].curve.cDist >= z) {
        p = i;
        break;
      }
    }

    var j, x1, x2;
    for (i = 0; i < w ; i++) {
      ctx.save();
      ctx.translate(textCurve[p].bezier.point.x,textCurve[p].bezier.point.y);
      ctx.rotate(textCurve[p].curve.rad);
      ctx.fillText(text[i],0,0);
      ctx.restore();

      x1 = ctx.measureText(text[i]).width + letterPadding ;
      x2 = 0;
      for (j=p;j<curveSample;j++)
      {
        x2 = x2 + textCurve[j].curve.dist;
        if (x2 >= x1)
        {
          p = j;
          break;
        }
      }


    }
  } //end fillRibbon

  function Bezier(b1, b2) {
    //Final stage which takes p, p+1 and calculates the rotation, distance on the path and accumulates the total distance
    this.rad = Math.atan(b1.point.mY/b1.point.mX);
    this.b2 = b2;
    this.b1 = b1;
    // dx = (b2.x - b1.x);
    // dx2 = (b2.x - b1.x) * (b2.x - b1.x);
    this.dist = Math.sqrt( ((b2.x - b1.x) * (b2.x - b1.x)) + ((b2.y - b1.y) * (b2.y - b1.y)) );
    xDist = xDist + this.dist;
    this.curve = {rad: this.rad, dist: this.dist, cDist: xDist};
  }

  function BezierT(t, startX, startY, control1X, control1Y, control2X, control2Y, endX, endY) {
    //calculates the tangent line to a point in the curve; later used to calculate the degrees of rotation at this point.
    this.mx = (3*(1-t)*(1-t) * (control1X - startX)) + ((6 * (1-t) * t) * (control2X - control1X)) + (3 * t * t * (endX - control2X));
    this.my = (3*(1-t)*(1-t) * (control1Y - startY)) + ((6 * (1-t) * t) * (control2Y - control1Y)) + (3 * t * t * (endY - control2Y));
  }

  function Bezier2(t, startX, startY, control1X, control1Y, control2X, control2Y, endX, endY) {
    //Quadratic bezier curve plotter
    this.Bezier1 = new Bezier1(t,startX,startY,control1X,control1Y,control2X,control2Y);
    this.Bezier2 = new Bezier1(t,control1X,control1Y,control2X,control2Y,endX,endY);
    this.x = ((1 - t) * this.Bezier1.x) + (t * this.Bezier2.x);
    this.y = ((1 - t) * this.Bezier1.y) + (t * this.Bezier2.y);
    this.slope = new BezierT(t,startX, startY,control1X,control1Y,control2X,control2Y,endX,endY);

    this.point = {t: t, x: this.x, y: this.y, mX: this.slope.mx, mY: this.slope.my};
  }

  function Bezier1(t, startX, startY, control1X, control1Y, control2X, control2Y) {
    //linear bezier curve plotter; used recursivly in the quadratic bezier curve calculation
    this.x = (( 1 - t) * (1 - t) * startX) + (2 * (1 - t) * t * control1X) + (t * t * control2X);
    this.y = (( 1 - t) * (1 - t) * startY) + (2 * (1 - t) * t * control1Y) + (t * t * control2Y);
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Call constructor
  that.init();
}

function ImageElement()
{
  // Extends
  Element.apply(this, arguments);

  var that = this
    ;
  that.type = "Image Element";

  // Public Methods

  /**
   *  Image Element Constructor
   */
  that.init = function () {
    that.initResizable();
    that.initRotatable();
    that.initDraggable();
    that.initDeletable();
  };

  // Private Methods
  //TODO Implement Image Element

  // Call Constructor
}
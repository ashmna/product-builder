function FixTextPanel()
{
  // Extends
  Panel.apply(this, arguments);

  var that = this
    , block = null
    , label = null
    , el = null
    ;

  // Public Methods

  that.init = function () {
    initElement();
    initBinding();
  };

  // Private Methods

  function initElement() {
    var title = that.params.title || '';
    var placeholder = that.params.placeholder || '';
    var text = that.params.text || '';
    block = $('<div class="input-block nd"></div>');
    label = $('<label for="ft' + that.id + '"> ' + title + ' </label>');
    el = $('<input id="ft' + that.id + '" type="text" placeholder="' + placeholder + '" value="' + text + '">');

    block.append(label);
    block.append(el);

    that.broker.appendPanel(block);
  }

  function initBinding() {
    var elementObj = null;
    if (that.broker.list[that.id]) {
      elementObj = that.broker.list[that.id];
    }

		elementObj.getContext().click(function(){
			el.focus();
		});

    el.focus(function () {
      // TODO: improve
      if (elementObj) {
        that.broker.activate(elementObj);
      }
      el.select();
    });

    el.on('keyup keypress blur change', function (event) {
      // TODO: improve
      if (elementObj) {
        elementObj.setText(this.value);
      }
    });

  }

  // Call Constructor
  that.init();
}

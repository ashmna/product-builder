function Dialog(cxt) {
  var that = this
    , activeElement = null
    ;


  that.showImage = function () {
    open("Upload an image", onShowImage);
  };

  that.showDesign = function () {
    open("Choose a design", onShowDesign);
  };

  function open(title, callBack) {
    var w = cxt.outerWidth()
      , h = cxt.outerHeight()
      , dialogBody = $('<div title="' + title + '"></div>');

    cxt.append(dialogBody);

    dialogBody.dialog({
      minHeight: h / 2,
      minWidth: w / 2,
      maxHeight: h,
      maxWidth: w,
      height: h / 2 + h / 3,
      width: w / 2 + w / 3,
      draggable: false,
      resizable: false,
      close: function () {
        dialogBody.dialog("destroy");
        dialogBody.remove();
      },
      open: function () {
        callBack(dialogBody)
      }
    });
  }

  function onShowImage(body) {
    var list = $('<ul class="box-list"></ul>');
    var loading = $('<li class="loading"><img src="src/img/loading.gif"></li>');
    var more = $('<li class="more">More...</li>');

    list.append(loading);


    body.append(list);

    var data = [
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',
      'demo_img/avatar.jpg',

    ];



    var item;
    var tmpImg;
    var listItems = [];


    item = $('<li class="upload-box"><em class="fa fa-upload"></em><input type="file" id="inputFile"></li>');
    item.click(function(e) {
      if(!$(e.target).is('input')) {
        list.find('#inputFile').click();
      }
    });
    list.append(item);


    item = $('<li class="box  loading-box"><img src="src/img/loading.gif"></li>');
    list.append(item);

    data.forEach(addBox);

    function addBox(itemData) {
      var item = $('<li class="box loading-box" style="opacity: 0"><img src="src/img/loading.gif"></li>');
      item.data('data', itemData);
      list.append(item);
      var tmpImage = new Image();
      (function (tmpImage, item, src){
        tmpImage.onload = function() {
          item.removeClass('loading-box');
          var tmpImg = item.find('img');
          tmpImg.attr('src', src);
          tmpImg.css('left', (tmpImg.outerWidth() - 128) / -2);
        };
      })(tmpImage, item, itemData);

      listItems.push(item);
      tmpImage.src = itemData;
    }

    (function (l) {
      var i = 0;

      function s() {
        if (l.length > i) {
          l[i].css('opacity', 1);
          if (100 - i * 2 > 50) {
            setTimeout(function () {
              ++i;
              s();
            }, 100 - i * 2);
          } else {
            ++i;
            s();
          }
        }
      }

      s();
    })(listItems);

    list.append(more);
    //list.remove(loading);
    list.on('click', '.box:not(".loading-box")', function(e){
      if(activeElement) {
        activeElement.removeClass('active');
      }
      activeElement = $(this);
      activeElement.addClass('active');
    });
  }

  function onShowDesign(body) {

  }

}
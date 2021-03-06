'use strict';

$(document).ready(function() {
  $('#filebutton').click(function(e) {
    $('#fileinput').click();
  });

  $('#fileinput').change(function(e) {
    $('#fileselect').val($('#fileinput').val());
  });
  $('#gobutton').click(function() {
    if (document.getElementById('fileinput').files.length == 0) {
      return;
    }
    var start = new Date();
    var giffile = new GifLibFile(document.getElementById('fileinput').files[0]);
    var g = giffile.load();

    var gifLoaded = function (gif) {
      updateFrame(gif);
      console.time("loading");
    };
    var imgIdx = 0;

    var updateFrame = function (gif) {
      var tmpCanvas = document.getElementById('gifcanvas');
      giffile.copyImageToCanvas(gif, imgIdx, tmpCanvas);
      imgIdx = imgIdx + 1;
      if(imgIdx < gif.imageCount) {
        setTimeout(updateFrame.bind(undefined, gif), 0);
      } else {
        giffile.close(gif);
        console.timeEnd("loading");
      }
    };

    var gifLoadFailed = function (error) {
      console.log("Load failure! Error Code: " + error);
    };
    g.then(gifLoaded, gifLoadFailed);
  });
});

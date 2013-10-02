var NumberBorder = {};

(function () {
  var borderDraw = SVG('canvas');
  var circles = [];

  NumberBorder.draw = function (nDigits) {
    var canvas = $('#canvas');
    if (canvas.height() < $(window).height()) {
      canvas.height($(window).height());
    }
    var width = canvas.width();
    var height = canvas.height();
    var borderSize = Math.min(width / 10, 150);

    var maxSize = 120;
    for (var i = 0; i < 1000; i++) {
      if (maxSize > 30) {
        maxSize -= 0.2;
      }
      var digit = i % nDigits;
      var point = randomPointOnBorder(width, height, borderSize);
      var degrees = -45 + 90 * Math.random();
      var fontSize = Math.floor(40 + maxSize * Math.random());
      var approxRadius = fontSize * 0.375;

      if (!overlap(point.x, point.y, approxRadius)) {
        var text = borderDraw.text('' + digit)
            .font({
              family: 'Source Sans Pro',
              size: fontSize + 'px',
              // anchor is needed to make anchor middle of text (horizontally)
              anchor: 'middle',
              // anchor is needed to make anchor middle of text (vertically)
              leading: (fontSize * 0.9) + 'px'
            })
            .center(point.x, point.y)
            .rotate(degrees)
            .fill({ color: randomColor() });
        circles.push(rboxToCircle(text.rbox()));
      }
    }
  }

  NumberBorder.clear = function () {
    borderDraw.clear();
    circles.length = 0;
    $('#canvas').css('height', '');
  }

  function randomPointOnBorder(width, height, borderSize) {
    var random = Math.random();
    if (random < 0.25) { // top
      return { x: width * Math.random(), y: borderSize * Math.random() };
    } else if (random < 0.5) { // right
      return { x: width - borderSize * Math.random(), y: height * Math.random() };
    } else if (random < 0.75) { // bottom
      return { x: width * Math.random(), y: height - borderSize * Math.random() };
    } else { // left
      return { x: borderSize * Math.random(), y: height * Math.random() };
    }
  }

  function overlap(x, y, radius) {
    for (var j = 0; j < circles.length; j++) {
      if (Math.pow(x - circles[j].x, 2) + Math.pow(y - circles[j].y, 2) <
          Math.pow(radius + circles[j].radius, 2)) {
        return true;
      }
    }
    return false;
  }

  function randomColor() {
    return '#' + (Math.random().toString(16) + '000000').slice(2, 8);
  }

  function rboxToCircle(rbox) {
    return {
      x: rbox.x + rbox.width / 2,
      y: rbox.y + rbox.height / 2,
      radius: Math.sqrt(Math.pow(rbox.width / 2, 2) + Math.pow(rbox.height / 2, 2)) / 2
    };
  }
}());

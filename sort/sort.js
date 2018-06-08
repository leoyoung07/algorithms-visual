function drawBarChart(data, hightLight) {
  var height = 30;
  var svg = d3.select('svg');
  svg
    .selectAll('*')
    .remove();
  var g = svg
    .append('g')
    .attr('transform', 'translate(0, 500) rotate(-90, 0, 0)');
  var rects = g
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect');
  rects
    .attr('x', 0)
    .attr('y', function (d, i) {
      return i * height;
    })
    .attr('width', function (d) {
      return d * 10;
    })
    .attr('height', height - 5)
    .attr('fill', function (d, i) {
      return hightLight && hightLight[i]
        ? hightLight[i]
        : 'red';
    });
}
function genRenderList(min, max, size) {
  min = parseInt(min, 10);
  max = parseInt(max, 10);
  size = parseInt(size, 10);
  var list = [];
  for (var i = 0; i < size; i++) {
    var rand = min + Math.floor((max - min) * Math.random());
    list.push(rand);
  }
  return list;
}

Array.prototype.swap = function * (i, j) {
  drawBarChart(this, {[i]: 'blue'});
  yield this;
  drawBarChart(this, {[i]: 'blue', [j]: 'green'});
  yield this;
  var tmp = this[j];
  this[j] = this[i];
  this[i] = tmp;
  drawBarChart(this, {[i]: 'yellow', [j]: 'yellow'});
  yield this;
  drawBarChart(this);
  yield this;
}

function * bubbleSort(data) {
  for (var i = 0; i < data.length; i++) {
    for (var j = i + 1; j < data.length; j++) {
      if (data[j] < data[i]) {
        yield * data.swap(i, j);
      }
    }
  }
}

function * selectSort(data) {
  for (var i = 0; i < data.length; i++) {
    var minIndex = i;
    for (var j = i + 1; j < data.length; j++) {
      if (data[j] < data[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      yield * data.swap(minIndex, i);
    }
  }
}

function * insertSort(data) {
  for (var i = 0; i < data.length; i++) {
    for (var j = i; j > 0 && data[j] < data[j - 1]; j--) {
      yield * data.swap(j, j - 1);
    }
  }
}

function * quickSort(data) {
  function * sort(l, u) {
    if (l >= u) {
      return;
    }
    var m = l;
    for (var i = l + 1; i <= u; i++) {
      if (data[i] < data[l]) {
        m++;
        if (m !== i) {
          yield * data.swap(m, i);
        }
      }
    }
    yield * data.swap(l, m);
    yield * sort(l, m - 1);
    yield * sort(m + 1, u);
  }
  yield * sort(0, data.length - 1);
}

function runSortCode(sort, data, timeout) {
  var iter = sort(data);
  var run = function () {
    if (window.running) {
      var currentData = iter.next();
      if (currentData.done) {
        alert('done!');
      } else {
        data = currentData.value;
        setTimeout(run, timeout);
      }
    } else {
      setTimeout(run, timeout);
    }
  };
  window.running = true;
  setTimeout(run, timeout);
}